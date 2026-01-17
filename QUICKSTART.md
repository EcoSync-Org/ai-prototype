# EcoSync - Quick Start Guide

## 🚀 Get Up and Running in 2 Minutes

### Step 1: Install Dependencies

```bash
pnpm install
```

### Step 2: Start Development Server

```bash
pnpm dev
```

### Step 3: Open in Browser

Navigate to [http://localhost:3000](http://localhost:3000)

That's it! 🎉

## 🎯 What You'll See

### Main Dashboard Components:

1. **Energy Overview Chart**
   - Blue line = Energy Usage
   - Green line = Solar Generation
   - Dashed sections = AI Predictions

2. **AI Insight Panel** (Blue/Green gradient box)
   - Shows how AI analyzes your data
   - Displays reasoning steps
   - Key insights and trends

3. **AI Recommendations**
   - Personalized suggestions
   - Click to expand and see AI reasoning
   - Confidence percentages

4. **Prepaid Alert** (Top right section)
   - Days remaining countdown
   - Risk level indicators
   - AI prediction explanation

5. **Savings Simulator**
   - Interactive slider
   - Real-time savings calculations
   - Environmental impact metrics

6. **AI Confidence Panel**
   - Trust indicators
   - Privacy information
   - Model transparency

## 🔄 Real-Time Updates

The dashboard automatically refreshes every 30 seconds to simulate real-time energy monitoring.

## 🎨 Customization

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
}
```

### Adjust AI Predictions

Edit `lib/ai-engine.ts` to modify:
- Energy generation patterns
- Recommendation logic
- Prediction algorithms
- Risk thresholds

### Modify UI Components

All components are in `components/` folder:
- Fully typed with TypeScript
- Reusable and modular
- Easy to customize

## 📱 Responsive Design

The app is fully responsive. Try these viewport sizes:

- **Desktop**: 1920x1080 (optimal)
- **Tablet**: 768x1024
- **Mobile**: 375x667

## 🧪 Testing Different Scenarios

### Simulate High Usage

In `lib/ai-engine.ts`, modify `generateEnergyData()`:

```typescript
usage += 5 + Math.random() * 3; // Increase base usage
```

### Simulate Low Prepaid Balance

In `app/page.tsx`, change initial balance:

```typescript
const [prepaidStatus, setPrepaidStatus] = useState(
  calculatePrepaidStatus(15000, 18.4) // Lower balance
);
```

### Adjust Solar Generation

In `lib/ai-engine.ts`, modify solar calculation:

```typescript
solar = Math.max(0, (6 - distanceFromPeak) * 2.0); // Increase multiplier
```

## 🐛 Common Issues

### Port Already in Use

```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
pnpm dev -p 3001
```

### Module Not Found

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

### Styling Not Applied

```bash
# Rebuild Tailwind
pnpm build
```

## 📊 Understanding the Data

### Energy Values
- Measured in **kWh** (kilowatt-hours)
- Typical household: 15-25 kWh/day
- Solar panel output: 4-8 kWh/day

### Currency
- **RWF**: Rwandan Francs
- Conversion rate: ~1300 RWF = 1 USD
- Grid cost: ~150 RWF per kWh

### CO₂ Emissions
- ~0.5 kg CO₂ per kWh from grid
- Rwanda's grid mix includes hydro + thermal
- Solar energy = 0 emissions

## 🎓 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)

### Tailwind CSS
- [Tailwind Documentation](https://tailwindcss.com/docs)

### React
- [React Documentation](https://react.dev)

## 💡 Next Steps

1. **Explore the Code**: Start with `app/page.tsx`
2. **Modify AI Logic**: Check out `lib/ai-engine.ts`
3. **Customize Components**: Look in `components/` folder
4. **Build Something New**: Use this as a template!

## 🤝 Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Review code comments in each file
- All components are well-documented with TypeScript types

---

**Happy Coding!** 🚀🌍⚡


