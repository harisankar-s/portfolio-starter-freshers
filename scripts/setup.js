#!/usr/bin/env node
// First-run wizard: npm run setup
//
// Asks for your basic details and writes them into src/_data/site.json and
// src/_data/profile.json. Press Enter to keep the current value shown in [brackets].
// Everything else (education, projects, skills, ...) you edit directly in profile.json.

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const DATA = path.join(__dirname, "..", "src", "_data");
const SITE = path.join(DATA, "site.json");
const PROFILE = path.join(DATA, "profile.json");

const read = (f) => JSON.parse(fs.readFileSync(f, "utf8"));
const write = (f, obj) => fs.writeFileSync(f, JSON.stringify(obj, null, 2) + "\n");

async function main() {
  const site = read(SITE);
  const profile = read(PROFILE);
  // Line queue instead of rl.question(), so answers typed (or piped) ahead aren't lost
  const rl = readline.createInterface({ input: process.stdin });
  const queued = [];
  let waiting = null;
  let closed = false;
  rl.on("line", (line) => (waiting ? (waiting(line), (waiting = null)) : queued.push(line)));
  rl.on("close", () => { closed = true; if (waiting) waiting(""); });
  const nextLine = () =>
    queued.length ? Promise.resolve(queued.shift()) : closed ? Promise.resolve("") : new Promise((r) => (waiting = r));

  async function ask(label, current) {
    process.stdout.write(`${label}${current ? ` [${current}]` : ""}: `);
    const answer = (await nextLine()).trim();
    if (!process.stdin.isTTY) process.stdout.write("\n");
    if (answer === "-") return ""; // "-" clears a value
    return answer || current || "";
  }

  const social = (icon) => site.social.find((s) => s.icon === icon) || {};

  console.log("\nLet's personalise your site. Press Enter to keep the value in [brackets], or type - to clear it.\n");

  const name = await ask("Full name", profile.name);
  const firstName = await ask("First name (used in 'Hi, I'm ...')", name === profile.name ? profile.firstName : name.split(" ")[0]);
  const headline = await ask("Headline (e.g. Computer Science Graduate · Aspiring Software Engineer)", profile.headline);
  const location = await ask("Location", profile.location);
  const intro = await ask("One or two sentences about you for the top of the page", profile.intro);
  const email = await ask("Contact email", profile.contact.email);
  const url = await ask("Site URL (where it will be hosted, e.g. https://yourname.netlify.app)", site.url);
  const linkedin = await ask("LinkedIn URL (- to hide)", social("linkedin").url);
  const github = await ask("GitHub URL (- to hide)", social("github").url);
  const coding = await ask("LeetCode / HackerRank profile URL (- to hide)", social("code").url);
  let accent = await ask("Accent colour (hex)", site.accentColor);
  rl.close();

  if (!/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(accent)) {
    console.warn(`  "${accent}" isn't a hex colour like #F59E0B, keeping ${site.accentColor}.`);
    accent = site.accentColor;
  }

  Object.assign(profile, { name, firstName, headline, location, intro });
  profile.contact.email = email;

  site.title = name;
  site.description = `${name} — ${headline}. Projects, skills and résumé.`;
  site.url = url.replace(/\/+$/, "");
  site.accentColor = accent;
  if (social("linkedin").icon) social("linkedin").url = linkedin;
  if (social("github").icon) social("github").url = github;
  if (social("code").icon) social("code").url = coding;
  if (social("email").icon) social("email").url = email ? `mailto:${email}` : "";

  write(SITE, site);
  write(PROFILE, profile);

  console.log("\nSaved src/_data/site.json and src/_data/profile.json.");
  console.log("Next: add your education, projects and skills in src/_data/profile.json,");
  console.log("put your résumé at src/files/resume.pdf, then run npm start.\n");
}

main();
