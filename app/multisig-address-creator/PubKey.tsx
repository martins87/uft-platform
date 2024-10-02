import React, { FC, useState } from "react";

type PubKeyProps = {
  index: number;
  pubKeys: string[];
  setPubKeys: any;
};

const PubKey: FC<PubKeyProps> = ({ index, pubKeys, setPubKeys }) => {
  const [pubKey, setPubKey] = useState<string>("");

  const onInputChange = (e: any) => {
    let pK: string = e.target.value;
    let beginArr: string[] = pubKeys.slice(0, index);
    let endArr: string[] = pubKeys.slice(index + 1, pubKeys.length);

    setPubKey(pK);
    setPubKeys([...beginArr, pK, ...endArr]);
  };

  return (
    <div className="flex flex-col gap-2 md:flex-row md:items-center gap-x-2">
      <span className="text-gray-700 min-w-24">PubKey #{index}:</span>
      <input
        className="w-full h-10 border rounded-xl px-4 text-sm focus:outline-none"
        type="text"
        value={pubKey}
        onChange={onInputChange}
        placeholder="e.g. 03562e26d76919f41e9685f986d0bb439521d79f6f0b1318f1558a8c527fd9e123"
      />
    </div>
  );
};

export default PubKey;
