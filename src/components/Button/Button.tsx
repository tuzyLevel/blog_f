import React from "react";

interface ButtonProps extends React.PropsWithChildren {
  className: string;
  onClick?: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
