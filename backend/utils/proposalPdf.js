/**
 * Server-side PDF rendering for Digital Proposals.
 *
 * The browser's own "Save as PDF" produces something that reads as a printed
 * web page: no running header, whatever margins the dialog defaults to, and the
 * browser's URL/date furniture across the top. This renders the document with
 * headless Chrome instead, so the output is a designed document — full-bleed
 * cover, a running header on every content page, consistent margins, one
 * section per page.
 *
 * It is produced in two passes because Chrome applies one header template to
 * every page: the cover is rendered edge-to-edge with no header, the body with
 * the header and margins, and the two are stitched together with pdf-lib.
 */

const puppeteer = require('puppeteer');
const { PDFDocument } = require('pdf-lib');

/** A4 at 96dpi — the sheet the cover bleeds across. */
const A4 = { width: 794, height: 1123 };

/** Content-page margins. The top has to clear the running header *and* leave
 *  daylight under its rule — a full-bleed section like Contact otherwise runs
 *  straight into it. */
const BODY_MARGIN_MM = { top: 30, bottom: 16, left: 14, right: 14 };
const BODY_MARGIN = Object.fromEntries(
  Object.entries(BODY_MARGIN_MM).map(([k, v]) => [k, `${v}mm`]),
);

/**
 * Body pages are laid out at the printable width, not the full sheet.
 * Anything that measures its own container — Recharts, most obviously — would
 * otherwise size itself to 210mm and get clipped by the margins.
 */
const MM_TO_PX = 96 / 25.4;
const BODY_VIEWPORT = {
  width: Math.round(A4.width - (BODY_MARGIN_MM.left + BODY_MARGIN_MM.right) * MM_TO_PX),
  height: Math.round(A4.height - (BODY_MARGIN_MM.top + BODY_MARGIN_MM.bottom) * MM_TO_PX),
};

const READY_SELECTOR = '[data-pdf-ready="true"]';
const READY_TIMEOUT = 45000;

let browserPromise = null;

/**
 * One Chrome instance for the process, launched on first use. Re-launched if it
 * dies, so a crashed browser doesn't wedge every later request.
 */
function getBrowser() {
  if (!browserPromise) {
    browserPromise = puppeteer
      .launch({
        headless: true,
        // Containers and most VPS images can't use Chrome's sandbox.
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
      })
      .then((browser) => {
        browser.on('disconnected', () => {
          browserPromise = null;
        });
        return browser;
      })
      .catch((error) => {
        browserPromise = null;
        throw error;
      });
  }
  return browserPromise;
}

/** Render one pass of the document and return its PDF bytes. */
async function renderPart(url, { viewport = A4, ...pdfOptions } = {}) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    // Text is vector regardless; this only governs raster assets. 1.5 keeps
    // photos and screenshots sharp without doubling the file size — these get
    // emailed to clients.
    await page.setViewport({ ...viewport, deviceScaleFactor: 1.5 });
    // Explicit, so the document's `print:` styles apply during layout too.
    await page.emulateMediaType('print');
    await page.goto(url, { waitUntil: 'networkidle0', timeout: READY_TIMEOUT });
    // The page sets this once its data has loaded and its images have decoded.
    await page.waitForSelector(READY_SELECTOR, { timeout: READY_TIMEOUT });
    return await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      ...pdfOptions,
    });
  } finally {
    await page.close().catch(() => {});
  }
}

/** Running header: wordmark left, document title right, hairline beneath. */
function headerTemplate(logoDataUri, title) {
  const mark = logoDataUri
    ? `<img src="${logoDataUri}" style="height:30px;width:auto;display:block" />`
    : `<span style="font-size:14px;font-weight:700;letter-spacing:.08em;color:#16233b">BLACKMONT ADVISORY</span>`;
  return `
    <div style="width:100%;font-family:Helvetica,Arial,sans-serif;color:#16233b;
                padding:0 14mm;margin-top:7mm;">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;
                  padding-bottom:5px;border-bottom:.8px solid #c9a84c;">
        ${mark}
        <span style="font-size:10px;text-transform:uppercase;letter-spacing:.18em;
                     color:#4b5563;line-height:1;">${escapeHtml(title)}</span>
      </div>
    </div>`;
}

/** Footer: page number only, kept quiet. */
function footerTemplate() {
  return `
    <div style="width:100%;font-family:Helvetica,Arial,sans-serif;font-size:7px;color:#9aa1ac;
                padding:0 14mm;margin-bottom:7mm;text-align:right;font-size:8px;">
      <span class="pageNumber"></span>
    </div>`;
}

const escapeHtml = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The wordmark, fetched once from the frontend and inlined into the header. */
let logoPromise = null;
function getLogo(frontendUrl) {
  if (!logoPromise) {
    logoPromise = fetch(`${frontendUrl}/assets/blackmont.png`)
      .then((r) => (r.ok ? r.arrayBuffer() : null))
      .then((buf) => (buf ? `data:image/png;base64,${Buffer.from(buf).toString('base64')}` : null))
      .catch(() => null);
  }
  return logoPromise;
}

/**
 * Render a proposal to PDF.
 *
 * @param {object}  opts
 * @param {string}  opts.id            proposal id
 * @param {string}  opts.token         short-lived render token the page uses to fetch its data
 * @param {string}  opts.frontendUrl   origin serving the render route
 * @param {string}  opts.title         shown on the right of the running header
 * @returns {Promise<Buffer>}
 */
async function renderProposalPdf({ id, token, frontendUrl, title = 'Business Appraisal' }) {
  const base = `${frontendUrl.replace(/\/$/, '')}/proposal-pdf/${id}?token=${encodeURIComponent(token)}`;
  const logo = await getLogo(frontendUrl.replace(/\/$/, ''));

  const [cover, body] = await Promise.all([
    renderPart(`${base}&part=cover`, {
      margin: { top: '0', bottom: '0', left: '0', right: '0' },
      displayHeaderFooter: false,
    }),
    renderPart(`${base}&part=body`, {
      viewport: BODY_VIEWPORT,
      margin: BODY_MARGIN,
      displayHeaderFooter: true,
      headerTemplate: headerTemplate(logo, title),
      footerTemplate: footerTemplate(),
    }),
  ]);

  // Stitch the two passes into one document.
  const out = await PDFDocument.create();
  for (const bytes of [cover, body]) {
    const src = await PDFDocument.load(bytes);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
  }
  return Buffer.from(await out.save());
}

/** Close the shared browser — called on shutdown. */
async function closePdfBrowser() {
  if (!browserPromise) return;
  const browser = await browserPromise.catch(() => null);
  browserPromise = null;
  if (browser) await browser.close().catch(() => {});
}

module.exports = { renderProposalPdf, closePdfBrowser };
