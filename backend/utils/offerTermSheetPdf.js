// Renders an executed Letter of Intent as a PDF, for attaching to the
// completion email. The layout and wording mirror the web document in
// frontend/app/(form)/offer-term-sheet/[token]/_components/letter.tsx —
// change both together.
const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const BRAND_DETAILS = require('./offerTermSheetBrand');

// A4, in points.
const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 56;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const LABEL_WIDTH = 170;

const BRAND = rgb(0.059, 0.086, 0.137);
const INK = rgb(0.192, 0.192, 0.192);
const BODY = rgb(0.29, 0.29, 0.29);
const MUTED = rgb(0.55, 0.55, 0.55);
const RULE = rgb(0.88, 0.88, 0.88);

// The letterhead wordmark ships with the backend, so a split deployment still
// renders it. Falls back to the text wordmark below if the file is missing.
const LOGO_PATH = path.resolve(__dirname, '../assets/blackmont-wordmark.png');

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
});

const money = (value) =>
  typeof value === 'number' && Number.isFinite(value) ? AUD.format(value) : '-';

const shortDate = (value) =>
  value
    ? new Date(value).toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    : '-';

const dateTime = (value) =>
  value ? new Date(value).toLocaleString('en-AU') : '';

// The standard fonts encode WinAnsi only, and drawText throws on anything
// outside it. Typographic punctuation is folded to ASCII and the rest dropped,
// so a business name pasted from a word processor cannot break the render.
const PUNCTUATION = {
  '\u2018': "'",
  '\u2019': "'",
  '\u201A': "'",
  '\u201C': '"',
  '\u201D': '"',
  '\u2013': '-',
  '\u2014': '-',
  '\u2022': '*',
  '\u2026': '...',
  '\u00A0': ' ',
};

const clean = (value) =>
  String(value ?? '')
    .replace(/[\u2018\u2019\u201A\u201C\u201D\u2013\u2014\u2022\u2026\u00A0]/g, (c) => PUNCTUATION[c])
    .replace(/\s+/g, ' ')
    .replace(/[^\x20-\x7E\u00A1-\u00FF]/g, '')
    .trim();

// ─── Letter prose, mirroring the web document ───────────────────────────────

const STOCK_LABELS = {
  plus_sav: '+ Stock at Valuation',
  including_sav: 'Including Stock at Valuation',
};

function settlementText(sheet) {
  if (sheet.settlementMode === 'date' && sheet.settlementDate) {
    return shortDate(sheet.settlementDate);
  }
  if (sheet.settlementMode === 'weeks' && sheet.settlementWeeks) {
    return `${sheet.settlementWeeks} weeks of the formal contract being signed and executed`;
  }
  return '-';
}

function inclusionList(sheet) {
  const i = sheet.inclusions || {};
  const list = [];
  if (i.businessName) list.push('Business Name');
  if (i.intellectualProperty) list.push('Intellectual Property');
  if (i.plantAndEquipment) list.push('All Power, Plant & Equipment');
  if (i.goodwill) list.push('Business Goodwill');
  if (i.otherEnabled && i.otherText) list.push(i.otherText);
  return list;
}

function conditionList(sheet) {
  const c = sheet.subjectTo || {};
  const list = [];
  if (c.dueDiligenceEnabled) {
    list.push(`Due Diligence ${c.dueDiligenceDays ?? '-'} days from contract date`);
  }
  if (c.leaseTransfer) list.push('Lease transfer approval');
  if (c.financeApproval) list.push('Finance approval');
  if (c.transitionEnabled) {
    list.push(`Transition & handover support of ${c.transitionWeeks ?? '-'} weeks`);
  }
  if (c.otherEnabled && c.otherText) list.push(c.otherText);
  return list;
}

const DEPOSIT_TERMS =
  'Once this offer has been accepted by both parties, the purchaser will be sent an Acceptance Email. Payment must be made by the purchaser within 24 hours of this letter being sent.';

const ASSUMPTIONS = [
  'Each party bears its own legal and professional costs.',
  'This letter of intent is non-binding in nature until a formal Contract of Sale is executed. Any deposits paid are fully refundable until the execution of a Contract of Sale.',
];

const DECLARATION =
  'The buyer has sufficient financial capacity to complete this transaction (or is in the process of obtaining finance) and has reviewed all available information about the business, and submits this Letter of Intent subject to satisfactory due diligence.';

const DISCLAIMER = BRAND_DETAILS.disclaimer;

