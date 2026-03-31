const fs = require('fs');

let data = fs.readFileSync('js/lens-data.js', 'utf8');

// Replace require('../../assets/...') with just 'assets/...'
data = data.replace(/require\(['"]\.\.\/assets\/([^'"]+)['"]\)/g, "'assets/$1'");

fs.writeFileSync('js/lens-data.js', data);
console.log("Successfully removed require statements.");
