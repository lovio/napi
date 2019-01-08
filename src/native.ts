export interface NativeBinding {
  hello: (name: string) => string;
  threadCount: () => number;
}

const native: NativeBinding = require('../native');

export default native;
