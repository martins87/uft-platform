"use client";

import { useState } from "react";
import sha256 from "crypto-js/sha256";

import { register } from "../../lib/register";
import Card from "../../components/Card";
import Button from "../../components/Button";
import TxLink from "./TxLink";
import DataToRegister from "./DataToRegister";
import LoadingTx from "./LoadingTx";
import Stylus from "../../assets/icons/Stylus.svg";
import { Switch } from "@/components/ui/switch";

const PlainText = () => {
  const [data, setData] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [toHash, setToHash] = useState<boolean>(false);

  const handleReset = () => setData("");

  // TODO make useRegister hook
  const handleRegister = async () => {
    setLoading(true);

    let dataToRegister: string = toHash ? sha256(data).toString() : data;
    let hash: string = await register(dataToRegister);

    setTxHash(hash);
    setLoading(false);
  };

  const handleSwitch = () => setToHash((state) => !state);

  return (
    <Card className="gap-y-4">
      <span className="text-xl text-center">Plain text</span>
      <textarea
        className="textarea textarea-bordered min-h-36 p-2 border rounded-xl focus:outline-none"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Type here..."
      ></textarea>
      <div className="flex items-center gap-x-2">
        <span>Hexadecimal</span>
        <Switch onClick={handleSwitch} />
        <span>SHA256 hash</span>
      </div>
      <DataToRegister data={data} toHash={toHash} />
      <div className="flex gap-2">
        <Button secondary onClick={handleReset} label="Reset" />
        <Button
          primary
          onClick={handleRegister}
          label="Register"
          icon={Stylus}
          iconSide="right"
        />
      </div>
      <LoadingTx loading={loading} />
      <TxLink txHash={txHash} />
    </Card>
  );
};

export default PlainText;
