import _ from 'highland';
import mapValues from 'lodash/mapValues';
import fs from 'fs';
import path from 'path';
import { finished } from 'stream';
import { decodeTxt, detectEncoding } from './index';
import AutoDetectDecoderStream from 'autodetect-decoder-stream';

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
  file => path.join(__dirname, `./txt/${file}.txt`)
);

function getFile(path: string) {
  return fs.readFileSync(path);
}

describe('Encoding', () => {
  test('detectEncoding', () => {
    expect(detectEncoding(getFile(pathList.gb2312))).toHaveProperty('encoding', 'GB2312');
    expect(detectEncoding(getFile(pathList.utf8))).toHaveProperty('encoding', 'UTF-8');
    expect(detectEncoding(getFile(pathList.utf16be))).toHaveProperty('encoding', 'UTF-16BE');
    expect(detectEncoding(getFile(pathList.utf16le))).toHaveProperty('encoding', 'UTF-16LE');
  });

  test('decoding gb2312', () => {
    const gb2312 = decodeTxt(getFile(pathList.gb2312));
    const utf8 = decodeTxt(getFile(pathList.utf8));
    const utf16be = decodeTxt(getFile(pathList.utf16be));
    const utf16le = decodeTxt(getFile(pathList.utf16le));

    expect(gb2312).toEqual(utf8);
    expect(utf16be).toEqual(utf8);
    expect(utf16le).toEqual(utf8);
  });

  test('decode stream', done => {
    const gb2312 = decodeTxt(getFile(pathList.gb2312));

    const readable = fs.createReadStream(pathList.gb2312);

    let txt = '';
    // @ts-ignore
    _(readable)
      .map(x => {
        console.log(x);
        return x;
      })
      .through(new AutoDetectDecoderStream())
      .each(chunk => {
        txt += chunk;
      })
      .done(() => {
        expect(txt).toEqual(gb2312);
        done();
      });

    // onFinished(stream, err => {
    //   expect(err).toBeUndefined();
    //   expect(txt).toEqual(gb2312);
    //   done();
    // });
  });
});
