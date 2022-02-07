//import { PubKey, PrivKey } from '../crypto';
//import { PubKey } from '../crypto';

/**
 * Base class
 */
export class PublicKey {
  protected _value: Uint8Array;

  /**
   *
   * @param value
   */
  constructor(value: Uint8Array) {
    const addressLength = 32;
    if (value.length !== addressLength) {
      throw Error('Public key must be 32 bytes length.');
    }
    this._value = value;
  }

  value() {
    return this._value;
  }

  /**
   *
   * @param pubKey
   */
  //static fromPublicKey(pubKey: PubKey) {
  //  return new PublicKey(pubKey.bytes());
  //}

  /**
   *
   * @param privateKey
   */
  //static fromPrivateKey(privateKey: PrivKey) {
  //  return new PublicKey(privateKey.bytes());
  //}
}
