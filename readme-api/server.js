import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// README files are saved to a dedicated output folder inside readme-api
const README_OUTPUT_DIR = path.join(__dirname, "output");
if (!fs.existsSync(README_OUTPUT_DIR)) fs.mkdirSync(README_OUTPUT_DIR, { recursive: true });

const app = express();
app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────────────────────────────────────
// Language Definitions — 15 spoken languages
// ─────────────────────────────────────────────────────────────────────────────
const LANGUAGES = {
  en: { name: "English",                 direction: "ltr", s: { overview: "Overview",        features: "Features",        tech: "Tech Stack",              install: "Installation",     usage: "Usage",        contrib: "Contributing",              license: "License",  contribText: "Contributions are welcome! Please open an issue or submit a pull request.",                       licenseText: (l) => `This project is licensed under the ${l} License.`,               defaultDesc: "A brief description of what this project does.",    defaultFeatures: ["Easy to use", "Well documented", "Highly configurable"] } },
  es: { name: "Spanish (Español)",       direction: "ltr", s: { overview: "Descripción",     features: "Características", tech: "Tecnologías",             install: "Instalación",      usage: "Uso",          contrib: "Contribuciones",            license: "Licencia", contribText: "¡Las contribuciones son bienvenidas! Por favor abre un issue o envía un pull request.",           licenseText: (l) => `Este proyecto está licenciado bajo la Licencia ${l}.`,            defaultDesc: "Una breve descripción del proyecto.",               defaultFeatures: ["Fácil de usar", "Bien documentado", "Altamente configurable"] } },
  fr: { name: "French (Français)",       direction: "ltr", s: { overview: "Présentation",    features: "Fonctionnalités", tech: "Technologies",            install: "Installation",     usage: "Utilisation",  contrib: "Contributions",             license: "Licence",  contribText: "Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou soumettre une pull request.", licenseText: (l) => `Ce projet est sous licence ${l}.`,                               defaultDesc: "Une brève description du projet.",                  defaultFeatures: ["Facile à utiliser", "Bien documenté", "Hautement configurable"] } },
  de: { name: "German (Deutsch)",        direction: "ltr", s: { overview: "Übersicht",       features: "Funktionen",      tech: "Technologien",            install: "Installation",     usage: "Verwendung",   contrib: "Mitwirken",                 license: "Lizenz",   contribText: "Beiträge sind willkommen! Bitte öffne ein Issue oder sende einen Pull Request.",                  licenseText: (l) => `Dieses Projekt steht unter der ${l}-Lizenz.`,                    defaultDesc: "Eine kurze Beschreibung des Projekts.",             defaultFeatures: ["Einfach zu bedienen", "Gut dokumentiert", "Hochkonfigurierbar"] } },
  zh: { name: "Chinese Simplified (中文)", direction: "ltr", s: { overview: "项目概述",        features: "功能特性",          tech: "技术栈",                   install: "安装",              usage: "使用方法",      contrib: "贡献",                       license: "许可证",   contribText: "欢迎贡献！请提交 Issue 或 Pull Request。",                                                        licenseText: (l) => `本项目基于 ${l} 许可证开源。`,                                     defaultDesc: "项目的简要描述。",                                    defaultFeatures: ["易于使用", "文档完善", "高度可配置"] } },
  ja: { name: "Japanese (日本語)",        direction: "ltr", s: { overview: "概要",             features: "機能",             tech: "技術スタック",               install: "インストール",       usage: "使い方",        contrib: "コントリビューション",           license: "ライセンス", contribText: "コントリビューションを歓迎します！Issue を開くか Pull Request を送ってください。",                    licenseText: (l) => `このプロジェクトは ${l} ライセンスの下に公開されています。`,         defaultDesc: "プロジェクトの簡単な説明。",                          defaultFeatures: ["使いやすい", "ドキュメントが充実", "高い設定可能性"] } },
  pt: { name: "Portuguese (Português)",  direction: "ltr", s: { overview: "Visão Geral",     features: "Funcionalidades", tech: "Tecnologias",             install: "Instalação",       usage: "Uso",          contrib: "Contribuições",             license: "Licença",  contribText: "Contribuições são bem-vindas! Abra uma issue ou envie um pull request.",                         licenseText: (l) => `Este projeto está licenciado sob a Licença ${l}.`,               defaultDesc: "Uma breve descrição do projeto.",                   defaultFeatures: ["Fácil de usar", "Bem documentado", "Altamente configurável"] } },
  hi: { name: "Hindi (हिन्दी)",           direction: "ltr", s: { overview: "अवलोकन",           features: "विशेषताएं",        tech: "तकनीकी स्टैक",             install: "इंस्टॉलेशन",       usage: "उपयोग",        contrib: "योगदान",                     license: "लाइसेंस", contribText: "योगदान स्वागत योग्य है! कृपया एक issue खोलें या pull request सबमिट करें।",                       licenseText: (l) => `यह प्रोजेक्ट ${l} लाइसेंस के अंतर्गत है।`,                       defaultDesc: "प्रोजेक्ट का संक्षिप्त विवरण।",                    defaultFeatures: ["उपयोग में आसान", "अच्छी तरह प्रलेखित", "उच्च कॉन्फ़िगर करने योग्य"] } },
  ar: { name: "Arabic (العربية)",        direction: "rtl", s: { overview: "نظرة عامة",        features: "الميزات",          tech: "التقنيات المستخدمة",       install: "التثبيت",          usage: "الاستخدام",    contrib: "المساهمة",                  license: "الرخصة",  contribText: "المساهمات مرحب بها! يرجى فتح issue أو إرسال pull request.",                                    licenseText: (l) => `هذا المشروع مرخص بموجب رخصة ${l}.`,                              defaultDesc: "وصف مختصر للمشروع.",                                defaultFeatures: ["سهل الاستخدام", "موثق جيداً", "قابل للتهيئة بشكل كبير"] } },
  ru: { name: "Russian (Русский)",       direction: "ltr", s: { overview: "Обзор",            features: "Возможности",     tech: "Технологии",              install: "Установка",        usage: "Использование", contrib: "Участие в разработке",      license: "Лицензия", contribText: "Вклад приветствуется! Пожалуйста, откройте issue или отправьте pull request.",                  licenseText: (l) => `Этот проект распространяется под лицензией ${l}.`,               defaultDesc: "Краткое описание проекта.",                         defaultFeatures: ["Простота использования", "Хорошая документация", "Высокая настраиваемость"] } },
  ko: { name: "Korean (한국어)",           direction: "ltr", s: { overview: "개요",             features: "기능",             tech: "기술 스택",                 install: "설치",              usage: "사용법",        contrib: "기여",                       license: "라이선스", contribText: "기여를 환영합니다! Issue를 열거나 Pull Request를 제출해 주세요.",                                  licenseText: (l) => `이 프로젝트는 ${l} 라이선스에 따라 배포됩니다.`,                   defaultDesc: "이 프로젝트에 대한 간략한 설명입니다.",               defaultFeatures: ["사용하기 쉬운", "문서화 잘 됨", "고도로 구성 가능"] } },
  it: { name: "Italian (Italiano)",      direction: "ltr", s: { overview: "Panoramica",       features: "Funzionalità",    tech: "Tecnologie Utilizzate",   install: "Installazione",    usage: "Utilizzo",     contrib: "Contributi",                license: "Licenza",  contribText: "I contributi sono benvenuti! Apri un issue o invia una pull request.",                           licenseText: (l) => `Questo progetto è distribuito con la Licenza ${l}.`,              defaultDesc: "Una breve descrizione del progetto.",               defaultFeatures: ["Facile da usare", "Ben documentato", "Altamente configurabile"] } },
  nl: { name: "Dutch (Nederlands)",      direction: "ltr", s: { overview: "Overzicht",        features: "Functies",        tech: "Gebruikte Technologieën", install: "Installatie",      usage: "Gebruik",      contrib: "Bijdragen",                 license: "Licentie", contribText: "Bijdragen zijn welkom! Open een issue of dien een pull request in.",                             licenseText: (l) => `Dit project is gelicenseerd onder de ${l} Licentie.`,             defaultDesc: "Een korte beschrijving van het project.",           defaultFeatures: ["Gemakkelijk te gebruiken", "Goed gedocumenteerd", "Zeer configureerbaar"] } },
  tr: { name: "Turkish (Türkçe)",        direction: "ltr", s: { overview: "Genel Bakış",      features: "Özellikler",      tech: "Kullanılan Teknolojiler", install: "Kurulum",          usage: "Kullanım",     contrib: "Katkıda Bulunma",           license: "Lisans",   contribText: "Katkılarınızı bekliyoruz! Lütfen bir issue açın veya pull request gönderin.",                    licenseText: (l) => `Bu proje ${l} Lisansı kapsamında lisanslanmıştır.`,               defaultDesc: "Projenin kısa bir açıklaması.",                     defaultFeatures: ["Kullanımı kolay", "İyi belgelenmiş", "Yüksek düzeyde yapılandırılabilir"] } },
  pl: { name: "Polish (Polski)",         direction: "ltr", s: { overview: "Przegląd",         features: "Funkcje",         tech: "Użyte Technologie",       install: "Instalacja",       usage: "Użycie",       contrib: "Wkład",                     license: "Licencja", contribText: "Wkłady są mile widziane! Otwórz issue lub wyślij pull request.",                                 licenseText: (l) => `Ten projekt jest objęty licencją ${l}.`,                          defaultDesc: "Krótki opis projektu.",                             defaultFeatures: ["Łatwy w użyciu", "Dobrze udokumentowany", "Wysoko konfigurowalny"] } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
function normalizeArray(val) {
  if (!val) return null;
  if (Array.isArray(val)) return val.filter(Boolean);
  return String(val).split(",").map((v) => v.trim()).filter(Boolean);
}

function buildReadme(langCode, p) {
  const { s } = LANGUAGES[langCode];
  const slug = (p.name || "my-project").toLowerCase().replace(/\s+/g, "-");
  const repo = p.repoUrl || `https://github.com/your-username/${slug}`;
  const license = p.license || "MIT";
  const features = normalizeArray(p.features) || s.defaultFeatures;
  const techStack = normalizeArray(p.techStack) || [];
  const description = p.description || s.defaultDesc;
  const dir = LANGUAGES[langCode].direction;

  const badges = p.showBadges !== false
    ? `![License](https://img.shields.io/badge/license-${encodeURIComponent(license)}-blue.svg) ` +
      `![Version](https://img.shields.io/badge/version-1.0.0-green.svg)\n\n`
    : "";

  const rtlNote = dir === "rtl" ? `<!-- direction: rtl -->\n\n` : "";
  const techSection = techStack.length
    ? `## ${s.tech}\n\n${techStack.map((t) => `- ${t}`).join("\n")}\n\n`
    : "";

  const tableOfContents = [
    `- [${s.overview}](#overview)`,
    `- [${s.features}](#features)`,
    techStack.length ? `- [${s.tech}](#tech-stack)` : null,
    `- [${s.install}](#installation)`,
    `- [${s.usage}](#usage)`,
    `- [${s.contrib}](#contributing)`,
    `- [${s.license}](#license)`,
  ]
    .filter(Boolean)
    .join("\n");

  return `${rtlNote}# ${p.name}

${badges}> ${description}

## Table of Contents

${tableOfContents}

## ${s.overview}

${description}

## ${s.features}

${features.map((f) => `- ✅ ${f}`).join("\n")}

${techSection}## ${s.install}

\`\`\`bash
git clone ${repo}
cd ${slug}
npm install
\`\`\`

## ${s.usage}

\`\`\`bash
npm start
\`\`\`

## ${s.contrib}

${s.contribText}

## ${s.license}

${s.licenseText(license)}
`;
}

function langFilename(code) {
  return code === "en" ? "README.md" : `README.${code}.md`;
}

function mdToHtml(md, langName, direction) {
  // Simple Markdown → HTML converter for preview
  let html = md
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/```bash\n([\s\S]*?)```/gm, "<pre><code class='language-bash'>$1</code></pre>")
    .replace(/```([\s\S]*?)```/gm, "<pre><code>$1</code></pre>")
    .replace(/<!--.*?-->/g, "")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/<\/ul>\s*<ul>/g, "")
    .replace(/\n\n/g, "</p><p>")
    .replace(/^(?!<[h|u|p|pre|li|img])/gm, "");

  return `<!DOCTYPE html>
<html lang="${langName.slice(0, 2).toLowerCase()}" dir="${direction}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>README Preview — ${langName}</title>
  <style>
    *{box-sizing:border-box;margin:0;padding:0}
    body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif;background:#0d1117;color:#e6edf3;direction:${direction};padding:2rem;line-height:1.7}
    .container{max-width:860px;margin:0 auto;background:#161b22;border:1px solid #30363d;border-radius:12px;padding:2.5rem}
    .lang-badge{display:inline-block;background:#1f6feb;color:#fff;font-size:.75rem;padding:.2rem .7rem;border-radius:20px;margin-bottom:1.2rem}
    h1{font-size:2rem;border-bottom:1px solid #30363d;padding-bottom:.6rem;margin-bottom:1rem;color:#f0f6fc}
    h2{font-size:1.3rem;margin:1.5rem 0 .6rem;color:#7ee787}
    h3{font-size:1.1rem;margin:1.2rem 0 .4rem;color:#79c0ff}
    p{margin:.5rem 0;color:#c9d1d9}
    ul{padding-${direction==="rtl"?"right":"left"}:1.5rem;margin:.5rem 0}
    li{margin:.3rem 0;color:#c9d1d9}
    a{color:#58a6ff;text-decoration:none}
    a:hover{text-decoration:underline}
    code{background:#161b22;border:1px solid #30363d;padding:.15em .4em;border-radius:4px;font-size:.9em;color:#ff7b72}
    pre{background:#0d1117;border:1px solid #30363d;border-radius:8px;padding:1rem;overflow-x:auto;margin:.8rem 0}
    pre code{background:none;border:none;color:#e6edf3;font-size:.88rem}
    img{max-width:100%;border-radius:4px}
    strong{color:#f0f6fc}
  </style>
</head>
<body>
  <div class="container">
    <span class="lang-badge">${langName}</span>
    ${html}
  </div>
</body>
</html>`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Root — API info
// ─────────────────────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    name: "README Generator API",
    version: "3.0.0",
    description: "Generate professional README files in 15 spoken languages",
    supportedLanguages: Object.keys(LANGUAGES).length,
    endpoints: [
      { method: "GET",    path: "/api/readme/languages",                  description: "List all 15 supported languages" },
      { method: "POST",   path: "/api/readme/generate",                   description: "Generate README in one language (JSON or raw)" },
      { method: "POST",   path: "/api/readme/generate/bulk",              description: "Generate README in multiple languages at once" },
      { method: "POST",   path: "/api/readme/generate/all",               description: "Generate README in all 15 languages" },
      { method: "POST",   path: "/api/readme/generate/compare",           description: "Side-by-side comparison of README in selected languages" },
      { method: "GET",    path: "/api/readme/generate/:language",         description: "Download raw Markdown for a language (GET with query params)" },
      { method: "GET",    path: "/api/readme/preview/:language",          description: "Rendered HTML preview of README for a language" },
      { method: "POST",   path: "/api/readme/save",                       description: "Generate AND save README file(s) to disk" },
      { method: "GET",    path: "/api/readme/saved",                      description: "List all saved README files in output directory" },
      { method: "DELETE", path: "/api/readme/:language",                  description: "Delete a specific language README file from disk" },
      { method: "DELETE", path: "/api/readme/bulk",                       description: "Delete multiple language README files (body: { languages })" },
      { method: "DELETE", path: "/api/readme/all",                        description: "Delete all README files from disk" },
    ],
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/readme/languages
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/readme/languages", (req, res) => {
  res.json({
    count: Object.keys(LANGUAGES).length,
    languages: Object.entries(LANGUAGES).map(([code, l]) => ({
      code,
      name: l.name,
      direction: l.direction,
      exampleFilename: langFilename(code),
    })),
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/readme/generate
// Body: { language, name, description, features?, techStack?, repoUrl?, license?, format?, showBadges? }
// format = "json" (default) | "raw" (Markdown file download)
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/readme/generate", (req, res) => {
  const { language = "en", name, description, features, techStack, repoUrl = "", license = "MIT", format = "json", showBadges = true } = req.body;

  if (!name?.trim())        return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Missing required field: "description"' });

  const langCode = language.toLowerCase().trim();
  if (!LANGUAGES[langCode])
    return res.status(404).json({ success: false, error: `Language code "${langCode}" is not supported.`, supportedCodes: Object.keys(LANGUAGES) });

  const content  = buildReadme(langCode, { name: name.trim(), description: description.trim(), features, techStack, repoUrl, license, showBadges });
  const filename = langFilename(langCode);
  const langInfo = LANGUAGES[langCode];

  if (format === "raw")
    return res.setHeader("Content-Type", "text/markdown; charset=utf-8")
               .setHeader("Content-Disposition", `attachment; filename="${filename}"`)
               .send(content);

  return res.status(201).json({
    success: true,
    language: { code: langCode, name: langInfo.name, direction: langInfo.direction },
    filename,
    content,
    characterCount: content.length,
    lineCount: content.split("\n").length,
    preview: `/api/readme/preview/${langCode}?name=${encodeURIComponent(name.trim())}&description=${encodeURIComponent(description.trim())}`,
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/readme/generate/bulk
// Body: { languages: ["en","es"], name, description, ... }
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/readme/generate/bulk", (req, res) => {
  const { languages, name, description, features, techStack, repoUrl = "", license = "MIT", showBadges = true } = req.body;

  if (!name?.trim())        return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Missing required field: "description"' });
  if (!Array.isArray(languages) || languages.length === 0)
    return res.status(400).json({ success: false, error: '"languages" must be a non-empty array', example: { languages: ["en", "es", "fr"] }, supportedCodes: Object.keys(LANGUAGES) });

  const params  = { name: name.trim(), description: description.trim(), features, techStack, repoUrl, license, showBadges };
  const results = [], errors = [];

  for (const lang of languages) {
    const code = lang.toLowerCase().trim();
    if (!LANGUAGES[code]) { errors.push({ language: lang, error: `Unsupported code: "${lang}"` }); continue; }
    const content = buildReadme(code, params);
    results.push({ language: { code, name: LANGUAGES[code].name, direction: LANGUAGES[code].direction }, filename: langFilename(code), content, characterCount: content.length, lineCount: content.split("\n").length });
  }

  return res.status(201).json({ success: true, requested: languages.length, generated: results.length, failed: errors.length, results, ...(errors.length && { errors }) });
});

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/readme/generate/all
// Body: { name, description, features?, techStack?, repoUrl?, license?, showBadges? }
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/readme/generate/all", (req, res) => {
  const { name, description, features, techStack, repoUrl = "", license = "MIT", showBadges = true } = req.body;

  if (!name?.trim())        return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Missing required field: "description"' });

  const params  = { name: name.trim(), description: description.trim(), features, techStack, repoUrl, license, showBadges };
  const readmes = Object.keys(LANGUAGES).map((code) => {
    const content = buildReadme(code, params);
    return { language: { code, name: LANGUAGES[code].name, direction: LANGUAGES[code].direction }, filename: langFilename(code), content, characterCount: content.length, lineCount: content.split("\n").length };
  });

  return res.status(201).json({ success: true, count: readmes.length, totalCharacters: readmes.reduce((s, r) => s + r.characterCount, 0), readmes });
});

// ─────────────────────────────────────────────────────────────────────────────
// NEW: POST /api/readme/generate/compare
// Side-by-side comparison of the same README in multiple languages
// Body: { languages: ["en","es","fr"], name, description, ... }
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/readme/generate/compare", (req, res) => {
  const { languages, name, description, features, techStack, repoUrl = "", license = "MIT", showBadges = true } = req.body;

  if (!name?.trim())        return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Missing required field: "description"' });

  const codes = Array.isArray(languages) && languages.length > 0
    ? languages.map((l) => l.toLowerCase().trim())
    : ["en", "es", "fr", "de", "zh", "ja"];

  const unsupported = codes.filter((c) => !LANGUAGES[c]);
  if (unsupported.length)
    return res.status(400).json({ success: false, error: `Unsupported language codes: ${unsupported.join(", ")}`, supportedCodes: Object.keys(LANGUAGES) });

  const params  = { name: name.trim(), description: description.trim(), features, techStack, repoUrl, license, showBadges };
  const compare = {};

  for (const code of codes) {
    const content = buildReadme(code, params);
    compare[code] = {
      languageName: LANGUAGES[code].name,
      direction:    LANGUAGES[code].direction,
      filename:     langFilename(code),
      content,
      characterCount: content.length,
      lineCount: content.split("\n").length,
    };
  }

  return res.status(201).json({ success: true, languagesCompared: codes.length, projectName: name.trim(), compare });
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/readme/generate/:language   — raw Markdown download
// Query params: name, description, features, techStack, repoUrl, license
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/readme/generate/:language", (req, res) => {
  const langCode = req.params.language.toLowerCase().trim();
  if (!LANGUAGES[langCode])
    return res.status(404).json({ success: false, error: `Language "${langCode}" not supported.`, supportedCodes: Object.keys(LANGUAGES) });

  const name        = req.query.name        || "My Project";
  const description = req.query.description || LANGUAGES[langCode].s.defaultDesc;
  const features    = req.query.features    ? req.query.features.split(",")  : null;
  const techStack   = req.query.techStack   ? req.query.techStack.split(",") : null;
  const repoUrl     = req.query.repoUrl     || "";
  const license     = req.query.license     || "MIT";

  const content = buildReadme(langCode, { name, description, features, techStack, repoUrl, license });
  return res.setHeader("Content-Type", "text/markdown; charset=utf-8")
             .setHeader("Content-Disposition", `attachment; filename="${langFilename(langCode)}"`)
             .send(content);
});

