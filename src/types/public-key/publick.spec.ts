import { proto, cosmosclient } from '../..';
import * as crypto from 'crypto';

describe('pubkey', () => {
  it('private-key', async () => {
    expect.hasAssertions();
    // check private-key (hex) from mnemonic and private-key from telescope key back-up DL file

    const mnemonic =
      'chest flight brain grocery flock elephant gloom gaze diet girl subway again extra spider monitor kiss explain paper beauty ordinary ship dry oxygen shield';
    const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
      key: await cosmosclient.generatePrivKeyFromMnemonic(mnemonic),
    });
    expect(Buffer.from(privKey.bytes()).toString('hex')).toBe('79d772d0c7a1bd57ae27f76623fc0a3165c42095d9c9faea178bae03cf5a3f3c');
  });

  it('acc-public-key', async () => {
    expect.hasAssertions();
    // check public-key from mnemonic and public-key from CLI

    const mnemonic =
      'chest flight brain grocery flock elephant gloom gaze diet girl subway again extra spider monitor kiss explain paper beauty ordinary ship dry oxygen shield';
    const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
      key: await cosmosclient.generatePrivKeyFromMnemonic(mnemonic),
    });
    const pubkey = cosmosclient.AccPublicKey.fromPrivateKey(privKey);
    expect(pubkey.toString()).toBe('ununifipub1addwnpepq0u4zl9r2x4ks82mjetexffsdduruqkmmtmqnx68dfkuy2yr275e53rn0e4');
  });

  it('acc-address-key', async () => {
    expect.hasAssertions();
    // check accAddress from mnemonic and address from CLI

    const mnemonic =
      'chest flight brain grocery flock elephant gloom gaze diet girl subway again extra spider monitor kiss explain paper beauty ordinary ship dry oxygen shield';
    const privKey = new proto.cosmos.crypto.secp256k1.PrivKey({
      key: await cosmosclient.generatePrivKeyFromMnemonic(mnemonic),
    });
    const publicKey = privKey.pubKey();
    const accAddress = cosmosclient.AccAddress.fromPublicKey(publicKey);
    expect(accAddress.toString()).toBe('ununifi1rhkn3y3t32q95wumm9gyx02humkzc82p9yrmkx');
  });

  it('ed25519', () => {
    expect.hasAssertions();

    const bytes = new Uint8Array(crypto.randomBytes(32));
    const key = new proto.cosmos.crypto.ed25519.PrivKey({ key: bytes });
    const address = cosmosclient.AccPublicKey.fromPrivateKey(key);
    const str = address.toString();
    const revived = cosmosclient.AccPublicKey.fromString(str);
    expect(revived.toString()).toStrictEqual(str);

    const ValPublicKey = cosmosclient.ValPublicKey.fromPrivateKey(key);
    expect(address.toString().split('1')[1]).toHaveLength(ValPublicKey.toString().split('1')[1].length);
  });

  it('secp256k1', () => {
    expect.hasAssertions();
    //A: randomByte -> privkeyObj -> accAddrStr
    //B: accAddrStr -> accAddrStr
    //A = B ?

    const bytes = new Uint8Array(crypto.randomBytes(32));
    const key = new proto.cosmos.crypto.secp256k1.PrivKey({ key: bytes });
    const address = cosmosclient.AccPublicKey.fromPrivateKey(key);
    const str = address.toString();
    const revived = cosmosclient.AccPublicKey.fromString(str);
    expect(revived.toString()).toStrictEqual(str);

    const ValPublicKey = cosmosclient.ValPublicKey.fromPrivateKey(key);
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

    const address1 = cosmosclient.AccPublicKey.fromPrivateKey(privKey1);
    const address2 = cosmosclient.AccPublicKey.fromPrivateKey(privKey2);

    console.log(address2.toString());
    expect(address1.toString()).toBe('ununifipub1addwnpepq1aaqw59yrnslw26grx6a37qegwz2pmwejnlq92vfj5jssngpz5wgsu49aw8');
    expect(address2.toString()).toBe('ununifipub1addwnpepq1aaqw59yrnslw26grx6a37qegwz2pmwejnlq92vfj5jssngpz5wgsu49aw8');
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

    const AccPublicKey = cosmosclient.AccPublicKey.fromPrivateKey(privKey);
    const ValPublicKey = cosmosclient.ValPublicKey.fromPrivateKey(privKey);

    console.log('convert', ValPublicKey.toString());
    expect(AccPublicKey.toValPublicKey().toString()).toStrictEqual(ValPublicKey.toString());
  });
});
