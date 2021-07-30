import React, { FunctionComponent } from "react";

const PageTitle: FunctionComponent<{}> = (props) => (
  <div className="mb-3">
    <h2>{props.children}</h2>
  </div>
);

export default PageTitle;
