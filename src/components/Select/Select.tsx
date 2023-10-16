import React from "react";

import styled from "styled-components";

import tw from "twin.macro";

const Select = styled.select`
  ${tw`
  border 
  border-gray-300 
  text-gray-900 
  text-sm 
  rounded-lg 
  focus:ring-blue-500 
  focus:border-blue-500 
  block 
  w-full 
  p-2.5  
  dark:focus:ring-blue-500 
  dark:focus:border-blue-500`}
`;

interface fProps extends React.PropsWithChildren {
  name: string;
  id: string;
  categoryList: string[];
}

const f = (props: fProps) => {
  const list = props.categoryList;

  return (
    <Select name={props.name} id={props.id}>
      {list.map((cat) => (
        <option key={cat}>cat</option>
      ))}
    </Select>
  );
};

export default f;
