require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json({ limit: "1mb" }));

const PORT = Number(process.env.PORT || 3000);
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "14-studio-whatsapp-agent" });
});

// Meta webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && VERIFY_TOKEN && token === VERIFY_TOKEN) {
    return res.status(200).send(String(challenge || ""));
  }

  return res.sendStatus(403);
});

// Incoming WhatsApp webhook events
app.post("/webhook", (req, res) => {
  // Acknowledge quickly so Meta does not repeatedly retry the webhook.
  res.sendStatus(200);

  const body = req.body;
  if (body && body.object === "whatsapp_business_account") {
    console.log("Received WhatsApp webhook event:", JSON.stringify(body));
  } else {
    console.log("Received webhook payload with unexpected object type.");
  }
});

app.listen(PORT, () => {
  console.log(`14 Studio WhatsApp Agent listening on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
