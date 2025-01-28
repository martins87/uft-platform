"use client";

import { useState } from "react";
import CryptoJS from "crypto-js";

import { register } from "../../lib/register";
import { loadFile } from "../../lib/load-file";
import Card from "../../components/Card";
import Button from "../../components/Button";
import DataToRegister from "./DataToRegister";
import TxLink from "./TxLink";
import LoadingTx from "./LoadingTx";
import { Input } from "@/components/ui/input";

const File = () => {
  const [calculating, setCalculating] = useState<boolean>(false);
  const [fileHash, setFileHash] = useState<string>("");
  const [loaded, setLoaded] = useState<number>(0);
  const [txHash, setTxHash] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileSelected = (e: any) => {
    setLoaded(0);
    setCalculating(true);

    const file = e.target.files![0];
    const SHA256 = CryptoJS.algo.SHA256.create();
    let counter = 0;

    loadFile(
      file,
      (data: any) => {
        var wordBuffer = CryptoJS.lib.WordArray.create(data);
        SHA256.update(wordBuffer);
        counter += data.byteLength;
        setLoaded(+((counter / file.size) * 100).toFixed(0));
      },
      () => {
        var encrypted = SHA256.finalize().toString();
        setFileHash(encrypted);
        setCalculating(false);
      }
    );
  };

  const handleRegisterFile = async () => {
    setLoading(true);
    let hash: string = await register(fileHash);
    setTxHash(hash);
    setLoading(false);
  };

  return (
    <Card>
      <span className="text-xl text-center">File</span>
      <Input id="file" type="file" onChange={handleFileSelected} />
      <span className="-mb-6">SHA256 hash</span>
      {calculating && (
        <div>
          <span className="text-sm">Calculating hash...</span>
          <progress
            className="progress w-full"
            value={loaded}
            max="100"
          ></progress>
        </div>
      )}
      <DataToRegister data={fileHash} />
      <Button
        primary
        onClick={handleRegisterFile}
        label="Register"
        disabled={!fileHash}
      />
      <LoadingTx loading={loading} />
      <TxLink txHash={txHash} />
    </Card>
  );
};

export default File;
