"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Funds from "./Funds";
import Plus from "../../assets/icons/Plus.svg";

const ProofOfFunds = () => {
  const [message, setMessage] = useState<string>("");
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [funds, setFunds] = useState<number[]>([0]);
  const [addresses, setAddresses] = useState<string[]>([
    "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  ]);

  useEffect(() => {
    redirect("https://www.operationblockchain.app/proof-of-funds/");
  }, []);

  const handleAddFund = () =>
    setFunds((state: number[]) => [...state, funds.length]);

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
      <span className="w-fit min-h-12 -mt-8 mb-10 flex items-center gap-2 bg-orange-100 border border-orange-300 text-lg px-4 py-2 rounded-xl text-center">
        Total amount you own: <br className="md:hidden" />₿{" "}
        {totalAmount.toFixed(8)}
      </span>
      <Card className="gap-y-[12px]">
        <div className="flex flex-col items-center justify-center gap-4 text-xl text-gray-700">
          <span>Message</span>
        </div>
        <textarea
          className="textarea textarea-bordered min-h-20 px-4 py-2 border rounded-xl text-sm focus:outline-none mb-6"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."
        ></textarea>

        {funds.map((_: any, index: number) => (
          <Funds
            key={index}
            message={message}
            index={index}
            setTotalAmount={setTotalAmount}
            addresses={addresses}
            setAddresses={setAddresses}
          />
        ))}

        <Button
          className="gap-1 mx-auto mt-4"
          primary
          onClick={handleAddFund}
          label="Add funds"
          icon={Plus}
          iconSide="left"
        />
      </Card>
    </Container>
  );
};

export default ProofOfFunds;
