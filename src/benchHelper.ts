import fs from 'fs';
import AutoDetectDecoderStream from 'autodetect-decoder-stream';

export function streamOnData(filePath: string, deferred: any) {
  const readable = fs.createReadStream(filePath);

  const stream = readable.pipe(new AutoDetectDecoderStream());
  let txt = '';
  stream.on('data', (chunk: Buffer) => {
    txt += chunk;
  });

  stream.on('end', () => {
    deferred.resolve();
  });
}

export async function streamOnDataForAwaitOf(filePath: string) {
  const readable = fs.createReadStream(filePath);

  const stream = readable.pipe(new AutoDetectDecoderStream());

  let txt = '';
  for await (const chunk of stream) {
    txt += chunk;
  }
}
