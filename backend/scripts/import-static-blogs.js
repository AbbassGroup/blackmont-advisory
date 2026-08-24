/**
 * One-off import: move the 13 hard-coded articles in
 * `frontend/data/blog-data.ts` into the blogs collection via the API.
 *
 * The static articles store their body as a tree of {paragraph, section, list}
 * nodes rendered by `frontend/app/(public)/resources/[slug]/page.tsx`. The
 * blogs API stores HTML, so each node is converted to the tag the page already
 * renders it as — and to a tag the admin editor understands, so imported
 * articles stay editable:
 *
 *   section   -> <h2>title</h2> + its children
 *   paragraph -> <p>text</p>   (bold when the node carried sx.fontWeight)
 *   list      -> <ul><li>item</li>...</ul>
 *
 * Cover images come along too: local ones are read from frontend/public, remote
 * ones are downloaded, and both are posted to the API so every imported article
 * ends up self-hosted under /uploads/blogs/.
 *
 * Re-running is safe — an article whose slug already exists is skipped, never
 * overwritten.
 *
 * Usage (from the backend/ folder):
 *   node scripts/import-static-blogs.js --dry     # convert + preview, no writes
 *   node scripts/import-static-blogs.js           # import
 *
 * Environment:
 *   API_URL      base URL of the API   (default http://localhost:5059)
 *   ADMIN_TOKEN  a staff/admin JWT — the same Bearer token the admin portal
 *                uses; required because create is behind authMiddleware.
 *                Grab it from the admin tab: localStorage.getItem('adminToken')
 */

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry');
const API_URL = (process.env.API_URL || 'http://localhost:5059').replace(/\/$/, '');
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

const FRONTEND = path.join(__dirname, '../../frontend');
const DATA_FILE = path.join(FRONTEND, 'data/blog-data.ts');
const PUBLIC_DIR = path.join(FRONTEND, 'public');
const PREVIEW_DIR = path.join(__dirname, 'blog-import-preview');

/**
 * Categories aren't in the static data — it never had the field — so they're
 * assigned here by topic. Adjust before running if you'd rather group them
 * differently; this is the only editorial choice the import makes.
 *
 * Kebab-case matches the category already in the database (business-strategy).
 */
const CATEGORIES = {
  'guide-to-selling-business': 'selling-a-business',
  'guide-to-buying-business': 'buying-a-business',
  'how-to-finance-business': 'business-finance',
  'checklist-for-buying-business': 'buying-a-business',
  'complete-guide-to-selling-small-businesses-in-australia': 'selling-a-business',
  'how-to-create-a-bulletproof-business-exit-strategy': 'exit-planning',
  'why-using-a-business-broker-can-maximise-your-sale-price': 'selling-a-business',
  'step-by-step-business-sale-process-for-small-business-owners': 'selling-a-business',
  'buy-business-australia-guide': 'buying-a-business',
  'common-mistakes-buying-business': 'buying-a-business',
  'mistakes-business-purchase-australia': 'buying-a-business',
  'find-business-australia': 'buying-a-business',
  'ultimate-due-diligence-guide': 'due-diligence',
};

const MIME_BY_EXT = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
};

// ─── Conversion ───────────────────────────────────────────────────────────────

/**
 * The data file is plain object literals with no TypeScript syntax, so the
 * export wrappers can simply be traded for a `return` and evaluated. This
 * avoids pulling a TS toolchain into the backend just to read one array.
 */
