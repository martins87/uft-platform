import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "w-[60%] flex flex-col items-center gap-2 absolute top-[10%] md:top-[15%]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Container;
