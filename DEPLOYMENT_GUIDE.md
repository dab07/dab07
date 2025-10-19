# 🚀 Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (free)
- Your code pushed to GitHub

## Deployment Steps

### 1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 2. **Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository

### 3. **Configure Build Settings**
Vercel should auto-detect the settings from `vercel.json`, but verify:
- **Framework Preset**: Other
- **Build Command**: `expo export -p web`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### 4. **Environment Variables** (if needed)
If you're using Supabase or other services, add environment variables:
- Go to Project Settings → Environment Variables
- Add your variables (e.g., `EXPO_PUBLIC_SUPABASE_URL`)

### 5. **Deploy**
- Click "Deploy"
- Wait for build to complete
- Your app will be live at `https://your-project.vercel.app`

## 🔧 **Local Testing Before Deployment**

Test web build locally:
```bash
# Build for web
npm run build

# Serve locally (optional)
npx serve dist
```

## 📱 **Mobile App Deployment**

For mobile apps, use:
- **iOS**: App Store (requires Apple Developer account)
- **Android**: Google Play Store or Expo Application Services (EAS)

```bash
# Install EAS CLI
npm install -g @expo/eas-cli

# Build for mobile
eas build --platform android
eas build --platform ios
```

## 🌐 **Custom Domain** (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## 🚨 **Common Issues & Solutions**

### Build Fails
- Check if all dependencies are in `package.json`
- Ensure no mobile-only code in web build
- Check console for specific errors

### Routing Issues
- Expo Router should work automatically
- The `vercel.json` handles SPA routing

### Environment Variables
- Use `EXPO_PUBLIC_` prefix for client-side variables
- Add them in Vercel dashboard

### Performance
- Images: Use `expo-image` for optimization
- Bundle size: Check with `npx expo export --analyze`

## 📊 **Monitoring**
- Vercel provides analytics and performance metrics
- Check deployment logs for any issues
- Use Vercel's preview deployments for testing

## 🔄 **Automatic Deployments**
- Every push to `main` branch auto-deploys
- Pull requests get preview deployments
- Perfect for continuous deployment workflow