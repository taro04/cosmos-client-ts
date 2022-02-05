import { proto, cosmosclient } from '../..';
import * as crypto from 'crypto';

describe('pubkey', () => {
  it('acc-public-key', async () => {
    expect.hasAssertions();

    const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
      key: await cosmosclient.generatePrivKeyFromMnemonic(
        'chest flight brain grocery flock elephant gloom gaze diet girl subway again extra spider monitor kiss explain paper beauty ordinary ship dry oxygen shield',
      ),
    });
    const pubkey = cosmosclient.AccPublicKey.fromPrivateKey(privKey);

    const str = 'ununifipub1addwnpepq0u4zl9r2x4ks82mjetexffsdduruqkmmtmqnx68dfkuy2yr275e53rn0e4';
    expect(pubkey).toStrictEqual(str);
  });

  it('ed25519', () => {
    expect.hasAssertions();

    const str = 'str';
    expect('str').toStrictEqual(str);

    /*
    const bytes = new Uint8Array(crypto.randomBytes(32));
    const key = new proto.cosmos.crypto.ed25519.PrivKey({ key: bytes });
    const address = cosmosclient.AccPublicKey.fromPublicKey(key.pubKey());
    const str = address.toString();
    const revived = cosmosclient.AccPublicKey.fromString(str);

    expect(revived.toString()).toStrictEqual(str);

    const ValPublicKey = cosmosclient.ValPublicKey.fromPublicKey(key.pubKey());

    expect(address.toString().split('1')[1]).toHaveLength(ValPublicKey.toString().split('1')[1].length);
    */
  });

  it('secp256k1', () => {
    expect.hasAssertions();
    //A: randomByte -> privkeyObj -> accAddrStr
    //B: accAddrStr -> accAddrStr
    //A = B ?

    const bytes = new Uint8Array(crypto.randomBytes(32));
    const key = new proto.cosmos.crypto.secp256k1.PrivKey({ key: bytes });
    const address = cosmosclient.AccPublicKey.fromPublicKey(key.pubKey());
    const str = address.toString();
    const revived = cosmosclient.AccPublicKey.fromString(str);

    console.log('secp256k1', str);
    expect(revived.toString()).toStrictEqual(str);

    const ValPublicKey = cosmosclient.ValPublicKey.fromPublicKey(key.pubKey());

    console.log('secp256k1', ValPublicKey.toString().split('1')[1].length);
    expect(address.toString().split('1')[1]).toHaveLength(ValPublicKey.toString().split('1')[1].length);
  });

  it('accPublicKey', async () => {
    //A: privkeyStr(ed25519) -> privkeyObj -> accAddr
    //B: privkeyStr(spk256k1) -> privkeyObj -> accAddr
    //A = "str" ?
    //B = "str" ?

    expect.hasAssertions();
    const privKeyStr = 'ef40ea14839c3ee5690336bb1f032870941dbb329fc0553132a4a109a022a391';

    const privKey1 = new proto.cosmos.crypto.ed25519.PrivKey({
      key: Buffer.from(privKeyStr, 'hex'),
    });
    const privKey2 = new proto.cosmos.crypto.secp256k1.PrivKey({
      key: Buffer.from(privKeyStr, 'hex'),
    });

    const address1 = cosmosclient.AccPublicKey.fromPublicKey(privKey1.pubKey());
    const address2 = cosmosclient.AccPublicKey.fromPublicKey(privKey2.pubKey());

    console.log(address2.toString());
    expect(address1.toString()).toBe('cosmos1aqt94lggum9v9xhuyppaawtjwra76mj8mjdgm5');
    expect(address2.toString()).toBe('cosmos14ynfqqa6j5k3kcqm2ymf3l66d9x07ysxgnvdyx');
  });

  it('convert', async () => {
    //A: privkeyStr -> privkeyObj -> accAddr -> valAddr
    //B: privkeyStr -> privkeyObj -> valAddr
    //A = B ?

    expect.hasAssertions();
    const privKeyStr = 'ef40ea14839c3ee5690336bb1f032870941dbb329fc0553132a4a109a022a391';

    const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
      key: Buffer.from(privKeyStr, 'hex'),
    });

    const AccPublicKey = cosmosclient.AccPublicKey.fromPublicKey(privKey.pubKey());
    const ValPublicKey = cosmosclient.ValPublicKey.fromPublicKey(privKey.pubKey());

    console.log('convert', ValPublicKey.toString());
    expect(AccPublicKey.toValAddress().toString()).toStrictEqual(ValPublicKey.toString());
  });
});
