import React, { useState, useRef, useEffect } from "react";

import { useRouter } from "next/navigation";

import styled from "styled-components";
import tw from "twin.macro";

import { useRecoilValue } from "recoil";

import { loginStateSchema } from "@/states/loginState";

import { axiosWithAuth } from "@/util/customAxios";

import DraggableWrapper from "@/util/draggableWrapper";
import PostingManage from "@/components/Manage/PostingManage";
import BoardManage from "@/components/Manage/BoardManage";

interface AdminProps extends React.PropsWithChildren {}

const NeedLoginMessage = styled.div`
  ${tw`flex flex-1 justify-center items-center w-screen h-screen`}
`;

const AnnounceMessage = styled.span`
  ${tw`text-4xl`}
`;

const LoginGuard = () => {
  return (
    <NeedLoginMessage>
      <AnnounceMessage>Please Login</AnnounceMessage>
    </NeedLoginMessage>
  );
};

const AdminContainer = styled.div`
  ${tw`flex flex-1 w-full h-full relative`}
`;

const ListContainer = styled.div`
  ${tw`flex border-2 border-red-500 w-full h-full`}
`;

const ContentContainer = styled.div`
  ${tw`flex flex-1 w-full h-full border-2 border-blue-500`}
`;

const BackOfficeBoard = () => {
  // return <div>BackOfficeBoard</div>;
  // return styled.div`
  //   ${tw`border border-red-200`}
  // `;
};

