# Payoneer Calculator

A React TypeScript application for calculating USD to RSD conversions with Payoneer fees.

## 🚀 Live Demo

[https://spidistudio.github.io/PayoneerCalc/](https://spidistudio.github.io/PayoneerCalc/)

## 📋 Features

- Real-time USD to RSD conversion
- Payoneer fee calculation
- Dark/Light theme toggle
- Responsive design
- Exchange rates from kurs.resenje.org

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Deployment to GitHub Pages

### Automatic Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

#### Setup Steps:

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Under "Source", select "GitHub Actions"

2. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin main
   ```

3. **Check deployment:**
   - Go to the "Actions" tab in your repository
   - Wait for the deployment workflow to complete
   - Your site will be available at `https://yourusername.github.io/PayoneerCalc/`

### Manual Deployment

If automatic deployment doesn't work, you can manually deploy:

1. Build the project:
   ```bash
   npm run build
   ```

2. The built files will be in the `dist` folder
3. Push these files to the `gh-pages` branch or upload them manually

## 🔧 Configuration

- **Development**: Uses Vite proxy for CORS
- **Production**: Uses AllOrigins CORS proxy service
- **Base URL**: Configured for GitHub Pages at `/PayoneerCalc/`

## 📁 Project Structure

```
src/
├── components/     # React components
├── hooks/         # Custom React hooks
├── services/      # API services
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Main application component
```

## 🔍 Troubleshooting

If the GitHub Pages site shows a 404 error:

1. Check that GitHub Pages is enabled in repository settings
2. Ensure the source is set to "GitHub Actions"
3. Check the Actions tab for deployment status
4. Wait a few minutes after deployment completes

## 👨‍💻 Developer

Created by milan_code on Fiverr
(https://www.fiverr.com/milan_code)
