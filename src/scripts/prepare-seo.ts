import * as fs from 'fs';
import * as path from 'path';

const srcDir = path.join(process.cwd(), 'src', 'assets', 'images');
const publicDir = path.join(process.cwd(), 'public');

try {
  const files = fs.readdirSync(srcDir);
  
  // Ensure public catalog exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 1. Copy about_office
  const aboutOfficeFile = files.find(f => f.startsWith('about_office') && f.endsWith('.png'));
  if (aboutOfficeFile) {
    const srcPath = path.join(srcDir, aboutOfficeFile);
    const destPath = path.join(publicDir, 'og-image.png');
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied ${aboutOfficeFile} to public/og-image.png`);
  } else {
    console.warn('Could not find about_office file in assets!');
  }

  // 2. Copy favicon
  const faviconFile = files.find(f => f.startsWith('qnext_favicon') && f.endsWith('.png'));
  if (faviconFile) {
    const srcPath = path.join(srcDir, faviconFile);
    const destPath = path.join(publicDir, 'favicon.png');
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied ${faviconFile} to public/favicon.png`);
  } else {
    console.warn('Could not find qnext_favicon file in assets!');
  }
} catch (error) {
  console.error('Error copying files:', error);
}
