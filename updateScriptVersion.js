const txt = `export const scriptVersion = ${Date.now()};`

require('fs').writeFileSync(require('path').join(__dirname, './src/scriptVersion.ts'), txt);

console.log(__filename + ' ok');