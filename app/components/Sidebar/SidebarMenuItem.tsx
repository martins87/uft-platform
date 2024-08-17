import { FC } from "react";
import Image from "next/image";

type SidebarMenuItemProps = {
  label: string;
  icon: any;
};

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({ label, icon }) => {
  return (
    <div className="w-full flex items-center gap-4 p-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md">
      <Image className="text-gray-500" src={icon} alt="notarization icon" />
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
};

export default SidebarMenuItem;
