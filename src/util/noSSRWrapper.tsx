import dynamic from "next/dynamic";
import React from "react";

interface NoSSRWapperProps extends React.PropsWithChildren {}

const NoSSRWrapper = (props: NoSSRWapperProps) => (
  <React.Fragment>{props.children}</React.Fragment>
);
export default dynamic(() => Promise.resolve(NoSSRWrapper), {
  ssr: false,
});
