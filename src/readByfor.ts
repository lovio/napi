import fs from 'fs';
import { join } from 'path';

async function main(inputFilePath: string) {
  const readStream = fs.createReadStream(inputFilePath, { encoding: 'utf8', highWaterMark: 1024 });

  for await (const chunk of readStream) {
    console.log('>>> ' + chunk);
  }
  console.log('### DONE ###');
}

try {
  const path = join(__dirname, '../txt/utf8.txt');
  main(path);
} catch (error) {
  console.error(error);
}
