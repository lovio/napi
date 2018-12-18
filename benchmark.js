'use strict';

const mapValues = require('lodash/mapValues');
const fs = require('fs');
const _ = require('highland');
const Benchmark = require('benchmark');
const { decodeTxt } = require('./build/encoding');
const AutoDetectDecoderStream = require('autodetect-decoder-stream');
const { pathList, getFile } = require('./build/utils');

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
    fn: function(deferred) {
      const readable = fs.createReadStream(pathList.red_big5);

      const stream = readable.pipe(new AutoDetectDecoderStream());
      let txt = '';
      stream.on('data', chunk => {
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
    fn: function(deferred) {
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
  .on('cycle', function(event) {
    console.log(String(event.target));
  })
  .on('complete', function() {
    // @ts-ignore
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  // run async
  .run({ async: true });
