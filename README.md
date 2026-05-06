# N8N.Meander.One

Telegram AI agent that replies to customer messages automatically, logs every conversation to Google Sheets, and provides a real-time admin dashboard.

---

## Tech Stack

**Frontend**
- React 18 + Vite
- React Router DOM
- Recharts
- Plain CSS (no UI library)

**Automation**
- n8n (workflow automation)
- Twilio (Telegram API)
- Groq — llama3-8b-8192

**Storage**
- Google Sheets (conversation logs)

**Auth**
- Role-based via `.env` (Admin / User)

---

## Prerequisites

- Node.js v18 or above
- An n8n instance (cloud or self-hosted)
- Twilio account with Telegram enabled
- Google Sheets with correct column headers

---

## Setup

**1. Install dependencies**

```bash
git clone https://github.com/your-username/n8n-meander-one.git
cd n8n-meander-one
npm install
```

**2. Create `.env` file**

```bash
cp .env.example .env
```

Fill in your values:

```env
VITE_N8N_URL=https://your-n8n-url/webhook/dashboard-logs

VITE_ADMIN_EMAIL=admin@ai.com
VITE_ADMIN_PASS=yourpassword

VITE_USER_EMAIL=user@.com
VITE_USER_PASS=yourpassword
```

**3. Run**

```bash
npm run dev
```

Visit `http://localhost:5173/login`

---

## Project Structure

```
src/
├── auth/
│   ├── AuthContext.jsx
│   └── ProtectedRoute.jsx
├── components/
│   ├── Sidebar.jsx
│   ├── StatsRow.jsx
│   ├── ConversationTable.jsx
│   ├── ChatPreview.jsx
│   ├── ModelStatus.jsx
│   └── SheetsLog.jsx
├── hooks/
│   └── useConversations.js
├── pages/
│   ├── LoginPage.jsx
│   ├── AccessDenied.jsx
│   ├── ConversationsPage.jsx
│   ├── AnalyticsPage.jsx
│   ├── UsersPage.jsx
│   ├── AIConfigPage.jsx
│   ├── FailedPage.jsx
│   ├── SheetsLogsPage.jsx
│   └── N8nPage.jsx
├── data/
│   └── dummy.js
├── App.jsx
├── main.jsx
└── index.css
public/
└── landing.html
```

---

## n8n Workflows

Two workflows are needed — both must be **Active**.

### Workflow 1 — Telegram Agent

```
Twilio webhook → Prepare data → AI Agent (Groq)
                                      ↓
                          Send Telegram reply → Google Sheets
```

### Workflow 2 — Dashboard API

```
GET /dashboard-logs → Read Google Sheets → Respond with JSON
```

Setup for Workflow 2:

1. Webhook node — method `GET`, path `dashboard-logs`, respond using "Respond to Webhook Node"
2. Google Sheets node — Get Rows, return all, no filters
3. Respond to Webhook node — JSON body:

```
{{ $('Get row(s) in sheet').all().map(item => item.json) }}
```

4. Activate workflow, copy **Production URL** to `.env`

### Google Sheets column headers (Row 1)

```
id | name | phone | message | ai_reply | status | topic | timestamp
```

---

## Roles

| Role | Access |
|---|---|
| Admin | Full dashboard |
| User | Login only — no dashboard |

---

## Build & Deploy

```bash
npm run build
```

Deploy the `dist/` folder to Netlify or Vercel.
Add all `VITE_` environment variables in your hosting dashboard.

---

## Environment Variables

| Key | Description |
|---|---|
| `VITE_N8N_URL` | n8n webhook URL (Production, not Test) |
| `VITE_ADMIN_EMAIL` | Admin login email |
| `VITE_ADMIN_PASS` | Admin password |
| `VITE_USER_EMAIL` | User login email |
| `VITE_USER_PASS` | User password |

---

## Notes

- Always restart the dev server after editing `.env`
- Use Production URL from n8n, not the Test URL
- If dashboard shows "n8n offline" — check that Workflow 2 is Active
- Never commit `.env` to version control

---

