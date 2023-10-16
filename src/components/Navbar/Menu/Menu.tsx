import React from "react";
import MenuItem from "./MenuItem";

interface MenuProps extends React.PropsWithChildren {}

const menues = [
  { title: "더미1", link: `${process.env.NEXT_PUBLIC_DOMAIN}/1` },
  { title: "더미2", link: `${process.env.NEXT_PUBLIC_DOMAIN}/2` },
  { title: "더미3", link: `${process.env.NEXT_PUBLIC_DOMAIN}/3` },
];

export default function Menu(props: MenuProps) {
  return (
    <ul className="flex items-center">
      {menues.map((menu) => {
        return (
          <MenuItem
            key={menu.title}
            title={menu.title}
            link={menu.link}
          ></MenuItem>
        );
      })}
    </ul>
  );
}
