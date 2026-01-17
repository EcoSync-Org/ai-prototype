# DeepSeek AI Integration Setup Guide

## 🧠 Real AI Power with DeepSeek

Your EcoSync app now includes **real AI capabilities** powered by DeepSeek!

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Get DeepSeek API Key

1. Go to [DeepSeek Platform](https://platform.deepseek.com)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-...`)

### Step 2: Configure Environment

Create a `.env.local` file in your project root:

```bash
DEEPSEEK_API_KEY=sk-your-actual-api-key-here
DEEPSEEK_API_URL=https://api.deepseek.com/v1
DEEPSEEK_MODEL=deepseek-chat
DEEPSEEK_VISION_MODEL=deepseek-vl
```

**Important**: Never commit `.env.local` to git!

### Step 3: Restart Dev Server

```bash
pnpm dev
```

That's it! Your app now uses real AI! 🎉

---

## 🎯 What DeepSeek AI Does

### 1. **Energy Pattern Analysis**
- Analyzes 24-hour energy data
- Identifies peak usage hours
- Finds optimal solar windows
- Detects consumption trends
- Generates insights about waste/optimization

**Endpoint**: `/api/analyze-energy`

### 2. **Smart Recommendations**
- Generates personalized action items
- Provides confidence scores (70-95%)
- Explains reasoning behind each suggestion
- Prioritizes by impact (high/medium/low)
- Includes optimal timing for actions

**Endpoint**: `/api/recommendations`

### 3. **Meter Reading (Vision AI)**
- Reads energy meter displays
- Extracts numerical values
- Identifies units (kWh, kW, RWF)
- Provides confidence scores
- Explains what it sees

**Endpoint**: `/api/analyze-image` (type: meter)

### 4. **Solar Panel Inspection (Vision AI)**
- Assesses panel condition
- Detects dirt, damage, shading
- Estimates efficiency (0-100%)
- Identifies specific issues
- Provides maintenance recommendations

**Endpoint**: `/api/analyze-image` (type: solar)

---

## 📊 How It Works

### Architecture

```
User Interface
     ↓
API Routes (/app/api/*)
     ↓
DeepSeek AI Engine (lib/deepseek-ai-engine.ts)
     ↓
DeepSeek Client (lib/deepseek-client.ts)
     ↓
DeepSeek API (https://api.deepseek.com/v1)
```

### Data Flow Example

```typescript
// 1. User uploads meter image
const image = "base64_encoded_image";

// 2. Frontend calls API
const response = await fetch('/api/analyze-image', {
  method: 'POST',
  body: JSON.stringify({ image, type: 'meter' })
});

// 3. API calls DeepSeek Vision
const result = await analyzeMeterImage(image);

// 4. DeepSeek returns analysis
{
  reading: 245.8,
  unit: "kWh",
  confidence: 92,
  analysis: "Digital meter showing current consumption..."
}

// 5. Frontend displays results
```

---

## 🔧 Using the AI Features

### In Your Components

```typescript
'use client';
import { useState } from 'react';

export default function MyComponent() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeEnergy = async (data) => {
    setLoading(true);
    try {
      const response = await fetch('/api/analyze-energy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data }),
      });
      
      const result = await response.json();
      setAnalysis(result.analysis);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>AI is analyzing...</p>}
      {analysis && <pre>{JSON.stringify(analysis, null, 2)}</pre>}
    </div>
  );
}
```

### Image Upload Component

Already built! Use the `ImageUpload` component:

```typescript
import ImageUpload from '@/components/ImageUpload';

// For meter reading
<ImageUpload 
  type="meter" 
  onAnalysisComplete={(result) => console.log(result)}
/>

// For solar panel inspection
<ImageUpload 
  type="solar"
  onAnalysisComplete={(result) => console.log(result)}
/>
```

---

## 💰 Cost Estimation

DeepSeek is **very affordable** compared to other AI APIs:

### Pricing (as of 2024)

**Text Models (deepseek-chat)**:
- Input: ~$0.14 per 1M tokens
- Output: ~$0.28 per 1M tokens

**Vision Models (deepseek-vl)**:
- Similar to text pricing
- Image processing included

### Example Costs

**Energy Analysis** (1 request):
- Input: ~500 tokens
- Output: ~300 tokens
- **Cost**: ~$0.0001 (less than a cent!)

**Meter Reading** (1 image):
- Image + prompt: ~800 tokens
- Output: ~200 tokens
- **Cost**: ~$0.0002

**Daily Usage** (100 analyses + 20 images):
- Text: 100 × $0.0001 = $0.01
- Images: 20 × $0.0002 = $0.004
- **Total**: ~$0.014/day = **$0.42/month**

**Very affordable for an MVP!** 🎉

---

## 🔒 Security Best Practices

### 1. **Never Expose API Key**
```bash
# ✅ Good - Server-side only
DEEPSEEK_API_KEY=sk-xxx

# ❌ Bad - Never use NEXT_PUBLIC_
NEXT_PUBLIC_DEEPSEEK_API_KEY=sk-xxx
```

### 2. **Use API Routes**
All DeepSeek calls go through `/app/api/*` routes (server-side).

### 3. **Rate Limiting** (Production)
Add rate limiting to API routes:

```typescript
// Example with upstash/ratelimit
import { Ratelimit } from '@upstash/ratelimit';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '1 m'),
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);
  
  if (!success) {
    return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
  }
  
  // ... rest of handler
}
```

### 4. **Input Validation**
Always validate user inputs before sending to AI.

---

## 🧪 Testing the Integration

### 1. **Check Configuration**

```bash
# In your terminal
echo $DEEPSEEK_API_KEY
# Should output your key
```

### 2. **Test API Endpoint**

```bash
# Test energy analysis
curl -X POST http://localhost:3000/api/analyze-energy \
  -H "Content-Type: application/json" \
  -d '{"data": [{"time": "14:00", "usage": 4.5, "solar": 3.2}]}'
```

### 3. **Test in Browser**

1. Run `pnpm dev`
2. Open browser console
3. Run:

```javascript
fetch('/api/analyze-energy', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    data: [
      { time: '12:00', usage: 3.5, solar: 5.2 },
      { time: '13:00', usage: 4.1, solar: 5.8 },
      { time: '14:00', usage: 4.5, solar: 5.5 }
    ]
  })
})
.then(r => r.json())
.then(console.log);
```

---

## 🐛 Troubleshooting

### Error: "DeepSeek API key not configured"

**Solution**: Check `.env.local` file exists and has correct key.

```bash
# Verify file exists
ls -la .env.local

# Check content (be careful not to expose key!)
cat .env.local | grep DEEPSEEK_API_KEY
```

### Error: "Failed to analyze"

**Possible causes**:
1. Invalid API key
2. Network issues
3. Rate limit exceeded
4. Invalid input format

**Solution**: Check browser console and server logs for details.

### Error: "Response format invalid"

**Solution**: DeepSeek might not be returning JSON. Check API response:

```typescript
console.log('Raw response:', response.choices[0]?.message?.content);
```

### Image Analysis Not Working

**Checklist**:
- ✅ Image is less than 5MB
- ✅ Image is valid format (JPG, PNG, WEBP)
- ✅ Base64 encoding is correct
- ✅ Using `deepseek-vl` model

---

## 📈 Monitoring Usage

### DeepSeek Dashboard

1. Go to [platform.deepseek.com](https://platform.deepseek.com)
2. Check usage statistics
3. Monitor costs
4. Set up alerts

### Application Logs

Add logging to track AI usage:

```typescript
// In your API routes
console.log('[DeepSeek] Analysis request', {
  timestamp: new Date().toISOString(),
  type: 'energy-analysis',
  dataPoints: data.length,
});
```

---

## 🚀 Next Steps

### 1. **Add to Main Dashboard**

Update `app/page.tsx` to use real AI:

```typescript
// Replace simulated analysis with real AI
const analyzeWithRealAI = async () => {
  const response = await fetch('/api/analyze-energy', {
    method: 'POST',
    body: JSON.stringify({ data: energyData })
  });
  const { analysis } = await response.json();
  setAnalysis(analysis);
};
```

### 2. **Add Image Upload UI**

Add `ImageUpload` component to your dashboard:

```typescript
import ImageUpload from '@/components/ImageUpload';

// In your page
<ImageUpload type="meter" />
<ImageUpload type="solar" />
```

### 3. **Hybrid Approach**

Use simulated data as fallback:

```typescript
const getAnalysis = async (data) => {
  try {
    // Try real AI first
    const response = await fetch('/api/analyze-energy', {
      method: 'POST',
      body: JSON.stringify({ data })
    });
    return await response.json();
  } catch (error) {
    // Fallback to simulated
    console.warn('Using simulated AI:', error);
    return analyzeEnergyPatterns(data);
  }
};
```

---

## ✅ Verification Checklist

- [ ] DeepSeek API key obtained
- [ ] `.env.local` file created
- [ ] API key added to environment
- [ ] Dev server restarted
- [ ] API routes tested
- [ ] Image upload component working
- [ ] Error handling implemented
- [ ] Costs monitored

---

## 📚 Additional Resources

- [DeepSeek Documentation](https://platform.deepseek.com/docs)
- [DeepSeek API Reference](https://platform.deepseek.com/api-docs)
- [OpenAI SDK Docs](https://github.com/openai/openai-node) (compatible)

---

**You now have REAL AI powering your energy optimization platform!** 🎉🧠⚡

**Questions?** Check the troubleshooting section or DeepSeek docs.

