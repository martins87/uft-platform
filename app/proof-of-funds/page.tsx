"use client";

import React, { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import bitcoinMessage from "bitcoinjs-message";

import Container from "../components/Container";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import BadgeCheck from "../assets/icons/BadgeCheck.svg";
import CircleX from "../assets/icons/CircleX.svg";
import TriangleAlert from "../assets/icons/TriangleAlert.svg";

enum VerificationMessage {
  Valid,
  Invalid,
  InvalidSignatureLength,
}

const ProofOfFunds = () => {
  const [message, setMessage] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [balance, setBalance] = useState<string>("");
  const [fetchingBalance, setFetchingBalance] = useState<boolean>(false);
  const [usdBalance, setUsdBalance] = useState<string>("");
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const [sigBgColor, setSigBgColor] = useState<string>("bg-inherit");
  const [resultMessage, setResultMessage] = useState<string>("");
  const [resultSymbol, setResultSymbol] = useState<VerificationMessage>(
    VerificationMessage.Invalid
  );

  const getPriceInUSD = async () => {
    try {
      let rate = axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");

      return rate;
    } catch (error: any) {
      console.error(error.message);

      return 0;
    }
  };

  const getBalance = async (address: string) => {
    let rateData = (await getPriceInUSD()) as any;
    let rate = rateData.data.bpi.USD.rate_float;

    try {
      const response = await axios.get(
        `https://blockchain.info/q/addressbalance/${address}`
      );

      // setTimeout(() => {
      let bitcoinBalance = response.data / 1e8;
      let USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      setBalance(`₿ ${bitcoinBalance.toString()}`);
      setUsdBalance(`${USDollar.format(rate * bitcoinBalance)}`);
      // }, 1000);

      return response.data / 1e8;
    } catch (error) {
      console.error("Error fetching balance:", error);

      return 0;
    }
  };

  const onAddressChange = (e: any) => {
    let addr: string = e.target.value;

    setAddress(addr);

    if (addr.length > 0) {
      setFetchingBalance(true);

      setTimeout(() => {
        getBalance(addr);
      }, 1000);

      setFetchingBalance(false);
    }
  };

  const handleVerify = async () => {
    try {
      const validSig = bitcoinMessage.verify(
        message,
        address,
        signature,
        undefined,
        true
      );

      if (validSig) {
        console.log("The signature is valid");
        setResultMessage("The signature is valid");
        setSigBgColor("bg-green-100");
        setResultSymbol(VerificationMessage.Valid);
      } else {
        console.log("Not a valid signature");
        setResultMessage("Not a valid signature");
        setSigBgColor("bg-red-100");
        setResultSymbol(VerificationMessage.Invalid);
      }

      setMessageVisible(true);
    } catch (error: any) {
      let errorMessage = error.message;

      console.log(errorMessage);
    }
  };

  return (
    <Container>
      <Header
        title="Proof of funds"
        subtitle={
          <p>
            Prove you own some bitcoin. For a single message, add addresses and
            respective signatures for this message.
          </p>
        }
      />
      <Card className="gap-y-[12px]">
        <span className="text-center text-xl text-gray-700">Message</span>
        <textarea
          className="textarea textarea-bordered min-h-20 px-4 py-2 border rounded-md text-sm focus:outline-none mb-6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."
        ></textarea>

        <div className="flex flex-col gap-4 border rounded-md p-4">
          <h4 className="text-xl font-bold">Funds #0</h4>

          <div className="flex items-center gap-x-2">
            <span className="text-gray-700 min-w-20">Address:</span>
            <input
              className="w-full h-10 border rounded-md px-4 text-sm focus:outline-none"
              type="text"
              value={address}
              onChange={onAddressChange}
              placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
            />
          </div>

          <div className="flex items-center gap-x-2">
            <span className="text-gray-700 min-w-20">Balance:</span>
            <span className="w-fit flex items-center gap-2 bg-orange-100 text-lg px-3 py-2 rounded-lg text-clip">
              {!address.length ? (
                <span className="text-sm text-gray-500">
                  Enter a Bitcoin address to fetch balance
                </span>
              ) : (
                <div>
                  {balance}
                  <span className="text-base"> | </span>
                  <span className="text-sm">{usdBalance}</span>
                </div>
              )}
            </span>
          </div>

          <div className="flex items-center gap-x-2">
            <span className="text-gray-700 min-w-20">Signature:</span>
            <textarea
              className={twMerge(
                "w-full min-h-20 px-4 py-2 border rounded-md text-sm focus:outline-none",
                sigBgColor
              )}
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="e.g. H06dEm7K3o8GzCVLhWqfNer5MXm+QjwJzqNDBzgBfhyyDwBIcMWREzH0UfaXvXtw8t5duuFXQQE61ZXwJCjXbi0="
            ></textarea>
          </div>

          <div className="relative flex items-center h-12">
            <Button
              className="absolute left-0 bottom-2"
              primary
              onClick={handleVerify}
              label="Check ownership"
              // TODO add validation
            />

            {messageVisible && (
              <div className="flex gap-x-2 mx-auto">
                <Image
                  src={
                    resultSymbol == VerificationMessage.Valid
                      ? BadgeCheck
                      : resultSymbol == VerificationMessage.Invalid
                      ? CircleX
                      : TriangleAlert
                  }
                  alt="Valid signature"
                />
                <span>{resultMessage}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default ProofOfFunds;
