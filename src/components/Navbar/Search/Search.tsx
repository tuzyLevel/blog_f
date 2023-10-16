import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";
import tw from "twin.macro";

type SearchInput = {};

const SearchForm = styled.form`
  ${tw`flex w-64 border border-black rounded-xl`}
`;

const SearchInput = styled.input<SearchInput>`
  ${tw`relative rounded-l-xl w-48 p-1 focus:bg-sky-700 px-3`}
`;

const SearchBtnWrapper = styled.div`
  ${tw`flex justify-center items-center bg-gray-500 flex-1 rounded-r-xl`}

  &:hover {
    span {
      display: block;
    }
  }
`;

const SearchBtn = styled.button`
  ${tw`flex items-center justify-center flex-1 rounded-r-xl`}
`;

const SearchBtnTooltip = styled.span`
  ${tw`hidden
   text-black
   absolute
   w-16
   top-10
   bg-gray-200
   flex
   justify-center
   rounded-md
   -translate-x-0
   top-12
   text-center
   opacity-80`}
`;

interface SearchInputProps extends React.PropsWithChildren {}

export default function _Search(props: SearchInputProps) {
  return (
    <SearchForm>
      <SearchInput placeholder="검색" />
      <SearchBtnWrapper>
        <SearchBtn type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </SearchBtn>
        <SearchBtnTooltip>검색</SearchBtnTooltip>
      </SearchBtnWrapper>
    </SearchForm>
  );
}
