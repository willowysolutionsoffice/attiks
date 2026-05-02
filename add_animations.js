const fs = require('fs');
const path = require('path');

const dir = 'd:/Major Projects/Personal/school-manage/frontend/src/app/dashboard';
const targetString = '<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">';
const replacement = '<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-slide-up">';

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  for (const file of files) {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const pagePath = path.join(fullPath, 'page.tsx');
      if (fs.existsSync(pagePath)) {
        let content = fs.readFileSync(pagePath, 'utf8');
        if (content.includes(targetString)) {
          content = content.replace(targetString, replacement);
          fs.writeFileSync(pagePath, content, 'utf8');
          console.log(`Updated ${pagePath}`);
        }
      }
    }
  }
}

processDirectory(dir);
