import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function inspect() {
  const assetsDir = './public/assets/aistudio';
  const files = fs.readdirSync(assetsDir);
  for (const f of files) {
    if (f.endsWith('.jpeg') || f.endsWith('.png')) {
      const fullPath = path.join(assetsDir, f);
      const meta = await sharp(fullPath).metadata();
      console.log(`${f}: ${meta.width}x${meta.height}`);
    }
  }
}

inspect();
