import fs from 'fs';
import path from 'path';
import AutoDetectDecoderStream from 'autodetect-decoder-stream';

const gb2312 = path.join(__dirname, './encoding/txt/red_utf8.txt');

(async () => {
  const readable = fs.createReadStream(gb2312);
  const writable = fs.createWriteStream(gb2312 + 'aaa');
  // 如何知道encoding是一个很麻烦的事情
  readable.pipe(new AutoDetectDecoderStream()).pipe(writable);
})();
// .then(() => process.exit);
