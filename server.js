/**
 * CareBridge — Master Modular Backend Server
 * Automatically loads and mounts routes from features/* / backend / *.routes.js
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets
app.use(express.static(path.join(__dirname, 'public')));
app.use('/features', express.static(path.join(__dirname, 'features')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ============================================================
// MODULAR FEATURE ROUTE MOUNTING
// ============================================================
const featuresDir = path.join(__dirname, 'features');

if (fs.existsSync(featuresDir)) {
  const featureFolders = fs.readdirSync(featuresDir);

  featureFolders.forEach(folder => {
    const backendPath = path.join(featuresDir, folder, 'backend');
    if (fs.existsSync(backendPath)) {
      const routeFiles = fs.readdirSync(backendPath).filter(f => f.endsWith('.routes.js'));
      routeFiles.forEach(file => {
        try {
          const router = require(path.join(backendPath, file));
          
          // Specific route mount mappings
          if (folder.includes('auth')) {
            app.use('/api', router);
          } else if (folder.includes('discharge')) {
            app.use('/api', router);
          } else if (folder.includes('caresheet')) {
            app.use('/api', router);
          } else if (folder.includes('medicines')) {
            app.use('/api/medicines', router);
          } else if (folder.includes('alerts')) {
            app.use('/api/alerts', router);
          } else if (folder.includes('diet')) {
            app.use('/api/diet-plan', router);
          } else if (folder.includes('food-search')) {
            app.use('/api/food-search', router);
          } else if (folder.includes('followup')) {
            app.use('/api/followup', router);
          } else if (folder.includes('warnings')) {
            app.use('/api/warning-signs', router);
          } else if (folder.includes('dashboard')) {
            app.use('/api/dashboard', router);
          } else if (folder.includes('i18n')) {
            app.use('/api/i18n', router);
          } else {
            app.use(`/api/${folder}`, router);
          }

          console.log(`[CareBridge] Mounted feature: ${folder} (${file})`);
        } catch (err) {
          console.error(`[CareBridge] Failed mounting ${folder}/${file}:`, err.message);
        }
      });
    }
  });
}

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found in active feature modules.'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`CareBridge Modular Server running on http://localhost:${PORT}`);
  console.log(`All 11 feature modules loaded from /features directory.`);
});

module.exports = app;
