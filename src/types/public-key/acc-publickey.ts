import { config } from '../../config/';
import { PrivKey } from '../crypto';
import { PublicKey } from './publicKey';
import * as bech32 from 'bech32';

/**
 * AccPublicKey
 */
export class AccPublicKey extends PublicKey {
  /**
   *
   */
  toString() {
    const words = bech32.toWords(Buffer.from(this._value));
    return bech32.encode(config.bech32Prefix.accPub, words);
  }

  /**
   * For `JSON.stringify`
   */
  toJSON() {
    return this.toString();
  }

  /**
   *
   * @param accPublicKey
   */
  static fromString(accPublicKey: string) {
    const { words } = bech32.decode(accPublicKey);
    return new AccPublicKey(new Uint8Array(bech32.fromWords(words)));
  }

  /**
   *
   * @param privateKey
   */
  static fromPrivateKey(privateKey: PrivKey) {
    return new AccPublicKey(privateKey.bytes());
  }
}

declare module './publicKey' {
  interface PublicKey {
    toAccPublicKey(): AccPublicKey;
  }
}

PublicKey.prototype.toAccPublicKey = function () {
  return new AccPublicKey(this.value());
};
