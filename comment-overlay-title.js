const fs = require('fs');
let content = fs.readFileSync('gallery.html', 'utf8');
content = content.replace(/<span class="gl__overlay-title">([^<]*)<\/span>/g, '<!-- <span class="gl__overlay-title">$1<\/span> -->');
fs.writeFileSync('gallery.html', content, 'utf8');
console.log('Done');
