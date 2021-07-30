import React, { FunctionComponent } from "react";

const ErrorMessage: FunctionComponent = (props) => (
  <div>{props.children && <p className="fw-light">{props.children}</p>}</div>
);

export default ErrorMessage;
