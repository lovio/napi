import fs from 'fs';
import path from 'path';
import AutoDetectDecoderStream from 'autodetect-decoder-stream';
import { pathList } from './utils';

(async () => {
  const readable = fs.createReadStream(pathList.gb2312);
  const writable = fs.createWriteStream(pathList.gb2312 + '.tmp');
  // 如何知道encoding是一个很麻烦的事情
  readable.pipe(new AutoDetectDecoderStream()).pipe(writable);
})();
// .then(() => process.exit);
