import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.git', 'dist', '.vite', 'dev-dist'].includes(file)) {
        replaceInDir(fullPath);
      }
    } else {
      if (['.js', '.jsx', '.html', '.css', '.md'].includes(path.extname(fullPath))) {
        let content = fs.readFileSync(fullPath, 'utf8');
        let newContent = content.replace(/StarScrib/g, 'StarScrib');
        if (content !== newContent) {
          fs.writeFileSync(fullPath, newContent);
          console.log('Updated', fullPath);
        }
      }
    }
  }
}

replaceInDir(__dirname);
