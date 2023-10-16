import React from "react";

interface BadgeProps extends React.PropsWithChildren {
  count: number;
}

const Badge = (props: BadgeProps) => {
  return (
    <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
      {props.count}
    </span>
  );
};

export default Badge;
