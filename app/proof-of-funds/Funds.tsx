import { FC, useState } from "react";
import Image from "next/image";
import bitcoinMessage from "bitcoinjs-message";
import axios from "axios";
import { twMerge } from "tailwind-merge";

import { getPriceInUSD } from "../lib/market";
import Button from "../components/Button";
import BadgeCheck from "../assets/icons/BadgeCheck.svg";
import CircleX from "../assets/icons/CircleX.svg";
import TriangleAlert from "../assets/icons/TriangleAlert.svg";

enum VerificationMessage {
  Valid,
  Invalid,
  InvalidSignatureLength,
}

type FundsProps = {
  message: string;
  index: number;
  setTotalAmount: any;
  addresses: string[];
  setAddresses: any;
};

const Funds: FC<FundsProps> = ({
  message,
  index,
  setTotalAmount,
  addresses,
  setAddresses,
}) => {
  const [address, setAddress] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [balance, setBalance] = useState<number>(0);
  const [fetchingBalance, setFetchingBalance] = useState<boolean>(false);
  const [usdBalance, setUsdBalance] = useState<string>("");
  const [messageVisible, setMessageVisible] = useState<boolean>(false);
  const [sigBgColor, setSigBgColor] = useState<string>("bg-inherit");
  const [resultMessage, setResultMessage] = useState<string>("");
  const [resultSymbol, setResultSymbol] = useState<VerificationMessage>(
    VerificationMessage.Invalid
  );

  const getBalance = async (address: string) => {
    let rate: any = await getPriceInUSD();

    try {
      const response = await axios.get(
        `https://blockchain.info/q/addressbalance/${address.trim()}`
      );

      let bitcoinBalance = response.data / 1e8;
      let USDollar = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      setBalance(bitcoinBalance);
      setUsdBalance(`${USDollar.format(rate * bitcoinBalance)}`);

      return response.data / 1e8;
    } catch (error) {
      console.error("Error fetching balance:", error);

      return 0;
    }
  };

  const onAddressChange = (e: any) => {
    let addr: string = e.target.value;

    if (addr.length > 0) {
      setFetchingBalance(true);

      setTimeout(() => {
        getBalance(addr);
      }, 1000);

      setFetchingBalance(false);
    }

    setAddress(addr);
  };

  const handleVerify = async (balance: number) => {
    if (addresses.includes(address)) {
      setResultSymbol(VerificationMessage.InvalidSignatureLength);
      setResultMessage("Address already inserted");
      setMessageVisible(true);
    } else {
      try {
        const validSig = bitcoinMessage.verify(
          message.trim(),
          address.trim(),
          signature.trim(),
          undefined,
          true
        );

        if (validSig) {
          console.log("The signature is valid");
          setResultMessage("The signature is valid");
          setSigBgColor("bg-green-100");
          setResultSymbol(VerificationMessage.Valid);
          setAddresses((state: string[]) => [...state, address]);
          setTotalAmount((state: any) => state + balance);
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
    }
  };

  return (
    <div className="flex flex-col gap-4 border rounded-md p-4">
      <h4 className="text-xl font-bold">Funds #{index}</h4>

      <div className="flex flex-col gap-2 md:flex-row md:items-center gap-x-2">
        <span className="text-gray-700 min-w-20">Address:</span>
        <input
          className="w-full h-10 border rounded-md px-4 text-sm focus:outline-none"
          type="text"
          value={address}
          onChange={onAddressChange}
          placeholder="e.g. 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        />
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center gap-x-2">
        <span className="text-gray-700 min-w-20">Balance:</span>
        <span className="w-fit min-h-12 flex items-center gap-2 bg-orange-100 text-lg px-4 py-2 rounded-lg text-clip">
          {!address.length ? (
            <span className="text-sm text-gray-500">
              Enter a Bitcoin address to fetch balance
            </span>
          ) : fetchingBalance ? (
            <span className="text-sm text-gray-500">Fetching balance...</span>
          ) : (
            <div>
              {`₿ ${balance.toString()}`}
              <span className="text-base"> | </span>
              <span className="text-sm">{usdBalance}</span>
            </div>
          )}
        </span>
      </div>

      <div className="flex flex-col gap-2 md:flex-row md:items-center gap-x-2">
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
          onClick={() => handleVerify(balance)}
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
  );
};

export default Funds;
