import React, { useRef } from "react";

import { useRouter } from "next/navigation";

import useAxios from "@/customHooks/useAxios";

// import { axiosWithAuth } from "@/util/customAxios";

interface BoardManageProps extends React.PropsWithChildren {
  boardData: ParentBoard[] | null;
  setBoardData: any;
  selectedPBoard: ParentBoard | null;
  selectedBoard: Board | null;
  setSelectedPBoard: any;
  setSelectedBoard: any;
}

const BoardManage = (props: BoardManageProps) => {
  const URL = `${process.env.NEXT_PUBLIC_API_SERVER_URL}`;
  const router = useRouter();

  const axios = useAxios();

  const inputRef = useRef<HTMLInputElement>(null);

  const boardData = props.boardData!;
  const selectedPBoard = props.selectedPBoard;
  const selectedBoard = props.selectedBoard;
  const setBoardData = props.setBoardData;
  const setSelectedPBoard = props.setSelectedPBoard;
  const setSelectedBoard = props.setSelectedBoard;

  const getBoardListResponse = async () => {
    const response = await axios(`${URL}/api/admin/board/list`);
    return response;
  };

  // const getTokenExpiredMsg = (ok: boolean, code: number) => {
  //   if (!ok && code === 401) {
  //     window.alert("session expired login again");
  //     router.replace("/");
  //     return true;
  //   }
  //   return false;
  // };

  const dataInitialize = () => {
    setSelectedPBoard(null);
    setSelectedBoard(null);
  };

  const pBoardBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = parseInt(e.currentTarget.value);
    const pBoard = boardData.filter((b: ParentBoard) => b.id === value)[0];

    if (pBoard) {
      setSelectedPBoard(pBoard);
      setSelectedBoard(null);
    }
  };

  const boardBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = parseInt(e.currentTarget.value);
    const board = selectedPBoard?.children.filter((b) => b.id === value)[0];
    console.log(board);
    if (board) setSelectedBoard(board);
  };

  const boardSelectedCancelHandler = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    inputRef.current!.value = "";
    dataInitialize();
  };

  const boardAddHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const inputValue = inputRef.current!.value;
    if (inputValue.length <= 0 || inputValue.indexOf("'") !== -1) {
      window.alert("Please Input Valid string");
      return;
    }

    let data;
    if (selectedPBoard && selectedBoard) {
      window.alert("Can not make 3level board");
      return;
    }
    if (!selectedPBoard) {
      data = {
        data: {
          name: inputValue,
          parentId: 0,
        },
      };
    }

    if (selectedPBoard && !selectedBoard) {
      data = {
        data: { name: inputValue, parentId: selectedPBoard.id },
      };
    }

    const res = await axios.post(`${URL}/api/admin/board`, data);
    const resData = res.data;
    if (!resData.ok && resData.code === 4012) {
      window.alert(resData.msg);
      return;
    }

    const resBoardList = await getBoardListResponse();
    const boardListData = resBoardList.data;

    setBoardData(boardListData.data);
    dataInitialize();
    inputRef.current!.value = "";
  };

  const boardNameChangeHandler = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    let id;
    const inputValue = inputRef.current!.value;
    if (inputValue.length <= 0 || inputValue.indexOf("'") !== -1) {
      window.alert("Please Input Valid string");
      return;
    }
    const name = inputValue;
    if (selectedBoard && selectedPBoard) {
      id = selectedBoard.id;
    }
    if (!selectedBoard && selectedPBoard) {
      id = selectedPBoard.id;
    }
    const data = { name };
    const res = await axios.patch(`${URL}/api/admin/board/${id}`, data);
    const resData = res.data;
    if (!resData.ok) {
      window.alert(resData.msg);
      return;
    }

    const resBoardList = await getBoardListResponse();
    const boardListData = resBoardList.data;

    setBoardData(boardListData.data);
    dataInitialize();
    inputRef.current!.value = "";
  };

  const boardDeleteHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    let id;
    if (selectedBoard && selectedPBoard) {
      id = selectedBoard.id;
    }

    if (!selectedBoard && selectedPBoard) {
      id = selectedPBoard.id;
    }

    const res = await axios.delete(`${URL}/api/admin/board/${id}`);
    const data = res.data;
    if (!data.ok) {
      window.alert(data.msg);
      return;
    }

    const resBoardList = await getBoardListResponse();
    const boardListData = resBoardList.data;
    console.log(boardListData);

    setBoardData(boardListData.data);
    dataInitialize();
  };

  return (
    <div className="flex justify-center items-center w-min h-full flex-col">
      <div className="flex justify-center items-center ">
        <div className="border  w-[250px] h-[300px] overflow-y-scroll">
          {boardData.map((pBoard: ParentBoard) => (
            <div
              key={pBoard.name}
              className={
                (selectedPBoard && pBoard.name === selectedPBoard.name
                  ? "bg-orange-200"
                  : "bg-white") + " w-full"
              }
            >
              <button
                className="w-full "
                value={pBoard.id}
                onClick={pBoardBtnClickHandler}
              >
                {pBoard.name}
              </button>
            </div>
          ))}
        </div>
        <div className="border  w-[250px] h-[300px]">
          <div className="border w-full h-full overflow-y-scroll">
            {selectedPBoard &&
              selectedPBoard.children.map((board: Board) => (
                <div
                  key={board.name}
                  className={
                    selectedBoard && board.name === selectedBoard.name
                      ? "bg-orange-200"
                      : "bg-white"
                  }
                >
                  <button value={board.id} onClick={boardBtnClickHandler}>
                    {board.name}
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end items-center w-full ">
        <input
          className="flex-1 bg-gray-600 text-white h-12 rounded-lg"
          ref={inputRef}
        />
        <button
          className="w-[50px] h-12 border-2 border-gray-700 rounded-lg p-2 m-1 hover:bg-gray-700 hover:text-white"
          onClick={boardAddHandler}
        >
          추가
        </button>
        <button
          className="w-[50px] h-12 border-2 border-gray-700 rounded-lg p-2 m-1 hover:bg-gray-700 hover:text-white"
          onClick={boardNameChangeHandler}
        >
          수정
        </button>
        <button
          className="w-[50px] h-12 border-2 border-gray-700 rounded-lg p-2 m-1 hover:bg-gray-700 hover:text-white"
          onClick={boardDeleteHandler}
        >
          삭제
        </button>
        <button
          className="w-[50px] h-12 border-2 border-gray-700 rounded-lg p-2 m-1 hover:bg-gray-700 hover:text-white"
          onClick={boardSelectedCancelHandler}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default BoardManage;
