import React, { FunctionComponent } from "react";

const PageTitle: FunctionComponent = ({ children }) => (
  <div className="mb-3">
    <h2>{children}</h2>
  </div>
);

export default PageTitle;
