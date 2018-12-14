import mapValues from 'lodash/mapValues';
import _ from 'highland';
import fs from 'fs';
import path from 'path';
import Benchmark from 'benchmark';
import { decodeTxt } from './index';
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

var suite = new Benchmark.Suite();

// add tests
suite
  // .add('decoding#gb2312', function() {
  //   const gb2312 = getFile(pathList.gb2312);

  //   decodeTxt(gb2312);
  // })
  // .add('decoding#utf8', function() {
  //   const utf8 = getFile(pathList.utf8);
  //   decodeTxt(utf8);
  // })
  // .add('decoding#be', function() {
  //   const utf16be = getFile(pathList.utf16be);
  //   decodeTxt(utf16be);
  // })
  // .add('decoding#utf16le', function() {
  //   const utf16le = getFile(pathList.utf16le);
  //   decodeTxt(utf16le);
  // })
  .add('decoding#redbig5', function() {
    const redbig5 = getFile(pathList.red_big5);
    decodeTxt(redbig5);
  })
  // .add('decoding#redgbk', function() {
  //   const redgbk = getFile(pathList.red_gbk);
  //   decodeTxt(redgbk);
  // })
  .add('decodeStream#redbig5', {
    defer: true,
    fn: function(deferred: any) {
      const readable = fs.createReadStream(pathList.red_big5);

      const stream = readable.pipe(new AutoDetectDecoderStream());
      let txt = '';
      stream.on('data', (chunk: Buffer) => {
        txt += chunk;
      });

      stream.on('end', () => {
        // console.log(txt.length);
        deferred.resolve();
      });
    },
  })
  .add('decodeStreamviaHighland#redbig5', {
    defer: true,
    fn: function(deferred: any) {
      const readable = fs.createReadStream(pathList.red_big5);

      let txt = '';

      _(readable)
        .through(new AutoDetectDecoderStream())
        .each(chunk => {
          txt += chunk;
        })
        .done(() => {
          // console.log(txt.length);
          deferred.resolve();
        });
    },
  })
  // add listeners
  .on('cycle', function(event: Benchmark.Event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    // @ts-ignore
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
