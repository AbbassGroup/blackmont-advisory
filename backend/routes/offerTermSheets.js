const express = require('express');
const router = express.Router();
const validateObjectId = require('../middleware/validateObjectId');
const authMiddleware = require('../middleware/auth.middleware');
const OfferTermSheet = require('../models/OfferTermSheet');
const OfferTermSheetViewLog = require('../models/OfferTermSheetViewLog');
const {
  STATUSES,
  resolveAmounts,
  depositExceedsPrice,
  editableFields,
  availableActions,
  missingRequiredFields,
  filterWritableFields,
  buildAuditEntry,
  resolveTransition,
  waitingOn,
  humanStatus,
  EDITABLE_IN,
} = require('../utils/offerTermSheetLogic');
const { readToken, readActionToken } = require('../utils/offerTermSheetToken');
const emails = require('../utils/offerTermSheetEmails');
const offerTermSheetPdf = require('../utils/offerTermSheetPdf');

const MAX_PAGE_SIZE = 100;

// Recorded as the actor when a decision is made from an email link.
const APPROVER_FALLBACK = emails.APPROVERS[0] || 'sadeq@blackmontadvisory.com';

const esc = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// Routing fields that follow the broker's editing window but are not on the printed letter.
const METADATA_FIELDS = ['buyerInviteEmail'];

// Large fields omitted from list responses.
const LIST_EXCLUDE =
  '-auditTrail -approvals -purchaserExecution.signatureImage -vendorExecution.signatureImage';

// ─── Helpers ────────────────────────────────────────────────────────────────

const isSuperAdmin = (user) => user?.role === 'superadmin';

const roleOf = (user) => (isSuperAdmin(user) ? 'superadmin' : 'broker');

const emailOf = (user) => (user?.email || '').toLowerCase();

const ownsSheet = (user, sheet) =>
  isSuperAdmin(user) ||
  (sheet.brokerEmail || '').toLowerCase() === emailOf(user);

const escapeRegex = (value) => String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// What the caller may do with this sheet right now.
function metaFor(user, sheet) {
  const role = roleOf(user);
  return {
    role,
    waitingOn: waitingOn(sheet.status),
    availableActions: availableActions({ status: sheet.status, role }),
    editableFields: editableFields(sheet.status, role),
    missingBroker: missingRequiredFields('broker', sheet),
    missingBuyer: missingRequiredFields('buyer', sheet),
    missingVendor: missingRequiredFields('vendor', sheet),
  };
}

// Applies dot-path writes to a Mongoose document.
function applyWrites(sheet, writes) {
  for (const [path, value] of Object.entries(writes)) {
    sheet.set(path, value);
  }
}

const isValidationError = (error) =>
  error?.name === 'ValidationError' || error?.name === 'CastError';

// Per-field messages for the form, so nobody reads raw database wording.
function fieldErrors(error) {
  if (error?.name !== 'ValidationError' || !error.errors) return null;
  const fields = {};
  for (const [path, detail] of Object.entries(error.errors)) {
    fields[path] = detail?.message || 'This value is not valid.';
  }
  return Object.keys(fields).length ? fields : null;
}

function fail(res, error, status = 500) {
  if (status >= 500) res.locals.error = error;
  return res.status(status).json({ message: error.message });
}

const HTTP_FOR_TRANSITION_CODE = {
  unknown_action: 400,
  invalid_status: 409,
  forbidden_role: 403,
};

// Moves a sheet to its next status; the write is conditional on the current status, so a double-clicked Approve advances once.
async function applyTransition(
  sheet,
  { action, role, actorEmail, actorName, note = '', req, set = {}, push = {} },
) {
  const from = sheet.status;
  const resolved = resolveTransition({ status: from, action, role });
  if (!resolved.ok) {
    return {
      ok: false,
      status: HTTP_FOR_TRANSITION_CODE[resolved.code] || 400,
      message: resolved.message,
    };
  }

  const update = {
    $set: { ...set, status: resolved.to, lastEditedBy: actorEmail },
    $push: {
      ...push,
      auditTrail: buildAuditEntry({
        action,
        actorRole: role,
        actorEmail,
        actorName,
        fromStatus: from,
        toStatus: resolved.to,
        note,
        req,
      }),
    },
  };

  const updated = await OfferTermSheet.findOneAndUpdate(
    { _id: sheet._id, status: from },
    update,
    { new: true, runValidators: true },
  );

  if (!updated) {
    return {
      ok: false,
      status: 409,
      message: 'This term sheet was updated by someone else. Reload and try again.',
    };
  }

  return { ok: true, sheet: updated };
}

