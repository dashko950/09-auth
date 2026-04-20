const fs = require("fs");
const path = require("path");

// Простий base64 зображення для favicon (1x1 прозорий піксель)
const base64Favicon =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
const buffer = Buffer.from(base64Favicon, "base64");

const faviconPath = path.join(process.cwd(), "app", "favicon.ico");
fs.writeFileSync(faviconPath, buffer);
console.log("Favicon created successfully at:", faviconPath);