const FOOTER_LEFT = BRAND_DETAILS.footerLeft;
const FOOTER_RIGHT = BRAND_DETAILS.footerRight;

// ─── Layout ─────────────────────────────────────────────────────────────────

// A cursor that flows down the page and starts a new one when it runs out.
//
// `density` scales every vertical gap and line height, never the type size, so
// a tighter pass stays just as legible. buildOfferTermSheetPdf uses it to pull
// a letter back off a nearly empty last page.
function createLayout(pdf, fonts, density = 1) {
  // Gaps scale freely; leading keeps a floor so lines never touch.
  const v = (amount) => amount * density;
  const leading = (size) => Math.max(size + 1.5, 15 * density);
  // Tighter passes may also lean into the bottom margin, but never near enough
  // to reach the footer rule at y=44.
  const floor = MARGIN - (1 - density) * 24;

  let page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const nextPage = () => {
    page = pdf.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN;
  };

  // Reserves vertical room, breaking the page when the block will not fit.
  const reserve = (height) => {
    if (y - height < floor) nextPage();
  };

  const wrap = (text, font, size, maxWidth) => {
    const words = clean(text).split(' ').filter(Boolean);
    if (!words.length) return [''];
    const lines = [];
    let line = words[0];
    for (const word of words.slice(1)) {
      const candidate = `${line} ${word}`;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth) line = candidate;
      else {
        lines.push(line);
        line = word;
      }
    }
    lines.push(line);
    return lines;
  };

  const write = (text, { x = MARGIN, size = 10.5, font = fonts.regular, color = BODY } = {}) => {
    page.drawText(clean(text), { x, y, size, font, color });
  };

  const paragraph = (text, { size = 10.5, font = fonts.regular, color = BODY, x = MARGIN, width = CONTENT_WIDTH, gap = 5 } = {}) => {
    const step = size + Math.max(1.5, v(gap));
    for (const line of wrap(text, font, size, width)) {
      reserve(step);
      page.drawText(line, { x, y, size, font, color });
      y -= step;
    }
  };

  return {
    get page() {
      return page;
    },
    get y() {
      return y;
    },
    set y(value) {
      y = value;
    },
    nextPage,
    reserve,
    wrap,
    write,
    paragraph,
    move: (amount) => {
      y -= v(amount);
    },
    rule: (color = RULE) => {
      reserve(v(12));
      page.drawLine({
        start: { x: MARGIN, y },
        end: { x: PAGE_WIDTH - MARGIN, y },
        thickness: 0.75,
        color,
      });
      y -= v(14);
    },
    heading: (title) => {
      reserve(v(46));
      y -= v(12);
      page.drawText(clean(title).toUpperCase(), {
        x: MARGIN,
        y,
        size: 9,
        font: fonts.bold,
        color: MUTED,
      });
      y -= v(6);
      page.drawLine({
        start: { x: MARGIN, y },
        end: { x: PAGE_WIDTH - MARGIN, y },
        thickness: 1,
        color: BRAND,
      });
      y -= v(16);
    },
    row: (label, value) => {
      const lines = wrap(value || '-', fonts.regular, 10.5, CONTENT_WIDTH - LABEL_WIDTH);
      const step = leading(10.5);
      reserve(lines.length * step + v(4));
      page.drawText(clean(label), {
        x: MARGIN,
        y,
        size: 10.5,
        font: fonts.bold,
        color: INK,
      });
      for (const line of lines) {
        page.drawText(line, {
          x: MARGIN + LABEL_WIDTH,
          y,
          size: 10.5,
          font: fonts.regular,
          color: BODY,
        });
        y -= step;
      }
      y -= v(2);
    },
    bullets: (items, empty) => {
      if (!items.length) {
        paragraph(empty, { color: MUTED });
        return;
      }
      for (const item of items) {
        const lines = wrap(item, fonts.regular, 10.5, CONTENT_WIDTH - 16);
        const step = leading(10.5);
        reserve(lines.length * step);
        page.drawText('-', { x: MARGIN + 2, y, size: 10.5, font: fonts.regular, color: BRAND });
        for (const line of lines) {
          page.drawText(line, { x: MARGIN + 16, y, size: 10.5, font: fonts.regular, color: BODY });
          y -= step;
        }
      }
      y -= v(2);
    },
    image: (embedded, maxWidth, maxHeight) => {
      const scale = Math.min(maxWidth / embedded.width, maxHeight / embedded.height, 1);
      const width = embedded.width * scale;
      const height = embedded.height * scale;
      reserve(height + v(6));
      y -= height;
      page.drawImage(embedded, { x: MARGIN, y, width, height });
      y -= v(8);
    },
  };
}

