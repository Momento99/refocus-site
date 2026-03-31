const fs = require('fs');

let css = fs.readFileSync('css/lens-prices.css', 'utf8');

// Global Background
css = css.replace(/linear-gradient\(170deg,\s*#0a1628\s*0%,\s*#0F172A\s*50%,\s*#0d1f3a\s*100%\)/g, 'linear-gradient(170deg, #F8FAFC 0%, #FFFFFF 50%, #F1F5F9 100%)');

// Replace standard white hex text colors with black/dark blue
css = css.replace(/color:\s*#(?:fff|FFFFFF|F8FDFF|EFF9FF|EAFBFF|F0F9FF);/gi, 'color: #0F172A;');

// Category titles specifically
css = css.replace(/\.lp-cat-title\s*\{\s*font-size:\s*22px;\s*font-weight:\s*800;\s*color:\s*#fff;/g, '.lp-cat-title {\n  font-size: 22px;\n  font-weight: 800;\n  color: #0F172A;');
css = css.replace(/color:\s*#fff;/gi, 'color: #0F172A;'); // catch any remaining

// Replace rgba(255,255,255, X) to dark rgbas for light theme text/borders/backgrounds
css = css.replace(/rgba\(\s*255\s*,\s*255\s*,\s*255\s*,/g, 'rgba(15, 23, 42,');

// Replace various translucent white/blue colors (used for text descriptions in dark mode)
// Example: rgba(230,248,255,0.92) etc.
css = css.replace(/rgba\(\s*(?:20[0-9]|2[1-4][0-9]|25[0-5]|196)\s*,\s*(?:2[0-5][0-9]|1[0-9][0-9])\s*,\s*25[0-5]\s*,/g, 'rgba(15, 23, 42,');

// Replace dark translucent backgrounds inside cards (e.g. .lp-card-head) -> light backgrounds
css = css.replace(/background:\s*rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.(?:08|14|15)\s*\);/g, 'background: rgba(241, 245, 249, 0.8);');

// Replace deep dark card backgrounds (e.g. .lp-color-item)
css = css.replace(/background:\s*rgba\(\s*(?:7|8)\s*,\s*(?:16|18|22)\s*,\s*(?:29|30|33|39)\s*,\s*0\.(?:22|28|30)\s*\);/g, 'background: rgba(241, 245, 249, 0.8);');

// Shadows need to be lighter
css = css.replace(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.35\s*\)/g, 'rgba(15, 23, 42, 0.08)');
css = css.replace(/rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.45\s*\)/g, 'rgba(15, 23, 42, 0.1)');

// Modal Overlay - make it dark still but slightly more transparent
css = css.replace(/background:\s*rgba\(\s*8\s*,\s*16\s*,\s*30\s*,\s*0\.72\s*\);/g, 'background: rgba(15, 23, 42, 0.5);');

// The 'black' score track
css = css.replace(/background:\s*rgba\(\s*8\s*,\s*18\s*,\s*33\s*,\s*0\.80\s*\);/g, 'background: rgba(226, 232, 240, 1);');
// Video background
css = css.replace(/background:\s*#040c1a;/g, 'background: #F1F5F9;');

// Yellow/gold text adjustments (warning cards, consultant cards)
css = css.replace(/color:\s*#FFF0C6;/g, 'color: #92400E;');
css = css.replace(/color:\s*#FFF4CC;/g, 'color: #92400E;');
css = css.replace(/color:\s*#FFE48A;/g, 'color: #B45309;');
css = css.replace(/color:\s*#F0C448;/g, 'color: #D97706;');
css = css.replace(/color:\s*rgba\(\s*255\s*,\s*240\s*,\s*190\s*,\s*0\.95\s*\);/g, 'color: rgba(146, 64, 14, 0.95);');

// Yellow backgrounds
css = css.replace(/background:\s*rgba\(\s*255\s*,\s*216\s*,\s*109\s*,\s*0\.1[02]\s*\);/g, 'background: rgba(254, 243, 199, 1);');
css = css.replace(/background:\s*rgba\(\s*255\s*,\s*178\s*,\s*50\s*,\s*0\.08\s*\);/g, 'background: rgba(254, 243, 199, 1);');

// Make borders slightly more visible on light
css = css.replace(/rgba\(\s*15\s*,\s*23\s*,\s*42\s*,\s*0\.08\s*\)/g, 'rgba(15, 23, 42, 0.12)');
css = css.replace(/rgba\(\s*15\s*,\s*23\s*,\s*42\s*,\s*0\.10\s*\)/g, 'rgba(15, 23, 42, 0.15)');

// specific text colors for titles within cards
css = css.replace(/color:\s*#F8FDFF;/g, 'color: #0F172A;');

fs.writeFileSync('css/lens-prices.css', css);
console.log('Conversion successful. lens-prices.css is now in light theme mode.');
