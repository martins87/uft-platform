"use client";

import { useState } from "react";
import sha256 from "crypto-js/sha256";

import { register } from "../lib/register";
import Card from "../components/Card";
import Button from "../components/Button";
import TxLink from "./TxLink";
import SHA256Hash from "./SHA256Hash";
import LoadingTx from "./LoadingTx";

const PlainText = () => {
  const [data, setData] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleReset = () => setData("");

  // TODO make useRegister hook
  const handleRegister = async () => {
    setLoading(true);
    let hash: string = await register(sha256(data).toString());
    setTxHash(hash);
    setLoading(false);
  };

  return (
    <Card>
      <span className="text-xl text-center">Plain text</span>
      <textarea
        className="textarea textarea-bordered min-h-36 p-2 border rounded-md focus:outline-none"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Type here..."
      ></textarea>
      <SHA256Hash data={data} toHash />
      <div className="flex gap-2">
        <Button secondary onClick={handleReset} label="Reset" />
        <Button primary onClick={handleRegister} label="Register" />
      </div>
      <LoadingTx loading={loading} />
      <TxLink txHash={txHash} />
    </Card>
  );
};

export default PlainText;
