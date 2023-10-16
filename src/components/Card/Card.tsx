import React from "react";

interface CardProps extends React.PropsWithChildren {
  className: string;
}

export default function Card(props: CardProps) {
  const customClassName = `rounded-2xl ${props.className}`;
  return <div className="rounded-2xl">{props.children}</div>;
}
