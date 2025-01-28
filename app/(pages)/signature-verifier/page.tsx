"use client";

import { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import bitcoinMessage from "bitcoinjs-message";

import Button from "../../components/Button";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Header from "../../components/Header";
import BadgeCheck from "../../assets/icons/BadgeCheck.svg";
import CircleX from "../../assets/icons/CircleX.svg";
import TriangleAlert from "../../assets/icons/TriangleAlert.svg";

enum VerificationMessage {
  Valid,
  Invalid,
  InvalidSignatureLength,
}

const SignatureVerifier = () => {
  const [address, setAddress] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [resultMessage, setResultMessage] = useState<string>("");
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const [sigBgColor, setSigBgColor] = useState<string>("bg-inherit");
  const [resultSymbol, setResultSymbol] = useState<VerificationMessage>(
    VerificationMessage.Invalid
  );

  const handleVerify = () => {
    try {
      const validSig = bitcoinMessage.verify(
        message,
        address,
        signature,
        undefined,
        true
      );

      if (validSig) {
        setResultMessage("The signature is valid");
        setSigBgColor("bg-green-100");
        setResultSymbol(VerificationMessage.Valid);
      } else {
        setResultMessage("Not a valid signature");
        setSigBgColor("bg-red-100");
        setResultSymbol(VerificationMessage.Invalid);
      }

      setMessageVisible(true);
    } catch (error: any) {
      let errorMessage = error.message;

      setResultMessage(errorMessage);
      setSigBgColor("bg-red-100");
      setMessageVisible(true);
      setResultSymbol(VerificationMessage.InvalidSignatureLength);
    }
  };

  return (
    <Container>
      <Header
        title="Signature verifier"
        subtitle={
          <p>
            Verify if a Bitcoin signature is valid or not. Just enter an
            address, the message and the signature.
          </p>
        }
      />
      <Card className="gap-y-[12px]">
        <span className="text-gray-700">Message</span>
        <textarea
          className="textarea textarea-bordered min-h-20 px-4 py-2 border rounded-xl text-sm focus:outline-none"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="e.g. The Times 03/Jan/2009 Chancellor on brink of second bailout for banks."
        ></textarea>
        <span className="text-gray-700">Address</span>
        <input
          className="h-10 border rounded-xl px-4 text-sm focus:outline-none "
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        />
        <span className="text-gray-700">Signature</span>
        <input
          className={twMerge(
            "h-10 px-4 py-2 border rounded-xl text-sm focus:outline-none",
            sigBgColor
          )}
          value={signature}
          onChange={(e) => setSignature(e.target.value)}
          placeholder="e.g. H06dEm7K3o8GzCVLhWqfNer5MXm+QjwJzqNDBzgBfhyyDwBIcMWREzH0UfaXvXtw8t5duuFXQQE61ZXwJCjXbi0="
        />
        <div className="relative min-h-12">
          <Button
            className="tablet:absolute"
            primary
            onClick={handleVerify}
            label="Verify"
            // TODO add validation
          />
          {messageVisible && (
            <div className="tablet:absolute left-0 flex gap-x-2 h-8 items-center justify-center bg-slate-300 w-full">
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
      </Card>
    </Container>
  );
};

export default SignatureVerifier;
