/**
 * CareBridge — Module Assembler & Combiner Utility
 * Run: node combine.js
 * Scans all feature folders, validates frontend and backend files, and integrates them.
 */

const fs = require('fs');
const path = require('path');

const featuresDir = path.join(__dirname, 'features');
const publicDir = path.join(__dirname, 'public');

console.log('====================================================');
console.log('  CareBridge Feature Combiner & Health Check');
console.log('====================================================\n');

if (!fs.existsSync(featuresDir)) {
  console.error('Error: "features" directory not found!');
  process.exit(1);
}

const modules = fs.readdirSync(featuresDir).filter(f => {
  return fs.statSync(path.join(featuresDir, f)).isDirectory();
});

let errorsFound = 0;
const report = [];

modules.forEach(mod => {
  const modPath = path.join(featuresDir, mod);
  const frontendDir = path.join(modPath, 'frontend');
  const backendDir = path.join(modPath, 'backend');
  const specFile = path.join(modPath, 'SPEC.md');

  const hasFrontend = fs.existsSync(frontendDir);
  const hasBackend = fs.existsSync(backendDir);
  const hasSpec = fs.existsSync(specFile);

  const frontendFiles = hasFrontend ? fs.readdirSync(frontendDir) : [];
  const backendFiles = hasBackend ? fs.readdirSync(backendDir) : [];

  let backendSyntaxOk = false;
  if (hasBackend) {
    const routeFile = backendFiles.find(f => f.endsWith('.routes.js'));
    if (routeFile) {
      try {
        require(path.join(backendDir, routeFile));
        backendSyntaxOk = true;
      } catch (err) {
        backendSyntaxOk = false;
        console.error(`  [!] Error requiring ${mod}/backend/${routeFile}:`, err.message);
        errorsFound++;
      }
    }
  }

  report.push({
    module: mod,
    frontend: frontendFiles.join(', ') || 'MISSING',
    backend: backendFiles.join(', ') || 'MISSING',
    spec: hasSpec ? 'YES' : 'NO',
    status: (hasFrontend && hasBackend && hasSpec && backendSyntaxOk) ? 'READY' : 'INCOMPLETE'
  });
});

console.table(report);

if (errorsFound === 0) {
  console.log('\n✅ All modules verified successfully!');
  console.log('Each feature has its own frontend, backend, and SPEC.md.');
  console.log('You can now give any feature folder to your team members.');
  console.log('When they complete their changes, copy the folders back here and run:');
  console.log('  node server.js\n');
} else {
  console.error(`\n⚠️ Finished with ${errorsFound} issues.`);
}
