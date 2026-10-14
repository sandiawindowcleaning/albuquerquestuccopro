# Google Search Console for Claude Code

A small local MCP server that lets Claude Code read this site's Google Search
Console data and submit the sitemap. It runs on your Mac only; nothing is hosted.
It's registered for this project in `/.mcp.json`, so it's available whenever
Claude Code is opened in this repo.

## Tools

| Tool | What it does |
|---|---|
| `gsc_list_sites` | Properties the account can see |
| `gsc_search_analytics` | Clicks, impressions, CTR, position by query / page / country / device / date |
| `gsc_inspect_url` | Is a URL indexed, last crawl, Google's chosen canonical, rich results |
| `gsc_list_sitemaps` | Submitted sitemaps, errors, URL counts |
| `gsc_submit_sitemap` | Submit or resubmit the sitemap (the only tool that changes anything) |

## One-time setup (about 10 minutes)

**1. Verify the site in Search Console** (once the domain points at Netlify)
- Go to https://search.google.com/search-console → Add property → **Domain** →
  `albuquerquestuccopro.com`.
- Copy the TXT record it shows, add it in GoDaddy DNS (Type TXT, Name `@`),
  then click Verify.
- Submit the sitemap: Sitemaps → `sitemap.xml`. (Or ask Claude to once
  connected.)

**2. Create a Google Cloud service account**
- https://console.cloud.google.com → create a project (e.g. `albuquerquestucco-seo`).
- APIs & Services → Library → **Google Search Console API** → Enable.
- IAM & Admin → Service Accounts → Create service account (e.g. `gsc-reader`).
  No roles needed. Done.
- Open it → Keys → Add key → Create new key → **JSON**. A file downloads.

**3. Put the key where the server looks for it** (never inside the repo)
```bash
mkdir -p ~/.config/gsc-mcp && mv ~/Downloads/<downloaded-key>.json ~/.config/gsc-mcp/albuquerquestucco.json && chmod 600 ~/.config/gsc-mcp/albuquerquestucco.json
```

**4. Give the service account access to the property**
- Search Console → Settings → Users and permissions → Add user.
- Email: the service account's address (ends in `.iam.gserviceaccount.com`,
  shown in the key file as `client_email`).
- Permission: **Full** (needed to submit sitemaps) or **Restricted** (read-only).

**5. Connect**
- If this folder is new on the machine: `npm install --prefix tools/gsc-mcp`
- Quit and reopen Claude Code in this project, approve the
  `google-search-console` server when asked, then run `/mcp` to confirm it's
  connected. In the desktop app, check the session's connectors list.

## Things to ask Claude once connected
- "What queries is the site showing up for this month?"
- "Which city pages get impressions but few clicks?"
- "Is /service-areas/katy/ indexed? What canonical did Google pick?"
- "Resubmit the sitemap."

## Options
- `GSC_READONLY=1` in `/.mcp.json` env: read-only scope, sitemap submission off.
- Prefer your own Google login over a service account? Install the gcloud CLI and run
  `gcloud auth application-default login --scopes=https://www.googleapis.com/auth/webmasters,https://www.googleapis.com/auth/cloud-platform`,
  then remove `GSC_KEY_FILE` from `/.mcp.json`.

New properties take a few days before Search Console has any data.