const Admin = (props: AdminProps) => {
  const URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;

  const router = useRouter();

  const loginState = useRecoilValue(loginStateSchema);

  const [contentState, setContentState] = useState("default");

  const [boardData, setBoardData] = useState<ParentBoard[] | []>([]);
  const [selectedPBoard, setSelectedPBoard] = useState<ParentBoard | null>(
    null
  );
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);

  // const inputRef = useRef<HTMLInputElement>(null);
  const getBoardListResponse = async () => {
    const response = await axiosWithAuth(`${URL}/api/admin/board/list`);
    return response;
  };

  const setBoardDataHandler = (boardData: ParentBoard[] | []) => {
    setBoardData(boardData);
  };

  const setSeletedPBoardHandler = (pBoard: ParentBoard | null) => {
    setSelectedPBoard(pBoard);
  };

  const setSelectedBoardHandler = (board: Board | null) => {
    setSelectedBoard(board);
  };

  const getTokenExpiredMsg = (ok: boolean, code: number) => {
    if (!ok && code === 401) {
      window.alert("session expired login again");
      router.replace("/");
      return true;
    }
    return false;
  };

  const buttonClickHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value;

    setContentState(value);
    const response = await getBoardListResponse();
    const data = response.data;
    if (getTokenExpiredMsg(data.ok, data.code)) return;

    setBoardData((prev) => data.data);
    if (value === "board_manage") {
      // console.log("board_manage called");
      dataInitialize();
    }
    if (value === "posting_manage") {
      // console.log("posting_manage called");
      dataInitialize();
    }
  };

  const dataInitialize = () => {
    setSelectedPBoard(null);
    setSelectedBoard(null);
  };

  // const pBoardBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const value = parseInt(e.currentTarget.value);
  //   const pBoard = boardData.filter((b: ParentBoard) => b.id === value)[0];

  //   if (pBoard) {
  //     setSelectedPBoard(pBoard);
  //     setSelectedBoard(null);
  //   }
  // };

  // const boardBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const value = parseInt(e.currentTarget.value);
  //   const board = selectedPBoard?.children.filter((b) => b.id === value)[0];
  //   console.log(board);
  //   if (board) setSelectedBoard(board);
  // };

  // const boardSelectedCancelHandler = (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   inputRef.current!.value = "";
  //   dataInitialize();
  // };

  // const boardAddHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   const inputValue = inputRef.current!.value;
  //   if (inputValue.length <= 0 || inputValue.indexOf("'") !== -1) {
  //     window.alert("Please Input Valid string");
  //     return;
  //   }

  //   let data;
  //   if (selectedPBoard && selectedBoard) {
  //     window.alert("Can not make 3level board");
  //     return;
  //   }
  //   if (!selectedPBoard) {
  //     data = {
  //       data: {
  //         name: inputValue,
  //         parentId: 0,
  //       },
  //     };
  //   }

  //   if (selectedPBoard && !selectedBoard) {
  //     data = {
  //       data: { name: inputValue, parentId: selectedPBoard.id },
  //     };
  //   }

  //   const res = await axiosWithAuth.post(`${URL}/api/admin/board`, data);
  //   const resData = res.data;
  //   if (getTokenExpiredMsg(resData.ok, resData.code)) return;
  //   if (!resData.ok && resData.code === 4012) {
  //     window.alert(resData.msg);
  //     return;
  //   }

  //   const resBoardList = await getBoardListResponse();
  //   const boardListData = resBoardList.data;
  //   if (getTokenExpiredMsg(boardListData.ok, boardListData.code)) return;

  //   setBoardData(boardListData.data);
  //   dataInitialize();
  //   inputRef.current!.value = "";
  // };

  // const boardNameChangeHandler = async (
  //   e: React.MouseEvent<HTMLButtonElement>
  // ) => {
  //   let id;
  //   const inputValue = inputRef.current!.value;
  //   if (inputValue.length <= 0 || inputValue.indexOf("'") !== -1) {
  //     window.alert("Please Input Valid string");
  //     return;
  //   }
  //   const name = inputValue;
  //   if (selectedBoard && selectedPBoard) {
  //     id = selectedBoard.id;
  //   }
  //   if (!selectedBoard && selectedPBoard) {
  //     id = selectedPBoard.id;
  //   }
  //   const data = { name };
  //   const res = await axiosWithAuth.patch(`${URL}/api/admin/board/${id}`, data);
  //   const resData = res.data;
  //   if (getTokenExpiredMsg(resData.ok, resData.code)) return;
  //   if (!resData.ok) {
  //     window.alert(resData.msg);
  //     return;
  //   }

  //   const resBoardList = await getBoardListResponse();
  //   const boardListData = resBoardList.data;
  //   if (getTokenExpiredMsg(boardListData.ok, boardListData.code)) return;

  //   setBoardData(boardListData.data);
  //   dataInitialize();
  //   inputRef.current!.value = "";
  // };

  // const boardDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
  //   let id;
  //   if (selectedBoard && selectedPBoard) {
  //     id = selectedBoard.id;
  //   }

  //   if (!selectedBoard && selectedPBoard) {
  //     id = selectedPBoard.id;
  //   }

  //   const res = await axiosWithAuth.delete(`${URL}/api/admin/board/${id}`);
  //   const data = res.data;
  //   if (getTokenExpiredMsg(data.ok, data.code)) return;
  //   if (!data.ok) {
  //     window.alert(data.msg);
  //     return;
  //   }

  //   const resBoardList = await getBoardListResponse();
  //   const boardListData = resBoardList.data;
  //   console.log(boardListData);

  //   if (getTokenExpiredMsg(boardListData.ok, boardListData.code)) return;
  //   setBoardData(boardListData.data);
  //   dataInitialize();
  // };

  return !loginState.isLogin ? (
    <LoginGuard />
  ) : (
    <AdminContainer className="min-w-min">
      <div className="w-[250px] border border-red-200 hidden lg:block">
        <div className="text-2xl ml-6 w-full">
          <div>
            <span>관리</span>
          </div>
          <div className="border-s-4 px-2 mb-1 hover:border-red-200">
            <button
              className="mr-2"
              value="board_manage"
              onClick={buttonClickHandler}
            >
              {"게시판 관리"}
            </button>
          </div>

          <div className="border-s-4 px-2 mb-1 hover:border-red-200">
            <button
              className="mr-2"
              value="posting_manage"
              onClick={buttonClickHandler}
            >
              {"게시글 관리"}
            </button>
          </div>
          {/* <div className="flex justify-between items-center">
                  <span className="mr-2">{게시판 관리}</span>
                  
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
                </div> */}
        </div>
      </div>
      <div className="flex-1 border border-blue-200 flex justify-center items-center">
        {/* TODO */}
        {contentState === "default" ? <div>default page</div> : <></>}
        {contentState === "board_manage" ? (
          <BoardManage
            boardData={boardData}
            setBoardData={setBoardDataHandler}
            selectedBoard={selectedBoard}
            selectedPBoard={selectedPBoard}
            setSelectedBoard={setSelectedBoardHandler}
            setSelectedPBoard={setSeletedPBoardHandler}
          ></BoardManage>
        ) : (
          <></>
        )}
        {contentState === "posting_manage" ? (
          <PostingManage
            boardData={boardData}
            setBoardData={setBoardDataHandler}
            selectedBoard={selectedBoard}
            selectedPBoard={selectedPBoard}
            setSelectedBoard={setSelectedBoardHandler}
            setSelectedPBoard={setSeletedPBoardHandler}
          ></PostingManage>
        ) : (
          <></>
        )}
      </div>
      {/* <DraggableWrapper>
        <ListContainer style={{ width: "300px" }}>
          List Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
          suscipit minus dignissimos dolorem totam cupiditate. Consequuntur
          similique nesciunt molestiae nisi enim quae cupiditate autem ut
          tempora veniam, excepturi suscipit architecto.
        </ListContainer>
      </DraggableWrapper> */}

      {/* <ContentContainer>Content</ContentContainer> */}
    </AdminContainer>
  );
};

export default Admin;