function parseStaticBlogs() {
  const source = fs
    .readFileSync(DATA_FILE, 'utf8')
    .replace(/^export const blogs\s*=/, 'return')
    .replace(/export default blogs;?\s*$/, '');

  return new Function(source)();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function nodesToHtml(nodes) {
  if (!Array.isArray(nodes)) return '';

  return nodes
    .map((node) => {
      switch (node.type) {
        case 'section': {
          const heading = node.title ? `<h2>${escapeHtml(node.title)}</h2>` : '';
          return heading + nodesToHtml(node.content);
        }
        case 'paragraph': {
          const text = escapeHtml(node.text);
          // The public renderer bolds paragraphs carrying a fontWeight.
          return node.sx?.fontWeight ? `<p><strong>${text}</strong></p>` : `<p>${text}</p>`;
        }
        case 'list': {
          const items = (node.items || [])
            .map((item) => `<li>${escapeHtml(item)}</li>`)
            .join('');
          return items ? `<ul>${items}</ul>` : '';
        }
        default:
          // Nothing else exists in the data today; shout rather than drop it.
          console.warn(`  ! skipped unknown node type: ${node.type}`);
          return '';
      }
    })
    .join('');
}

/**
 * The summary doubles as the article's lead-in and is a truncated copy of the
 * first paragraph, so it maps to metaDescription.
 *
 * Some summaries were cut mid-sentence with a trailing "..." — fine as a teaser
 * on a card, wrong in a <meta> tag — so those are rolled back to the last
 * complete sentence instead of just losing the ellipsis.
 */
function toMetaDescription(summary) {
  const raw = String(summary || '').trim();
  const wasTruncated = /(\.{3,}|…)$/.test(raw);

  let text = raw.replace(/\s*(\.{3,}|…)$/, '').trim();

  if (wasTruncated) {
    const lastStop = Math.max(
      text.lastIndexOf('. '),
      text.lastIndexOf('! '),
      text.lastIndexOf('? '),
    );
    // Only roll back if a usable sentence survives the cut.
    if (lastStop > 60) text = text.slice(0, lastStop + 1);
  }

  return text;
}

function convert(blog) {
  return {
    title: blog.title,
    url: blog.link,
    category: CATEGORIES[blog.link] || '',
    metaDescription: toMetaDescription(blog.summary),
    content: nodesToHtml(blog.content),
    imageRef: blog.image,
  };
}

// ─── Images ───────────────────────────────────────────────────────────────────

async function loadImage(ref) {
  if (!ref) return null;

  if (/^https?:\/\//i.test(ref)) {
    // Pexels serves the full-resolution original by default (several MB for a
    // cover image). Ask for a web-sized render instead.
    const source = /images\.pexels\.com/i.test(ref) && !ref.includes('?')
      ? `${ref}?auto=compress&cs=tinysrgb&w=1600`
      : ref;

    const response = await fetch(source);
    if (!response.ok) {
      throw new Error(`image download failed (${response.status}) for ${source}`);
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    const type = response.headers.get('content-type') || 'image/jpeg';
    const ext = type.includes('png') ? '.png' : type.includes('webp') ? '.webp' : '.jpg';
    return { buffer, filename: path.basename(new URL(ref).pathname) + ext, mime: type };
  }

  const filePath = path.join(PUBLIC_DIR, ref.replace(/^\//, ''));
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  return {
    buffer,
    filename: path.basename(filePath),
    mime: MIME_BY_EXT[ext] || 'application/octet-stream',
  };
}

// ─── API ──────────────────────────────────────────────────────────────────────

function authHeaders() {
  return { Authorization: `Bearer ${ADMIN_TOKEN}` };
}

async function fetchExistingSlugs() {
  const slugs = new Set();

  for (let page = 1; ; page += 1) {
    const response = await fetch(`${API_URL}/api/blogs?page=${page}&limit=100`);
    if (!response.ok) {
      throw new Error(`could not list existing blogs (${response.status})`);
    }

    const body = await response.json();
    for (const blog of body.data || []) {
      if (blog.url) slugs.add(blog.url);
    }

    if (!body.pagination?.hasNextPage) break;
  }

  return slugs;
}

async function createBlog(blog, image) {
  const form = new FormData();
  form.append('title', blog.title);
  form.append('content', blog.content);
  form.append('url', blog.url);
  form.append('category', blog.category);
  form.append('metaDescription', blog.metaDescription);

  if (image) {
    form.append('image', new Blob([image.buffer], { type: image.mime }), image.filename);
  }

  const response = await fetch(`${API_URL}/api/blogs`, {
    method: 'POST',
    headers: authHeaders(),
    body: form,
  });

  const body = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(body.message || `create failed (${response.status})`);
  }
  return body.data;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const staticBlogs = parseStaticBlogs();
  const converted = staticBlogs.map(convert);

  console.log(`Parsed ${converted.length} static articles from blog-data.ts`);
  console.log(`Target: ${API_URL}${DRY_RUN ? '  (dry run — nothing will be written)' : ''}\n`);

  if (DRY_RUN) {
    fs.mkdirSync(PREVIEW_DIR, { recursive: true });

    for (const blog of converted) {
      const image = await loadImage(blog.imageRef).catch((error) => {
        console.warn(`  ! ${blog.url}: ${error.message}`);
        return null;
      });

      fs.writeFileSync(
        path.join(PREVIEW_DIR, `${blog.url}.html`),
        `<!-- category: ${blog.category} -->\n` +
          `<!-- metaDescription: ${blog.metaDescription} -->\n` +
          `<!-- image: ${blog.imageRef} (${image ? `${(image.buffer.length / 1024).toFixed(0)}KB` : 'UNRESOLVED'}) -->\n` +
          `<h1>${escapeHtml(blog.title)}</h1>\n${blog.content}\n`,
      );

      const headings = (blog.content.match(/<h2>/g) || []).length;
      const paras = (blog.content.match(/<p>/g) || []).length;
      const lists = (blog.content.match(/<ul>/g) || []).length;
      console.log(
        `  ${blog.url.padEnd(56)} ${String(headings).padStart(2)}h2 ` +
          `${String(paras).padStart(3)}p ${String(lists).padStart(2)}ul  ` +
          `${blog.category}`,
      );
    }

    console.log(`\nPreview HTML written to ${PREVIEW_DIR}`);
    return;
  }

  if (!ADMIN_TOKEN) {
    console.error('ADMIN_TOKEN is required to write. Re-run with --dry to preview instead.');
    process.exit(1);
  }

  const existing = await fetchExistingSlugs();
  console.log(`${existing.size} article(s) already in the database\n`);

  let created = 0;
  let skipped = 0;
  let failed = 0;

  for (const blog of converted) {
    if (existing.has(blog.url)) {
      console.log(`  skip    ${blog.url} — already exists`);
      skipped += 1;
      continue;
    }

    try {
      const image = await loadImage(blog.imageRef);
      const saved = await createBlog(blog, image);
      console.log(`  created ${blog.url} -> ${saved._id}`);
      created += 1;
    } catch (error) {
      console.error(`  FAILED  ${blog.url}: ${error.message}`);
      failed += 1;
    }
  }

  console.log(`\nDone. created: ${created}, skipped: ${skipped}, failed: ${failed}`);
  if (failed) process.exitCode = 1;
}

main().catch((error) => {
  console.error('Import failed:', error);
  process.exit(1);
});
