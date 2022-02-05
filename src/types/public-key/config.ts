import { PublicKeyPrefix } from './prefix';

export const bech32Prefix = {
  accAddr: PublicKeyPrefix.Cosmos as string,
  accPub: PublicKeyPrefix.Cosmos + PublicKeyPrefix.Public,
  valAddr: PublicKeyPrefix.Cosmos + PublicKeyPrefix.Validator + PublicKeyPrefix.Operator,
  valPub: PublicKeyPrefix.Cosmos + PublicKeyPrefix.Validator + PublicKeyPrefix.Operator + PublicKeyPrefix.Public,
  consAddr: PublicKeyPrefix.Cosmos + PublicKeyPrefix.Validator + PublicKeyPrefix.Consensus,
  consPub: PublicKeyPrefix.Cosmos + PublicKeyPrefix.Validator + PublicKeyPrefix.Consensus + PublicKeyPrefix.Public,
};

export function setBech32Prefix(value: typeof bech32Prefix) {
  bech32Prefix.accAddr = value.accAddr;
  bech32Prefix.accPub = value.accPub;
  bech32Prefix.valAddr = value.valAddr;
  bech32Prefix.valPub = value.valPub;
  bech32Prefix.consAddr = value.consAddr;
  bech32Prefix.consPub = value.consPub;
}