// ─────────────────────────────────────────────────────────────────────────────
// NEW: GET /api/readme/preview/:language   — rendered HTML preview
// Query params: same as generate GET
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/readme/preview/:language", (req, res) => {
  const langCode = req.params.language.toLowerCase().trim();
  if (!LANGUAGES[langCode])
    return res.status(404).json({ success: false, error: `Language "${langCode}" not supported.`, supportedCodes: Object.keys(LANGUAGES) });

  const name        = req.query.name        || "My Project";
  const description = req.query.description || LANGUAGES[langCode].s.defaultDesc;
  const features    = req.query.features    ? req.query.features.split(",")  : null;
  const techStack   = req.query.techStack   ? req.query.techStack.split(",") : null;
  const repoUrl     = req.query.repoUrl     || "";
  const license     = req.query.license     || "MIT";

  const content  = buildReadme(langCode, { name, description, features, techStack, repoUrl, license });
  const langInfo = LANGUAGES[langCode];
  const html     = mdToHtml(content, langInfo.name, langInfo.direction);

  return res.setHeader("Content-Type", "text/html; charset=utf-8").send(html);
});

// ─────────────────────────────────────────────────────────────────────────────
// NEW: POST /api/readme/save
// Generate AND write README file(s) to the output directory on disk
// Body: { language (or languages: []), name, description, ..., overwrite? }
// ─────────────────────────────────────────────────────────────────────────────
app.post("/api/readme/save", (req, res) => {
  const {
    language,
    languages,
    name,
    description,
    features,
    techStack,
    repoUrl = "",
    license = "MIT",
    showBadges = true,
    overwrite = true,
  } = req.body;

  if (!name?.trim())        return res.status(400).json({ success: false, error: 'Missing required field: "name"' });
  if (!description?.trim()) return res.status(400).json({ success: false, error: 'Missing required field: "description"' });

  // Resolve which language codes to save
  let codes;
  if (Array.isArray(languages) && languages.length > 0) {
    codes = languages.map((l) => l.toLowerCase().trim());
  } else if (language) {
    codes = [language.toLowerCase().trim()];
  } else {
    return res.status(400).json({ success: false, error: 'Provide "language" (string) or "languages" (array).', supportedCodes: Object.keys(LANGUAGES) });
  }

  const unsupported = codes.filter((c) => !LANGUAGES[c]);
  if (unsupported.length)
    return res.status(400).json({ success: false, error: `Unsupported language codes: ${unsupported.join(", ")}`, supportedCodes: Object.keys(LANGUAGES) });

  const params  = { name: name.trim(), description: description.trim(), features, techStack, repoUrl, license, showBadges };
  const saved   = [], skipped = [];

  for (const code of codes) {
    const content  = buildReadme(code, params);
    const filename = langFilename(code);
    const filePath = path.join(README_OUTPUT_DIR, filename);

    if (!overwrite && fs.existsSync(filePath)) {
      skipped.push({ language: code, filename, reason: "File already exists (overwrite=false)" });
      continue;
    }

    fs.writeFileSync(filePath, content, "utf-8");
    saved.push({
      language: { code, name: LANGUAGES[code].name, direction: LANGUAGES[code].direction },
      filename,
      filePath,
      characterCount: content.length,
      lineCount: content.split("\n").length,
      savedAt: new Date().toISOString(),
    });
  }

  return res.status(201).json({
    success: true,
    requested: codes.length,
    saved: saved.length,
    skipped: skipped.length,
    outputDirectory: README_OUTPUT_DIR,
    results: saved,
    ...(skipped.length && { skippedFiles: skipped }),
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// NEW: GET /api/readme/saved
// List all README files currently saved in the output directory
// ─────────────────────────────────────────────────────────────────────────────
app.get("/api/readme/saved", (req, res) => {
  const files = fs.existsSync(README_OUTPUT_DIR) ? fs.readdirSync(README_OUTPUT_DIR) : [];
  const readmeFiles = files
    .filter((f) => f.startsWith("README") && f.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(README_OUTPUT_DIR, filename);
      const stats    = fs.statSync(filePath);
      const langCode = filename === "README.md" ? "en" : filename.replace("README.", "").replace(".md", "");
      return {
        filename,
        filePath,
        language: LANGUAGES[langCode]
          ? { code: langCode, name: LANGUAGES[langCode].name, direction: LANGUAGES[langCode].direction }
          : { code: langCode, name: "Unknown" },
        size: stats.size,
        sizeHuman: `${(stats.size / 1024).toFixed(2)} KB`,
        createdAt: stats.birthtime.toISOString(),
        modifiedAt: stats.mtime.toISOString(),
      };
    });

  return res.json({ success: true, count: readmeFiles.length, outputDirectory: README_OUTPUT_DIR, files: readmeFiles });
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/readme/all
// ─────────────────────────────────────────────────────────────────────────────
app.delete("/api/readme/all", (req, res) => {
  const deleted = [], notFound = [];
  for (const code of Object.keys(LANGUAGES)) {
    const filename = langFilename(code);
    const filePath = path.join(README_OUTPUT_DIR, filename);
    if (!fs.existsSync(filePath)) { notFound.push({ language: code, filename }); continue; }
    fs.unlinkSync(filePath);
    deleted.push({ language: { code, name: LANGUAGES[code].name }, filename, deletedAt: new Date().toISOString() });
  }
  res.json({ success: true, totalLanguages: Object.keys(LANGUAGES).length, deleted: deleted.length, notFound: notFound.length, results: deleted, ...(notFound.length && { notFoundFiles: notFound }) });
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/readme/bulk
// Body: { languages: ["en","es","fr"] }
// ─────────────────────────────────────────────────────────────────────────────
app.delete("/api/readme/bulk", (req, res) => {
  const { languages } = req.body;
  if (!Array.isArray(languages) || languages.length === 0)
    return res.status(400).json({ success: false, error: '"languages" must be a non-empty array.', example: { languages: ["en", "es", "fr"] }, supportedCodes: Object.keys(LANGUAGES) });

  const deleted = [], notFound = [], unsupported = [];
  for (const lang of languages) {
    const code = lang.toLowerCase().trim();
    if (!LANGUAGES[code]) { unsupported.push({ language: lang, error: `Unsupported code: "${lang}"` }); continue; }
    const filename = langFilename(code);
    const filePath = path.join(README_OUTPUT_DIR, filename);
    if (!fs.existsSync(filePath)) { notFound.push({ language: code, filename, error: "File not found." }); continue; }
    fs.unlinkSync(filePath);
    deleted.push({ language: { code, name: LANGUAGES[code].name }, filename, deletedAt: new Date().toISOString() });
  }
  res.json({ success: true, requested: languages.length, deleted: deleted.length, notFound: notFound.length, unsupported: unsupported.length, results: deleted, ...(notFound.length && { notFoundFiles: notFound }), ...(unsupported.length && { unsupportedLanguages: unsupported }) });
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/readme/:language
// ─────────────────────────────────────────────────────────────────────────────
app.delete("/api/readme/:language", (req, res) => {
  const code = req.params.language.toLowerCase().trim();
  if (!LANGUAGES[code])
    return res.status(404).json({ success: false, error: `Language "${code}" is not supported.`, supportedCodes: Object.keys(LANGUAGES) });
  const filename = langFilename(code);
  const filePath = path.join(README_OUTPUT_DIR, filename);
  if (!fs.existsSync(filePath))
    return res.status(404).json({ success: false, error: `README file "${filename}" does not exist.`, filename, language: { code, name: LANGUAGES[code].name } });
  fs.unlinkSync(filePath);
  res.json({ success: true, message: `"${filename}" has been deleted.`, filename, language: { code, name: LANGUAGES[code].name }, deletedAt: new Date().toISOString() });
});

// ─────────────────────────────────────────────────────────────────────────────
// 404 catch-all
// ─────────────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Endpoint not found",
    hint: "Visit GET / for the full list of available endpoints",
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Start
// ─────────────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 3456;
app.listen(PORT, () => {
  console.log(`README Generator API v3.0.0 running on http://localhost:${PORT}`);
  console.log(`Supported languages : ${Object.keys(LANGUAGES).length}`);
  console.log(`Output directory    : ${README_OUTPUT_DIR}`);
});
