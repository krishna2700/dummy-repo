# README Generator API

A full-stack Express + MongoDB application that exposes REST endpoints to generate professional `README.md` files in **15 spoken languages** and **12 programming language flavors**.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Reference — Spoken Language README](#api-reference--spoken-language-readme)
  - [GET /api/readme/languages](#get-apireadmelanguages)
  - [GET /api/readme/languages/spoken](#get-apireadmelanguagesspoken)
  - [GET /api/readme/languages/programming](#get-apireadmelanguagesprogramming)
  - [POST /api/readme/generate](#post-apireadmegenerate)
  - [POST /api/readme/generate/bulk](#post-apireadmegeneratebulk)
  - [POST /api/readme/generate/all](#post-apireadmegenerateall)
  - [GET /api/readme/generate/:language](#get-apireadmegeneratelanguage)
  - [POST /api/readme/generate/by-language](#post-apireadmegenerateby-language)
  - [GET /api/readme/generate/by-language/:progLang](#get-apireadmegenerateby-languageproglang)
  - [GET /api/readme/saved](#get-apireadmesaved)
  - [DELETE /api/readme/delete](#delete-apireadmedelete)
  - [DELETE /api/readme/delete/:id](#delete-apireadmedeleteid)
  - [DELETE /api/readme/file/:language](#delete-apireadmefilelanguage)
  - [DELETE /api/readme/file/bulk](#delete-apireadmefilebulk)
  - [DELETE /api/readme/file/all](#delete-apireadmefileall)
- [API Reference — Programming Language README (Standalone)](#api-reference--programming-language-readme-standalone)
  - [GET /api/readme/prog/languages](#get-apireadmeproglanguages)
  - [POST /api/readme/prog/generate](#post-apireadmeproggenerate)
  - [POST /api/readme/prog/generate/download](#post-apireadmeprogeneratedownload)
  - [GET /api/readme/prog/template/:language](#get-apireadmeprogtemplate-language)
  - [DELETE /api/readme/prog/:language](#delete-apireadmeproglanguage)
  - [DELETE /api/readme/prog/bulk](#delete-apireadmeprogbulk)
  - [DELETE /api/readme/prog/all](#delete-apireadmeprogall)
- [Supported Spoken Languages](#supported-spoken-languages)
- [Supported Programming Languages](#supported-programming-languages)
- [Standalone README Server](#standalone-readme-server)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- Generate README files in **15 spoken languages** (English, Spanish, French, German, Chinese, Japanese, Korean, Portuguese, Hindi, Arabic, Russian, Italian, Dutch, Turkish, Polish)
- Generate programming-language-aware READMEs for **12 languages** (JavaScript, TypeScript, Python, Java, Go, Rust, Ruby, PHP, C#, C++, Kotlin, Swift)
- Single, bulk, and all-at-once generation modes
- Raw Markdown download via GET endpoints
- In-memory save store with per-entry delete
- File-system delete routes for cleaning up generated files
- Full input validation with descriptive error messages
- RTL language support (Arabic)

---

## Tech Stack

- **Runtime**: Node.js (ESM)
- **Framework**: Express 4
- **Database**: MongoDB via Mongoose
- **Frontend**: React + Vite

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- MongoDB running locally or a MongoDB Atlas URI
- npm

### Installation

```bash
git clone <repo-url>
cd <repo-name>
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/readme-generator
PORT=5000
NODE_ENV=development
```

### Start the Development Server

```bash
npm run dev
```

The API will be available at `http://localhost:5000`.

---

## API Reference — Spoken Language README

Base path: `/api/readme`

---

### GET /api/readme/languages

Returns all supported spoken **and** programming languages.

**Response**

```json
{
  "spoken": [
    { "code": "en", "name": "English", "direction": "ltr" },
    ...
  ],
  "programming": [
    { "key": "javascript", "label": "JavaScript" },
    ...
  ]
}
```

---

### GET /api/readme/languages/spoken

Returns only supported spoken/display languages.

**Response**

```json
{
  "count": 15,
  "languages": [
    { "code": "en", "name": "English", "direction": "ltr" },
    { "code": "ar", "name": "Arabic (العربية)", "direction": "rtl" }
  ]
}
```

---

### GET /api/readme/languages/programming

Returns only supported programming languages.

**Response**

```json
{
  "count": 12,
  "languages": [
    { "key": "javascript", "label": "JavaScript", "extension": ".js", "packageManager": "npm" },
    ...
  ]
}
```

---

### POST /api/readme/generate

Generate a README in a single spoken language.

**Request Body**

| Field                 | Type              | Required | Default  | Description                                     |
|-----------------------|-------------------|----------|----------|-------------------------------------------------|
| `name`                | string            | Yes      | —        | Project name                                    |
| `description`         | string            | Yes      | —        | Project description                             |
| `language`            | string            | No       | `"en"`   | Spoken language code (e.g. `"es"`, `"fr"`)     |
| `features`            | string[] or CSV   | No       | defaults | List of features                                |
| `techStack`           | string[] or CSV   | No       | —        | Technologies used                               |
| `repoUrl`             | string            | No       | —        | Repository URL                                  |
| `license`             | string            | No       | `"MIT"`  | License name                                    |
| `version`             | string            | No       | `"1.0.0"`| Project version                                 |
| `author`              | string            | No       | —        | Author name                                     |
| `programmingLanguage` | string            | No       | —        | Enriches install/run commands                   |
| `format`              | `"json"` \| `"raw"` | No    | `"json"` | `"raw"` streams a `.md` file download           |
| `save`                | boolean           | No       | false    | Persist to in-memory store (returns an `id`)    |

**Example Request**

```bash
curl -X POST http://localhost:5000/api/readme/generate \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My App",
    "description": "A cool application",
    "language": "es",
    "programmingLanguage": "python",
    "features": ["Fast", "Secure", "Scalable"],
    "license": "MIT"
  }'
```

**Example Response**

```json
{
  "success": true,
  "language": { "code": "es", "name": "Spanish (Español)", "direction": "ltr" },
  "filename": "README.es.md",
  "content": "# My App\n\n## Descripción General\n...",
  "characterCount": 1420,
  "lineCount": 48
}
```

---

### POST /api/readme/generate/bulk

Generate README files in **multiple** spoken languages at once.

**Request Body**

Same as `/generate` but with an additional `languages` array:

| Field       | Type     | Required | Description                          |
|-------------|----------|----------|--------------------------------------|
| `languages` | string[] | Yes      | Array of spoken language codes       |
| `name`      | string   | Yes      | Project name                         |
| `description` | string | Yes      | Project description                  |
| (rest)      | …        | No       | Same optional fields as `/generate`  |

**Example Request**

```bash
curl -X POST http://localhost:5000/api/readme/generate/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "languages": ["en", "es", "fr", "de"],
    "name": "My App",
    "description": "A cool application"
  }'
```

**Example Response**

```json
{
  "success": true,
  "requested": 4,
  "generated": 4,
  "failed": 0,
  "results": [
    { "language": { "code": "en", "name": "English" }, "filename": "README.md", "content": "..." },
    ...
  ]
}
```

---

### POST /api/readme/generate/all

Generate README files in **all 15 spoken languages** at once.

**Request Body** — same as `/generate` (no `languages` array needed).

**Example Request**

```bash
curl -X POST http://localhost:5000/api/readme/generate/all \
  -H "Content-Type: application/json" \
  -d '{ "name": "My App", "description": "A cool application" }'
```

**Response** — same shape as `/bulk` with `count: 15`.

---

### GET /api/readme/generate/:language

Download raw Markdown for a spoken language via query parameters.

**URL Params**

| Param      | Description              |
|------------|--------------------------|
| `language` | Spoken language code     |

**Query Params**

| Param               | Description                        |
|---------------------|------------------------------------|
| `name`              | Project name                       |
| `description`       | Project description                |
| `features`          | CSV list of features               |
| `techStack`         | CSV list of technologies           |
| `repoUrl`           | Repository URL                     |
| `license`           | License name                       |
| `version`           | Project version                    |
| `author`            | Author name                        |
| `programmingLanguage` | Programming language for commands |

**Example**

```
GET /api/readme/generate/fr?name=MonApp&description=Application+sympa&programmingLanguage=python
```

Returns a `text/markdown` file download named `README.fr.md`.

---

### POST /api/readme/generate/by-language

Generate a README tailored to a specific **programming language** (output in English).

**Request Body**

| Field                | Type              | Required | Default   | Description                            |
|----------------------|-------------------|----------|-----------|----------------------------------------|
| `programmingLanguage`| string            | Yes      | —         | e.g. `"python"`, `"go"`, `"rust"`     |
| `projectName`        | string            | Yes      | —         | Project name                           |
| `description`        | string            | No       | —         | Project description                    |
| `author`             | string            | No       | —         | Author name                            |
| `features`           | string[]          | No       | —         | Feature list                           |
| `license`            | string            | No       | `"MIT"`   | License name                           |
| `githubUrl`          | string            | No       | —         | GitHub repository URL                  |
| `version`            | string            | No       | `"1.0.0"` | Version                                |
| `format`             | `"json"` \| `"raw"` | No    | `"json"`  | `"raw"` streams a `.md` file download  |

**Example Request**

```bash
curl -X POST http://localhost:5000/api/readme/generate/by-language \
  -H "Content-Type: application/json" \
  -d '{
    "programmingLanguage": "rust",
    "projectName": "fast-tool",
    "description": "A blazing fast CLI utility",
    "author": "Alice",
    "license": "Apache-2.0"
  }'
```

---

### GET /api/readme/generate/by-language/:progLang

Convenience download for programming-language READMEs via query parameters.

**Example**

```
GET /api/readme/generate/by-language/rust?projectName=fast-tool&author=Alice
```

Returns `text/markdown` download.

---

### GET /api/readme/saved

Returns all README entries persisted to the in-memory store (those generated with `save: true`).

**Response**

```json
{
  "success": true,
  "count": 2,
  "readmes": [
    { "id": "abc123", "language": "es", "filename": "README.es.md", "savedAt": "..." }
  ]
}
```

---

### DELETE /api/readme/delete

Delete entries from the in-memory store. Without a body, deletes everything. Supports filtering.

**Request Body (optional)**

| Field                | Type   | Description                                |
|----------------------|--------|--------------------------------------------|
| `language`           | string | Delete only entries for this spoken language |
| `programmingLanguage`| string | Delete only entries for this prog language |

Both fields together apply an AND filter.

---

### DELETE /api/readme/delete/:id

Delete a single in-memory entry by its ID.

---

### DELETE /api/readme/file/:language

Delete a spoken-language README file from disk.

- `DELETE /api/readme/file/en` → removes `README.md`
- `DELETE /api/readme/file/es` → removes `README.es.md`

---

### DELETE /api/readme/file/bulk

Delete README files for multiple spoken languages from disk.

**Request Body**

```json
{ "languages": ["en", "es", "fr"] }
```

---

### DELETE /api/readme/file/all

Delete **all** spoken-language README files from disk.

---

## API Reference — Programming Language README (Standalone)

Base path: `/api/readme/prog`

These endpoints use the standalone `readme.js` router, which generates programming-language-specific READMEs (always in English) with badges, install/run/test/build commands, API reference tables, screenshots, and more.

---

### GET /api/readme/prog/languages

List all 12 supported programming languages.

**Response**

```json
{
  "success": true,
  "count": 12,
  "languages": [
    { "key": "javascript", "label": "JavaScript", "extension": ".js", "packageManager": "npm" },
    { "key": "python",     "label": "Python",     "extension": ".py", "packageManager": "pip" },
    ...
  ]
}
```

---

### POST /api/readme/prog/generate

Generate a rich, badge-decorated README for a programming language.

**Request Body**

| Field                | Type       | Required | Description                                 |
|----------------------|------------|----------|---------------------------------------------|
| `projectName`        | string     | Yes      | Project name                                |
| `description`        | string     | Yes      | Project description                         |
| `language`           | string     | Yes      | Programming language key (e.g. `"python"`)  |
| `authorName`         | string     | No       | Author display name                         |
| `authorGithub`       | string     | No       | GitHub username (enables repo links)        |
| `repoName`           | string     | No       | Repository name (enables GitHub links)      |
| `features`           | string[]   | No       | Feature bullet points                       |
| `license`            | string     | No       | License (default: `"MIT"`)                  |
| `includeContributing`| boolean    | No       | Add Contributing section                    |
| `includeChangelog`   | boolean    | No       | Add Changelog section                       |
| `includeBadges`      | boolean    | No       | Add shields.io badges (default: true)       |
| `customInstall`      | string     | No       | Override install command                    |
| `customRun`          | string     | No       | Override run command                        |
| `customTest`         | string     | No       | Override test command                       |
| `customBuild`        | string     | No       | Override build command                      |
| `environment`        | object[]   | No       | Env vars: `[{ key, value, description }]`   |
| `apiEndpoints`       | object[]   | No       | API table: `[{ method, endpoint, description }]` |
| `screenshots`        | object[]   | No       | Screenshots: `[{ alt, url }]`               |
| `acknowledgements`   | string[]   | No       | Acknowledgement bullet points               |

**Example Request**

```bash
curl -X POST http://localhost:5000/api/readme/prog/generate \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "FastAPI App",
    "description": "A high-performance Python API",
    "language": "python",
    "authorName": "Jane Doe",
    "authorGithub": "janedoe",
    "repoName": "fastapi-app",
    "features": ["Async endpoints", "Auto-generated docs", "JWT auth"],
    "license": "MIT",
    "includeContributing": true,
    "environment": [
      { "key": "DATABASE_URL", "value": "postgresql://...", "description": "Postgres connection string" }
    ],
    "apiEndpoints": [
      { "method": "GET",  "endpoint": "/health",    "description": "Health check" },
      { "method": "POST", "endpoint": "/api/users",  "description": "Create user" }
    ]
  }'
```

**Response**

```json
{
  "success": true,
  "language": "Python",
  "filename": "README.md",
  "content": "# FastAPI App\n\n![Python](...) ...",
  "charCount": 2180,
  "lineCount": 72
}
```

---

### POST /api/readme/prog/generate/download

Same as `POST /api/readme/prog/generate` but streams the file directly as a `.md` download.

The `Content-Disposition` header uses the `projectName` as the filename slug:

```
Content-Disposition: attachment; filename="fastapi-app-README.md"
```

---

### GET /api/readme/prog/template/:language

Returns a pre-filled request body template for the given programming language — ready to POST to `/generate`.

**Example**

```
GET /api/readme/prog/template/go
```

**Response**

```json
{
  "success": true,
  "language": "Go",
  "template": {
    "projectName": "My Awesome Project",
    "language": "go",
    "customInstall": "go mod download",
    "customRun": "go run main.go",
    ...
  }
}
```

---

### DELETE /api/readme/prog/:language

Delete a README file (e.g. `README.javascript.md`) from disk for the given programming language.

---

### DELETE /api/readme/prog/bulk

Delete README files for multiple programming languages from disk.

**Request Body**

```json
{ "languages": ["javascript", "python", "go"] }
```

---

### DELETE /api/readme/prog/all

Delete README files for **all** 12 programming languages from disk.

---

## Supported Spoken Languages

| Code | Language              | Direction |
|------|-----------------------|-----------|
| `en` | English               | LTR       |
| `es` | Spanish (Español)     | LTR       |
| `fr` | French (Français)     | LTR       |
| `de` | German (Deutsch)      | LTR       |
| `zh` | Chinese Simplified    | LTR       |
| `ja` | Japanese (日本語)      | LTR       |
| `ko` | Korean (한국어)        | LTR       |
| `pt` | Portuguese (Português)| LTR       |
| `hi` | Hindi (हिन्दी)         | LTR       |
| `ar` | Arabic (العربية)      | RTL       |
| `ru` | Russian (Русский)     | LTR       |
| `it` | Italian (Italiano)    | LTR       |
| `nl` | Dutch (Nederlands)    | LTR       |
| `tr` | Turkish (Türkçe)      | LTR       |
| `pl` | Polish (Polski)       | LTR       |

---

## Supported Programming Languages

| Key          | Label       | Package Manager | Extension |
|--------------|-------------|-----------------|-----------|
| `javascript` | JavaScript  | npm             | `.js`     |
| `typescript` | TypeScript  | npm             | `.ts`     |
| `python`     | Python      | pip             | `.py`     |
| `java`       | Java        | maven           | `.java`   |
| `go`         | Go          | go mod          | `.go`     |
| `rust`       | Rust        | cargo           | `.rs`     |
| `ruby`       | Ruby        | gem             | `.rb`     |
| `php`        | PHP         | composer        | `.php`    |
| `csharp`     | C#          | nuget           | `.cs`     |
| `cpp`        | C++         | cmake           | `.cpp`    |
| `kotlin`     | Kotlin      | gradle          | `.kt`     |
| `swift`      | Swift       | swift package   | `.swift`  |

---

## Standalone README Server

A self-contained version of the spoken-language README API runs in `readme-server.mjs` (no MongoDB required):

```bash
node readme-server.mjs
# → http://localhost:3456
```

Endpoints mirror the main API (`/api/readme/languages`, `/api/readme/generate`, `/api/readme/generate/bulk`, `/api/readme/generate/all`, `/api/readme/generate/:language`, DELETE routes).

A second standalone server lives in `readme-api/` with its own `package.json`:

```bash
cd readme-api && npm install && node server.js
```

---

## Environment Variables

| Variable    | Required | Default | Description                     |
|-------------|----------|---------|---------------------------------|
| `MONGO_URI` | Yes      | —       | MongoDB connection string        |
| `PORT`      | No       | `5000`  | Port for the main server         |
| `NODE_ENV`  | No       | —       | `production` enables static serving |

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: describe your change"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## License

This project is licensed under the **ISC** License.
