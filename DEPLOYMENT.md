# 🚀 Deployment Guide - Foursquare Camp Ajebo Church Website

This guide covers deploying the Foursquare Camp Ajebo Church website to Netlify with automated CI/CD pipelines.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher
- [npm](https://www.npmjs.com/) version 9 or higher
- [Git](https://git-scm.com/) for version control
- [Netlify account](https://netlify.com/)
- [GitHub account](https://github.com/) (for CI/CD)

## 🌐 Quick Deploy to Netlify

### Option 1: One-Click Deploy
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/EMOCOM-GROUP/foursquare-ajebo-website)

### Option 2: Manual Deployment

1. **Clone the repository**
   ```bash
   git clone https://github.com/EMOCOM-GROUP/foursquare-ajebo-website.git
   cd foursquare-ajebo-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Deploy to Netlify**
   - Drag and drop the `out` folder to [Netlify Drop](https://app.netlify.com/drop)
   - Or use the Netlify CLI:
     ```bash
     npm install -g netlify-cli
     netlify deploy --prod --dir=out
     ```

## ⚙️ Automated CI/CD Setup

### 1. GitHub Repository Setup

1. Fork or clone the repository
2. Push your code to GitHub
3. Ensure the main branch is `main`

### 2. Netlify Configuration

1. **Connect to Netlify**
   - Go to [Netlify](https://app.netlify.com/)
   - Click "New site from Git"
   - Choose your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `out`
     - **Node version**: `18`

2. **Environment Variables**
   Add these to your Netlify site settings:
   ```
   NODE_VERSION=18
   NPM_VERSION=9
   NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
   NEXT_PUBLIC_ENVIRONMENT=production
   ```

### 3. GitHub Secrets Configuration

Add these secrets to your GitHub repository:

1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Add the following secrets:
   - `NETLIFY_AUTH_TOKEN`: Your Netlify personal access token
   - `NETLIFY_SITE_ID`: Your Netlify site ID

**How to get these values:**
- **Netlify Auth Token**: Netlify Dashboard → User Settings → Applications → Personal access tokens
- **Netlify Site ID**: Site Settings → General → Site details → Site ID

## 🔧 Environment Configuration

### Development Environment
Create a `.env.local` file:
```bash
cp .env.example .env.local
# Edit .env.local with your local values
```

### Production Environment
Configure these in Netlify:
```
NEXT_PUBLIC_SITE_URL=https://foursquare-ajebo.netlify.app
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_ENABLE_ANALYTICS=true
# Add other production values...
```

## 🚀 Deployment Workflows

### Automatic Deployments
- **Main branch**: Automatically deploys to production
- **Pull Requests**: Creates preview deployments
- **Other branches**: Creates branch preview deployments

### Manual Deployment
Use the included deployment script:
```bash
# Make script executable (Mac/Linux)
chmod +x deploy.sh

# Deploy to production
./deploy.sh production

# Deploy to staging
./deploy.sh staging

# Deploy to preview
./deploy.sh preview
```

## 📊 Build Process

The build process includes:

1. **Code Quality Checks**
   - ESLint for code linting
   - Prettier for code formatting
   - TypeScript type checking

2. **Build Optimization**
   - Next.js static export
   - Image optimization
   - Bundle analysis
   - Asset compression

3. **Security & Performance**
   - Security headers configuration
   - Cache optimization
   - Lighthouse audits (production only)

## 🔍 Monitoring & Analytics

### Build Monitoring
- GitHub Actions provide build status
- Netlify dashboard shows deployment history
- Email notifications for failed deployments

### Performance Monitoring
- Lighthouse CI runs on every production deployment
- Core Web Vitals tracking
- Error boundary reporting

### Analytics Setup
Add your analytics IDs to environment variables:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🐛 Troubleshooting

### Common Issues

**Build Failures**
```bash
# Clear cache and reinstall
rm -rf .next out node_modules package-lock.json
npm install
npm run build
```

**Environment Variable Issues**
- Ensure all `NEXT_PUBLIC_` variables are set in Netlify
- Check variable names for typos
- Restart deployment after adding variables

**Node Version Issues**
- Ensure Node.js 18+ is specified in `netlify.toml`
- Clear Netlify build cache if needed

### Debug Commands
```bash
# Check build locally
npm run build

# Analyze bundle size
npm run analyze

# Type check
npm run type-check

# Lint and format
npm run lint:fix
npm run format
```

## 🔄 Rollback Strategy

### Automatic Rollback
If deployment fails, Netlify automatically maintains the previous version.

### Manual Rollback
1. Go to Netlify Dashboard → Deploys
2. Find the last working deployment
3. Click "Publish deploy"

### Git-based Rollback
```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

## 📈 Scaling Considerations

### Performance Optimization
- Enable Netlify Analytics
- Configure CDN settings
- Set up proper caching headers
- Monitor Core Web Vitals

### Traffic Management
- Configure rate limiting
- Set up DDoS protection
- Monitor bandwidth usage

## 🛡️ Security

### Headers Configuration
The `netlify.toml` includes security headers:
- X-Frame-Options
- X-Content-Type-Options
- X-XSS-Protection
- Referrer-Policy
- Permissions-Policy

### HTTPS
Netlify provides automatic HTTPS with Let's Encrypt certificates.

## 📞 Support

### Resources
- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Getting Help
1. Check the [Issues](https://github.com/EMOCOM-GROUP/foursquare-ajebo-website/issues) page
2. Create a new issue with deployment details
3. Contact the development team

## 📝 Deployment Checklist

Before deploying to production:

- [ ] All environment variables configured
- [ ] Build passes locally
- [ ] Tests pass (if applicable)
- [ ] Security audit passes
- [ ] Performance benchmarks met
- [ ] Accessibility requirements met
- [ ] Cross-browser testing completed
- [ ] Mobile responsiveness verified
- [ ] Content review completed
- [ ] Analytics tracking configured

---

**Happy Deploying! 🚀**