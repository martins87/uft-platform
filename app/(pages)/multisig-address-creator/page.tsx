"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Button from "../../components/Button";
import PubKey from "./PubKey";
import DropdownMenuCheckboxes from "./Dropbox";
import { createMultisigAddress } from "../../lib/bitcoin";
import Plus from "../../assets/icons/Plus.svg";
import Copy from "../../assets/icons/Copy.svg";
import Check from "../../assets/icons/Check.svg";

const MultisigAddressCreator = () => {
  const [signatures, setSignatures] = useState<number>(1);
  const [pubKeys, setPubKeys] = useState<string[]>([""]);
  const [multisigAddress, setMultisigAddress] = useState<string>("?");
  const [icons, setIcons] = useState<any[]>([Copy, Copy]);

  useEffect(() => {
    redirect("https://www.operationblockchain.app/multisig-address-creator/");
  }, []);

  const handleAddPubKey = () => setPubKeys((state: string[]) => [...state, ""]);

  const truncateAddress = (hash: string) => {
    return hash.substring(0, 10) + "..." + hash.slice(-10);
  };

  const handleCreateAddress = () => {
    try {
      let { address } = createMultisigAddress(pubKeys, signatures);

      setMultisigAddress(address!);
    } catch (error) {
      console.error("Error on creating the multisig address", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(multisigAddress);

    setIcons([Check, Copy]);

    setTimeout(() => {
      setIcons([Copy, Copy]);
    }, 1500);
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
            className="gap-2 w-full sm:w-fit"
            primary
            onClick={handleAddPubKey}
            label="Add pubkey"
            icon={Plus}
            iconSide="left"
          />
          <Button
            className="w-full sm:w-fit"
            primary
            onClick={handleCreateAddress}
            label="Create address"
          />
        </div>
        <div
          className={twMerge(
            "flex items-center gap-2 mt-4",
            multisigAddress.length > 1 ? "flex-col" : ""
          )}
        >
          <span>{`${signatures}-of-${pubKeys.length} multisig address:`}</span>
          <span className="relative w-full sm:w-fit md:w-full tablet:w-fit min-h-12 items-center gap-2 bg-orange-100 border border-orange-300 text-lg pl-4 pr-12 py-2 rounded-xl">
            <div className="mobile:hidden md:flex tablet:hidden">
              {truncateAddress(multisigAddress)}
            </div>
            <div className="hidden mobile:flex md:hidden tablet:flex">
              {multisigAddress}
            </div>
            <Image
              className={twMerge(
                "absolute right-2 top-[50%] -translate-y-1/2",
                multisigAddress.length > 1
                  ? "hover:cursor-pointer"
                  : "opacity-50"
              )}
              src={icons[0]}
              alt="Copy to clipboard"
              onClick={() => handleCopy()}
            />
          </span>
        </div>
      </Card>
    </Container>
  );
};

export default MultisigAddressCreator;
