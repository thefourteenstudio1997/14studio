# 14 Studio WhatsApp Agent — Starter Package

A starter Node.js webhook for the WhatsApp Business Cloud API. This package is intended to be uploaded to the private GitHub repository `14-studio-whatsapp-agent`.

## Included files
- `server.js` — webhook verification and incoming-message endpoint
- `package.json` — dependencies and start command
- `.env.example` — environment-variable template
- `.gitignore` — keeps secrets and dependencies out of Git
- `Procfile` — generic start command for supported hosts

## Important
This is a starter scaffold, not a fully deployed WhatsApp bot. It is not connected to WhatsApp until you configure Meta's WhatsApp Cloud API and deploy it to a public HTTPS host. Incoming webhook events are logged; automated replies are not implemented yet.

Keep the GitHub repository **Private**. Never commit real access tokens, app secrets, phone-number IDs, or verification tokens.

## Upload to GitHub
1. Download and unzip this package.
2. Open your existing `14-studio-whatsapp-agent` repository.
3. Choose **Add file → Upload files**.
4. Upload the files inside the extracted folder (not the ZIP itself).
5. Commit the changes.

## Run locally
1. Install Node.js 18 or later.
2. In this folder, run `npm install`.
3. Copy `.env.example` to `.env` and set a long random `VERIFY_TOKEN`.
4. Run `npm start`.

For local webhook testing, expose the server through an HTTPS tunnel. Then enter the public HTTPS URL plus `/webhook` in Meta for Developers, use the same verify token, and subscribe to the `messages` webhook field.

## Environment variables
- `PORT` — server port (defaults to `3000`)
- `VERIFY_TOKEN` — your own webhook verification string
- `WHATSAPP_ACCESS_TOKEN` — optional for future send-message functionality; do not put the real value in GitHub
- `WHATSAPP_PHONE_NUMBER_ID` — optional for future send-message functionality; do not put the real value in GitHub
- `GRAPH_API_VERSION` — Graph API version used when sending messages in a future extension

## Current behavior
- Responds to Meta's webhook verification challenge when the verify token matches.
- Accepts POST webhook notifications at `/webhook` and logs the payload.
- Provides `/health` for a basic health check.
- Does not send replies or store customer data.
