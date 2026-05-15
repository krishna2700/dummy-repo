# README जनरेटर API

एक पूर्ण-स्टॅक Express + MongoDB अ‍ॅप्लिकेशन जे **१५ बोलल्या जाणाऱ्या भाषांमध्ये** आणि **१२ प्रोग्रामिंग भाषांच्या प्रकारांमध्ये** व्यावसायिक `README.md` फायली तयार करण्यासाठी REST एंडपॉइंट्स उघड करते.

---

## विषय-सूची

- [वैशिष्ट्ये](#वैशिष्ट्ये)
- [तंत्रज्ञान स्टॅक](#तंत्रज्ञान-स्टॅक)
- [सुरुवात करणे](#सुरुवात-करणे)
- [API संदर्भ — बोलल्या जाणाऱ्या भाषेचा README](#api-संदर्भ--बोलल्या-जाणाऱ्या-भाषेचा-readme)
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
- [API संदर्भ — प्रोग्रामिंग भाषेचा README (स्वतंत्र)](#api-संदर्भ--प्रोग्रामिंग-भाषेचा-readme-स्वतंत्र)
  - [GET /api/readme/prog/languages](#get-apireadmeproglanguages)
  - [POST /api/readme/prog/generate](#post-apireadmeproggenerate)
  - [POST /api/readme/prog/generate/download](#post-apireadmeprogeneratedownload)
  - [GET /api/readme/prog/template/:language](#get-apireadmeprogtemplate-language)
  - [DELETE /api/readme/prog/:language](#delete-apireadmeproglanguage)
  - [DELETE /api/readme/prog/bulk](#delete-apireadmeprogbulk)
  - [DELETE /api/readme/prog/all](#delete-apireadmeprogall)
- [समर्थित बोलल्या जाणाऱ्या भाषा](#समर्थित-बोलल्या-जाणाऱ्या-भाषा)
- [समर्थित प्रोग्रामिंग भाषा](#समर्थित-प्रोग्रामिंग-भाषा)
- [स्वतंत्र README सर्व्हर](#स्वतंत्र-readme-सर्व्हर)
- [पर्यावरण व्हेरिएबल्स](#पर्यावरण-व्हेरिएबल्स)
- [योगदान](#योगदान)
- [परवाना](#परवाना)

---

## वैशिष्ट्ये

- **१५ बोलल्या जाणाऱ्या भाषांमध्ये** README फायली तयार करा (इंग्रजी, स्पॅनिश, फ्रेंच, जर्मन, चीनी, जापानी, कोरियन, पोर्तुगीज, हिंदी, अरबी, रशियन, इटालियन, डच, तुर्की, पोलिश)
- **१२ प्रोग्रामिंग भाषांसाठी** README तयार करा (JavaScript, TypeScript, Python, Java, Go, Rust, Ruby, PHP, C#, C++, Kotlin, Swift)
- एकल, सामूहिक आणि सर्व-एकत्र निर्मिती पद्धती
- GET एंडपॉइंट्सद्वारे कच्चे Markdown डाउनलोड
- प्रति-एंट्री डिलीटसह इन-मेमरी सेव्ह स्टोर
- तयार केलेल्या फायली साफ करण्यासाठी फाइल-सिस्टम डिलीट मार्ग
- वर्णनात्मक त्रुटी संदेशांसह पूर्ण इनपुट प्रमाणीकरण
- RTL भाषा समर्थन (अरबी)

---

## तंत्रज्ञान स्टॅक

- **रनटाइम**: Node.js (ESM)
- **फ्रेमवर्क**: Express 4
- **डेटाबेस**: Mongoose द्वारे MongoDB
- **फ्रंटएंड**: React + Vite

---

## सुरुवात करणे

### पूर्वआवश्यकता

- Node.js ≥ 18
- MongoDB स्थानिकरित्या चालू किंवा MongoDB Atlas URI
- npm

### इंस्टॉलेशन

```bash
git clone <repo-url>
cd <repo-name>
npm install
```

### पर्यावरण व्हेरिएबल्स

प्रोजेक्ट रूटमध्ये `.env` फाइल तयार करा:

```env
MONGO_URI=mongodb://localhost:27017/readme-generator
PORT=5000
NODE_ENV=development
```

### डेव्हलपमेंट सर्व्हर सुरू करा

```bash
npm run dev
```

API `http://localhost:5000` वर उपलब्ध असेल.

---

## API संदर्भ — बोलल्या जाणाऱ्या भाषेचा README

बेस पाथ: `/api/readme`

---

### GET /api/readme/languages

सर्व समर्थित बोलल्या जाणाऱ्या **आणि** प्रोग्रामिंग भाषा परत करते.

**प्रतिसाद**

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

फक्त समर्थित बोलल्या/प्रदर्शन भाषा परत करते.

**प्रतिसाद**

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

फक्त समर्थित प्रोग्रामिंग भाषा परत करते.

**प्रतिसाद**

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

एकाच बोलल्या जाणाऱ्या भाषेत README तयार करा.

**विनंती बॉडी**

| फील्ड                 | प्रकार              | आवश्यक | डीफॉल्ट  | वर्णन                                           |
|-----------------------|---------------------|--------|----------|-------------------------------------------------|
| `name`                | string              | हो     | —        | प्रोजेक्टचे नाव                                 |
| `description`         | string              | हो     | —        | प्रोजेक्टचे वर्णन                               |
| `language`            | string              | नाही   | `"en"`   | बोलल्या जाणाऱ्या भाषेचा कोड (उदा. `"es"`, `"fr"`) |
| `features`            | string[] किंवा CSV  | नाही   | डीफॉल्ट  | वैशिष्ट्यांची यादी                              |
| `techStack`           | string[] किंवा CSV  | नाही   | —        | वापरलेले तंत्रज्ञान                             |
| `repoUrl`             | string              | नाही   | —        | रिपॉझिटरी URL                                   |
| `license`             | string              | नाही   | `"MIT"`  | परवाना नाव                                      |
| `version`             | string              | नाही   | `"1.0.0"`| प्रोजेक्ट आवृत्ती                              |
| `author`              | string              | नाही   | —        | लेखकाचे नाव                                     |
| `programmingLanguage` | string              | नाही   | —        | इंस्टॉल/रन कमांड समृद्ध करते                   |
| `format`              | `"json"` \| `"raw"` | नाही   | `"json"` | `"raw"` `.md` फाइल डाउनलोड स्ट्रीम करते        |
| `save`                | boolean             | नाही   | false    | इन-मेमरी स्टोरमध्ये सेव्ह करते (`id` परत करते) |

**उदाहरण विनंती**

```bash
curl -X POST http://localhost:5000/api/readme/generate \
  -H "Content-Type: application/json" \
  -d '{
    "name": "माझे अ‍ॅप",
    "description": "एक उत्तम अ‍ॅप्लिकेशन",
    "language": "mr",
    "programmingLanguage": "python",
    "features": ["जलद", "सुरक्षित", "स्केलेबल"],
    "license": "MIT"
  }'
```

**उदाहरण प्रतिसाद**

```json
{
  "success": true,
  "language": { "code": "mr", "name": "Marathi (मराठी)", "direction": "ltr" },
  "filename": "README.mr.md",
  "content": "# माझे अ‍ॅप\n\n## सामान्य वर्णन\n...",
  "characterCount": 1420,
  "lineCount": 48
}
```

---

### POST /api/readme/generate/bulk

एकाच वेळी **अनेक** बोलल्या जाणाऱ्या भाषांमध्ये README फायली तयार करा.

**विनंती बॉडी**

`/generate` सारखीच पण अतिरिक्त `languages` अ‍ॅरेसह:

| फील्ड       | प्रकार   | आवश्यक | वर्णन                              |
|-------------|----------|--------|------------------------------------|
| `languages` | string[] | हो     | बोलल्या जाणाऱ्या भाषा कोडांचा अ‍ॅरे |
| `name`      | string   | हो     | प्रोजेक्टचे नाव                    |
| `description` | string | हो     | प्रोजेक्टचे वर्णन                  |
| (बाकी)      | …        | नाही   | `/generate` सारखेच ऐच्छिक फील्ड    |

**उदाहरण विनंती**

```bash
curl -X POST http://localhost:5000/api/readme/generate/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "languages": ["en", "mr", "hi", "de"],
    "name": "माझे अ‍ॅप",
    "description": "एक उत्तम अ‍ॅप्लिकेशन"
  }'
```

**उदाहरण प्रतिसाद**

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

एकाच वेळी **सर्व १५ बोलल्या जाणाऱ्या भाषांमध्ये** README फायली तयार करा.

**विनंती बॉडी** — `/generate` सारखीच (कोणताही `languages` अ‍ॅरे आवश्यक नाही).

**उदाहरण विनंती**

```bash
curl -X POST http://localhost:5000/api/readme/generate/all \
  -H "Content-Type: application/json" \
  -d '{ "name": "माझे अ‍ॅप", "description": "एक उत्तम अ‍ॅप्लिकेशन" }'
```

**प्रतिसाद** — `/bulk` सारखाच आकार `count: 15` सह.

---

### GET /api/readme/generate/:language

क्वेरी पॅरामीटर्सद्वारे बोलल्या जाणाऱ्या भाषेसाठी कच्चे Markdown डाउनलोड करा.

**URL पॅरामीटर्स**

| पॅरामीटर   | वर्णन                        |
|------------|------------------------------|
| `language` | बोलल्या जाणाऱ्या भाषेचा कोड  |

**क्वेरी पॅरामीटर्स**

| पॅरामीटर              | वर्णन                              |
|-----------------------|------------------------------------|
| `name`                | प्रोजेक्टचे नाव                    |
| `description`         | प्रोजेक्टचे वर्णन                  |
| `features`            | वैशिष्ट्यांची CSV यादी             |
| `techStack`           | तंत्रज्ञानांची CSV यादी            |
| `repoUrl`             | रिपॉझिटरी URL                      |
| `license`             | परवाना नाव                         |
| `version`             | प्रोजेक्ट आवृत्ती                  |
| `author`              | लेखकाचे नाव                        |
| `programmingLanguage` | कमांडसाठी प्रोग्रामिंग भाषा       |

**उदाहरण**

```
GET /api/readme/generate/mr?name=MajheApp&description=Application+chaan&programmingLanguage=python
```

`README.mr.md` नावाची `text/markdown` फाइल डाउनलोड परत करते.

---

### POST /api/readme/generate/by-language

विशिष्ट **प्रोग्रामिंग भाषेसाठी** README तयार करा (इंग्रजीत आउटपुट).

**विनंती बॉडी**

| फील्ड                | प्रकार              | आवश्यक | डीफॉल्ट   | वर्णन                            |
|----------------------|---------------------|--------|-----------|----------------------------------|
| `programmingLanguage`| string              | हो     | —         | उदा. `"python"`, `"go"`, `"rust"` |
| `projectName`        | string              | हो     | —         | प्रोजेक्टचे नाव                   |
| `description`        | string              | नाही   | —         | प्रोजेक्टचे वर्णन                 |
| `author`             | string              | नाही   | —         | लेखकाचे नाव                       |
| `features`           | string[]            | नाही   | —         | वैशिष्ट्यांची यादी                |
| `license`            | string              | नाही   | `"MIT"`   | परवाना नाव                        |
| `githubUrl`          | string              | नाही   | —         | GitHub रिपॉझिटरी URL              |
| `version`            | string              | नाही   | `"1.0.0"` | आवृत्ती                           |
| `format`             | `"json"` \| `"raw"` | नाही   | `"json"`  | `"raw"` `.md` फाइल डाउनलोड स्ट्रीम करते |

**उदाहरण विनंती**

```bash
curl -X POST http://localhost:5000/api/readme/generate/by-language \
  -H "Content-Type: application/json" \
  -d '{
    "programmingLanguage": "rust",
    "projectName": "fast-tool",
    "description": "एक अत्यंत जलद CLI युटिलिटी",
    "author": "अलिस",
    "license": "Apache-2.0"
  }'
```

---

### GET /api/readme/generate/by-language/:progLang

क्वेरी पॅरामीटर्सद्वारे प्रोग्रामिंग-भाषा README साठी सुविधा डाउनलोड.

**उदाहरण**

```
GET /api/readme/generate/by-language/rust?projectName=fast-tool&author=Alice
```

`text/markdown` डाउनलोड परत करते.

---

### GET /api/readme/saved

इन-मेमरी स्टोरमध्ये सेव्ह केलेल्या सर्व README एंट्री परत करते (ज्या `save: true` सह तयार केल्या होत्या).

**प्रतिसाद**

```json
{
  "success": true,
  "count": 2,
  "readmes": [
    { "id": "abc123", "language": "mr", "filename": "README.mr.md", "savedAt": "..." }
  ]
}
```

---

### DELETE /api/readme/delete

इन-मेमरी स्टोरमधून एंट्री हटवा. बॉडीशिवाय, सर्व काही हटवते. फिल्टरिंग समर्थन करते.

**विनंती बॉडी (ऐच्छिक)**

| फील्ड                | प्रकार | वर्णन                                           |
|----------------------|--------|-------------------------------------------------|
| `language`           | string | फक्त या बोलल्या जाणाऱ्या भाषेच्या एंट्री हटवा |
| `programmingLanguage`| string | फक्त या प्रोग्रामिंग भाषेच्या एंट्री हटवा     |

दोन्ही फील्ड एकत्र AND फिल्टर लागू करतात.

---

### DELETE /api/readme/delete/:id

त्याच्या ID द्वारे एकल इन-मेमरी एंट्री हटवा.

---

### DELETE /api/readme/file/:language

डिस्कवरून बोलल्या जाणाऱ्या भाषेची README फाइल हटवा.

- `DELETE /api/readme/file/en` → `README.md` काढून टाकते
- `DELETE /api/readme/file/mr` → `README.mr.md` काढून टाकते

---

### DELETE /api/readme/file/bulk

डिस्कवरून अनेक बोलल्या जाणाऱ्या भाषांसाठी README फायली हटवा.

**विनंती बॉडी**

```json
{ "languages": ["en", "mr", "hi"] }
```

---

### DELETE /api/readme/file/all

डिस्कवरून **सर्व** बोलल्या जाणाऱ्या भाषांच्या README फायली हटवा.

---

## API संदर्भ — प्रोग्रामिंग भाषेचा README (स्वतंत्र)

बेस पाथ: `/api/readme/prog`

हे एंडपॉइंट्स स्वतंत्र `readme.js` राउटर वापरतात, जे प्रोग्रामिंग-भाषा-विशिष्ट READMEs तयार करतात (नेहमी इंग्रजीत) बॅजेस, इंस्टॉल/रन/टेस्ट/बिल्ड कमांड, API संदर्भ टेबल, स्क्रीनशॉट्स आणि बरेच काही यांसह.

---

### GET /api/readme/prog/languages

सर्व १२ समर्थित प्रोग्रामिंग भाषांची यादी करा.

**प्रतिसाद**

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

प्रोग्रामिंग भाषेसाठी समृद्ध, बॅज-सजवलेला README तयार करा.

**विनंती बॉडी**

| फील्ड                | प्रकार     | आवश्यक | वर्णन                                           |
|----------------------|------------|--------|-------------------------------------------------|
| `projectName`        | string     | हो     | प्रोजेक्टचे नाव                                 |
| `description`        | string     | हो     | प्रोजेक्टचे वर्णन                               |
| `language`           | string     | हो     | प्रोग्रामिंग भाषा की (उदा. `"python"`)          |
| `authorName`         | string     | नाही   | लेखकाचे प्रदर्शन नाव                            |
| `authorGithub`       | string     | नाही   | GitHub वापरकर्तानाव (रेपो लिंक सक्षम करते)     |
| `repoName`           | string     | नाही   | रिपॉझिटरीचे नाव (GitHub लिंक सक्षम करते)       |
| `features`           | string[]   | नाही   | वैशिष्ट्य बुलेट पॉइंट                           |
| `license`            | string     | नाही   | परवाना (डीफॉल्ट: `"MIT"`)                       |
| `includeContributing`| boolean    | नाही   | योगदान विभाग जोडा                               |
| `includeChangelog`   | boolean    | नाही   | चेंजलॉग विभाग जोडा                              |
| `includeBadges`      | boolean    | नाही   | shields.io बॅजेस जोडा (डीफॉल्ट: true)           |
| `customInstall`      | string     | नाही   | इंस्टॉल कमांड ओव्हरराइड करा                     |
| `customRun`          | string     | नाही   | रन कमांड ओव्हरराइड करा                          |
| `customTest`         | string     | नाही   | टेस्ट कमांड ओव्हरराइड करा                       |
| `customBuild`        | string     | नाही   | बिल्ड कमांड ओव्हरराइड करा                       |
| `environment`        | object[]   | नाही   | Env व्हेरिएबल्स: `[{ key, value, description }]` |
| `apiEndpoints`       | object[]   | नाही   | API टेबल: `[{ method, endpoint, description }]` |
| `screenshots`        | object[]   | नाही   | स्क्रीनशॉट्स: `[{ alt, url }]`                  |
| `acknowledgements`   | string[]   | नाही   | आभार बुलेट पॉइंट                                |

**उदाहरण विनंती**

```bash
curl -X POST http://localhost:5000/api/readme/prog/generate \
  -H "Content-Type: application/json" \
  -d '{
    "projectName": "FastAPI App",
    "description": "एक उच्च-कार्यक्षम Python API",
    "language": "python",
    "authorName": "जेन डो",
    "authorGithub": "janedoe",
    "repoName": "fastapi-app",
    "features": ["Async एंडपॉइंट्स", "ऑटो-जनरेटेड डॉक्स", "JWT auth"],
    "license": "MIT",
    "includeContributing": true,
    "environment": [
      { "key": "DATABASE_URL", "value": "postgresql://...", "description": "Postgres कनेक्शन स्ट्रिंग" }
    ],
    "apiEndpoints": [
      { "method": "GET",  "endpoint": "/health",    "description": "हेल्थ चेक" },
      { "method": "POST", "endpoint": "/api/users",  "description": "वापरकर्ता तयार करा" }
    ]
  }'
```

**प्रतिसाद**

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

`POST /api/readme/prog/generate` सारखेच पण थेट `.md` डाउनलोड म्हणून फाइल स्ट्रीम करते.

`Content-Disposition` हेडर `projectName` ला फाइलनाम स्लग म्हणून वापरते:

```
Content-Disposition: attachment; filename="fastapi-app-README.md"
```

---

### GET /api/readme/prog/template/:language

दिलेल्या प्रोग्रामिंग भाषेसाठी पूर्व-भरलेले विनंती बॉडी टेम्पलेट परत करते — `/generate` ला POST करण्यासाठी तयार.

**उदाहरण**

```
GET /api/readme/prog/template/go
```

**प्रतिसाद**

```json
{
  "success": true,
  "language": "Go",
  "template": {
    "projectName": "माझा उत्तम प्रोजेक्ट",
    "language": "go",
    "customInstall": "go mod download",
    "customRun": "go run main.go",
    ...
  }
}
```

---

### DELETE /api/readme/prog/:language

दिलेल्या प्रोग्रामिंग भाषेसाठी README फाइल (उदा. `README.javascript.md`) डिस्कवरून हटवा.

---

### DELETE /api/readme/prog/bulk

अनेक प्रोग्रामिंग भाषांसाठी README फायली डिस्कवरून हटवा.

**विनंती बॉडी**

```json
{ "languages": ["javascript", "python", "go"] }
```

---

### DELETE /api/readme/prog/all

**सर्व** १२ प्रोग्रामिंग भाषांसाठी README फायली डिस्कवरून हटवा.

---

## समर्थित बोलल्या जाणाऱ्या भाषा

| कोड | भाषा                   | दिशा |
|-----|------------------------|------|
| `en` | English               | LTR  |
| `es` | Spanish (Español)     | LTR  |
| `fr` | French (Français)     | LTR  |
| `de` | German (Deutsch)      | LTR  |
| `zh` | Chinese Simplified    | LTR  |
| `ja` | Japanese (日本語)      | LTR  |
| `ko` | Korean (한국어)        | LTR  |
| `pt` | Portuguese (Português)| LTR  |
| `hi` | Hindi (हिन्दी)         | LTR  |
| `ar` | Arabic (العربية)      | RTL  |
| `ru` | Russian (Русский)     | LTR  |
| `it` | Italian (Italiano)    | LTR  |
| `nl` | Dutch (Nederlands)    | LTR  |
| `tr` | Turkish (Türkçe)      | LTR  |
| `pl` | Polish (Polski)       | LTR  |

---

## समर्थित प्रोग्रामिंग भाषा

| की           | लेबल        | पॅकेज मॅनेजर    | विस्तार   |
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

## स्वतंत्र README सर्व्हर

बोलल्या जाणाऱ्या भाषेच्या README API ची स्वयं-निहित आवृत्ती `readme-server.mjs` मध्ये चालते (MongoDB आवश्यक नाही):

```bash
node readme-server.mjs
# → http://localhost:3456
```

एंडपॉइंट्स मुख्य API (`/api/readme/languages`, `/api/readme/generate`, `/api/readme/generate/bulk`, `/api/readme/generate/all`, `/api/readme/generate/:language`, DELETE मार्ग) प्रतिबिंबित करतात.

दुसरा स्वतंत्र सर्व्हर `readme-api/` मध्ये त्याच्या स्वतःच्या `package.json` सह राहतो:

```bash
cd readme-api && npm install && node server.js
```

---

## पर्यावरण व्हेरिएबल्स

| व्हेरिएबल   | आवश्यक | डीफॉल्ट | वर्णन                                       |
|-------------|--------|---------|---------------------------------------------|
| `MONGO_URI` | हो     | —       | MongoDB कनेक्शन स्ट्रिंग                    |
| `PORT`      | नाही   | `5000`  | मुख्य सर्व्हरसाठी पोर्ट                     |
| `NODE_ENV`  | नाही   | —       | `production` स्टॅटिक सर्व्हिंग सक्षम करते  |

---

## योगदान

योगदानांचे स्वागत आहे! कृपया या चरणांचे पालन करा:

1. रिपॉझिटरी फोर्क करा
2. फीचर ब्रँच तयार करा: `git checkout -b feature/your-feature-name`
3. बदल कमिट करा: `git commit -m "feat: तुमचा बदल वर्णन करा"`
4. ब्रँचवर पुश करा: `git push origin feature/your-feature-name`
5. Pull Request उघडा

---

## परवाना

हा प्रोजेक्ट **ISC** परवान्याखाली परवानाकृत आहे.
