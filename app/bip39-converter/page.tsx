"use client";

import { useState } from "react";
import Image from "next/image";
import converter from "hex2dec";

import Container from "../components/Container";
import Header from "../components/Header";
import Card from "../components/Card";
import ArrowForward from "../assets/icons/ArrowForward.svg";
import Copy from "../assets/icons/Copy.svg";
import { bip39Words } from "../data/bip0039-english.js";
import { twMerge } from "tailwind-merge";

const words = ["Taxation is theft", ...bip39Words];

const BIP39Converter = () => {
  const [hexadecimalWord, setHexadecimalWord] = useState<string>("");
  const [bip39Word, setBip39Word] = useState<string>("pizza");
  const [decimalWord, setDecimalWord] = useState<string>("");
  const [decimal, setDecimal] = useState<string>("");

  const getWordFromHex = (hexStr: string) => {
    let index: number = converter.hexToDec(hexStr);

    return words[index];
  };

  const getDecimalFromWord = (word: string) => {
    let index: number = words.indexOf(word);

    return index;
  };

  const handleChange = (e: any) => {
    setHexadecimalWord(e.target.value);

    let word: string = getWordFromHex(e.target.value);

    if (words.includes(word)) {
      setTimeout(() => {
        setBip39Word(word);
      }, 1000);
    } else {
      setBip39Word("Invalid value");
    }
  };

  const handleChangeDecimal = (e: any) => {
    setDecimalWord(e.target.value);

    let index: number = getDecimalFromWord(e.target.value);

    if (index !== -1) {
      setTimeout(() => {
        setDecimal(index.toString());
      }, 1000);
    } else {
      setDecimal("Invalid word");
    }
  };

  const handleCopy = (value: string) => navigator.clipboard.writeText(value);

  return (
    <Container>
      <Header
        title="BIP39 word converter"
        subtitle={<p>Convert hexadecimal numbers into BIP39 words</p>}
      />
      <Card className="flex items-center py-12">
        <span className="mx-auto text-gray-900">Hexadecimal to word</span>
        <div className="relative flex gap-x-4 -mt-5">
          <input
            className="w-36 h-12 border rounded-md px-4 text-lg focus:outline-none"
            type="text"
            value={hexadecimalWord}
            onChange={handleChange}
            placeholder="e.g. 52E"
          />
          <Image src={ArrowForward} alt="forward arrow" />
          <div className="w-44 min-h-12 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
            {hexadecimalWord ? (
              <span className="text-lg">{bip39Word}</span>
            ) : (
              <span className="text-lg text-gray-400">pizza</span>
            )}
          </div>
          <Image
            className={twMerge(
              "absolute right-2 top-[50%] -translate-y-1/2",
              hexadecimalWord ? "hover:cursor-pointer" : "opacity-50"
            )}
            src={Copy}
            alt="Copy to clipboard"
            onClick={() => handleCopy(bip39Word)}
          />
        </div>

        <span className="mx-auto text-gray-900">Word to decimal</span>
        <div className="relative flex gap-x-4 -mt-5">
          <input
            className="w-36 h-12 border rounded-md px-4 text-lg focus:outline-none"
            type="text"
            value={decimalWord}
            onChange={handleChangeDecimal}
            placeholder="e.g. dance"
          />
          <Image src={ArrowForward} alt="forward arrow" />
          <div className="w-44 min-h-12 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 border border-green-300 rounded-lg">
            {decimalWord ? (
              <span className="text-lg">{decimal}</span>
            ) : (
              <span className="text-lg text-gray-400">443</span>
            )}
          </div>
          <Image
            className={twMerge(
              "absolute right-2 top-[50%] -translate-y-1/2",
              decimalWord ? "hover:cursor-pointer" : "opacity-50"
            )}
            src={Copy}
            alt="Copy to clipboard"
            onClick={() => handleCopy(bip39Word)}
          />
        </div>
      </Card>
    </Container>
  );
};

export default BIP39Converter;
