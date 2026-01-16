# EcoSync Deployment Guide

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended)
**Easiest and fastest deployment for Next.js**

1. **Install Vercel CLI**:
```bash
npm i -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Follow prompts**:
- Login to Vercel account
- Link to project
- Confirm settings
- Deploy!

**URL**: Your app will be live at `https://your-app.vercel.app`

**Automatic Features**:
- ✅ SSL/HTTPS
- ✅ CDN distribution
- ✅ Automatic builds on git push
- ✅ Preview deployments
- ✅ Analytics

---

### Option 2: Netlify
**Great alternative with easy setup**

1. **Install Netlify CLI**:
```bash
npm i -g netlify-cli
```

2. **Build the project**:
```bash
pnpm build
```

3. **Deploy**:
```bash
netlify deploy --prod
```

**Or use the Netlify Dashboard**:
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site"
3. Connect your Git repository
4. Set build command: `pnpm build`
5. Set publish directory: `.next`
6. Deploy!

---

### Option 3: Docker
**For self-hosting or cloud platforms**

1. **Create Dockerfile**:
```dockerfile
FROM node:20-alpine AS base

# Install pnpm
RUN npm install -g pnpm

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Production
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

2. **Update next.config.ts**:
```typescript
const nextConfig = {
  output: 'standalone',
};

export default nextConfig;
```

3. **Build and run**:
```bash
docker build -t ecosync .
docker run -p 3000:3000 ecosync
```

---

### Option 4: Static Export
**For static hosting (GitHub Pages, S3, etc.)**

⚠️ **Note**: This project uses client-side features, so full static export may require adjustments.

1. **Update next.config.ts**:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

2. **Build**:
```bash
pnpm build
```

3. **Deploy the `out/` directory** to your static host.

---

## 🔧 Pre-Deployment Checklist

### 1. Environment Setup
```bash
# Ensure all dependencies are installed
pnpm install

# Run linter
pnpm lint

# Build locally to test
pnpm build

