import express from "express";
import cors from "cors";
import readmeRoutes from "./src/routes/readme.js";

const app = express();
const PORT = process.env.PORT || 3456;

// ── Middleware
app.use(cors());
app.use(express.json());

// ── API routes
app.use("/api", readmeRoutes);

// ── Health check
app.get("/health", (_req, res) =>
  res.json({ status: "ok", service: "README Generator API", version: "1.0.0" })
);

// ── Root — show available endpoints
app.get("/", (_req, res) => {
  res.json({
    service: "README Generator API",
    version: "1.0.0",
    description:
      "Generate professional README.md files in 15 languages via a simple REST API.",
    endpoints: [
      {
        method: "GET",
        path: "/api/languages",
        description: "List all supported language codes and names",
      },
      {
        method: "POST",
        path: "/api/readme/generate",
        description: "Generate a README and return it as JSON",
        body: {
          lang: "string (required) — e.g. 'en', 'fr', 'hi'",
          name: "string (required) — project name",
          description: "string (optional)",
          repoUrl: "string (optional)",
          features: "string[] | string (optional, comma-separated)",
          techStack: "string[] | string (optional)",
          installCommand: "string (optional)",
          usageExample: "string (optional)",
          license: "string (optional, default 'MIT')",
          includeBadges: "boolean (optional, default true)",
          includeToc: "boolean (optional, default true)",
        },
      },
      {
        method: "GET",
        path: "/api/readme/generate/:lang?name=MyProject",
        description: "Generate a README and return raw Markdown text",
      },
      {
        method: "POST",
        path: "/api/readme/save",
        description: "Generate and save README to disk, return JSON + markdown",
      },
      {
        method: "POST",
        path: "/api/readme/bulk",
        description:
          "Generate READMEs for multiple languages in one request",
        body: {
          langs: "string[] (required) — e.g. ['en','fr','de']",
          name: "string (required)",
          save: "boolean (optional, default false) — also write files to disk",
        },
      },
      {
        method: "GET",
        path: "/api/readme/saved",
        description: "List all README files saved to disk",
      },
      {
        method: "GET",
        path: "/api/readme/saved/:filename",
        description: "Download a saved README file (e.g. README.fr.md)",
      },
      {
        method: "DELETE",
        path: "/api/readme/saved/:filename",
        description: "Delete a saved README file",
      },
    ],
  });
});

// ── 404 fallback
app.use((_req, res) => res.status(404).json({ error: "Route not found" }));

// ── Start
app.listen(PORT, () => {
  console.log(`README Generator API running on http://localhost:${PORT}`);
  console.log(`Supported languages: 15`);
  console.log(`Endpoints:`);
  console.log(`  GET  /`);
  console.log(`  GET  /health`);
  console.log(`  GET  /api/languages`);
  console.log(`  POST /api/readme/generate`);
  console.log(`  GET  /api/readme/generate/:lang`);
  console.log(`  POST /api/readme/save`);
  console.log(`  POST /api/readme/bulk`);
  console.log(`  GET  /api/readme/saved`);
  console.log(`  GET  /api/readme/saved/:filename`);
  console.log(`  DELETE /api/readme/saved/:filename`);
});
