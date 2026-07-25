<div align="center">

# 🚀 PulseIQ

**Analyze any website for SEO, accessibility, and performance in seconds.**

A full-stack web application that audits any public webpage and generates a concise SEO report with actionable insights.

**Live Demo:** <LIVE_DEMO_URL> • **GitHub:** <https://github.com/karan789023/PulseIQ>

</div>

---

## ✨ Features

* 🌐 Analyze any public website URL
* ⚡ HTTP status & response time
* 📝 Page title extraction
* 📄 Meta description detection
* 🏷️ H1 heading count
* 🖼️ Images missing ALT text
* 📚 Approximate word count
* 📊 SEO Health Score
* 💡 Smart SEO insights
* ❌ Friendly error handling
* 📱 Responsive UI
* 🧪 Automated backend tests with Jest

---

## 🛠 Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Hot Toast
* Lucide React

### Backend

* Node.js
* Express.js
* Axios
* Cheerio

### Testing

* Jest

---

## 📁 Project Structure

```text
page-pulse/
├── client/
│   ├── components/
│   ├── services/
│   └── App.jsx
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── tests/
│   └── server.js
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

### Backend

```bash
cd server
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🌐 API Contract

### Endpoint

```http
POST /api/analyze
```

### Request

```json
{
  "url": "https://example.com"
}
```

### Success Response

```json
{
  "success": true,
  "data": {
    "status": 200,
    "responseTime": 214,
    "title": "Example Domain",
    "metaDescription": "Example Description",
    "h1Count": 1,
    "missingAltImages": 0,
    "wordCount": 320,
    "seoScore": 92
  }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_URL",
    "message": "Please enter a valid URL starting with http:// or https://"
  }
}
```

---

## ⚠️ Error Handling

The application gracefully handles:

* Invalid URL
* Empty URL
* HTTP 404 / 500
* Request timeout
* DNS failure
* Connection refused
* Network errors
* Redirect loops
* SSL certificate errors
* Non-HTML responses
* Empty HTML responses
* Invalid HTML structure

Every failure returns a consistent JSON response with an error code and user-friendly message.

---

## 🧪 Testing

Framework: **Jest**

Implemented test cases:

* ✅ Happy Path
* ✅ Invalid URL
* ✅ Non-HTML Response
* ✅ HTTP 404
* ✅ Request Timeout

Run tests:

```bash
npm test
```

---

## 💡 Design Decisions

### 1. Controller-Service Separation

The controller is responsible for request validation and HTTP responses, while the service contains all website analysis logic. This keeps responsibilities clear and improves maintainability.

### 2. Standardized API Responses

All endpoints return a consistent response format for both success and failure, simplifying frontend integration and error handling.

### 3. Cheerio for HTML Parsing

Cheerio provides a lightweight and fast HTML parsing solution for static pages without the overhead of launching a headless browser.

---

## 🤖 AI Usage

AI tools were used to assist with brainstorming, debugging, improving error handling, reviewing code quality, creating test cases, and refining documentation. The final implementation, architecture, testing, deployment, and verification were completed by me.

---

## 🚀 Future Improvements

* Support JavaScript-rendered pages using Puppeteer
* Lighthouse-style performance audits
* Accessibility analysis
* Canonical & Open Graph checks
* Structured data validation
* Robots.txt & sitemap analysis
* PDF report export
* Historical comparison of scans
* Batch URL analysis

---

## 📸 Screenshots

Add screenshots for:

* Home Page
* Analysis Dashboard
* Error Handling Example
* Mobile Responsive View

---

## 🔗 Links

**Live Demo:** <LIVE_DEMO_URL>

**GitHub Repository:** <https://github.com/karan789023/PulseIQ>

---

## 👨‍💻 Author

**Karan Yadav**

Built as part of the **Digital Heroes Software Development Internship Assessment**.
