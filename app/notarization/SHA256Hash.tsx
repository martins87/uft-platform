import React, { FC } from "react";
import sha256 from "crypto-js/sha256";

type SHA256Hash = {
  data: string;
  toHash?: boolean;
};

const SHA256Hash: FC<SHA256Hash> = ({ data, toHash }) => {
  const dataToShow = toHash ? sha256(data).toString() : data;

  const truncated = (hash: string) => {
    return hash.substring(0, 7) + "..." + hash.slice(-7);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2 -mt-4">
      <span className="text-sm">SHA256 hash:</span>
      <span className="w-fit text-sm bg-gray-100 p-2 rounded-lg text-clip xl:hidden">
        {truncated(dataToShow)}
      </span>
      <span className="w-fit bg-gray-100 text-xs p-2 rounded-lg text-clip hidden xl:flex">
        {dataToShow}
      </span>
    </div>
  );
};

export default SHA256Hash;
