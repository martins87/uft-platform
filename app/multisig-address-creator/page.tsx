"use client";

import { useState } from "react";

import Container from "../components/Container";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import PubKey from "./PubKey";
import Plus from "../assets/icons/Plus.svg";
import { createMultisigAddress } from "../lib/bitcoin";

const MultisigAddressCreator = () => {
  const [pubKeys, setPubKeys] = useState<string[]>([""]);
  const [multisigAddress, setMultisigAddress] = useState<string>("?");

  const handleAddPubKey = () => setPubKeys((state: string[]) => [...state, ""]);

  const handleCreateAddress = () => {
    let { address } = createMultisigAddress(pubKeys, 2);

    setMultisigAddress(address!);
    console.log("multisig address:", address);
  };

  return (
    <Container>
      <Header
        title="Multisig address creator"
        subtitle={
          <p>Create a multi signature address inputing your public keys</p>
        }
      />
      <Card className="gap-y-4">
        {pubKeys.map((_: any, index: number) => (
          <PubKey
            key={index}
            index={index}
            pubKeys={pubKeys}
            setPubKeys={setPubKeys}
          />
        ))}
        <div className="flex items-center gap-2">
          <Button
            className="gap-2"
            primary
            onClick={handleAddPubKey}
            label="Add pubkey"
            icon={Plus}
            iconSide="left"
          />
          <Button
            primary
            onClick={handleCreateAddress}
            label="Create multisig address"
          />
        </div>
        <div className="flex items-center gap-2 mx-auto mt-4">
          <span>Multisig address:</span>
          <span className="w-fit min-h-12 flex items-center gap-2 bg-orange-100 border border-orange-300 text-lg px-4 py-2 rounded-xl text-center">
            {multisigAddress}
          </span>
        </div>
      </Card>
    </Container>
  );
};

export default MultisigAddressCreator;
