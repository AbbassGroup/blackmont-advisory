const jwt = require('jsonwebtoken');

// A party link lasts this long, or until the sheet's tokenVersion moves. The emails read the same constant.
const TOKEN_TTL_DAYS = 5;
const TOKEN_TTL = `${TOKEN_TTL_DAYS}d`;

const frontendBase = () =>
  (process.env.FRONTEND_URL || 'https://www.blackmontadvisory.com').replace(/\/$/, '');

const backendBase = () =>
  (process.env.BACKEND_URL || 'http://localhost:5005').replace(/\/$/, '');

function issueToken(sheet, role) {
  return jwt.sign(
    { sheetId: String(sheet._id), role, tokenVersion: sheet.tokenVersion },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_TTL },
  );
}

function partyLink(sheet, role) {
  return `${frontendBase()}/offer-term-sheet/${issueToken(sheet, role)}`;
}

// Returns { ok: true, payload } or { ok: false, code: 'expired' | 'invalid' }.
function readToken(token) {
  try {
    const payload = jwt.verify(String(token || ''), process.env.JWT_SECRET);
    if (!payload?.sheetId || !['buyer', 'vendor'].includes(payload.role)) {
      return { ok: false, code: 'invalid' };
    }
    return { ok: true, payload };
  } catch (error) {
    return {
      ok: false,
      code: error?.name === 'TokenExpiredError' ? 'expired' : 'invalid',
    };
  }
}

// Lets the approver act from an email without signing in; `stage` pins it to one gate.
function issueActionToken(sheet, action) {
  return jwt.sign(
    {
      sheetId: String(sheet._id),
      action,
      stage: sheet.status,
      tokenVersion: sheet.tokenVersion,
    },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_TTL },
  );
}

function actionLink(sheet, action) {
  const token = issueActionToken(sheet, action);
  return `${backendBase()}/api/offer-term-sheets/email/${action}?token=${token}`;
}

function readActionToken(token) {
  try {
    const payload = jwt.verify(String(token || ''), process.env.JWT_SECRET);
    if (!payload?.sheetId || !['approve', 'reject'].includes(payload.action)) {
      return { ok: false, code: 'invalid' };
    }
    return { ok: true, payload };
  } catch (error) {
    return {
      ok: false,
      code: error?.name === 'TokenExpiredError' ? 'expired' : 'invalid',
    };
  }
}

module.exports = {
  issueToken,
  partyLink,
  readToken,
  issueActionToken,
  actionLink,
  readActionToken,
  TOKEN_TTL,
  TOKEN_TTL_DAYS,
};
