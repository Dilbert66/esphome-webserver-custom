import {
  Base64
} from "./chunk-R6PYHBHQ.js";
import {
  Base,
  BufferedBlockAlgorithm,
  Hasher,
  WordArray
} from "./chunk-BR53HCJY.js";

// ../../node_modules/crypto-es/lib/md5.js
var T = [];
for (let i = 0; i < 64; i += 1) {
  T[i] = Math.abs(Math.sin(i + 1)) * 4294967296 | 0;
}
var FF = (a, b, c, d, x, s, t) => {
  const n = a + (b & c | ~b & d) + x + t;
  return (n << s | n >>> 32 - s) + b;
};
var GG = (a, b, c, d, x, s, t) => {
  const n = a + (b & d | c & ~d) + x + t;
  return (n << s | n >>> 32 - s) + b;
};
var HH = (a, b, c, d, x, s, t) => {
  const n = a + (b ^ c ^ d) + x + t;
  return (n << s | n >>> 32 - s) + b;
};
var II = (a, b, c, d, x, s, t) => {
  const n = a + (c ^ (b | ~d)) + x + t;
  return (n << s | n >>> 32 - s) + b;
};
var MD5Algo = class extends Hasher {
  _doReset() {
    this._hash = new WordArray([
      1732584193,
      4023233417,
      2562383102,
      271733878
    ]);
  }
  _doProcessBlock(M, offset) {
    const _M = M;
    for (let i = 0; i < 16; i += 1) {
      const offset_i = offset + i;
      const M_offset_i = M[offset_i];
      _M[offset_i] = (M_offset_i << 8 | M_offset_i >>> 24) & 16711935 | (M_offset_i << 24 | M_offset_i >>> 8) & 4278255360;
    }
    const H = this._hash.words;
    const M_offset_0 = _M[offset + 0];
    const M_offset_1 = _M[offset + 1];
    const M_offset_2 = _M[offset + 2];
    const M_offset_3 = _M[offset + 3];
    const M_offset_4 = _M[offset + 4];
    const M_offset_5 = _M[offset + 5];
    const M_offset_6 = _M[offset + 6];
    const M_offset_7 = _M[offset + 7];
    const M_offset_8 = _M[offset + 8];
    const M_offset_9 = _M[offset + 9];
    const M_offset_10 = _M[offset + 10];
    const M_offset_11 = _M[offset + 11];
    const M_offset_12 = _M[offset + 12];
    const M_offset_13 = _M[offset + 13];
    const M_offset_14 = _M[offset + 14];
    const M_offset_15 = _M[offset + 15];
    let a = H[0];
    let b = H[1];
    let c = H[2];
    let d = H[3];
    a = FF(a, b, c, d, M_offset_0, 7, T[0]);
    d = FF(d, a, b, c, M_offset_1, 12, T[1]);
    c = FF(c, d, a, b, M_offset_2, 17, T[2]);
    b = FF(b, c, d, a, M_offset_3, 22, T[3]);
    a = FF(a, b, c, d, M_offset_4, 7, T[4]);
    d = FF(d, a, b, c, M_offset_5, 12, T[5]);
    c = FF(c, d, a, b, M_offset_6, 17, T[6]);
    b = FF(b, c, d, a, M_offset_7, 22, T[7]);
    a = FF(a, b, c, d, M_offset_8, 7, T[8]);
    d = FF(d, a, b, c, M_offset_9, 12, T[9]);
    c = FF(c, d, a, b, M_offset_10, 17, T[10]);
    b = FF(b, c, d, a, M_offset_11, 22, T[11]);
    a = FF(a, b, c, d, M_offset_12, 7, T[12]);
    d = FF(d, a, b, c, M_offset_13, 12, T[13]);
    c = FF(c, d, a, b, M_offset_14, 17, T[14]);
    b = FF(b, c, d, a, M_offset_15, 22, T[15]);
    a = GG(a, b, c, d, M_offset_1, 5, T[16]);
    d = GG(d, a, b, c, M_offset_6, 9, T[17]);
    c = GG(c, d, a, b, M_offset_11, 14, T[18]);
    b = GG(b, c, d, a, M_offset_0, 20, T[19]);
    a = GG(a, b, c, d, M_offset_5, 5, T[20]);
    d = GG(d, a, b, c, M_offset_10, 9, T[21]);
    c = GG(c, d, a, b, M_offset_15, 14, T[22]);
    b = GG(b, c, d, a, M_offset_4, 20, T[23]);
    a = GG(a, b, c, d, M_offset_9, 5, T[24]);
    d = GG(d, a, b, c, M_offset_14, 9, T[25]);
    c = GG(c, d, a, b, M_offset_3, 14, T[26]);
    b = GG(b, c, d, a, M_offset_8, 20, T[27]);
    a = GG(a, b, c, d, M_offset_13, 5, T[28]);
    d = GG(d, a, b, c, M_offset_2, 9, T[29]);
    c = GG(c, d, a, b, M_offset_7, 14, T[30]);
    b = GG(b, c, d, a, M_offset_12, 20, T[31]);
    a = HH(a, b, c, d, M_offset_5, 4, T[32]);
    d = HH(d, a, b, c, M_offset_8, 11, T[33]);
    c = HH(c, d, a, b, M_offset_11, 16, T[34]);
    b = HH(b, c, d, a, M_offset_14, 23, T[35]);
    a = HH(a, b, c, d, M_offset_1, 4, T[36]);
    d = HH(d, a, b, c, M_offset_4, 11, T[37]);
    c = HH(c, d, a, b, M_offset_7, 16, T[38]);
    b = HH(b, c, d, a, M_offset_10, 23, T[39]);
    a = HH(a, b, c, d, M_offset_13, 4, T[40]);
    d = HH(d, a, b, c, M_offset_0, 11, T[41]);
    c = HH(c, d, a, b, M_offset_3, 16, T[42]);
    b = HH(b, c, d, a, M_offset_6, 23, T[43]);
    a = HH(a, b, c, d, M_offset_9, 4, T[44]);
    d = HH(d, a, b, c, M_offset_12, 11, T[45]);
    c = HH(c, d, a, b, M_offset_15, 16, T[46]);
    b = HH(b, c, d, a, M_offset_2, 23, T[47]);
    a = II(a, b, c, d, M_offset_0, 6, T[48]);
    d = II(d, a, b, c, M_offset_7, 10, T[49]);
    c = II(c, d, a, b, M_offset_14, 15, T[50]);
    b = II(b, c, d, a, M_offset_5, 21, T[51]);
    a = II(a, b, c, d, M_offset_12, 6, T[52]);
    d = II(d, a, b, c, M_offset_3, 10, T[53]);
    c = II(c, d, a, b, M_offset_10, 15, T[54]);
    b = II(b, c, d, a, M_offset_1, 21, T[55]);
    a = II(a, b, c, d, M_offset_8, 6, T[56]);
    d = II(d, a, b, c, M_offset_15, 10, T[57]);
    c = II(c, d, a, b, M_offset_6, 15, T[58]);
    b = II(b, c, d, a, M_offset_13, 21, T[59]);
    a = II(a, b, c, d, M_offset_4, 6, T[60]);
    d = II(d, a, b, c, M_offset_11, 10, T[61]);
    c = II(c, d, a, b, M_offset_2, 15, T[62]);
    b = II(b, c, d, a, M_offset_9, 21, T[63]);
    H[0] = H[0] + a | 0;
    H[1] = H[1] + b | 0;
    H[2] = H[2] + c | 0;
    H[3] = H[3] + d | 0;
  }
  _doFinalize() {
    const data = this._data;
    const dataWords = data.words;
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = data.sigBytes * 8;
    dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    const nBitsTotalH = Math.floor(nBitsTotal / 4294967296);
    const nBitsTotalL = nBitsTotal;
    dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = (nBitsTotalH << 8 | nBitsTotalH >>> 24) & 16711935 | (nBitsTotalH << 24 | nBitsTotalH >>> 8) & 4278255360;
    dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = (nBitsTotalL << 8 | nBitsTotalL >>> 24) & 16711935 | (nBitsTotalL << 24 | nBitsTotalL >>> 8) & 4278255360;
    data.sigBytes = (dataWords.length + 1) * 4;
    this._process();
    const hash = this._hash;
    const H = hash.words;
    for (let i = 0; i < 4; i += 1) {
      const H_i = H[i];
      H[i] = (H_i << 8 | H_i >>> 24) & 16711935 | (H_i << 24 | H_i >>> 8) & 4278255360;
    }
    return hash;
  }
  clone() {
    const clone = super.clone.call(this);
    clone._hash = this._hash.clone();
    return clone;
  }
};
var MD5 = Hasher._createHelper(MD5Algo);
var HmacMD5 = Hasher._createHmacHelper(MD5Algo);

