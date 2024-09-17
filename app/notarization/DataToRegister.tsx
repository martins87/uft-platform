import React, { FC } from "react";
import sha256 from "crypto-js/sha256";

type DataToRegisterProps = {
  data: string;
  toHash?: boolean;
};

const DataToRegister: FC<DataToRegisterProps> = ({ data, toHash }) => {
  const dataToShow =
    toHash === true
      ? sha256(data).toString()
      : toHash === false
      ? Buffer.from(data, "utf8").toString("hex")
      : data;

  return (
    <div className="flex flex-col md:flex-row items-center gap-2">
      <textarea
        className="w-full min-h-16 h-fit bg-gray-100 p-4 rounded-xl placeholder-gray-500"
        value={dataToShow}
        placeholder="Data to register"
        disabled
      />
    </div>
  );
};

export default DataToRegister;
