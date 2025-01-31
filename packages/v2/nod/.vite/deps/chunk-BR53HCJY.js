import {
  __publicField
} from "./chunk-T2T6Q22Z.js";

// ../../node_modules/crypto-es/lib/core.js
var _a, _b, _c, _d, _e, _f;
var crypto = ((_a = typeof globalThis != "undefined" ? globalThis : void 0) == null ? void 0 : _a.crypto) || ((_b = typeof global != "undefined" ? global : void 0) == null ? void 0 : _b.crypto) || ((_c = typeof window != "undefined" ? window : void 0) == null ? void 0 : _c.crypto) || ((_d = typeof self != "undefined" ? self : void 0) == null ? void 0 : _d.crypto) || ((_f = (_e = typeof frames != "undefined" ? frames : void 0) == null ? void 0 : _e[0]) == null ? void 0 : _f.crypto);
var randomWordArray;
if (crypto) {
  randomWordArray = (nBytes) => {
    const words = [];
    for (let i = 0, rcache; i < nBytes; i += 4) {
      words.push(crypto.getRandomValues(new Uint32Array(1))[0]);
    }
    return new WordArray(words, nBytes);
  };
} else {
  randomWordArray = (nBytes) => {
    const words = [];
    const r = (m_w) => {
      let _m_w = m_w;
      let _m_z = 987654321;
      const mask = 4294967295;
      return () => {
        _m_z = 36969 * (_m_z & 65535) + (_m_z >> 16) & mask;
        _m_w = 18e3 * (_m_w & 65535) + (_m_w >> 16) & mask;
        let result = (_m_z << 16) + _m_w & mask;
        result /= 4294967296;
        result += 0.5;
        return result * (Math.random() > 0.5 ? 1 : -1);
      };
    };
    for (let i = 0, rcache; i < nBytes; i += 4) {
      const _r = r((rcache || Math.random()) * 4294967296);
      rcache = _r() * 987654071;
      words.push(_r() * 4294967296 | 0);
    }
    return new WordArray(words, nBytes);
  };
}
var Base = class {
  static create(...args) {
    return new this(...args);
  }
  mixIn(properties) {
    return Object.assign(this, properties);
  }
  clone() {
    const clone = new this.constructor();
    Object.assign(clone, this);
    return clone;
  }
};
var WordArray = class extends Base {
  constructor(words = [], sigBytes = words.length * 4) {
    super();
    let typedArray = words;
    if (typedArray instanceof ArrayBuffer) {
      typedArray = new Uint8Array(typedArray);
    }
    if (typedArray instanceof Int8Array || typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
      typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
    }
    if (typedArray instanceof Uint8Array) {
      const typedArrayByteLength = typedArray.byteLength;
      const _words = [];
      for (let i = 0; i < typedArrayByteLength; i += 1) {
        _words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
      }
      this.words = _words;
      this.sigBytes = typedArrayByteLength;
    } else {
      this.words = words;
      this.sigBytes = sigBytes;
    }
  }
  toString(encoder = Hex) {
    return encoder.stringify(this);
  }
  concat(wordArray) {
    const thisWords = this.words;
    const thatWords = wordArray.words;
    const thisSigBytes = this.sigBytes;
    const thatSigBytes = wordArray.sigBytes;
    this.clamp();
    if (thisSigBytes % 4) {
      for (let i = 0; i < thatSigBytes; i += 1) {
        const thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
      }
    } else {
      for (let i = 0; i < thatSigBytes; i += 4) {
        thisWords[thisSigBytes + i >>> 2] = thatWords[i >>> 2];
      }
    }
    this.sigBytes += thatSigBytes;
    return this;
  }
  clamp() {
    const { words, sigBytes } = this;
    words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
    words.length = Math.ceil(sigBytes / 4);
  }
  clone() {
    const clone = super.clone.call(this);
    clone.words = this.words.slice(0);
    return clone;
  }
};
__publicField(WordArray, "random", randomWordArray);
var Hex = {
  stringify(wordArray) {
    const { words, sigBytes } = wordArray;
    const hexChars = [];
    for (let i = 0; i < sigBytes; i += 1) {
      const bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16));
      hexChars.push((bite & 15).toString(16));
    }
    return hexChars.join("");
  },
  parse(hexStr) {
    const hexStrLength = hexStr.length;
    const words = [];
    for (let i = 0; i < hexStrLength; i += 2) {
      words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
    }
    return new WordArray(words, hexStrLength / 2);
  }
};
var Latin1 = {
  stringify(wordArray) {
    const { words, sigBytes } = wordArray;
    const latin1Chars = [];
    for (let i = 0; i < sigBytes; i += 1) {
      const bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      latin1Chars.push(String.fromCharCode(bite));
    }
    return latin1Chars.join("");
  },
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i += 1) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
var Utf8 = {
  stringify(wordArray) {
    try {
      return decodeURIComponent(escape(Latin1.stringify(wordArray)));
    } catch (e) {
      throw new Error("Malformed UTF-8 data");
    }
  },
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
var BufferedBlockAlgorithm = class extends Base {
  constructor() {
    super();
    this._minBufferSize = 0;
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    let m_data = data;
    if (typeof m_data === "string") {
      m_data = Utf8.parse(m_data);
    }
    this._data.concat(m_data);
    this._nDataBytes += m_data.sigBytes;
  }
  _process(doFlush) {
    let processedWords;
    const { _data: data, blockSize } = this;
    const dataWords = data.words;
    const dataSigBytes = data.sigBytes;
    const blockSizeBytes = blockSize * 4;
    let nBlocksReady = dataSigBytes / blockSizeBytes;
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += blockSize) {
        this._doProcessBlock(dataWords, offset);
      }
      processedWords = dataWords.splice(0, nWordsReady);
      data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
  clone() {
    const clone = super.clone.call(this);
    clone._data = this._data.clone();
    return clone;
  }
};
var Hasher = class extends BufferedBlockAlgorithm {
  constructor(cfg) {
    super();
    this.blockSize = 512 / 32;
    this.cfg = Object.assign(new Base(), cfg);
    this.reset();
  }
  static _createHelper(SubHasher) {
    return (message, cfg) => new SubHasher(cfg).finalize(message);
  }
  static _createHmacHelper(SubHasher) {
    return (message, key) => new HMAC(SubHasher, key).finalize(message);
  }
  reset() {
    super.reset.call(this);
    this._doReset();
  }
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
    const hash = this._doFinalize();
    return hash;
  }
};
var HMAC = class extends Base {
  constructor(SubHasher, key) {
    super();
    const hasher = new SubHasher();
    this._hasher = hasher;
    let _key = key;
    if (typeof _key === "string") {
      _key = Utf8.parse(_key);
    }
    const hasherBlockSize = hasher.blockSize;
    const hasherBlockSizeBytes = hasherBlockSize * 4;
    if (_key.sigBytes > hasherBlockSizeBytes) {
      _key = hasher.finalize(key);
    }
    _key.clamp();
    const oKey = _key.clone();
    this._oKey = oKey;
    const iKey = _key.clone();
    this._iKey = iKey;
    const oKeyWords = oKey.words;
    const iKeyWords = iKey.words;
    for (let i = 0; i < hasherBlockSize; i += 1) {
      oKeyWords[i] ^= 1549556828;
      iKeyWords[i] ^= 909522486;
    }
    oKey.sigBytes = hasherBlockSizeBytes;
    iKey.sigBytes = hasherBlockSizeBytes;
    this.reset();
  }
  reset() {
    const hasher = this._hasher;
    hasher.reset();
    hasher.update(this._iKey);
  }
  update(messageUpdate) {
    this._hasher.update(messageUpdate);
    return this;
  }
  finalize(messageUpdate) {
    const hasher = this._hasher;
    const innerHash = hasher.finalize(messageUpdate);
    hasher.reset();
    const hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
    return hmac;
  }
};

export {
  Base,
  WordArray,
  Hex,
  Latin1,
  Utf8,
  BufferedBlockAlgorithm,
  Hasher,
  HMAC
};
//# sourceMappingURL=chunk-BR53HCJY.js.map
