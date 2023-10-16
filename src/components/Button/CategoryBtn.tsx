import React from "react";

import styled from "styled-components";

import tw from "twin.macro";

interface CategoryBtnProps extends React.PropsWithChildren {
  level: number;
}

const Btn1 = styled.button`
  ${tw``}
`;

const CategoryBtn = (props: CategoryBtnProps) => {
  const level = props.level;

  return <button></button>;
};

export default CategoryBtn;
