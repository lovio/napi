import fs from 'fs';
import path from 'path';
import mapValues from 'lodash/mapValues';

const pathList = mapValues(
  {
    utf8: 'utf8',
    gb2312: 'gb2312',
    utf16be: 'utf16be',
    utf16le: 'utf16le',
    red_utf8: 'red_utf8',
    red_big5: 'red_big5',
    red_gbk: 'red_gbk',
  },
  file => path.join(__dirname, `../txt/${file}.txt`)
);

function getFile(filePath: string) {
  return fs.readFileSync(filePath);
}

export { pathList, getFile };
