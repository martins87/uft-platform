import { FC, useState } from "react";
import Image from "next/image";

import SidebarMenuItem from "./SidebarMenuItem";
import SeedPhraseImage from "../../assets/icons/Image.svg";
import EditDocument from "../../assets/icons/EditDocument.svg";
import VerifiedUser from "../../assets/icons/VerifiedUser.svg";
import Savings from "../../assets/icons/Savings.svg";
import AccountBalanceWallet from "../../assets/icons/AccountBalanceWallet.svg";
import SwapHoriz from "../../assets/icons/SwapHoriz.svg";
import Menu from "../../assets/icons/Menu.svg";
import LeftPanelClose from "../../assets/icons/LeftPanelClose.svg";
import { twMerge } from "tailwind-merge";
import IconButton from "../IconButton";

type SidebarProps = {
  isMobile: boolean;
  isSidebarOpen: any;
  setIsSidebarOpen: (state: any) => void;
};

const Sidebar: FC<SidebarProps> = ({
  isMobile,
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const handleClick = () => {
    if (isMobile) {
      setIsSidebarOpen((state: any) => !state);
    }
  };

  return (
    <>
      {isMobile && !isSidebarOpen && (
        <IconButton
          className="absolute top-2 left-2 m-2"
          onClick={handleClick}
          icon={Menu}
        />
      )}
      {(!isMobile || isSidebarOpen) && (
        <div
          className={twMerge(
            "w-64 h-full flex flex-col gap-y-2 py-4 px-4 items-start bg-gray-100",
            isMobile
              ? "absolute top-0 left-0 z-10 border border-r-gray-200 shadow-2xl"
              : ""
          )}
        >
          {isSidebarOpen && isMobile && (
            <div
              className="tooltip tooltip-right text-white"
              data-tip="Close sidebar"
            >
              <IconButton onClick={handleClick} icon={LeftPanelClose} />
            </div>
          )}
          <SidebarMenuItem
            label="Notarization"
            icon={EditDocument}
            src="/notarization"
            onClick={handleClick}
          />
          <SidebarMenuItem
            label="Signature verifier"
            icon={VerifiedUser}
            src="/signature-verifier"
            onClick={handleClick}
          />
          <SidebarMenuItem
            label="Proof of funds"
            icon={Savings}
            src="/proof-of-funds"
            onClick={handleClick}
          />
          <SidebarMenuItem
            label="Address monitoring"
            icon={AccountBalanceWallet}
            onClick={handleClick}
          />
          <SidebarMenuItem
            label="Seed phase into image"
            icon={SeedPhraseImage}
            onClick={handleClick}
          />
          <SidebarMenuItem
            label="BIP39 word converter"
            icon={SwapHoriz}
            src="/bip39-converter"
            onClick={handleClick}
          />
        </div>
      )}
    </>
  );
};

export default Sidebar;
