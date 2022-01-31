import { config } from '../../config';
import { PrivKey } from '../crypto';
import { Address } from './address';
import * as bech32 from 'bech32';

/**
 * ConsPublicKey
 */
export class ConsPublicKey extends Address {
  /**
   *
   */
  toString() {
    const words = bech32.toWords(Buffer.from(this._value));
    return bech32.encode(config.bech32Prefix.consPub, words);
  }

  /**
   * For `JSON.stringify`
   */
  toJSON() {
    return this.toString();
  }

  /**
   *
   * @param consPublicKey
   */
  static fromString(consPublicKey: string) {
    const { words } = bech32.decode(consPublicKey);

    return new ConsPublicKey(new Uint8Array(bech32.fromWords(words)));
  }

  static fromPrivateKey(privateKey: PrivKey) {
    return new ConsPublicKey(privateKey.bytes());
  }
}

declare module './address' {
  interface Address {
    toConsPublicKey(): ConsPublicKey;
  }
}

Address.prototype.toConsPublicKey = function () {
  return new ConsPublicKey(this.value());
};
