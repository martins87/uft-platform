import { FC, Fragment } from "react";

type LoadingTxProps = {
  loading: boolean;
};

const LoadingTx: FC<LoadingTxProps> = ({ loading }) => {
  return (
    <Fragment>
      {loading && (
        <div className="flex items-center gap-3">
          <span className="text-sm mt-2">Registering data...</span>
          <span className="loading loading-bars loading-sm text-green-700 mt-2"></span>
        </div>
      )}
    </Fragment>
  );
};

export default LoadingTx;
