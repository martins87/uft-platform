"use client";

import { useState } from "react";

import Container from "../components/Container";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import PubKey from "./PubKey";
import Plus from "../assets/icons/Plus.svg";
import { createMultisigAddress } from "../lib/bitcoin";
import { twMerge } from "tailwind-merge";
import DropdownMenuCheckboxes from "./Dropbox";

const MultisigAddressCreator = () => {
  const [signatures, setSignatures] = useState<number>(1);
  const [pubKeys, setPubKeys] = useState<string[]>([""]);
  const [multisigAddress, setMultisigAddress] = useState<string>("?");

  const handleAddPubKey = () => setPubKeys((state: string[]) => [...state, ""]);

  const truncateAddress = (hash: string) => {
    return hash.substring(0, 7) + "..." + hash.slice(-7);
  };

  const handleCreateAddress = () => {
    try {
      let { address } = createMultisigAddress(pubKeys, signatures);

      setMultisigAddress(address!);
    } catch (error) {
      console.error("Error on creating the multisig address", error);
    }
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
        <DropdownMenuCheckboxes
          pubKeysNumber={pubKeys}
          signatures={signatures}
          setSignatures={setSignatures}
        />
        {pubKeys.map((_: any, index: number) => (
          <PubKey
            key={index}
            index={index}
            pubKeys={pubKeys}
            setPubKeys={setPubKeys}
          />
        ))}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button
            className="gap-2 w-full mobile:w-fit"
            primary
            onClick={handleAddPubKey}
            label="Add pubkey"
            icon={Plus}
            iconSide="left"
          />
          <Button
            className="w-full mobile:w-fit"
            primary
            onClick={handleCreateAddress}
            label="Create address"
          />
        </div>
        <div
          className={twMerge(
            "flex items-center gap-2 mx-auto mt-4",
            multisigAddress.length > 1 ? "flex-col" : ""
          )}
        >
          <span>{`${signatures}-of-${pubKeys.length} multisig address:`}</span>
          <span className="w-fit min-h-12 flex items-center gap-2 bg-orange-100 border border-orange-300 text-lg px-4 py-2 rounded-xl text-center">
            {multisigAddress}
          </span>
        </div>
      </Card>
    </Container>
  );
};

export default MultisigAddressCreator;
