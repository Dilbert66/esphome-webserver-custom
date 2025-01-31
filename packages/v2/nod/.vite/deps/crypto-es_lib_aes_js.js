import {
  BlockCipher
} from "./chunk-IJTB3TRO.js";
import "./chunk-R6PYHBHQ.js";
import "./chunk-BR53HCJY.js";
import "./chunk-T2T6Q22Z.js";

// ../../node_modules/crypto-es/lib/aes.js
var _SBOX = [];
var INV_SBOX = [];
var _SUB_MIX_0 = [];
var _SUB_MIX_1 = [];
var _SUB_MIX_2 = [];
var _SUB_MIX_3 = [];
var INV_SUB_MIX_0 = [];
var INV_SUB_MIX_1 = [];
var INV_SUB_MIX_2 = [];
var INV_SUB_MIX_3 = [];
var d = [];
for (let i = 0; i < 256; i += 1) {
  if (i < 128) {
    d[i] = i << 1;
  } else {
    d[i] = i << 1 ^ 283;
  }
}
var x = 0;
var xi = 0;
for (let i = 0; i < 256; i += 1) {
  let sx = xi ^ xi << 1 ^ xi << 2 ^ xi << 3 ^ xi << 4;
  sx = sx >>> 8 ^ sx & 255 ^ 99;
  _SBOX[x] = sx;
  INV_SBOX[sx] = x;
  const x2 = d[x];
  const x4 = d[x2];
  const x8 = d[x4];
  let t = d[sx] * 257 ^ sx * 16843008;
  _SUB_MIX_0[x] = t << 24 | t >>> 8;
  _SUB_MIX_1[x] = t << 16 | t >>> 16;
  _SUB_MIX_2[x] = t << 8 | t >>> 24;
  _SUB_MIX_3[x] = t;
  t = x8 * 16843009 ^ x4 * 65537 ^ x2 * 257 ^ x * 16843008;
  INV_SUB_MIX_0[sx] = t << 24 | t >>> 8;
  INV_SUB_MIX_1[sx] = t << 16 | t >>> 16;
  INV_SUB_MIX_2[sx] = t << 8 | t >>> 24;
  INV_SUB_MIX_3[sx] = t;
  if (!x) {
    xi = 1;
    x = xi;
  } else {
    x = x2 ^ d[d[d[x8 ^ x2]]];
    xi ^= d[d[xi]];
  }
}
var RCON = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54];
var AESAlgo = class extends BlockCipher {
  _doReset() {
    let t;
    if (this._nRounds && this._keyPriorReset === this._key) {
      return;
    }
    this._keyPriorReset = this._key;
    const key = this._keyPriorReset;
    const keyWords = key.words;
    const keySize = key.sigBytes / 4;
    this._nRounds = keySize + 6;
    const nRounds = this._nRounds;
    const ksRows = (nRounds + 1) * 4;
    this._keySchedule = [];
    const keySchedule = this._keySchedule;
    for (let ksRow = 0; ksRow < ksRows; ksRow += 1) {
      if (ksRow < keySize) {
        keySchedule[ksRow] = keyWords[ksRow];
      } else {
        t = keySchedule[ksRow - 1];
        if (!(ksRow % keySize)) {
          t = t << 8 | t >>> 24;
          t = _SBOX[t >>> 24] << 24 | _SBOX[t >>> 16 & 255] << 16 | _SBOX[t >>> 8 & 255] << 8 | _SBOX[t & 255];
          t ^= RCON[ksRow / keySize | 0] << 24;
        } else if (keySize > 6 && ksRow % keySize === 4) {
          t = _SBOX[t >>> 24] << 24 | _SBOX[t >>> 16 & 255] << 16 | _SBOX[t >>> 8 & 255] << 8 | _SBOX[t & 255];
        }
        keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
      }
    }
    this._invKeySchedule = [];
    const invKeySchedule = this._invKeySchedule;
    for (let invKsRow = 0; invKsRow < ksRows; invKsRow += 1) {
      const ksRow = ksRows - invKsRow;
      if (invKsRow % 4) {
        t = keySchedule[ksRow];
      } else {
        t = keySchedule[ksRow - 4];
      }
      if (invKsRow < 4 || ksRow <= 4) {
        invKeySchedule[invKsRow] = t;
      } else {
        invKeySchedule[invKsRow] = INV_SUB_MIX_0[_SBOX[t >>> 24]] ^ INV_SUB_MIX_1[_SBOX[t >>> 16 & 255]] ^ INV_SUB_MIX_2[_SBOX[t >>> 8 & 255]] ^ INV_SUB_MIX_3[_SBOX[t & 255]];
      }
    }
  }
  encryptBlock(M, offset) {
    this._doCryptBlock(
      M,
      offset,
      this._keySchedule,
      _SUB_MIX_0,
      _SUB_MIX_1,
      _SUB_MIX_2,
      _SUB_MIX_3,
      _SBOX
    );
  }
  decryptBlock(M, offset) {
    const _M = M;
    let t = _M[offset + 1];
    _M[offset + 1] = _M[offset + 3];
    _M[offset + 3] = t;
    this._doCryptBlock(
      _M,
      offset,
      this._invKeySchedule,
      INV_SUB_MIX_0,
      INV_SUB_MIX_1,
      INV_SUB_MIX_2,
      INV_SUB_MIX_3,
      INV_SBOX
    );
    t = _M[offset + 1];
    _M[offset + 1] = _M[offset + 3];
    _M[offset + 3] = t;
  }
  _doCryptBlock(M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
    const _M = M;
    const nRounds = this._nRounds;
    let s0 = _M[offset] ^ keySchedule[0];
    let s1 = _M[offset + 1] ^ keySchedule[1];
    let s2 = _M[offset + 2] ^ keySchedule[2];
    let s3 = _M[offset + 3] ^ keySchedule[3];
    let ksRow = 4;
    for (let round = 1; round < nRounds; round += 1) {
      const t02 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[s1 >>> 16 & 255] ^ SUB_MIX_2[s2 >>> 8 & 255] ^ SUB_MIX_3[s3 & 255] ^ keySchedule[ksRow];
      ksRow += 1;
      const t12 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[s2 >>> 16 & 255] ^ SUB_MIX_2[s3 >>> 8 & 255] ^ SUB_MIX_3[s0 & 255] ^ keySchedule[ksRow];
      ksRow += 1;
      const t22 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[s3 >>> 16 & 255] ^ SUB_MIX_2[s0 >>> 8 & 255] ^ SUB_MIX_3[s1 & 255] ^ keySchedule[ksRow];
      ksRow += 1;
      const t32 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[s0 >>> 16 & 255] ^ SUB_MIX_2[s1 >>> 8 & 255] ^ SUB_MIX_3[s2 & 255] ^ keySchedule[ksRow];
      ksRow += 1;
      s0 = t02;
      s1 = t12;
      s2 = t22;
      s3 = t32;
    }
    const t0 = (SBOX[s0 >>> 24] << 24 | SBOX[s1 >>> 16 & 255] << 16 | SBOX[s2 >>> 8 & 255] << 8 | SBOX[s3 & 255]) ^ keySchedule[ksRow];
    ksRow += 1;
    const t1 = (SBOX[s1 >>> 24] << 24 | SBOX[s2 >>> 16 & 255] << 16 | SBOX[s3 >>> 8 & 255] << 8 | SBOX[s0 & 255]) ^ keySchedule[ksRow];
    ksRow += 1;
    const t2 = (SBOX[s2 >>> 24] << 24 | SBOX[s3 >>> 16 & 255] << 16 | SBOX[s0 >>> 8 & 255] << 8 | SBOX[s1 & 255]) ^ keySchedule[ksRow];
    ksRow += 1;
    const t3 = (SBOX[s3 >>> 24] << 24 | SBOX[s0 >>> 16 & 255] << 16 | SBOX[s1 >>> 8 & 255] << 8 | SBOX[s2 & 255]) ^ keySchedule[ksRow];
    ksRow += 1;
    _M[offset] = t0;
    _M[offset + 1] = t1;
    _M[offset + 2] = t2;
    _M[offset + 3] = t3;
  }
};
AESAlgo.keySize = 256 / 32;
var AES = BlockCipher._createHelper(AESAlgo);
export {
  AES,
  AESAlgo
};
//# sourceMappingURL=crypto-es_lib_aes_js.js.map
