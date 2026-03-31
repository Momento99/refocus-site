const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'lens-price.html');
let content = fs.readFileSync(filePath, 'utf-8');

// The file contains data we need from:
// const ICONS = { ...
// down to the end of lensDetails.

// Since it's typescript, we should just extract the raw text and do some basic regex replace
// to remove the TS type annotations so it runs in browser JS.

const startIndex = content.indexOf('const ICONS = {');
const endIndex = content.indexOf('const lensMetaById =');

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not find start or end index.");
  process.exit(1);
}

let dataSection = content.substring(startIndex, endIndex);

// Remove TypeScript annotations
dataSection = dataSection.replace(/: LensCategory\[\]/g, '');
dataSection = dataSection.replace(/: Record<string, LensDetail>/g, '');
dataSection = dataSection.replace(/as Gradient3/g, '');
dataSection = dataSection.replace(/as const/g, '');

// The ICONS and VIDEOS map to require() which we'll replace with static string paths.
// For videos: require('../../assets/videos/standard.mp4') -> 'assets/videos/standard.mp4'
// For icons: require('../../assets/icons/standard.png') -> 'assets/icons/standard.png'
dataSection = dataSection.replace(/require\('\.\.\/\.\.\/([^']+)'\)/g, "'$1'");

// Wrap in an IIFE or just declare them as global constants
const finalJS = `
// Auto-extracted from lens-price.html app code
${dataSection}

// Expose to window for the web UI
window.LensData = {
  ICONS,
  VIDEOS,
  COLORS,
  categories,
  lensDetails
};
`;

const outDir = path.join(__dirname, 'js');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir);
}

fs.writeFileSync(path.join(outDir, 'lens-data.js'), finalJS);
console.log("Successfully extracted to js/lens-data.js");
