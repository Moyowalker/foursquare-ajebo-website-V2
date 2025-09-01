# Netlify Deployment Guide for Foursquare Ajebo Website

## Prerequisites

1. **GitHub Account**: Your code must be on GitHub (which it already is)
2. **Netlify Account**: Sign up at [netlify.com](https://netlify.com) (free account is sufficient)
3. **Repository Access**: Ensure your GitHub repository is public or you have proper permissions

## Step-by-Step Deployment Process

### Step 1: Prepare Your Repository

1. **Ensure all changes are committed and pushed to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

### Step 2: Connect to Netlify

1. **Go to Netlify Dashboard:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Sign up or log in with your GitHub account

2. **Import from Git:**
   - Click "New site from Git"
   - Choose "GitHub" as your Git provider
   - Authorize Netlify to access your GitHub repositories
   - Select your repository: `EMOCOM-GROUP/foursquare-ajebo-website`

### Step 3: Configure Build Settings

Netlify should automatically detect your settings, but verify these:

- **Branch to deploy:** `main`
- **Build command:** `npm run build`
- **Publish directory:** `out`
- **Node version:** `18` (set in netlify.toml)

### Step 4: Deploy

1. **Click "Deploy site"**
   - Netlify will assign a random subdomain like `amazing-tesla-123456.netlify.app`
   - The build process will start automatically

2. **Monitor the build:**
   - Watch the deploy log for any errors
   - The build should take 2-5 minutes

### Step 5: Configure Domain (Optional)

1. **Change site name:**
   - Go to Site settings > General
   - Click "Change site name"
   - Choose something like `foursquare-ajebo` (if available)
   - Your URL will become `foursquare-ajebo.netlify.app`

2. **Custom domain (if you have one):**
   - Go to Site settings > Domain management
   - Click "Add custom domain"
   - Follow the DNS configuration instructions

### Step 6: Environment Variables (if needed)

If your app uses environment variables:
1. Go to Site settings > Environment variables
2. Add any required variables
3. Redeploy the site

## Important Configuration Files

The following files have been created/configured for Netlify:

### 1. `netlify.toml` (Already created)
- Build configuration
- Redirect rules for SPA routing
- Security headers
- Cache optimization

### 2. `next.config.js` (Updated)
- Static export enabled
- Trailing slash configuration
- Image optimization settings

## Expected Build Process

1. **Install dependencies:** `npm install`
2. **Build the app:** `npm run build`
3. **Generate static files:** Files exported to `out/` directory
4. **Deploy to CDN:** Static files distributed globally

## Troubleshooting Common Issues

### Build Fails
- Check the deploy log for specific errors
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Images Not Loading
- Ensure all image paths are relative
- Check that images are in the `public/` folder
- Verify image optimization settings

### Routing Issues
- The `netlify.toml` includes SPA redirect rules
- All client-side routes should work correctly

### Performance Issues
- Netlify provides global CDN
- Images are optimized automatically
- Consider enabling Netlify's image optimization

## Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All pages are accessible
- [ ] Forms work (contact, prayer requests, etc.)
- [ ] Images display properly
- [ ] Mobile responsiveness works
- [ ] All links function correctly
- [ ] Performance is acceptable

## Continuous Deployment

Once connected:
- Every push to the `main` branch automatically triggers a new deployment
- Pull requests can create preview deployments
- You can roll back to previous deployments easily

## Netlify Features You Can Use

1. **Analytics:** Built-in traffic analytics
2. **Forms:** Netlify can handle form submissions
3. **Functions:** Serverless functions if needed
4. **Identity:** User authentication service
5. **Large Media:** Git LFS for large files

## Security Considerations

- All traffic is served over HTTPS automatically
- Security headers are configured in `netlify.toml`
- Consider enabling Netlify's DDoS protection

## Cost

- **Free tier includes:**
  - 100GB bandwidth/month
  - 300 build minutes/month
  - 1 concurrent build
  - Community support

- **Perfect for church websites** with normal traffic

## Support and Documentation

- [Netlify Docs](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/frameworks/next-js/)
- [Community Support](https://community.netlify.com/)

---

**Ready to deploy!** Follow the steps above, and your church website will be live on the internet within minutes.
