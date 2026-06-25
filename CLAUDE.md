# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository layout

Two **independent** applications, each with its own `package.json` and `node_modules` (there is no root `package.json` — never run npm at the repo root):

- `backend/` — Express + Mongoose REST API (CommonJS, plain JavaScript).
- `frontend/` — Next.js 16 App Router app (TypeScript, React 19, Tailwind v4).

The frontend talks to the backend over HTTP via `NEXT_PUBLIC_API_URL`; they are not otherwise coupled.

## Commands

**Frontend** (`cd frontend`):
- `npm run dev` — Next dev server (port 3000).
- `npm run build` / `npm run start` — production build / serve (start runs on port **3090**).
- `npm run lint` — ESLint (flat config, `eslint.config.mjs`).

**Backend** (`cd backend`):
- `npm run dev` — nodemon (`index.js`), default port **5059** (override with `PORT`).
- `npm start` — `node index.js`.
- No test runner is configured in either app.

## ⚠️ Next.js version caveat

`frontend/AGENTS.md` (loaded via `frontend/CLAUDE.md`) warns: **this Next.js has breaking changes vs. training data.** Before writing frontend framework code, read the relevant guide in `frontend/node_modules/next/dist/docs/` and heed deprecation notices. Don't assume APIs/conventions match older Next.js.

## Core domain: the Information Memorandum (IM) access workflow

This is the heart of the app — a confidential, multi-step gate controlling who can view a business's sale documents. Understanding it requires reading across several files:

1. **NDA submission** — A buyer signs the confidentiality agreement (`frontend/app/(public)/listings/[id]/nda/` → `POST /api/confidentiality`, `backend/routes/confidentiality.js`). This saves an `Enquiry`, generates a branded PDF (`pdf-lib` + `utils/caPdfBranding.js`), and emails the broker an **Approve/Reject pair of signed-JWT links**. The broker email is awaited (critical path); the client confirmation email + Nexar CRM sync run after the response (fire-and-forget).
2. **Broker decision** — `GET /api/confidentiality/approve|reject?token=…` verifies the JWT, flips `Enquiry.ndaStatus`, and on approval stamps `imSharedAt` and emails the buyer a tokenized IM link.
3. **IM viewing** — `GET /api/listings/:id/im?token=…` (`backend/routes/listings.js`). The token encodes either an admin role (ungated preview) or an `enquiryId`. Access is denied if rejected, `imRevoked`, or **older than 30 days** (auto-expiry). A listing serves IM content one of two ways: uploaded **PDF documents**, or a **web IM template** (`Listing.imTemplateId` → `ImTemplate`), in which case the viewer is redirected to an email-gated template page under `frontend/app/(viewer)/`.
4. **Follow-up** — `utils/imFollowUpScheduler.js` runs an in-process `setInterval` (started on Mongo connect in `index.js`) that, ~7 days after `imSharedAt`, emails a follow-up to approved, non-revoked enquiries. Idempotent via `Enquiry.imFollowUpSentAt`.

View/access tracking flows through `ImViewLog` / `AccessEvent` (`utils/recordImView.js`).

## Backend conventions

- **Routing**: each file in `backend/routes/` is mounted in `index.js` under `/api/<name>`. Route handlers contain the business logic directly (no separate controller/service layer).
- **Auth — two separate JWT systems**:
  - Staff/admin: `middleware/auth.middleware.js` (`authMiddleware`) verifies `decoded.userId` against the `User` model. Some routes also inline-verify tokens for role checks (e.g. `confidentiality.js` `adminAuth`).
  - Vendors (business sellers viewing their own deal's analytics): `middleware/vendorAuth.middleware.js`, used by `routes/vendor.js`.
- **Email**: always send via `utils/mailer.js` `sendMail(msg)`. It accepts **SendGrid-style** objects (`{ to, from, subject, text, html, attachments }`, attachments base64) but sends through **Nodemailer/SMTP** — it converts the shapes for you. `from` defaults to `SENDGRID_FROM`.
- **File uploads**: `multer`. Use `memoryStorage` when the file is only emailed as an attachment (see the deposit-screenshot uploads in `confidentiality.js` / `imTemplates.js`); use `diskStorage` into `backend/uploads/**` when it must be served later (`/uploads` is statically served).
- **External CRM**: prospects are pushed to the Nexar API (`NEXAR_API_URL`, bearer `businessbrokersecret`).

## Frontend conventions

- **Route groups = audiences**, each with its own `layout.tsx` and auth context:
  - `app/(public)/` — marketing site + public listings/NDA forms.
  - `app/(admin)/` — staff portal, wrapped in `AdminAuthProvider` (`frontend/context/admin-auth-context.tsx`), `noindex`.
  - `app/(viewer)/` — email-gated IM template / PDF viewer for approved buyers.
  - `app/(vendor)/` — vendor portal, wrapped in `VendorAuthProvider`.
- **API calls**: use the shared `apiClient` (axios) from `frontend/lib/api.ts`; base URL is `NEXT_PUBLIC_API_URL`. For multipart, pass a `FormData` and set `headers: { 'Content-Type': 'multipart/form-data' }`.
- **Path alias**: `@/*` → `frontend/*` (see `tsconfig.json`).
- **UI**: shadcn-style primitives in `components/ui/` (config in `components.json`), Tailwind v4 (`app/(public)/globals.css`), Inter as `--font-sans`, `lucide-react` icons, `sonner` for toasts. Rich text uses TipTap; PDFs use `@react-pdf/renderer` / `react-pdf`.
- **Listings reuse one detail template** (`app/(public)/listings/[id]/page.tsx`). A synthetic **pinned listing** (`frontend/data/pinned-listing.ts`, id `exclusive-5m-acquisition-opportunities`) is short-circuited before the API fetch and rendered with a special acquisition-interest layout — handle this id explicitly in any listing-detail logic.

## Environment

- **Backend `.env`**: `MONGODB_URI`, `JWT_SECRET`, `EMAIL_HOST/EMAIL_PORT/EMAIL_USER/EMAIL_PASS`, `SENDGRID_FROM`, `BACKEND_URL`, `FRONTEND_URL`, `NEXAR_API_URL`, `PORT`.
- **Frontend `.env.local`**: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`.
- **Port mismatch gotcha**: the backend defaults to `5059`, but `lib/api.ts` and several backend `*_URL` defaults fall back to `localhost:5005`. Set `NEXT_PUBLIC_API_URL` / `BACKEND_URL` explicitly rather than relying on defaults. CORS origins are an allow-list hardcoded in `backend/index.js` — add new frontend origins there.
