import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type CardProps = {
  children: ReactNode;
  className?: string;
};

const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "w-[100%] flex flex-col justify-center gap-8 py-8 px-6 lg:px-10 mb-24 rounded-2xl shadow-2xl",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