// Shared guards for every action endpoint.
async function loadForAction(req, res) {
  const sheet = await OfferTermSheet.findById(req.params.id);
  if (!sheet) {
    res.status(404).json({ message: 'Term sheet not found' });
    return null;
  }
  if (!ownsSheet(req.user, sheet)) {
    res.status(403).json({ message: 'You do not have access to this term sheet' });
    return null;
  }
  if (sheet.archived) {
    res.status(409).json({ message: 'Restore this term sheet before acting on it.' });
    return null;
  }
  return sheet;
}


// ─── Email decision links ─────────────────────────────────────────────

const EMAIL_REJECT_NOTE = 'Rejected from the approval email.';

function resultPage({ title, message, tone }) {
  const colour = tone === 'good' ? '#1b2535' : tone === 'bad' ? '#dc3545' : '#6c757d';
  const mark = tone === 'good' ? '&#10003;' : tone === 'bad' ? '&#10007;' : '&#33;';
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title></head>
  <body style="font-family:Arial,Helvetica,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;background:#f5f3ef">
    <div style="background:#fff;padding:48px 40px;border-radius:16px;box-shadow:0 2px 24px rgba(0,0,0,.08);text-align:center;max-width:460px">
      <div style="width:72px;height:72px;border-radius:50%;background:${colour};color:#fff;font-size:34px;line-height:72px;margin:0 auto 20px">${mark}</div>
      <h2 style="color:#2e2c28;margin:0 0 10px;font-size:22px">${title}</h2>
      <p style="color:#666;font-size:15px;line-height:1.6;margin:0">${message}</p>
      <p style="color:#aaa;font-size:12px;margin-top:32px">Blackmont Advisory</p>
    </div>
  </body></html>`;
}

// One click from the approver's inbox. The token dies as soon as the sheet moves on.
async function handleEmailDecision(req, res) {
  const decision = req.params.decision;
  const read = readActionToken(req.query.token);

  if (!read.ok || read.payload.action !== decision) {
    return res.status(410).send(
      resultPage({
        title: read.code === 'expired' ? 'Link expired' : 'Link not valid',
        message:
          read.code === 'expired'
            ? 'This approval link has expired. Please open the term sheet in the portal instead.'
            : 'This approval link is not valid.',
        tone: 'muted',
      }),
    );
  }

  const { sheetId, tokenVersion, stage } = read.payload;
  const sheet = await OfferTermSheet.findById(sheetId);

  if (!sheet || sheet.archived) {
    return res.status(404).send(
      resultPage({
        title: 'Not found',
        message: 'This term sheet is no longer available.',
        tone: 'muted',
      }),
    );
  }

  if (sheet.tokenVersion !== tokenVersion || sheet.status !== stage) {
    return res.status(409).send(
      resultPage({
        title: 'Already actioned',
        message: `This term sheet has already moved on. It is now <strong>${humanStatus(sheet.status)}</strong>. No further action is needed.`,
        tone: 'muted',
      }),
    );
  }

  const business = sheet.businessName || 'this business';
  const goingToVendor = sheet.status === 'pending_approval_vendor';
  const now = new Date();

  if (decision === 'approve') {
    const missing = goingToVendor ? missingRequiredFields('buyer', sheet) : [];
    if (missing.length || (goingToVendor && !sheet.vendorEmail)) {
      return res.status(400).send(
        resultPage({
          title: 'Cannot approve yet',
          message: 'Some required details are still missing. Please open the term sheet in the portal.',
          tone: 'muted',
        }),
      );
    }

    const result = await applyTransition(sheet, {
      action: 'approve',
      role: 'superadmin',
      actorEmail: APPROVER_FALLBACK,
      actorName: 'Approver',
      note: 'Approved from the approval email.',
      req,
      set: {
        tokenVersion: sheet.tokenVersion + 1,
        ...(goingToVendor ? { sentToVendorAt: now } : { sentToBuyerAt: now }),
      },
      push: {
        approvals: {
          stage: goingToVendor ? 'vendor' : 'buyer',
          approvedBy: APPROVER_FALLBACK,
          approvedAt: now,
          note: 'Approved from the approval email.',
        },
      },
    });

    if (!result.ok) {
      return res.status(result.status).send(
        resultPage({ title: 'Already actioned', message: result.message, tone: 'muted' }),
      );
    }

    if (goingToVendor) emails.sentToVendor(result.sheet);
    else emails.sentToBuyer(result.sheet);

    return res.send(
      resultPage({
        title: 'Approved',
        message: goingToVendor
          ? `The Letter of Intent for <strong>${esc(business)}</strong> has been sent to the vendor for signature.`
          : `The Letter of Intent for <strong>${esc(business)}</strong> has been sent to the buyer.`,
        tone: 'good',
      }),
    );
  }

  const result = await applyTransition(sheet, {
    action: 'request_changes',
    role: 'superadmin',
    actorEmail: APPROVER_FALLBACK,
    actorName: 'Approver',
    note: EMAIL_REJECT_NOTE,
    req,
    set: {
      tokenVersion: sheet.tokenVersion + 1,
      ...(goingToVendor ? { purchaserExecution: {}, buyerSignedAt: null } : {}),
    },
  });

  if (!result.ok) {
    return res.status(result.status).send(
      resultPage({ title: 'Already actioned', message: result.message, tone: 'muted' }),
    );
  }

  emails.changesRequested(result.sheet, EMAIL_REJECT_NOTE);

  return res.send(
    resultPage({
      title: 'Sent back to the broker',
      message: `The Letter of Intent for <strong>${esc(business)}</strong> has been returned to ${esc(sheet.brokerEmail)}${
        goingToVendor ? ", and the buyer's signature has been cleared" : ''
      }. Add any detail from the portal if needed.`,
      tone: 'bad',
    }),
  );
}

router.get('/email/:decision', async (req, res) => {
  try {
    if (!['approve', 'reject'].includes(req.params.decision)) {
      return res.status(404).send(
        resultPage({ title: 'Link not valid', message: 'This approval link is not valid.', tone: 'muted' }),
      );
    }
    await handleEmailDecision(req, res);
  } catch (error) {
    res.locals.error = error;
    console.error('Offer term sheet email decision failed:', error);
    res.status(500).send(
      resultPage({
        title: 'Something went wrong',
        message: 'Please try again, or open the term sheet in the portal.',
        tone: 'muted',
      }),
    );
  }
});

// ─── Public routes (token-authenticated) ────────────────────────────────────

const TURN = { buyer: 'sent_to_buyer', vendor: 'sent_to_vendor' };

const EXECUTION_PATH = {
  buyer: 'purchaserExecution',
  vendor: 'vendorExecution',
};

const SIGNATURE_PATTERN = /^data:image\/(png|jpeg);base64,[A-Za-z0-9+/=]+$/;

const OBJECT_ID_PATTERN = /^[0-9a-fA-F]{24}$/;

// Only the letter is exposed to a party, never the workflow internals.
function publicExecution(execution) {
  return {
    fullName: execution?.fullName || '',
    email: execution?.email || '',
    phone: execution?.phone || '',
    date: execution?.date || null,
    signatureImage: execution?.signatureImage || '',
    consentAccepted: !!execution?.consentAccepted,
    signedAt: execution?.signedAt || null,
  };
}

function publicView(sheet, role) {
  return {
    status: sheet.status,
    role,
    businessName: sheet.businessName,
    businessAddress: sheet.businessAddress,
    vendorName: sheet.vendorName,
    vendorEmail: sheet.vendorEmail,
    purchaserName: sheet.purchaserName,
    purchaserEmail: sheet.purchaserEmail,
    purchasePrice: sheet.purchasePrice,
    stockTreatment: sheet.stockTreatment,
    depositAmount: sheet.depositAmount,
    balanceAmount: sheet.balanceAmount,
    settlementMode: sheet.settlementMode,
    settlementDate: sheet.settlementDate,
    settlementWeeks: sheet.settlementWeeks,
    inclusions: sheet.inclusions,
    subjectTo: sheet.subjectTo,
    purchaserExecution: publicExecution(sheet.purchaserExecution),
    vendorExecution: publicExecution(sheet.vendorExecution),
    editableFields: editableFields(sheet.status, role),
  };
}

// Why a party's link no longer works, in terms the public page can explain.
function stageRefusal(sheet, role) {
  if (sheet.status === 'completed') {
    return { code: 'already_signed', message: 'This letter has already been signed by both parties.' };
  }
  if (sheet.status === 'declined') {
    return { code: 'declined', message: 'This letter was declined and is no longer active.' };
  }
  if (sheet.status === 'cancelled') {
    return { code: 'cancelled', message: 'This letter was withdrawn by the agent.' };
  }
  if (role === 'buyer' && sheet.buyerSignedAt) {
    return { code: 'already_signed', message: 'You have already signed this letter. Nothing further is needed from you.' };
  }
  return { code: 'not_yet', message: 'This letter is not ready for you yet. You will be emailed when it is.' };
}

// Resolves a party link to a sheet, or answers the request and returns null.
async function loadByToken(req, res) {
  const read = readToken(req.params.token);
  if (!read.ok) {
    res.status(410).json({
      code: read.code,
      message:
        read.code === 'expired'
          ? 'This link has expired. Please ask your agent to resend it.'
          : 'This link is not valid.',
    });
    return null;
  }

  const { sheetId, role, tokenVersion } = read.payload;
  if (!OBJECT_ID_PATTERN.test(String(sheetId))) {
    res.status(410).json({ code: 'invalid', message: 'This link is not valid.' });
    return null;
  }

  const sheet = await OfferTermSheet.findById(sheetId);
  if (!sheet || sheet.archived) {
    res.status(404).json({ code: 'not_found', message: 'This letter is no longer available.' });
    return null;
  }

  // A newer link was issued, or the sheet moved on, which retires this one.
  if (sheet.tokenVersion !== tokenVersion) {
    res.status(410).json({
      code: 'superseded',
      message: 'This link is no longer active. A more recent one was sent to you.',
    });
    return null;
  }

  if (sheet.status !== TURN[role]) {
    res.status(409).json(stageRefusal(sheet, role));
    return null;
  }

  return { sheet, role };
}

async function recordView(sheet, role, req) {
  try {
    const execution = sheet[EXECUTION_PATH[role]] || {};
    await OfferTermSheetViewLog.create({
      sheetId: sheet._id,
      role,
      name:
        (role === 'buyer' ? sheet.purchaserName : sheet.vendorName) ||
        execution.fullName ||
        '',
      email:
        (role === 'buyer'
          ? sheet.purchaserEmail || sheet.buyerInviteEmail
          : sheet.vendorEmail) ||
        execution.email ||
        '',
      status: sheet.status,
      ip: req.headers['x-forwarded-for'] || req.ip || '',
      userAgent: req.headers['user-agent'] || '',
    });
  } catch (error) {
    console.error('Offer term sheet view log failed:', error.message);
  }
}

// GET /public/:token, the letter as the buyer or vendor sees it.
router.get('/public/:token', async (req, res) => {
  try {
    const loaded = await loadByToken(req, res);
    if (!loaded) return;
    recordView(loaded.sheet, loaded.role, req);
    res.json(publicView(loaded.sheet, loaded.role));
  } catch (error) {
    fail(res, error);
  }
});

// POST /public/:token/sign, the party completes their fields and signs.
router.post('/public/:token/sign', async (req, res) => {
  try {
    const loaded = await loadByToken(req, res);
    if (!loaded) return;
    const { sheet, role } = loaded;

    const prefix = EXECUTION_PATH[role];
    const { writes } = filterWritableFields(req.body, { status: sheet.status, role });

    if (req.body?.consentAccepted !== true) {
      return res.status(400).json({
        code: 'consent_required',
        message: 'Please confirm you agree to sign this letter electronically.',
      });
    }

    const signature = writes[`${prefix}.signatureImage`];
    if (!signature || !SIGNATURE_PATTERN.test(String(signature))) {
      return res.status(400).json({
        code: 'signature_required',
        message: 'Please add your signature before submitting.',
      });
    }

    // Merged in memory so completeness is checked against the finished letter.
    applyWrites(sheet, writes);

    const missing = missingRequiredFields(role, sheet);
    if (missing.length) {
      return res.status(400).json({
        code: 'incomplete',
        message: 'Please complete every required field.',
        fields: Object.fromEntries(
          missing.map((key) => [key, 'This field is required.']),
        ),
      });
    }

    const now = new Date();
    const set = {
      ...writes,
      [`${prefix}.consentAccepted`]: true,
      [`${prefix}.signedAt`]: now,
      [`${prefix}.ip`]: req.headers['x-forwarded-for'] || req.ip || '',
      [`${prefix}.userAgent`]: req.headers['user-agent'] || '',
      tokenVersion: sheet.tokenVersion + 1,
    };

    if (role === 'buyer') {
      if (depositExceedsPrice(sheet.purchasePrice, sheet.depositAmount)) {
        return res.status(400).json({
          code: 'invalid',
          message: 'Please check the highlighted fields.',
          fields: {
            depositAmount: 'The deposit cannot be more than the purchase price.',
          },
        });
      }
      Object.assign(
        set,
        resolveAmounts(sheet.purchasePrice, sheet.depositAmount),
        { buyerSignedAt: now },
      );
    } else {
      Object.assign(set, { vendorSignedAt: now, completedAt: now });
    }

    const result = await applyTransition(sheet, {
      action: role === 'buyer' ? 'buyer_sign' : 'vendor_sign',
      role,
      actorEmail: sheet[prefix]?.email || '',
      actorName: sheet[prefix]?.fullName || '',
      req,
      set,
    });
    if (!result.ok) {
      return res.status(result.status).json({ code: 'conflict', message: result.message });
    }

    if (role === 'buyer') {
      emails.buyerSigned(result.sheet);
    } else {
      // Both parties have signed, so the executed letter goes out to everyone.
      const pdf = await offerTermSheetPdf.buildSafely(result.sheet);
      emails.completed(result.sheet, pdf);
      if (pdf) {
        await OfferTermSheet.updateOne(
          { _id: result.sheet._id },
          { $set: { pdfGeneratedAt: new Date() } },
        ).catch((error) =>
          console.error('Could not record PDF generation:', error),
        );
      }
    }

    res.json({ status: result.sheet.status, signedAt: now });
  } catch (error) {
    const fields = fieldErrors(error);
    if (fields) {
      return res
        .status(400)
        .json({ code: 'invalid', message: 'Please check the highlighted fields.', fields });
    }
    fail(res, error, isValidationError(error) ? 400 : 500);
  }
});

// POST /public/:token/decline, the party refuses to sign.
router.post('/public/:token/decline', async (req, res) => {
  try {
    const loaded = await loadByToken(req, res);
    if (!loaded) return;
    const { sheet, role } = loaded;

    const reason = String(req.body?.reason || '').trim().slice(0, 2000);

    const result = await applyTransition(sheet, {
      action: 'decline',
      role,
      actorEmail: sheet[EXECUTION_PATH[role]]?.email || '',
      note: reason,
      req,
      set: {
        declinedBy: role,
        declineReason: reason,
        tokenVersion: sheet.tokenVersion + 1,
      },
    });
    if (!result.ok) {
      return res.status(result.status).json({ code: 'conflict', message: result.message });
    }

    emails.declined(result.sheet);

    res.json({ status: result.sheet.status });
  } catch (error) {
    fail(res, error, isValidationError(error) ? 400 : 500);
  }
});

// ─── Routes ─────────────────────────────────────────────────────────────────

// Everything below requires an authenticated admin/broker.
router.use(authMiddleware);

// GET /, brokers see their own, superadmins see everything; `status` accepts a comma-separated list.
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search = '',
      status,
      brokerEmail,
      archived,
    } = req.query;

    const query =
      archived === 'true' ? { archived: true } : { archived: { $ne: true } };

    if (!isSuperAdmin(req.user)) {
      query.brokerEmail = emailOf(req.user);
    } else if (brokerEmail) {
      query.brokerEmail = String(brokerEmail).toLowerCase();
    }

    if (status) {
      const requested = String(status)
        .split(',')
        .map((s) => s.trim())
        .filter((s) => STATUSES.includes(s));
      if (requested.length) query.status = { $in: requested };
    }

    if (search) {
      const term = { $regex: escapeRegex(search), $options: 'i' };
      query.$or = [
        { businessName: term },
        { vendorName: term },
        { vendorEmail: term },
        { buyerInviteEmail: term },
        { purchaserName: term },
        { purchaserEmail: term },
        { brokerEmail: term },
      ];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(
      MAX_PAGE_SIZE,
      Math.max(1, parseInt(limit, 10) || 20),
    );

    const [sheets, total] = await Promise.all([
      OfferTermSheet.find(query)
        .select(LIST_EXCLUDE)
        .sort({ updatedAt: -1 })
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum)
        .lean(),
      OfferTermSheet.countDocuments(query),
    ]);

    res.json({
      sheets: sheets.map((sheet) => ({
        ...sheet,
        waitingOn: waitingOn(sheet.status),
      })),
      total,
      currentPage: pageNum,
      totalPages: Math.ceil(total / limitNum) || 1,
    });
  } catch (error) {
    fail(res, error);
  }
});

// POST /, create a draft; a superadmin may create on behalf of another broker.
router.post('/', async (req, res) => {
  try {
    const brokerEmail =
      isSuperAdmin(req.user) && req.body.brokerEmail
        ? String(req.body.brokerEmail).toLowerCase()
        : emailOf(req.user);

    if (!brokerEmail) {
      return res
        .status(400)
        .json({ message: 'A broker email is required to create a term sheet.' });
    }

    // Initial values are filtered exactly as they would be on update.
    const { writes } = filterWritableFields(req.body, {
      status: 'draft',
      role: roleOf(req.user),
    });
    for (const field of METADATA_FIELDS) {
      if (req.body[field] !== undefined) writes[field] = req.body[field];
    }

    const sheet = new OfferTermSheet({
      brokerEmail,
      brokerName: req.user.username || '',
      createdBy: emailOf(req.user),
      lastEditedBy: emailOf(req.user),
      auditTrail: [
        buildAuditEntry({
          action: 'created',
          actorRole: roleOf(req.user),
          actorEmail: emailOf(req.user),
          actorName: req.user.username || '',
          toStatus: 'draft',
          req,
        }),
      ],
    });
    applyWrites(sheet, writes);
    await sheet.save();

    res.status(201).json({ sheet, meta: metaFor(req.user, sheet) });
  } catch (error) {
    fail(res, error, isValidationError(error) ? 400 : 500);
  }
});

// GET /:id, a single term sheet plus what the caller may do with it.
router.get('/:id', validateObjectId(), async (req, res) => {
  try {
    const sheet = await OfferTermSheet.findById(req.params.id);
    if (!sheet) return res.status(404).json({ message: 'Term sheet not found' });
    if (!ownsSheet(req.user, sheet)) {
      return res
        .status(403)
        .json({ message: 'You do not have access to this term sheet' });
    }

    res.json({ sheet, meta: metaFor(req.user, sheet) });
  } catch (error) {
    fail(res, error);
  }
});

router.get('/:id/views', validateObjectId(), async (req, res) => {
  try {
    const sheet = await OfferTermSheet.findById(req.params.id).select(
      'brokerEmail',
    );
    if (!sheet) return res.status(404).json({ message: 'Term sheet not found' });
    if (!ownsSheet(req.user, sheet)) {
      return res
        .status(403)
        .json({ message: 'You do not have access to this term sheet' });
    }

    const views = await OfferTermSheetViewLog.find({ sheetId: req.params.id })
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();

    res.json({ views });
  } catch (error) {
    fail(res, error);
  }
});

// PUT /:id, partial update of the fields this role owns at this stage; everything else is ignored and reported in `ignored`.
router.put('/:id', validateObjectId(), async (req, res) => {
  try {
    const sheet = await OfferTermSheet.findById(req.params.id);
    if (!sheet) return res.status(404).json({ message: 'Term sheet not found' });
    if (!ownsSheet(req.user, sheet)) {
      return res
        .status(403)
        .json({ message: 'You do not have access to this term sheet' });
    }

    const role = roleOf(req.user);
    if (!(EDITABLE_IN[role] || []).includes(sheet.status)) {
      return res.status(409).json({
        message:
          sheet.status === 'pending_approval_buyer' ||
          sheet.status === 'pending_approval_vendor'
            ? 'This term sheet is awaiting approval and cannot be edited.'
            : 'This term sheet can no longer be edited.',
        status: sheet.status,
      });
    }

    const { writes, rejected } = filterWritableFields(req.body, {
      status: sheet.status,
      role,
    });

    for (const field of METADATA_FIELDS) {
      if (req.body[field] !== undefined) {
        writes[field] = req.body[field];
      }
    }

    // Reassigning the owning broker is a superadmin-only operation.
    if (isSuperAdmin(req.user) && req.body.brokerEmail !== undefined) {
      writes.brokerEmail = String(req.body.brokerEmail).toLowerCase();
    }

    applyWrites(sheet, writes);

    // A change to either figure re-resolves both.
    if (sheet.isModified('purchasePrice') || sheet.isModified('depositAmount')) {
      if (depositExceedsPrice(sheet.purchasePrice, sheet.depositAmount)) {
        return res.status(400).json({
          message: 'Please check the highlighted fields.',
          fields: {
            depositAmount: 'The deposit cannot be more than the purchase price.',
          },
        });
      }
      const { depositAmount, balanceAmount } = resolveAmounts(
        sheet.purchasePrice,
        sheet.depositAmount,
      );
      sheet.depositAmount = depositAmount;
      sheet.balanceAmount = balanceAmount;
    }

    if (sheet.isModified()) {
      sheet.lastEditedBy = emailOf(req.user);
      sheet.auditTrail.push(
        buildAuditEntry({
          action: 'updated',
          actorRole: role,
          actorEmail: emailOf(req.user),
          actorName: req.user.username || '',
          fromStatus: sheet.status,
          toStatus: sheet.status,
          note: Object.keys(writes).join(', '),
          req,
        }),
      );
      await sheet.save();
    }

    res.json({
      sheet,
      meta: metaFor(req.user, sheet),
      ignored: rejected.filter((path) => !METADATA_FIELDS.includes(path)),
    });
  } catch (error) {
    fail(res, error, isValidationError(error) ? 400 : 500);
  }
});

// POST /:id/submit, the broker sends their part for approval.
router.post('/:id/submit', validateObjectId(), async (req, res) => {
  try {
    const sheet = await loadForAction(req, res);
    if (!sheet) return;

    const missing = missingRequiredFields('broker', sheet);
    if (missing.length) {
      return res.status(400).json({
        message: 'Complete every required field before submitting.',
        missing,
      });
    }
    if (!sheet.buyerInviteEmail) {
      return res.status(400).json({
        message: "Add the buyer's email address before submitting.",
        missing: ['buyerInviteEmail'],
      });
    }

    const result = await applyTransition(sheet, {
      action: 'submit',
      role: roleOf(req.user),
      actorEmail: emailOf(req.user),
      actorName: req.user.username || '',
      req,
      set: { submittedAt: new Date() },
    });
    if (!result.ok) {
      return res.status(result.status).json({ message: result.message });
    }

    emails.submittedForApproval(result.sheet);

    res.json({ sheet: result.sheet, meta: metaFor(req.user, result.sheet) });
  } catch (error) {
    fail(res, error, isValidationError(error) ? 400 : 500);
  }
});

// POST /:id/approve, the first gate sends to the buyer, the second to the vendor, each on a fresh link.
router.post('/:id/approve', validateObjectId(), async (req, res) => {
  try {
    const sheet = await loadForAction(req, res);
    if (!sheet) return;

    const goingToVendor = sheet.status === 'pending_approval_vendor';

    if (goingToVendor) {
      const missing = missingRequiredFields('buyer', sheet);
      if (missing.length) {
        return res.status(400).json({
          message: "The buyer's part is incomplete; it cannot go to the vendor.",
          missing,
        });
      }
    }
    if (goingToVendor && !sheet.vendorEmail) {
      return res.status(400).json({
        message: "Add the vendor's email address before sending it on.",
        missing: ['vendorEmail'],
      });
    }

    const note = String(req.body?.note || '').trim();
    const now = new Date();

    const result = await applyTransition(sheet, {
      action: 'approve',
      role: roleOf(req.user),
      actorEmail: emailOf(req.user),
      actorName: req.user.username || '',
      note,
      req,
      set: {
        tokenVersion: sheet.tokenVersion + 1,
        ...(goingToVendor ? { sentToVendorAt: now } : { sentToBuyerAt: now }),
      },
      push: {
        approvals: {
          stage: goingToVendor ? 'vendor' : 'buyer',
          approvedBy: emailOf(req.user),
          approvedAt: now,
          note,
        },
      },
    });
    if (!result.ok) {
      return res.status(result.status).json({ message: result.message });
    }

    if (goingToVendor) emails.sentToVendor(result.sheet);
    else emails.sentToBuyer(result.sheet);

    res.json({ sheet: result.sheet, meta: metaFor(req.user, result.sheet) });
  } catch (error) {
    fail(res, error, isValidationError(error) ? 400 : 500);
  }
});

// POST /:id/request-changes. From the second gate the buyer's signature is cleared.
router.post('/:id/request-changes', validateObjectId(), async (req, res) => {
  try {
    const sheet = await loadForAction(req, res);
    if (!sheet) return;

    const note = String(req.body?.note || '').trim();
    if (!note) {
      return res
        .status(400)
        .json({ message: 'Explain what needs to change before sending it back.' });
    }

    const hadBuyerSignature = sheet.status === 'pending_approval_vendor';

    const result = await applyTransition(sheet, {
      action: 'request_changes',
      role: roleOf(req.user),
      actorEmail: emailOf(req.user),
      actorName: req.user.username || '',
      note,
      req,
      set: {
        tokenVersion: sheet.tokenVersion + 1,
        ...(hadBuyerSignature
          ? { purchaserExecution: {}, buyerSignedAt: null }
          : {}),
      },
    });
    if (!result.ok) {
      return res.status(result.status).json({ message: result.message });
    }

    emails.changesRequested(result.sheet, note);

    res.json({
      sheet: result.sheet,
      meta: metaFor(req.user, result.sheet),
      buyerSignatureCleared: hadBuyerSignature,
    });
  } catch (error) {
    fail(res, error, isValidationError(error) ? 400 : 500);
  }
});

// POST /:id/cancel, terminal; a cancelled sheet can only be archived.
router.post('/:id/cancel', validateObjectId(), async (req, res) => {
  try {
    const sheet = await loadForAction(req, res);
    if (!sheet) return;

    const result = await applyTransition(sheet, {
      action: 'cancel',
      role: roleOf(req.user),
      actorEmail: emailOf(req.user),
      actorName: req.user.username || '',
      note: String(req.body?.note || '').trim(),
      req,
      set: { tokenVersion: sheet.tokenVersion + 1 },
    });
    if (!result.ok) {
      return res.status(result.status).json({ message: result.message });
    }

    res.json({ sheet: result.sheet, meta: metaFor(req.user, result.sheet) });
  } catch (error) {
    fail(res, error, isValidationError(error) ? 400 : 500);
  }
});

// DELETE /:id, archive; the record stays for recovery but leaves the default list.
router.delete('/:id', validateObjectId(), async (req, res) => {
  try {
    const sheet = await OfferTermSheet.findById(req.params.id);
    if (!sheet) return res.status(404).json({ message: 'Term sheet not found' });
    if (!ownsSheet(req.user, sheet)) {
      return res
        .status(403)
        .json({ message: 'You do not have access to this term sheet' });
    }
    if (sheet.archived) {
      return res.json({ message: 'Term sheet already archived' });
    }

    sheet.archived = true;
    sheet.archivedAt = new Date();
    sheet.lastEditedBy = emailOf(req.user);
    sheet.auditTrail.push(
      buildAuditEntry({
        action: 'archived',
        actorRole: roleOf(req.user),
        actorEmail: emailOf(req.user),
        actorName: req.user.username || '',
        fromStatus: sheet.status,
        toStatus: sheet.status,
        req,
      }),
    );
    await sheet.save();

    res.json({ message: 'Term sheet archived successfully' });
  } catch (error) {
    fail(res, error);
  }
});

// PATCH /:id/restore, un-archive.
router.patch('/:id/restore', validateObjectId(), async (req, res) => {
  try {
    const sheet = await OfferTermSheet.findById(req.params.id);
    if (!sheet) return res.status(404).json({ message: 'Term sheet not found' });
    if (!ownsSheet(req.user, sheet)) {
      return res
        .status(403)
        .json({ message: 'You do not have access to this term sheet' });
    }

    sheet.archived = false;
    sheet.archivedAt = null;
    sheet.lastEditedBy = emailOf(req.user);
    sheet.auditTrail.push(
      buildAuditEntry({
        action: 'restored',
        actorRole: roleOf(req.user),
        actorEmail: emailOf(req.user),
        actorName: req.user.username || '',
        fromStatus: sheet.status,
        toStatus: sheet.status,
        req,
      }),
    );
    await sheet.save();

    res.json({ message: 'Term sheet restored', sheet });
  } catch (error) {
    fail(res, error);
  }
});

// DELETE /:id/permanent, irreversible, archive-only, and superadmin-only once signed.
router.delete('/:id/permanent', validateObjectId(), async (req, res) => {
  try {
    const sheet = await OfferTermSheet.findById(req.params.id);
    if (!sheet) return res.status(404).json({ message: 'Term sheet not found' });
    if (!ownsSheet(req.user, sheet)) {
      return res
        .status(403)
        .json({ message: 'You do not have access to this term sheet' });
    }
    if (!sheet.archived) {
      return res
        .status(409)
        .json({ message: 'Archive this term sheet before deleting it.' });
    }
    if (sheet.status === 'completed' && !isSuperAdmin(req.user)) {
      return res.status(403).json({
        message: 'Only a superadmin can permanently delete a signed term sheet.',
      });
    }

    await OfferTermSheet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Term sheet permanently deleted' });
  } catch (error) {
    fail(res, error);
  }
});

module.exports = router;
