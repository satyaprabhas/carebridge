# Deploying CareBridge with Server-Side Automated Reminders on Render

This guide explains how to deploy **CareBridge** on [Render](https://render.com) so medicine reminder messages are sent to registered mobile phones automatically, **even when users close the website or turn off their computers**.

---

## 1. Alert Providers Supported
CareBridge supports multiple alert channels:

1. **Telegram Mobile Alerts (100% Free Forever - Recommended)**:
   - Delivers real, loud push notifications directly to the patient's phone at scheduled reminder times.
   - Independent of the website or browser being open.
   - Requires zero payments, no credit card, and no business registration.
2. **Fast2SMS (Carrier SMS India)**:
   - Directly dispatches carrier SMS to Indian numbers (+91).
   - Activated by setting `FAST2SMS_API_KEY`.
3. **Twilio (Carrier SMS Worldwide)**:
   - Configured with `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`.

---

## 2. Deploy to Render (Web Service)
1. Push your repository to GitHub or GitLab.
2. Log in to [dashboard.render.com](https://dashboard.render.com) and click **New > Web Service**.
3. Connect your repository.
4. Set the following build and start configurations:
   - **Name**: `carebridge`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: `Free`

---

## 3. Configure Server Environment Variables on Render
In your Render Web Service dashboard, go to the **Environment** tab and add the following secret variables:

| Key | Example Value | Description |
|---|---|---|
| `TELEGRAM_BOT_TOKEN` | `8970488196:AAHZ...` | Telegram Bot token for free mobile alerts |
| `TELEGRAM_CHAT_ID` | `1435468275` | User's recipient Telegram Chat ID |
| `TELEGRAM_BOT_USERNAME` | `carebridge_medicinealert_bot` | Bot username |
| `SMS_PROVIDER` | `fast2sms` or `twilio` | Preferred carrier SMS route |
| `FAST2SMS_API_KEY` | `your_api_key` | Optional Fast2SMS Key |
| `TWILIO_ACCOUNT_SID` | `ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx` | Optional Twilio SID |
| `TWILIO_AUTH_TOKEN` | `your_auth_token` | Optional Twilio Token |
| `TWILIO_PHONE_NUMBER` | `+1xxxxxxxxxx` | Optional Twilio virtual number |

Click **Save Changes**. Render will automatically deploy with the credentials active.

---

## 4. Keeping Render Free Instance Awake (Continuous 24/7 Reminders)
Render's free web service goes to sleep after 15 minutes of inbound HTTP inactivity:
- To keep the server background timer running continuously 24/7 without paying for a paid server:
  1. Go to [cron-job.org](https://cron-job.org) (100% free) or [uptimerobot.com](https://uptimerobot.com).
  2. Create a free recurring HTTP ping to your Render URL (e.g. `https://carebridge.onrender.com/api/alerts/config`) every **10 minutes**.
  3. This ensures the Node.js server stays awake 24/7, continuously checking and sending medicine reminders right on time.

---

## 5. Testing the Automated Reminder Flow
1. Open your deployed CareBridge site.
2. Go to the **Medicine Alerts** tab.
3. Your mobile phone number is registered.
4. Click **⚡ Send Test SMS Now** — your phone will immediately receive the test notification.
5. Scheduled medicine reminders will now automatically buzz your phone at each scheduled dose time!
