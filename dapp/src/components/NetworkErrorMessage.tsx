import React, { FunctionComponent } from "react";

interface Props {
  message: string;
  dismiss: () => void;
}

const NetworkErrorMessage: FunctionComponent<Props> = ({
  message,
  dismiss,
}) => {
  return (
    <div className="alert alert-danger" role="alert">
      {message}
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
        onClick={dismiss}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default NetworkErrorMessage;