// Signatures are stored as data URLs by the signing form.
async function embedSignature(pdf, dataUrl) {
  const match = /^data:image\/(png|jpeg);base64,([A-Za-z0-9+/=]+)$/.exec(
    String(dataUrl || ''),
  );
  if (!match) return null;
  const bytes = Buffer.from(match[2], 'base64');
  return match[1] === 'png' ? pdf.embedPng(bytes) : pdf.embedJpg(bytes);
}

async function embedLogo(pdf) {
  try {
    if (!fs.existsSync(LOGO_PATH)) return null;
    return await pdf.embedPng(fs.readFileSync(LOGO_PATH));
  } catch {
    return null;
  }
}

async function drawExecution(pdf, layout, fonts, title, execution) {
  layout.heading(title);

  if (!execution?.signedAt) {
    layout.paragraph('Not yet signed.', { color: MUTED });
    return;
  }

  layout.row('Full Name', execution.fullName);
  layout.row('Email', execution.email);
  layout.row('Phone', execution.phone);
  layout.row('Date', shortDate(execution.date));

  const signature = await embedSignature(pdf, execution.signatureImage);
  if (signature) {
    layout.move(6);
    layout.write('Signature', { size: 10.5, font: fonts.bold, color: INK });
    layout.move(8);
    layout.image(signature, 200, 62);
  }

  layout.paragraph(
    `Signed electronically on ${dateTime(execution.signedAt)}. The signatory accepted that signing here is valid electronic acceptance under the Electronic Transactions (Victoria) Act 2000, and is binding without a handwritten signature.`,
    { size: 8.5, color: MUTED, gap: 3 },
  );
}

// ─── Document ───────────────────────────────────────────────────────────────

async function renderDocument(sheet, density) {
  const pdf = await PDFDocument.create();
  const fonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
  };

  const layout = createLayout(pdf, fonts, density);
  const business = sheet.businessName || 'Business';

  pdf.setTitle(clean(`Letter of Intent - ${business}`));
  pdf.setSubject('Letter of Intent (Non-Binding Offer Letter)');
  pdf.setProducer(BRAND_DETAILS.tradingName);
  pdf.setCreator(BRAND_DETAILS.tradingName);

  // Letterhead
  const logo = await embedLogo(pdf);
  const headerTop = layout.y;
  if (logo) {
    const height = 34;
    const width = (logo.width / logo.height) * height;
    layout.page.drawImage(logo, { x: MARGIN, y: headerTop - height, width, height });
  } else {
    layout.page.drawText(BRAND_DETAILS.tradingName.toUpperCase(), {
      x: MARGIN,
      y: headerTop - 22,
      size: 15,
      font: fonts.bold,
      color: INK,
    });
  }

  const contact = [
    BRAND_DETAILS.address,
    BRAND_DETAILS.email,
    BRAND_DETAILS.website,
  ];
  contact.forEach((line, index) => {
    const width = fonts.regular.widthOfTextAtSize(line, 9);
    layout.page.drawText(line, {
      x: PAGE_WIDTH - MARGIN - width,
      y: headerTop - 8 - index * 12,
      size: 9,
      font: fonts.regular,
      color: MUTED,
    });
  });

  layout.y = headerTop - 52;
  layout.rule();

  // Title
  const title = 'Letter of Intent (Non-Binding Offer Letter)';
  const titleWidth = fonts.bold.widthOfTextAtSize(title, 13);
  layout.move(16);
  layout.page.drawText(title, {
    x: (PAGE_WIDTH - titleWidth) / 2,
    y: layout.y,
    size: 13,
    font: fonts.bold,
    color: INK,
  });
  layout.move(10);

  layout.heading('The Business');
  layout.row('Business Name', sheet.businessName);
  layout.row('Business Address', sheet.businessAddress);

  layout.heading('Purchaser Details');
  layout.row('Full Name', sheet.purchaserName);
  layout.row('Email', sheet.purchaserEmail);

  layout.heading('Vendor Details');
  layout.row('Name', sheet.vendorName);
  layout.row('Email', sheet.vendorEmail);

  layout.heading("Vendor's Agent");
  layout.row('Agent', BRAND_DETAILS.legalEntity);
  layout.row('Address', BRAND_DETAILS.address);
  layout.row('Email', BRAND_DETAILS.email);

  layout.heading('Offer');
  layout.row('Purchase price', money(sheet.purchasePrice));
  layout.row('Stock', STOCK_LABELS[sheet.stockTreatment] || '-');
  layout.row('Deposit', money(sheet.depositAmount));
  layout.move(4);
  layout.paragraph(
    `A deposit of ${money(sheet.depositAmount)} to be paid into ${BRAND_DETAILS.trustAccount}.`,
  );
  layout.paragraph(
    `Balance of purchase price: ${money(sheet.balanceAmount)}`,
  );

  layout.heading('Settlement Date');
  layout.paragraph(settlementText(sheet));

  layout.heading('Deposit to be paid by purchaser');
  layout.paragraph(DEPOSIT_TERMS);

  layout.heading('Inclusions');
  layout.bullets(inclusionList(sheet), 'None specified.');

  layout.heading('Subject To');
  layout.bullets(conditionList(sheet), 'No conditions.');

  layout.heading('Assumptions');
  layout.bullets(ASSUMPTIONS);

  layout.heading('Declaration');
  layout.paragraph(DECLARATION);

  await drawExecution(pdf, layout, fonts, 'Executed by the Purchaser', sheet.purchaserExecution);
  await drawExecution(pdf, layout, fonts, 'Accepted by the Vendor', sheet.vendorExecution);

  layout.move(14);
  layout.rule();
  layout.paragraph('DISCLAIMER', { size: 8.5, font: fonts.bold, color: MUTED, gap: 4 });
  layout.paragraph(DISCLAIMER, { size: 8.5, color: MUTED, gap: 3 });

  drawFooters(pdf, fonts);

  const pages = pdf.getPageCount();
  // How much of the final page the letter actually fills. A letter that spills
  // a line or two onto a fresh page is the case worth re-running tighter.
  const usable = PAGE_HEIGHT - MARGIN * 2;
  const lastPageFill = Math.min(1, (PAGE_HEIGHT - MARGIN - layout.y) / usable);

  return { pdf, pages, lastPageFill };
}

