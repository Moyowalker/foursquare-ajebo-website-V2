# 🚀 DEPLOYMENT GUIDE
## Foursquare Gospel Church Ajebo Website

### 📋 DEPLOYMENT OPTIONS

## Option 1: Local PC Testing (Recommended for Church)

### **Requirements**
- Windows PC (any modern version)
- Internet connection for initial setup
- 4GB RAM minimum
- 2GB free disk space

### **Step 1: Install Node.js**
1. Go to https://nodejs.org
2. Download the LTS version (Long Term Support)
3. Run the installer and follow instructions
4. Restart your computer

### **Step 2: Get the Website Files**
1. Copy the entire `foursquare-ajebo-website` folder to the PC
2. Place it in a location like `C:\foursquare-website\`

### **Step 3: Install Dependencies**
1. Open Command Prompt (Press Windows + R, type `cmd`, press Enter)
2. Navigate to the website folder:
   ```cmd
   cd C:\foursquare-website\foursquare-ajebo-website
   ```
3. Install dependencies:
   ```cmd
   npm install
   ```

### **Step 4: Start the Website**
1. In the same Command Prompt, run:
   ```cmd
   npm run dev
   ```
2. Wait for "Ready - started server on http://localhost:3000"
3. Open your web browser
4. Go to: http://localhost:3000

### **Step 5: Access the Website**
- **Homepage**: http://localhost:3000
- **Member Login**: http://localhost:3000/auth/login
- **Member Registration**: http://localhost:3000/auth/register

### **Test User Accounts**
```
Email: john.adebayo@email.com
Password: password123

Email: mary.johnson@email.com  
Password: password123

Email: pastor.emmanuel@email.com
Password: password123
```

---

## Option 2: Web Hosting Deployment

### **Recommended Hosting Providers**

#### **1. Vercel (Easiest - Free)**
- Visit: https://vercel.com
- Connect GitHub account
- Deploy directly from repository
- Automatic builds and updates

#### **2. Netlify (Alternative - Free)**
- Visit: https://netlify.com
- Drag and drop deployment
- Custom domain support

#### **3. Nigerian Hosting Providers**
- **WhoGoHost**: https://whogohost.com
- **DomainKing**: https://domainking.ng
- **Qservers**: https://qservers.net

### **Deployment Steps for Web Hosting**

#### **For Vercel:**
1. Create account at vercel.com
2. Connect your GitHub repository
3. Select the `foursquare-ajebo-website` repository
4. Deploy automatically
5. Get your live URL (e.g., `your-church.vercel.app`)

#### **For Traditional Hosting:**
1. Build the production version:
   ```bash
   npm run build
   npm run export
   ```
2. Upload the `out` folder to your hosting provider
3. Point your domain to the hosting server

---

## Option 3: Quick Testing Package

### **Portable Website Package**
If you need a quick way to test on any PC:

1. **Download Node.js Portable** (if you can't install)
2. **Copy the project folder**
3. **Create a start script** (`start.bat`):
   ```batch
   @echo off
   echo Starting Foursquare Church Website...
   npm install
   npm run dev
   echo Website is running at http://localhost:3000
   pause
   ```

---

## 🔧 TECHNICAL REQUIREMENTS

### **System Requirements**
- **Operating System**: Windows 10+, macOS 10.15+, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Internet**: Required for initial setup and dependencies

### **Browser Compatibility**
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## 📱 MOBILE TESTING

### **Responsive Design**
The website is fully responsive and works on:
- 📱 Mobile phones (320px+)
- 💻 Tablets (768px+)
- 🖥️ Desktop computers (1024px+)

### **Mobile Testing Steps**
1. Open website on desktop
2. Press F12 (Developer Tools)
3. Click mobile device icon
4. Test different screen sizes

---

## 🎯 CHURCH TESTING CHECKLIST

### **Authentication System**
- [ ] Register new member account
- [ ] Login with test credentials
- [ ] Reset password functionality
- [ ] Email verification process

### **Member Portal Features**
- [ ] Update profile information
- [ ] Submit prayer request
- [ ] Browse member directory
- [ ] Register for events
- [ ] Make online giving
- [ ] Download church documents

### **Admin Features** (Use pastor account)
- [ ] View all prayer requests
- [ ] Access member directory
- [ ] View giving statistics
- [ ] Access administrative documents

### **Performance Testing**
- [ ] Website loads in under 3 seconds
- [ ] All images display correctly
- [ ] Forms submit successfully
- [ ] Mobile version works properly

---

## 🚨 TROUBLESHOOTING

### **Common Issues and Solutions**

#### **"npm is not recognized"**
- **Solution**: Install Node.js properly and restart computer

#### **"Cannot find module"**
- **Solution**: Run `npm install` in the project folder

#### **Port 3000 already in use**
- **Solution**: 
  1. Close other applications using port 3000
  2. Or run: `npm run dev -- --port 3001`

#### **Website not loading**
- **Solution**: 
  1. Check Command Prompt for error messages
  2. Ensure Node.js is installed correctly
  3. Try restarting the computer

#### **Images not displaying**
- **Solution**: Check internet connection for initial load

---

## 📞 SUPPORT CONTACT

### **For Technical Issues**
- **Email**: tech@foursquareajebo.org
- **Phone**: +234 801 234 5678
- **WhatsApp**: Available for urgent issues

### **For Training and Setup**
- Remote desktop support available
- On-site training can be arranged
- Video call setup assistance

---

## 🎉 WHAT THE CHURCH GETS

### **Complete Church Management System**
- ✅ **Member registration and profiles**
- ✅ **Prayer request community**
- ✅ **Event management and registration**
- ✅ **Online giving platform**
- ✅ **Document library**
- ✅ **Member directory**
- ✅ **Mobile-responsive design**

### **Nigerian Church Context**
- ✅ **Naira currency support**
- ✅ **Nigerian states and regions**
- ✅ **Local phone number formats**
- ✅ **Cultural church practices**

### **Professional Features**
- ✅ **Role-based access control**
- ✅ **Privacy settings**
- ✅ **Responsive design**
- ✅ **Modern, beautiful interface**

---

## 📈 NEXT STEPS AFTER TESTING

### **Phase 1: Basic Deployment**
1. Set up on church computer
2. Train 2-3 key staff members
3. Test with small group of members

### **Phase 2: Full Launch**
1. Register custom domain (foursquareajebo.org)
2. Set up professional email addresses
3. Launch to full congregation

### **Phase 3: Advanced Features**
1. Integrate real payment gateway
2. Connect email service
3. Add SMS notifications
4. Implement database backup

---

## 💡 QUICK START COMMANDS

### **Essential Commands for Church Admin**
```bash
# Start the website
npm run dev

# Stop the website
Ctrl + C (in Command Prompt)

# Update dependencies
npm update

# Check for issues
npm run lint
```

---

**Ready to transform your church's digital presence! 🙏**

*"Commit to the Lord whatever you do, and he will establish your plans." - Proverbs 16:3*
