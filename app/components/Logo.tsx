"use client";

import Image from "next/image";
import { useMediaQuery } from "react-responsive";

import OBLogo from "../assets/images/logo.png";

const Logo = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  return (
    <div className="absolute top-4 right-4 flex gap-4 items-center">
      <Image src={OBLogo} alt="logo" width={isMobile ? 48 : 64} />
    </div>
  );
};

export default Logo;
