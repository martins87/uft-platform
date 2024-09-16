import React, { FC } from "react";
import sha256 from "crypto-js/sha256";
import { twMerge } from "tailwind-merge";

type SHA256Hash = {
  data: string;
  toHash?: boolean;
};

const SHA256Hash: FC<SHA256Hash> = ({ data, toHash }) => {
  const dataToShow = toHash
    ? sha256(data).toString()
    : Buffer.from(data, "utf8").toString("hex");

  const truncated = (hash: string) => {
    return hash.substring(0, 10) + "..." + hash.slice(-10);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      {toHash ? (
        <>
          <span className="w-full h-16 items-center bg-gray-100 p-4 rounded-xl hidden xl:flex text-wrap placeholder-gray-500">
            {dataToShow}
          </span>
          <span className="w-fit h-16 flex items-center bg-gray-100 p-4 rounded-xl text-clip xl:hidden">
            {truncated(dataToShow)}
          </span>
        </>
      ) : (
        <textarea
          className="w-full min-h-16 h-fit bg-gray-100 p-4 rounded-xl placeholder-gray-500"
          value={dataToShow}
          placeholder="Data to register"
          disabled
        />
      )}
    </div>
  );
};

export default SHA256Hash;
