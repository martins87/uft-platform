import { FC } from "react";
import Image from "next/image";
import Link from "next/link";

type SidebarMenuItemProps = {
  label: string;
  icon: any;
  src?: string;
};

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({ label, icon, src }) => {
  return (
    <Link
      className="w-full flex items-center gap-4 p-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md"
      href={src || "/"}
    >
      <Image className="text-gray-500" src={icon} alt="notarization icon" />
      <span className="text-sm text-gray-700">{label}</span>
    </Link>
  );
};

export default SidebarMenuItem;
