import { FC } from "react";
import Image from "next/image";

import ChevronRight from "../assets/icons/ChevronRight.svg";
import KeyboardArrowDown from "../assets/icons/KeyboardArrowDown.svg";

const Arrow: FC = () => {
  return (
    <>
      <Image
        className="hidden lg:flex"
        src={ChevronRight}
        alt="forward arrow"
      />
      <Image
        className="lg:hidden mx-auto py-1"
        src={KeyboardArrowDown}
        alt="arrow down"
      />
    </>
  );
};

export default Arrow;
