import { FC } from "react";
import { twMerge } from "tailwind-merge";

type ButtonProps = {
  primary?: boolean;
  secondary?: boolean;
  onClick: () => void;
  label: string;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({
  primary,
  secondary,
  onClick,
  label,
  disabled,
}) => {
  return (
    <button
      className={twMerge(
        "w-fit rounded-lg py-2 px-4 text-sm min-w-24",
        secondary
          ? "bg-gray-200 font-bold tracking-wide hover:bg-gray-300"
          : primary
          ? "bg-gray-800 text-white tracking-wide hover:bg-gray-700"
          : "",
        disabled
          ? "bg-gray-700 text-gray-500 cursor-not-allowed hover:bg-gray-700"
          : ""
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