// ../../node_modules/crypto-es/lib/evpkdf.js
var EvpKDFAlgo = class extends Base {
  constructor(cfg) {
    super();
    this.cfg = Object.assign(
      new Base(),
      {
        keySize: 128 / 32,
        hasher: MD5Algo,
        iterations: 1
      },
      cfg
    );
  }
  compute(password, salt) {
    let block;
    const { cfg } = this;
    const hasher = cfg.hasher.create();
    const derivedKey = WordArray.create();
    const derivedKeyWords = derivedKey.words;
    const { keySize, iterations } = cfg;
    while (derivedKeyWords.length < keySize) {
      if (block) {
        hasher.update(block);
      }
      block = hasher.update(password).finalize(salt);
      hasher.reset();
      for (let i = 1; i < iterations; i += 1) {
        block = hasher.finalize(block);
        hasher.reset();
      }
      derivedKey.concat(block);
    }
    derivedKey.sigBytes = keySize * 4;
    return derivedKey;
  }
};

// ../../node_modules/crypto-es/lib/cipher-core.js
var Cipher = class extends BufferedBlockAlgorithm {
  constructor(xformMode, key, cfg) {
    super();
    this.cfg = Object.assign(new Base(), cfg);
    this._xformMode = xformMode;
    this._key = key;
    this.reset();
  }
  static createEncryptor(key, cfg) {
    return this.create(this._ENC_XFORM_MODE, key, cfg);
  }
  static createDecryptor(key, cfg) {
    return this.create(this._DEC_XFORM_MODE, key, cfg);
  }
  static _createHelper(SubCipher) {
    const selectCipherStrategy = (key) => {
      if (typeof key === "string") {
        return PasswordBasedCipher;
      }
      return SerializableCipher;
    };
    return {
      encrypt(message, key, cfg) {
        return selectCipherStrategy(key).encrypt(SubCipher, message, key, cfg);
      },
      decrypt(ciphertext, key, cfg) {
        return selectCipherStrategy(key).decrypt(SubCipher, ciphertext, key, cfg);
      }
    };
  }
  reset() {
    super.reset.call(this);
    this._doReset();
  }
  process(dataUpdate) {
    this._append(dataUpdate);
    return this._process();
  }
  finalize(dataUpdate) {
    if (dataUpdate) {
      this._append(dataUpdate);
    }
    const finalProcessedData = this._doFinalize();
    return finalProcessedData;
  }
};
Cipher._ENC_XFORM_MODE = 1;
Cipher._DEC_XFORM_MODE = 2;
Cipher.keySize = 128 / 32;
Cipher.ivSize = 128 / 32;
var StreamCipher = class extends Cipher {
  constructor(...args) {
    super(...args);
    this.blockSize = 1;
  }
  _doFinalize() {
    const finalProcessedBlocks = this._process(true);
    return finalProcessedBlocks;
  }
};
var BlockCipherMode = class extends Base {
  constructor(cipher, iv) {
    super();
    this._cipher = cipher;
    this._iv = iv;
  }
  static createEncryptor(cipher, iv) {
    return this.Encryptor.create(cipher, iv);
  }
  static createDecryptor(cipher, iv) {
    return this.Decryptor.create(cipher, iv);
  }
};
function xorBlock(words, offset, blockSize) {
  const _words = words;
  let block;
  const iv = this._iv;
  if (iv) {
    block = iv;
    this._iv = void 0;
  } else {
    block = this._prevBlock;
  }
  for (let i = 0; i < blockSize; i += 1) {
    _words[offset + i] ^= block[i];
  }
}
var CBC = class extends BlockCipherMode {
};
CBC.Encryptor = class extends CBC {
  processBlock(words, offset) {
    const cipher = this._cipher;
    const { blockSize } = cipher;
    xorBlock.call(this, words, offset, blockSize);
    cipher.encryptBlock(words, offset);
    this._prevBlock = words.slice(offset, offset + blockSize);
  }
};
CBC.Decryptor = class extends CBC {
  processBlock(words, offset) {
    const cipher = this._cipher;
    const { blockSize } = cipher;
    const thisBlock = words.slice(offset, offset + blockSize);
    cipher.decryptBlock(words, offset);
    xorBlock.call(this, words, offset, blockSize);
    this._prevBlock = thisBlock;
  }
};
var Pkcs7 = {
  pad(data, blockSize) {
    const blockSizeBytes = blockSize * 4;
    const nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;
    const paddingWord = nPaddingBytes << 24 | nPaddingBytes << 16 | nPaddingBytes << 8 | nPaddingBytes;
    const paddingWords = [];
    for (let i = 0; i < nPaddingBytes; i += 4) {
      paddingWords.push(paddingWord);
    }
    const padding = WordArray.create(paddingWords, nPaddingBytes);
    data.concat(padding);
  },
  unpad(data) {
    const _data = data;
    const nPaddingBytes = _data.words[_data.sigBytes - 1 >>> 2] & 255;
    _data.sigBytes -= nPaddingBytes;
  }
};
var BlockCipher = class extends Cipher {
  constructor(xformMode, key, cfg) {
    super(xformMode, key, Object.assign(
      {
        mode: CBC,
        padding: Pkcs7
      },
      cfg
    ));
    this.blockSize = 128 / 32;
  }
  reset() {
    let modeCreator;
    super.reset.call(this);
    const { cfg } = this;
    const { iv, mode } = cfg;
    if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
      modeCreator = mode.createEncryptor;
    } else {
      modeCreator = mode.createDecryptor;
      this._minBufferSize = 1;
    }
    this._mode = modeCreator.call(mode, this, iv && iv.words);
    this._mode.__creator = modeCreator;
  }
  _doProcessBlock(words, offset) {
    this._mode.processBlock(words, offset);
  }
  _doFinalize() {
    let finalProcessedBlocks;
    const { padding } = this.cfg;
    if (this._xformMode === this.constructor._ENC_XFORM_MODE) {
      padding.pad(this._data, this.blockSize);
      finalProcessedBlocks = this._process(true);
    } else {
      finalProcessedBlocks = this._process(true);
      padding.unpad(finalProcessedBlocks);
    }
    return finalProcessedBlocks;
  }
};
var CipherParams = class extends Base {
  constructor(cipherParams) {
    super();
    this.mixIn(cipherParams);
  }
  toString(formatter) {
    return (formatter || this.formatter).stringify(this);
  }
};
var OpenSSLFormatter = {
  stringify(cipherParams) {
    let wordArray;
    const { ciphertext, salt } = cipherParams;
    if (salt) {
      wordArray = WordArray.create([1398893684, 1701076831]).concat(salt).concat(ciphertext);
    } else {
      wordArray = ciphertext;
    }
    return wordArray.toString(Base64);
  },
  parse(openSSLStr) {
    let salt;
    const ciphertext = Base64.parse(openSSLStr);
    const ciphertextWords = ciphertext.words;
    if (ciphertextWords[0] === 1398893684 && ciphertextWords[1] === 1701076831) {
      salt = WordArray.create(ciphertextWords.slice(2, 4));
      ciphertextWords.splice(0, 4);
      ciphertext.sigBytes -= 16;
    }
    return CipherParams.create({ ciphertext, salt });
  }
};
var SerializableCipher = class extends Base {
  static encrypt(cipher, message, key, cfg) {
    const _cfg = Object.assign(new Base(), this.cfg, cfg);
    const encryptor = cipher.createEncryptor(key, _cfg);
    const ciphertext = encryptor.finalize(message);
    const cipherCfg = encryptor.cfg;
    return CipherParams.create({
      ciphertext,
      key,
      iv: cipherCfg.iv,
      algorithm: cipher,
      mode: cipherCfg.mode,
      padding: cipherCfg.padding,
      blockSize: encryptor.blockSize,
      formatter: _cfg.format
    });
  }
  static decrypt(cipher, ciphertext, key, cfg) {
    let _ciphertext = ciphertext;
    const _cfg = Object.assign(new Base(), this.cfg, cfg);
    _ciphertext = this._parse(_ciphertext, _cfg.format);
    const plaintext = cipher.createDecryptor(key, _cfg).finalize(_ciphertext.ciphertext);
    return plaintext;
  }
  static _parse(ciphertext, format) {
    if (typeof ciphertext === "string") {
      return format.parse(ciphertext, this);
    }
    return ciphertext;
  }
};
SerializableCipher.cfg = Object.assign(
  new Base(),
  { format: OpenSSLFormatter }
);
var OpenSSLKdf = {
  execute(password, keySize, ivSize, salt, hasher) {
    let _salt = salt;
    if (!_salt) {
      _salt = WordArray.random(64 / 8);
    }
    let key;
    if (!hasher) {
      key = EvpKDFAlgo.create({ keySize: keySize + ivSize }).compute(password, _salt);
    } else {
      key = EvpKDFAlgo.create({ keySize: keySize + ivSize, hasher }).compute(password, _salt);
    }
    const iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
    key.sigBytes = keySize * 4;
    return CipherParams.create({ key, iv, salt: _salt });
  }
};
var PasswordBasedCipher = class extends SerializableCipher {
  static encrypt(cipher, message, password, cfg) {
    const _cfg = Object.assign(new Base(), this.cfg, cfg);
    const derivedParams = _cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, _cfg.salt, _cfg.hasher);
    _cfg.iv = derivedParams.iv;
    const ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, _cfg);
    ciphertext.mixIn(derivedParams);
    return ciphertext;
  }
  static decrypt(cipher, ciphertext, password, cfg) {
    let _ciphertext = ciphertext;
    const _cfg = Object.assign(new Base(), this.cfg, cfg);
    _ciphertext = this._parse(_ciphertext, _cfg.format);
    const derivedParams = _cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, _ciphertext.salt, _cfg.hasher);
    _cfg.iv = derivedParams.iv;
    const plaintext = SerializableCipher.decrypt.call(this, cipher, _ciphertext, derivedParams.key, _cfg);
    return plaintext;
  }
};
PasswordBasedCipher.cfg = Object.assign(SerializableCipher.cfg, { kdf: OpenSSLKdf });

export {
  Cipher,
  StreamCipher,
  BlockCipherMode,
  CBC,
  Pkcs7,
  BlockCipher,
  CipherParams,
  OpenSSLFormatter,
  SerializableCipher,
  OpenSSLKdf,
  PasswordBasedCipher
};
//# sourceMappingURL=chunk-IJTB3TRO.js.map
