import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildReadme, listLanguages } from "../builder.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, "../../output");
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

const router = Router();

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/languages
// Returns the list of all supported language codes and display names.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/languages", (_req, res) => {
  res.json({ languages: listLanguages() });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/readme/generate
// Generate a README in the requested language and return it as JSON.
//
// Body (JSON):
//   lang            {string}   required  Language code, e.g. "en", "fr", "hi"
//   name            {string}   required  Project name
//   description     {string}   optional  Short project description
//   repoUrl         {string}   optional  GitHub / GitLab URL
//   features        {string[]} optional  List of feature strings (or comma-sep string)
//   techStack       {string[]} optional  Technologies used
//   installCommand  {string}   optional  Custom install command
//   usageExample    {string}   optional  Code snippet for usage section
//   license         {string}   optional  License name, default "MIT"
//   includeBadges   {boolean}  optional  Include shields.io badges (default true)
//   includeToc      {boolean}  optional  Include table of contents (default true)
// ─────────────────────────────────────────────────────────────────────────────
router.post("/readme/generate", (req, res) => {
  const { lang, name, ...rest } = req.body || {};

  if (!lang) {
    return res.status(400).json({
      error: "Missing required field: lang",
      hint: "Send ?lang=en or include { lang: 'en' } in the request body.",
    });
  }
  if (!name) {
    return res.status(400).json({
      error: "Missing required field: name",
      hint: "Include { name: 'My Project' } in the request body.",
    });
  }

  try {
    const { markdown, language } = buildReadme(lang, { name, ...rest });
    return res.json({
      success: true,
      language,
      filename: `README.${lang}.md`,
      characters: markdown.length,
      lines: markdown.split("\n").length,
      markdown,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/readme/generate/:lang
// Convenience GET endpoint — returns raw Markdown (text/plain).
// Query params mirror the POST body fields.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/readme/generate/:lang", (req, res) => {
  const { lang } = req.params;
  const { name, ...rest } = req.query;

  if (!name) {
    return res
      .status(400)
      .type("text")
      .send("Missing required query parameter: name");
  }

  try {
    const { markdown } = buildReadme(lang, {
      name,
      includeBadges: rest.includeBadges !== "false",
      includeToc: rest.includeToc !== "false",
      ...rest,
    });
    res.type("text/plain; charset=utf-8").send(markdown);
  } catch (err) {
    res.status(400).type("text").send(err.message);
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/readme/save
// Generate a README and persist it to disk inside /output.
//
// Body: same as POST /api/readme/generate
// ─────────────────────────────────────────────────────────────────────────────
router.post("/readme/save", (req, res) => {
  const { lang, name, ...rest } = req.body || {};

  if (!lang || !name) {
    return res.status(400).json({
      error: "Missing required fields: lang, name",
    });
  }

  try {
    const { markdown, language } = buildReadme(lang, { name, ...rest });
    const filename = `README.${lang}.md`;
    const filepath = path.join(OUTPUT_DIR, filename);
    fs.writeFileSync(filepath, markdown, "utf8");

    return res.json({
      success: true,
      language,
      filename,
      filepath,
      characters: markdown.length,
      lines: markdown.split("\n").length,
      markdown,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/readme/bulk
// Generate READMEs for multiple languages at once.
//
// Body:
//   langs           {string[]}  required  Array of language codes, e.g. ["en","fr","de"]
//   name            {string}    required  Project name
//   (all other generate fields are shared across all languages)
// ─────────────────────────────────────────────────────────────────────────────
router.post("/readme/bulk", (req, res) => {
  const { langs, name, save = false, ...rest } = req.body || {};

  if (!langs || !Array.isArray(langs) || !langs.length) {
    return res.status(400).json({
      error: "Missing required field: langs (must be a non-empty array)",
    });
  }
  if (!name) {
    return res.status(400).json({ error: "Missing required field: name" });
  }

  const results = [];
  const errors = [];

  for (const lang of langs) {
    try {
      const { markdown, language } = buildReadme(lang, { name, ...rest });
      const entry = {
        lang,
        language,
        filename: `README.${lang}.md`,
        characters: markdown.length,
        lines: markdown.split("\n").length,
        markdown,
      };
      if (save) {
        const filepath = path.join(OUTPUT_DIR, entry.filename);
        fs.writeFileSync(filepath, markdown, "utf8");
        entry.saved = true;
        entry.filepath = filepath;
      }
      results.push(entry);
    } catch (err) {
      errors.push({ lang, error: err.message });
    }
  }

  return res.json({
    success: true,
    generated: results.length,
    results,
    errors,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/readme/saved
// List all README files currently saved to /output.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/readme/saved", (_req, res) => {
  const files = fs
    .readdirSync(OUTPUT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const stat = fs.statSync(path.join(OUTPUT_DIR, filename));
      return {
        filename,
        size: stat.size,
        savedAt: stat.mtime.toISOString(),
      };
    })
    .sort((a, b) => new Date(b.savedAt) - new Date(a.savedAt));

  res.json({ count: files.length, files });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/readme/saved/:filename
// Download a saved README file.
// ─────────────────────────────────────────────────────────────────────────────
router.get("/readme/saved/:filename", (req, res) => {
  const { filename } = req.params;
  // Safety: only allow simple filenames with no path traversal
  if (!/^README\.[a-z]{2}\.md$/.test(filename)) {
    return res.status(400).json({ error: "Invalid filename format" });
  }
  const filepath = path.join(OUTPUT_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: "File not found" });
  }
  res.type("text/plain; charset=utf-8").sendFile(filepath);
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/readme/saved/:filename
// Delete a saved README file.
// ─────────────────────────────────────────────────────────────────────────────
router.delete("/readme/saved/:filename", (req, res) => {
  const { filename } = req.params;
  if (!/^README\.[a-z]{2}\.md$/.test(filename)) {
    return res.status(400).json({ error: "Invalid filename format" });
  }
  const filepath = path.join(OUTPUT_DIR, filename);
  if (!fs.existsSync(filepath)) {
    return res.status(404).json({ error: "File not found" });
  }
  fs.unlinkSync(filepath);
  res.json({ success: true, deleted: filename });
});

export default router;
