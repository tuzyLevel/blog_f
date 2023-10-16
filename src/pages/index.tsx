import React, { useState, useEffect, SyntheticEvent, MouseEvent } from "react";

import tw from "twin.macro";
import styled from "styled-components";

import axios from "axios";

import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

import { useRecoilValue, useSetRecoilState } from "recoil";

import { modalStateSchema } from "@/states/modalState";

import PostingListContainer from "@/components/Container/PostingListContainer";
import Badge from "@/components/Badge/Badge";

// import { loginStateSchema } from "@/states/loginState";

import BoardSideBar from "@/components/BoardSideBar/BoardSideBar";
import NoticeBoard from "@/components/NoticeBoard/NoticeBoard";
import ReadPostingContainer from "@/components/Container/ReadPostingContainer";

const Container = styled.div``;
const LeftContainer = styled.div`
  ${tw`
  hidden 
  md:block 
  min-w-[250px] 
  max-w-[250px] 
  px-5 
  overflow-y-scroll
  max-h-screen
`}
`;

const RightContainer = tw.div`
w-auto`;

export async function getServerSideProps() {
  const res = await axios.get(
    `${process.env.API_SERVER_URL}/api/client/board/list`
    // `http://localhost:33223/api/client/board/list`
  );

  const boardList = await res.data.data;
  // console.log(boardList);
  // const boardList = [];
  return { props: { boardList } };
}

export default function Home({
  boardList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const modalState = useRecoilValue(modalStateSchema);

  const [postingList, setPostingList] = useState([]);
  const [rightContainerState, setRightContainerState] = useState<
    "default" | "list" | "posting"
  >("default");

  const [selectedPosting, setSelectedPosting] = useState<Posting | null>(null);

  useEffect(() => {
    if (modalState.isOpen) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [modalState.isOpen]);

  const setSelectedPostingHandler = (posting: Posting | null) => {
    setSelectedPosting(posting);
    setRightContainerState("posting");
  };

  const categoryClickHandler = async (e: MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    // e.stopPropagation();
    const boardId = parseInt(e.currentTarget.value);
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/client/posting/list/${boardId}`
    );
    const { data } = res.data;
    // console.log(data);

    setPostingList(data);
    setRightContainerState("list");
  };

  return (
    <Container className="">
      <div className="flex flex-col items-center">
        <NoticeBoard content={"No pain No gain"} />
        <div className="flex justify-start mt-5 w-full h-full">
          <LeftContainer className="flex">
            {boardList.map((pBoard: ParentBoard) => (
              <div key={pBoard.name} className="text-2xl mb-6 w-full">
                <div className="flex justify-between items-center">
                  <span className="mr-2">{pBoard.name}</span>
                  {/* <Badge count={pBoard.count} /> */}
                </div>
                <div>
                  {pBoard.children.map((c) => (
                    <div
                      key={c.name}
                      className="flex justify-between items-center text-base border-s-4 pl-2 my-2 hover:border-orange-500 hover:cursor-pointer"
                    >
                      <button
                        className="mr-2"
                        onClick={categoryClickHandler}
                        value={c.id}
                      >
                        {c.name}
                      </button>
                      <Badge count={c.count} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </LeftContainer>
          <RightContainer className="min-h-screen flex-1">
            {rightContainerState === "default" ? (
              // TODO
              <div className="text-6xl">Hello</div>
            ) : rightContainerState === "list" ? (
              <PostingListContainer
                list={postingList}
                setSelectedPosting={setSelectedPostingHandler}
              />
            ) : (
              <ReadPostingContainer
                posting={selectedPosting}
              ></ReadPostingContainer>
            )}
          </RightContainer>
        </div>

        {/* <div className="border-red-500 h-20 mx-auto">Hello</div> */}
      </div>
    </Container>
  );
}
