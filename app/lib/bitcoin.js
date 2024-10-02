import * as bitcoin from "bitcoinjs-lib";

// Generates a multisig address
export const createMultisigAddress = (
  publicKeys,
  signatures,
  network = bitcoin.networks.bitcoin
) => {
  // Convert public keys to buffer format
  const pubKeysBuffer = publicKeys.map((hex) => Buffer.from(hex, "hex"));

  // Create the P2SH (Pay-to-Script-Hash) multisig address
  const p2ms = bitcoin.payments.p2ms({ m: signatures, pubkeys: pubKeysBuffer });
  const p2sh = bitcoin.payments.p2sh({ redeem: p2ms, network });

  return {
    address: p2sh.address,
    redeemScript: p2sh.redeem.output.toString("hex"),
  };
};
