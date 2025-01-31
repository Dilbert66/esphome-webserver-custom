import {
  WordArray
} from "./chunk-BR53HCJY.js";

// ../../node_modules/crypto-es/lib/enc-base64.js
var parseLoop = (base64Str, base64StrLength, reverseMap) => {
  const words = [];
  let nBytes = 0;
  for (let i = 0; i < base64StrLength; i += 1) {
    if (i % 4) {
      const bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
      const bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
      const bitsCombined = bits1 | bits2;
      words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
      nBytes += 1;
    }
  }
  return WordArray.create(words, nBytes);
};
var Base64 = {
  stringify(wordArray) {
    const { words, sigBytes } = wordArray;
    const map = this._map;
    wordArray.clamp();
    const base64Chars = [];
    for (let i = 0; i < sigBytes; i += 3) {
      const byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i + j * 0.75 < sigBytes; j += 1) {
        base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    const paddingChar = map.charAt(64);
    if (paddingChar) {
      while (base64Chars.length % 4) {
        base64Chars.push(paddingChar);
      }
    }
    return base64Chars.join("");
  },
  parse(base64Str) {
    let base64StrLength = base64Str.length;
    const map = this._map;
    let reverseMap = this._reverseMap;
    if (!reverseMap) {
      this._reverseMap = [];
      reverseMap = this._reverseMap;
      for (let j = 0; j < map.length; j += 1) {
        reverseMap[map.charCodeAt(j)] = j;
      }
    }
    const paddingChar = map.charAt(64);
    if (paddingChar) {
      const paddingIndex = base64Str.indexOf(paddingChar);
      if (paddingIndex !== -1) {
        base64StrLength = paddingIndex;
      }
    }
    return parseLoop(base64Str, base64StrLength, reverseMap);
  },
  _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
};

export {
  parseLoop,
  Base64
};
//# sourceMappingURL=chunk-R6PYHBHQ.js.map
