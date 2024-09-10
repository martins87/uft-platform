import { FC } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";

type IconButtonProps = {
  onClick: () => void;
  icon: any;
  className?: string;
};

const IconButton: FC<IconButtonProps> = ({ onClick, icon, className }) => {
  return (
    <div
      className={twMerge(
        "p-2 hover:bg-gray-200 hover:rounded-full hover:cursor-pointer z-10",
        className
      )}
      onClick={onClick}
    >
      <Image src={icon} alt="icon button" />
    </div>
  );
};

export default IconButton;
