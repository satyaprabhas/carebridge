const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory() && f !== 'node_modules' && f !== '.git') {
      searchDir(full);
    } else if (f.endsWith('.js') || f.endsWith('.html')) {
      const c = fs.readFileSync(full, 'utf8');
      if (c.includes('evaluateMedicationRemedies') || c.includes('MEDICATION_REMEDIES')) {
        console.log('Match in:', full);
      }
    }
  }
}

searchDir('.');
