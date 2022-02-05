import { config } from '../../config';
import { PrivKey } from '../crypto';
import { PublicKey } from './publicKey';
import * as bech32 from 'bech32';

/**
 * ValPublicKey
 */
export class ValPublicKey extends PublicKey {
  /**
   *
   */
  toString() {
    const words = bech32.toWords(Buffer.from(this._value));
    return bech32.encode(config.bech32Prefix.valPub, words);
  }

  /**
   * For `JSON.stringify`
   */
  toJSON() {
    return this.toString();
  }

  /**
   *
   * @param valPublicKey
   */
  static fromString(valPublicKey: string) {
    const { words } = bech32.decode(valPublicKey);

    return new ValPublicKey(new Uint8Array(bech32.fromWords(words)));
  }

  static fromPrivateKey(privateKey: PrivKey) {
    return new ValPublicKey(privateKey.bytes());
  }
}

declare module './publicKey' {
  interface PublicKey {
    toValAddress(): ValPublicKey;
  }
}

PublicKey.prototype.toValAddress = function () {
  return new ValPublicKey(this.value());
};