# Test production build
pnpm start
```

### 2. Configuration

**Update metadata in `app/layout.tsx`**:
```typescript
export const metadata: Metadata = {
  title: "EcoSync - AI-Powered Energy Optimization",
  description: "Your custom description",
  keywords: ["solar", "energy", "AI", "sustainability"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "EcoSync",
    description: "AI-powered energy optimization",
    url: "https://your-domain.com",
    siteName: "EcoSync",
    images: [
      {
        url: "https://your-domain.com/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};
```

### 3. Performance Optimization

**Add to next.config.ts**:
```typescript
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Optional: Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  
  // Optional: Bundle analyzer (development only)
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
  //     config.plugins.push(
  //       new BundleAnalyzerPlugin({
  //         analyzerMode: 'static',
  //         openAnalyzer: false,
  //       })
  //     );
  //   }
  //   return config;
  // },
};

export default nextConfig;
```

### 4. Security Headers

**Create `middleware.ts` in root**:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  );

  return response;
}

export const config = {
  matcher: '/:path*',
};
```

---

## 🌐 Custom Domain Setup

### Vercel:
1. Go to project settings
2. Add domain
3. Follow DNS configuration
4. Wait for SSL provisioning (automatic)

### Netlify:
1. Go to domain settings
2. Add custom domain
3. Configure DNS records
4. SSL certificate issued automatically

---

## 📊 Analytics Integration

### Google Analytics

**Install package**:
```bash
pnpm add @next/third-parties
```

**Add to `app/layout.tsx`**:
```typescript
import { GoogleAnalytics } from '@next/third-parties/google';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics gaId="G-XXXXXXXXXX" />
      </body>
    </html>
  );
}
```

### Vercel Analytics

**Install**:
```bash
pnpm add @vercel/analytics
```

**Add to `app/layout.tsx`**:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## 🔍 SEO Optimization

### 1. Create sitemap.xml

**Create `app/sitemap.ts`**:
```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ];
}
```

### 2. Create robots.txt

**Create `app/robots.ts`**:
```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://your-domain.com/sitemap.xml',
  };
}
```

### 3. Add favicon

Replace `app/favicon.ico` with your custom favicon.

### 4. Add Open Graph image

Create `app/opengraph-image.png` (1200x630px).

---

## 🚨 Monitoring & Error Tracking

### Sentry Integration

```bash
pnpm add @sentry/nextjs
```

**Initialize Sentry**:
```bash
npx @sentry/wizard@latest -i nextjs
```

---

## 🧪 Testing Before Deploy

### 1. Local Production Build
```bash
pnpm build
pnpm start
```

### 2. Lighthouse Audit
```bash
npm install -g lighthouse
lighthouse http://localhost:3000 --view
```

**Target Scores**:
- Performance: >90
- Accessibility: >95
- Best Practices: >95
- SEO: >95

### 3. Browser Testing
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

### 4. Device Testing
- ✅ iPhone (Safari)
- ✅ Android (Chrome)
- ✅ iPad
- ✅ Desktop

---

## 📈 Post-Deployment

### 1. Verify Deployment
```bash
curl -I https://your-domain.com
```

Check for:
- ✅ 200 OK status
- ✅ HTTPS enabled
- ✅ Proper headers
- ✅ Fast response time

### 2. Test Functionality
- [ ] All components render
- [ ] Charts display correctly
- [ ] Slider works
- [ ] Real-time updates function
- [ ] Mobile responsive
- [ ] No console errors

### 3. Performance Check
- [ ] First Contentful Paint < 1.8s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Time to Interactive < 3.8s
- [ ] Cumulative Layout Shift < 0.1

### 4. SEO Verification
```bash
# Check if indexed
site:your-domain.com
```

---

## 🔄 Continuous Deployment

### GitHub Actions Example

**Create `.github/workflows/deploy.yml`**:
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          
      - name: Install pnpm
        run: npm install -g pnpm
        
      - name: Install dependencies
        run: pnpm install
        
      - name: Build
        run: pnpm build
        
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 💰 Cost Estimation

### Free Tier (Suitable for MVP)

**Vercel**:
- ✅ 100GB bandwidth/month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Edge network
- **Cost**: $0/month

**Netlify**:
- ✅ 100GB bandwidth/month
- ✅ 300 build minutes/month
- ✅ Automatic HTTPS
- **Cost**: $0/month

### Paid Plans (Scale Up)

**Vercel Pro**:
- 1TB bandwidth
- Advanced analytics
- Team collaboration
- **Cost**: $20/month

**Netlify Pro**:
- 1TB bandwidth
- Build plugins
- Role-based access
- **Cost**: $19/month

---

## 📞 Support Resources

### Vercel
- [Documentation](https://vercel.com/docs)
- [Community Forum](https://github.com/vercel/next.js/discussions)
- Support email (Pro plan)

### Netlify
- [Documentation](https://docs.netlify.com)
- [Community Forum](https://answers.netlify.com)
- Support ticket system

### Next.js
- [Official Docs](https://nextjs.org/docs)
- [GitHub Issues](https://github.com/vercel/next.js/issues)
- [Discord Community](https://discord.gg/nextjs)

---

## ✅ Deployment Checklist

- [ ] Dependencies installed
- [ ] Build successful locally
- [ ] No linting errors
- [ ] Metadata updated
- [ ] Custom domain configured (optional)
- [ ] Analytics added (optional)
- [ ] SEO files created
- [ ] Security headers set
- [ ] Error tracking configured (optional)
- [ ] Deployment successful
- [ ] Site accessible via HTTPS
- [ ] All features working
- [ ] Mobile responsive verified
- [ ] Performance acceptable

---

**Your EcoSync MVP is ready to deploy!** 🚀

Choose your platform, follow the steps, and go live in minutes!

**Recommended**: Start with Vercel for the easiest deployment experience with Next.js.