// Densities tried in order. 1 is the designed rhythm; the rest tighten the gaps
// between lines and blocks, never the type size.
const DENSITIES = [1, 0.94, 0.88, 0.82];

// A final page holding less than this reads as an accident rather than a page.
const SPILL_FILL = 0.2;

async function buildOfferTermSheetPdf(sheet) {
  let best = await renderDocument(sheet, DENSITIES[0]);

  // Only worth re-rendering when the tail barely reaches the last page; a full
  // page is a genuinely long letter and stays at the designed spacing.
  if (best.pages > 1 && best.lastPageFill < SPILL_FILL) {
    for (const density of DENSITIES.slice(1)) {
      const attempt = await renderDocument(sheet, density);
      if (attempt.pages < best.pages) {
        best = attempt;
        // Stop at the first density that reclaims the page: the loosest fit wins.
        break;
      }
    }
  }

  const bytes = await best.pdf.save();
  return {
    filename: pdfFilename(sheet),
    content: Buffer.from(bytes),
    pages: best.pages,
  };
}

// Drawn last, once the page count is known.
function drawFooters(pdf, fonts) {
  const pages = pdf.getPages();
  pages.forEach((page, index) => {
    page.drawLine({
      start: { x: MARGIN, y: 44 },
      end: { x: PAGE_WIDTH - MARGIN, y: 44 },
      thickness: 0.75,
      color: RULE,
    });
    page.drawText(FOOTER_LEFT, {
      x: MARGIN,
      y: 30,
      size: 8,
      font: fonts.regular,
      color: MUTED,
    });
    const right = `${FOOTER_RIGHT}   |   Page ${index + 1} of ${pages.length}`;
    page.drawText(right, {
      x: PAGE_WIDTH - MARGIN - fonts.regular.widthOfTextAtSize(right, 8),
      y: 30,
      size: 8,
      font: fonts.regular,
      color: MUTED,
    });
  });
}

// Safe for an email header and a filesystem, and recognisable in an inbox.
function pdfFilename(sheet) {
  const slug = clean(sheet?.businessName)
    .replace(/[^A-Za-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return slug ? `Letter-of-Intent-${slug}.pdf` : 'Letter-of-Intent.pdf';
}

// A render failure must never stop a completed letter being emailed; the email
// simply goes without the attachment.
async function buildSafely(sheet) {
  try {
    return await buildOfferTermSheetPdf(sheet);
  } catch (error) {
    console.error('Offer term sheet PDF generation failed:', error);
    return null;
  }
}

module.exports = { buildOfferTermSheetPdf, buildSafely, pdfFilename };
