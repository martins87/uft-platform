import Image from "next/image";
import { FC } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
  className?: string;
  icon?: any;
  iconSide?: "left" | "right";
};

const Button: FC<ButtonProps> = ({
  primary,
  secondary,
  onClick,
  label,
  disabled,
  className,
  icon,
  iconSide,
}) => {
  return (
    <button
      className={twMerge(
        "w-fit flex items-center justify-center gap-2 rounded-xl py-2 px-4 text-sm min-w-24",
        secondary
          ? "bg-gray-200 font-bold tracking-wide hover:bg-gray-300"
          : primary
          ? "bg-gray-900 text-white tracking-wide hover:bg-gray-700"
          : "",
        disabled && primary
          ? "bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200"
          : "",
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <Image
          className={iconSide === "left" ? "order-first" : "order-last"}
          width={20}
          src={icon}
          alt="plus icon"
        />
      )}
      {label}
    </button>
  );
};

export default Button;
