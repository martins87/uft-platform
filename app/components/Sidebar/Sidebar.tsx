import { FC } from "react";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { twMerge } from "tailwind-merge";

import SidebarMenuItem from "./SidebarMenuItem";
import SeedPhraseImage from "../../assets/icons/Image.svg";
import EditDocument from "../../assets/icons/EditDocument.svg";
import VerifiedUser from "../../assets/icons/VerifiedUser.svg";
import Savings from "../../assets/icons/Savings.svg";
import AccountBalanceWallet from "../../assets/icons/AccountBalanceWallet.svg";
import SwapHoriz from "../../assets/icons/SwapHoriz.svg";
import Menu from "../../assets/icons/Menu.svg";
import LeftPanelClose from "../../assets/icons/LeftPanelClose.svg";
import Workspaces from "../../assets/icons/Workspaces.svg";
import IconButton from "../IconButton";
import YouTube from "../../assets/images/YouTube.png";
import Medium from "../../assets/images/Medium.png";

type SidebarProps = {
  isMobile: boolean;
  isSidebarOpen: any;
  setIsSidebarOpen: (state: any) => void;
};

const applications = [
  {
    label: "Notarization",
    icon: EditDocument,
    src: "/notarization",
  },
  {
    label: "Signature verifier",
    icon: VerifiedUser,
    src: "/signature-verifier",
  },
  {
    label: "Proof of funds",
    icon: Savings,
    src: "/proof-of-funds",
  },
  {
    label: "BIP39 word converter",
    icon: SwapHoriz,
    src: "/bip39-converter",
  },
  {
    label: "Multisig address creator",
    icon: Workspaces,
    src: "/multisig-address-creator",
  },
];

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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <IconButton onClick={handleClick} icon={LeftPanelClose} />
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Close sidebar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          {applications.map((app) => (
            <SidebarMenuItem
              key={app.src}
              label={app.label}
              icon={app.icon}
              src={app.src}
              onClick={handleClick}
            />
          ))}
          <div className="w-full p-2">
            <span className="text-sm font-bold text-gray-700">Soon</span>
          </div>
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

          <div className="flex flex-1 items-end">
            <div className="flex flex-col">
              <SidebarMenuItem
                label="YouTube channel"
                icon={YouTube}
                src="https://www.youtube.com/@OperationBlockchain"
                onClick={handleClick}
                externalLink
              />
              <SidebarMenuItem
                label="Medium articles"
                icon={Medium}
                src="https://medium.com/@martins87"
                onClick={handleClick}
                externalLink
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
