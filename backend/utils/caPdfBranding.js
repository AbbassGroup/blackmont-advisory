const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb } = require('pdf-lib');

const REF_W = 595.280029;
const REF_H = 841.890015;
const HEADER_H = 82;
const FOOTER_LOGO_TOP = 783.898;
const FOOTER_LOGO_BOTTOM = 813.882;
const FOOTER_LOGO_LEFT = 282.640;
const FOOTER_LOGO_RIGHT = 312.640;
const FOOTER_CLEAR_H = 95;

const headerPath = path.resolve(__dirname, '../assets/ca-header.png');
const footerLogoPath = path.resolve(__dirname, '../assets/ca-footer-logo.png');

let headerBytes;
let footerLogoBytes;

function scale(value, pageW) {
  return value * (pageW / REF_W);
}

function loadBrandingAssets() {
  if (!headerBytes) headerBytes = fs.readFileSync(headerPath);
  if (!footerLogoBytes) footerLogoBytes = fs.readFileSync(footerLogoPath);
}

/**
 * Stamp CA1-style header/footer onto a pdf-lib page (used for dynamically added pages).
 */
async function stampCaBranding(pdfDoc, page) {
  loadBrandingAssets();
  const { width, height } = page.getSize();
  const headerH = scale(HEADER_H, width);
  const logoW = scale(FOOTER_LOGO_RIGHT - FOOTER_LOGO_LEFT, width);
  const logoH = scale(FOOTER_LOGO_BOTTOM - FOOTER_LOGO_TOP, width);
  const marginB = scale(REF_H - FOOTER_LOGO_BOTTOM, width);
  const footerClear = scale(FOOTER_CLEAR_H, width);
  const footerH = footerClear;

  const headerImg = await pdfDoc.embedPng(headerBytes);
  const footerLogoImg = await pdfDoc.embedPng(footerLogoBytes);

  page.drawRectangle({
    x: 0,
    y: height - headerH,
    width,
    height: headerH,
    color: rgb(1, 1, 1),
  });
  page.drawImage(headerImg, {
    x: 0,
    y: height - headerH,
    width,
    height: headerH,
  });

  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height: footerH,
    color: rgb(1, 1, 1),
  });
  page.drawImage(footerLogoImg, {
    x: (width - logoW) / 2,
    y: marginB,
    width: logoW,
    height: logoH,
  });

  return { headerH, footerH };
}

module.exports = {
  stampCaBranding,
  HEADER_H,
  REF_W,
};
