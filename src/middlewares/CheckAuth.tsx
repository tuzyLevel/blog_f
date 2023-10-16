import React from "react";
import axios from "axios";

interface CheckAuthProps extends React.PropsWithChildren {}

const CheckAuth = (props: CheckAuthProps) => {
  return props.children;
};

export default CheckAuth;
