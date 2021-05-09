import React from "react";
import { Helmet } from "react-helmet";

const withHelmet = (helmetOptions) => (WrappedComponent) => (
  ComponentProps
) => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{helmetOptions?.title || "TrailBlazer | Hike Your Way"}</title>
      </Helmet>
      <WrappedComponent {...ComponentProps} />
    </React.Fragment>
  );
};

export default withHelmet;