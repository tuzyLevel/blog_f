import React from "react";

import Link from "next/link";

interface MenuItemProps extends React.PropsWithChildren {
  title: string;
  link: string;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <Link href={props.link} passHref>
      <li className="p-2">{props.title}</li>
    </Link>
  );
}
