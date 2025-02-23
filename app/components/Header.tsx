import { FC, ReactNode } from "react";

type HeaderProps = {
  title: string;
  subtitle: ReactNode;
};

const Header: FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 mt-6 md:mt-2 mb-12 text-center">
      <h1 className="text-4xl md:text-6xl font-bold">{title}</h1>
      {subtitle}
    </div>
  );
};

export default Header;
