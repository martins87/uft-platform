import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

type SidebarMenuItemProps = {
  label: string;
  icon: any;
  src?: string;
  onClick: () => void;
  className?: string;
  externalLink?: boolean;
};

const SidebarMenuItem: FC<SidebarMenuItemProps> = ({
  label,
  icon,
  src,
  onClick,
  className,
  externalLink,
}) => {
  return (
    <Link
      className={twMerge(
        "w-full flex items-center gap-4 p-2 hover:cursor-pointer hover:bg-gray-200 hover:rounded-md",
        !src && "pointer-events-none",
        className
      )}
      href={src || "/"}
      onClick={onClick}
      {...(externalLink && {
        rel: "noopener noreferrer",
        target: "_blank",
      })}
    >
      <Image
        className="text-gray-500 rounded-sm"
        src={icon}
        alt="sidebar icon"
        width={24}
      />
      <span className="text-sm text-gray-700 leading-4">{label}</span>
    </Link>
  );
};

export default SidebarMenuItem;
