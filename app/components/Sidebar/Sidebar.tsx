import SidebarMenuItem from "./SidebarMenuItem";

import FileCheck from "../../assets/icons/FileCheck.svg";
import Wallet from "../../assets/icons/Wallet.svg";
import BadgeCheck from "../../assets/icons/BadgeCheck.svg";
import SeedPhraseImage from "../../assets/icons/Image.svg";
import PiggyBank from "../../assets/icons/PiggyBank.svg";

const Sidebar = () => {
  return (
    <div className="w-64 h-full flex flex-col gap-y-2 py-4 px-4 items-start bg-gray-100">
      <SidebarMenuItem
        label="Notarization"
        icon={FileCheck}
        src="/notarization"
      />
      <SidebarMenuItem
        label="Signature verifier"
        icon={BadgeCheck}
        src="/signature-verifier"
      />
      <SidebarMenuItem label="Proof of funds" icon={PiggyBank} />
      <SidebarMenuItem label="Address monitoring" icon={Wallet} />
      <SidebarMenuItem label="Seed phase into image" icon={SeedPhraseImage} />
    </div>
  );
};

export default Sidebar;