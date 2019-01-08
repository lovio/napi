import fs from 'fs';
import path from 'path';
import AutoDetectDecoderStream from 'autodetect-decoder-stream';
import { pathList } from './utils';

import native from './native';

(async () => {
  // const readable = fs.createReadStream(pathList.gb2312);
  // const writable = fs.createWriteStream(pathList.gb2312 + '.tmp');
  // // 如何知道encoding是一个很麻烦的事情
  // readable.pipe(new AutoDetectDecoderStream()).pipe(writable);

  const rsp = native.hello('tom');
  console.log(rsp);
  console.log(native.threadCount());
})();
// .then(() => process.exit);
