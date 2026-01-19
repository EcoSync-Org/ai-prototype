# Google Gemini FREE API Setup

## 🎉 Great News: Image Analysis is Now FREE!

We've switched from OpenAI (paid) to **Google Gemini** (FREE tier) for image analysis!

---

## 🚀 Quick Setup (2 Minutes)

### Step 1: Get Your FREE Gemini API Key

1. Go to **https://aistudio.google.com/app/apikey**
2. Sign in with your Google account (or create one - it's free!)
3. Click **"Create API Key"**
4. Copy the key (it will look like: `AIza...`)

**That's it!** No credit card required! 🎉

### Step 2: Add to Your `.env.local` File

Add this line to your `.env.local` file:

```bash
GEMINI_API_KEY=AIza-your-actual-key-here
```

**Quick command:**
```bash
echo GEMINI_API_KEY=your-key-here >> .env.local
```

### Step 3: Restart Your Server

```bash
# Stop current server (Ctrl+C)
pnpm dev
```

---

## ✅ What's Changed

- ✅ **Image Analysis**: Now uses Google Gemini (FREE)
- ✅ **Text Analysis**: Still uses DeepSeek (your existing key)
- ✅ **No Payment Required**: Everything works on free tiers!

---

## 💰 Free Tier Limits

Google Gemini Free Tier includes:
- **15 requests per minute**
- **1,500 requests per day**
- **No credit card required**
- **No expiration** (as long as you stay within limits)

**Perfect for development and testing!** 🎉

---

## 🎯 How It Works Now

```
Text Analysis (Energy Patterns, Recommendations)
    ↓
DeepSeek API (FREE) ✅

Image Analysis (Meter Reading, Solar Panels)
    ↓
Google Gemini API (FREE) ✅
```

---

## 🐛 Troubleshooting

### "Gemini API key not configured"
- Make sure you added `GEMINI_API_KEY` to `.env.local`
- Restart your dev server after adding the key

### "API quota exceeded"
- You've hit the free tier limit (15/min or 1500/day)
- Wait a minute and try again
- Or check your usage at https://aistudio.google.com

### "API key is invalid"
- Double-check you copied the full key
- Make sure there are no extra spaces
- Get a new key if needed

---

## 📚 Resources

- **Get API Key**: https://aistudio.google.com/app/apikey
- **Gemini Docs**: https://ai.google.dev/docs
- **Free Tier Info**: https://ai.google.dev/pricing

---

**You're all set! Image analysis is now completely FREE!** 🎉✨


