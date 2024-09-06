import SidebarMenuItem from "./SidebarMenuItem";

import SeedPhraseImage from "../../assets/icons/Image.svg";
import EditDocument from "../../assets/icons/EditDocument.svg";
import VerifiedUser from "../../assets/icons/VerifiedUser.svg";
import Savings from "../../assets/icons/Savings.svg";
import AccountBalanceWallet from "../../assets/icons/AccountBalanceWallet.svg";
import SwapHoriz from "../../assets/icons/SwapHoriz.svg";

const Sidebar = () => {
  return (
    <div className="w-64 h-full flex flex-col gap-y-2 py-4 px-4 items-start bg-gray-100">
      <SidebarMenuItem
        label="Notarization"
        icon={EditDocument}
        src="/notarization"
      />
      <SidebarMenuItem
        label="Signature verifier"
        icon={VerifiedUser}
        src="/signature-verifier"
      />
      <SidebarMenuItem
        label="Proof of funds"
        icon={Savings}
        src="/proof-of-funds"
      />
      <SidebarMenuItem label="Address monitoring" icon={AccountBalanceWallet} />
      <SidebarMenuItem label="Seed phase into image" icon={SeedPhraseImage} />
      <SidebarMenuItem
        label="BIP39 word converter"
        icon={SwapHoriz}
        src="/bip39-converter"
      />
    </div>
  );
};

export default Sidebar;
