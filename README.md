# Md Belal Ashraf · Portfolio & CMS

Next.js 14 (App Router) · Keystatic CMS · Tailwind CSS · React Three Fiber · Framer Motion · GSAP.

An engineering portfolio website designed for civil engineering site inspections, QA/QC, rate analysis, and project controls. Features a full non-coder admin panel, seamless 3D structural model viewport, and Google Drive verified credentials.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm run dev
```

- **Public Portfolio**: [http://localhost:3000](http://localhost:3000)
- **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin) (redirects to `/keystatic`)

---

## 🛠️ Content Management & Architecture

All public portfolio content is stored in clean JSON files inside `/content`:

```
content/
├── profile.json            # Name, headline, bio, contact, CV link
├── stats/                  # High-impact metric counters
├── experience/             # DLF, ONGC, MEPF internships & certificates
├── research/               # IIT Delhi bioreactor project & results
├── credentials/            # 8 verified certificates, LORs, & licenses
├── awards/                 # Honors, recommendations & media features
├── skills/                 # Technical skill groups & tool certifications
└── education/              # Degree & institution records
```

- Content is managed via the **Keystatic Admin Panel** at `/admin`.
- Content is read server-side via `lib/content.ts` with Next.js 60-second static regeneration (`revalidate = 60`).
- No public content, sentences, or links are hard-coded in React components.
- For complete non-coder instructions, see [ADMIN_GUIDE.md](./ADMIN_GUIDE.md).

---

## 🔒 Security & Admin Authentication

- In local development (`KEYSTATIC_STORAGE=local`), the admin panel saves directly to disk without authentication.
- In production, set `KEYSTATIC_STORAGE=github` to enable GitHub OAuth login restricted to the repository owner.
- An optional `ADMIN_PASSWORD` can be set in your `.env` for HTTP Basic Auth protection.
- `/admin`, `/keystatic`, and `/api/keystatic` are protected by `middleware.ts` and blocked from search engines via `app/robots.ts` and `X-Robots-Tag: noindex`.

---

## 🚢 Deployment to Vercel

1. Push this repository to GitHub.
2. Import the project in [Vercel](https://vercel.com).
3. Set the environment variables from `.env.example` in your Vercel Project Settings:
   - `KEYSTATIC_STORAGE`: `github`
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER`: Your GitHub username
   - `NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO`: Your repository name
   - `KEYSTATIC_GITHUB_CLIENT_ID`: Your GitHub OAuth App Client ID
   - `KEYSTATIC_GITHUB_CLIENT_SECRET`: Your GitHub OAuth App Client Secret
   - `KEYSTATIC_SECRET`: Random 32-character secret string
4. Deploy! When you click **Save** in `/admin`, changes are committed to GitHub and Vercel redeploys automatically.
