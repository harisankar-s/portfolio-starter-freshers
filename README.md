# Portfolio Starter for Freshers

A clean, one-page portfolio website for students and freshers. Clone it, fill in your details, add your résumé, and you have a site to put on your résumé, your LinkedIn and your job applications. Setup takes about 15 minutes, and hosting is free.

You don't need to know HTML. All of your content goes in **one file**, `src/_data/profile.json`.

**What's on the page**

Hero with your photo and a résumé button → quick stats (CGPA, projects…) → About → Education → **Projects** (with GitHub and live demo links) → Internships → Skills → Certifications → Achievements → Contact.

- A blue theme (or any colour you choose), with light and dark mode
- Looks good on phones
- Any section you leave empty is hidden automatically
- Basic SEO built in: share previews, `sitemap.xml`, `robots.txt` and a 404 page

---

## Step 1: Get it running on your computer

Install [Node.js](https://nodejs.org/) (version 18 or newer), then run:

```bash
git clone <this-repo-url> my-portfolio
```

```bash
cd my-portfolio
```

```bash
npm install
```

```bash
npm start
```

Open <http://localhost:8080> in your browser. The page updates every time you save a file.

## Step 2: Add your details

### Quick start: the setup wizard

```bash
npm run setup
```

The wizard asks for your name, headline, location, a short intro, email, site URL, and LinkedIn, GitHub and LeetCode links. Press Enter to keep a value, or type `-` to remove it.

### Then fill in `src/_data/profile.json`

Open it in any editor (VS Code works well) and replace the sample details with yours:

| Section | What to put there |
| --- | --- |
| `stats` | 3–4 quick numbers: CGPA, projects built, internships, problems solved |
| `about` | 1–2 short paragraphs about you |
| `interests` | Areas you want to work in (shown as tags) |
| `education` | Degree, college, years, CGPA or %, and optional coursework |
| `projects` | **The most important section.** What it does, what you did, the tech used, and GitHub/demo links |
| `internships` | Role, company, dates and what you worked on |
| `skills` | Grouped lists, e.g. Languages, Web, Tools |
| `certifications` | Name, issuer, year and a link to the certificate |
| `achievements` | Hackathons, coding contests, awards, clubs |
| `contact` | Your email and résumé path |

**No internships yet?** Set `"internships": []` and that section disappears. The same works for every other list.

**Tips for the projects section**

- Put your best project first.
- Write results, not just tasks: "Used by 300+ students" beats "Made a website".
- Add a screenshot: put an image in `src/images/projects/` and set `"image": "/images/projects/campus-connect.png"`.
- Make sure every GitHub repo you link has a README.

### Your photo

Put a square photo (400×400 or larger) at `src/images/profile/me.jpg` and set `"photo": "/images/profile/me.jpg"`. To show no photo, set it to `""`.

### Your résumé

Export your résumé as a PDF and save it as `src/files/resume.pdf`, replacing the placeholder. Both "Download résumé" buttons link to it. To hide the buttons, set `"resume": ""`.

### Links and colours (`src/_data/site.json`)

- **`social`**: fill in the `url` of each icon you want and leave the rest empty. The available icons are `linkedin`, `github`, `code` (LeetCode/HackerRank/CodeChef), `x`, `medium`, `youtube`, `email` (use `mailto:you@example.com`) and `website`.
- **`accentColor`**: blue (`#2563EB`) by default. Other good options are `#0D9488` (teal), `#7C3AED` (purple) and `#DC2626` (red). For a light colour such as yellow, also set `"accentTextColor": "#111827"` so button text stays readable.
- **`nav`**: the links in the top bar.
- **`url`**: your final website address (see step 3).

**Logos (optional):** you can give any college, company or certification a logo with `"logo": "/images/logos/name.png"`. Put the file in `src/images/logos/`. Without a logo, the item's initials are shown instead.

## Step 3: Put it online for free

1. Create a GitHub account if you don't have one. Then create a new repository and push this folder to it.
2. Sign in to [Netlify](https://www.netlify.com/) with GitHub and choose **Add new site → Import an existing project**, then pick your repository.
3. Click **Deploy**. The settings are read from `netlify.toml`. You'll get an address like `your-name.netlify.app`, which you can rename under Site settings.
4. Copy that address into `url` in `site.json` and push again.

From then on, every `git push` updates your live site automatically.

**Other free hosts:** on Vercel, set the build command to `npm run build` and the output directory to `_site`. On GitHub Pages, use a GitHub Actions workflow that runs `npm ci && npm run build` and publishes `_site/`.

**Your own domain:** buy one (for example `yourname.dev`) and add it under Netlify → Domain management.

## Before you share it

- [ ] Every "Priya Sharma" / sample value is replaced (search the `src` folder for "your-handle" and "example.com")
- [ ] The résumé PDF is yours and opens correctly
- [ ] All GitHub and demo links work
- [ ] You checked the site on your phone
- [ ] `url` in `site.json` is your live address

---

## Project layout

```
src/
├── _data/
│   ├── profile.json    ← YOUR CONTENT (edit this)
│   └── site.json       ← title, colour, nav, social links
├── files/resume.pdf    ← your résumé
├── images/             ← photo, favicon, logos, project screenshots
├── index.njk           ← the page itself (section order lives here)
├── _includes/
│   ├── base.njk        ← <head>, nav, footer
│   ├── page.njk        ← layout for any extra page
│   └── partials/       ← nav, footer, social icons, logo tile
├── assets/css/style.css
├── assets/js/theme.js  ← light/dark toggle
└── 404.njk, sitemap.njk, robots.njk
scripts/setup.js        ← the setup wizard
```

## Going further

- **Reorder sections:** move the `<section>` blocks in `src/index.njk`. For example, put Projects above Education.
- **Add a page:** create `src/certificates.md` with `layout: page.njk` and `title: Certificates` in the front matter, write Markdown below it, and add `/certificates/` to `nav`.
- **Change the font:** swap the Google Fonts link in `base.njk` and update `--font` at the top of `style.css`.
- **Add analytics:** put the snippet in `base.njk` and add its domain to the Content-Security-Policy in `netlify.toml`.

Built with [Eleventy](https://www.11ty.dev/). MIT licensed: use it, change it, and no credit is needed.
