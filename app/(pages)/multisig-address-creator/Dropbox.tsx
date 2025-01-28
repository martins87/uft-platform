"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import KeyboardArrowDown from "../../assets/icons/KeyboardArrowDown.svg";

type DropdownMenuCheckboxesProps = {
  pubKeysNumber: string[];
  signatures: number;
  setSignatures: any;
};

const DropdownMenuCheckboxes: FC<DropdownMenuCheckboxesProps> = ({
  pubKeysNumber,
  signatures,
  setSignatures,
}) => {
  const handleCheckedChange = (index: number) => setSignatures(index + 1);

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="relative flex items-center justify-between w-full md:w-fit pr-10 font-normal"
          >
            Select number of signatures
            <Image
              className="absolute right-2 mt-[2px]"
              src={KeyboardArrowDown}
              alt="arrow down"
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" sideOffset={2} className="">
          {pubKeysNumber.map((_: any, index: number) => (
            <DropdownMenuCheckboxItem
              key={index}
              checked={index + 1 === signatures}
              onCheckedChange={() => handleCheckedChange(index)}
            >
              <div className="hover:cursor-pointer">
                {`${index + 1} signature${index === 0 ? "" : "s"}`}
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownMenuCheckboxes;
