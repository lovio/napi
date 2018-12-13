import stream from 'stream';
import chardet from 'jschardet';
import iconv from 'iconv-lite';

export function detectEncoding(buf: Buffer) {
  return chardet.detect(buf);
}

export function decodeTxt(buf: Buffer) {
  const charset = detectEncoding(buf);
  // auto remove BOM
  let text = iconv.decode(buf, charset.encoding);
  // 去掉\r和\t
  // text = text.replace(/\r/g, '').replace(/\t/g, '        ');
  // // 末位添加换行
  // if (!text.endsWith('\n')) {
  //   text += '\n';
  // }
  return text;
}

export function decodeTxtStream() {
  return new stream.Transform({});
}
