import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function findAllHtmlFiles(directory) {
  const htmlFiles = {};

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        scanDirectory(filePath);
      } else if (file.endsWith('.html')) {
        const key = path.relative(__dirname, filePath).replace('.html', '');
        htmlFiles[key] = filePath;
      }
    }
  }

  scanDirectory(directory);
  return htmlFiles;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'index.html'),
        ...findAllHtmlFiles(path.resolve(__dirname, 'src')),
      },
    },
  },
  appType: 'mpa', // fallback 사용안함
  server: {
    // open: 'src/pages/main/index.html', // 서버 시작 시 브라우저에서 지정페이지 자동으로 열기
  },
});
