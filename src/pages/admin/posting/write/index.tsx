import React, { SyntheticEvent, useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import tw from "twin.macro";
import styled from "styled-components";

import { useRecoilState } from "recoil";

import { axiosWithAuth } from "@/util/customAxios";

import { QueryClient, useQuery, useQueryClient } from "react-query";

import NoSSRWrapper from "@/util/noSSRWrapper";

import Select from "@/components/Select/Select";
import { loginStateSchema } from "@/states/loginState";

const Container = styled.div`
  ${tw`
    w-full
    h-auto
    py-[50px]
    px-[120px]
  `}
`;

const Form = styled.form`
  ${tw`
    w-full
    h-full
    min-w-[400px]
  `}
`;

const OptionContainer = styled.div`
  ${tw`
    flex
    flex-col
    w-full
    h-[200px]
    my-[20px]
    border
    border-gray-100
  `}
`;
const Input = styled.input`
  ${tw`
      
    `}
`;

const SubmitBtn = styled.button`
  ${tw`
    w-24 
    h-12
    border-2 
    border-gray-700 
    rounded-2xl 
    p-2 
    m-1`}
  &:hover {
    ${tw`bg-gray-700 text-white`}
  }
`;

const CancelBtn = styled.button`
  ${tw`
    w-24 
    h-12
    border-2 
    border-gray-700 
    rounded-2xl 
    p-2 
    m-1`}
  &:hover {
    ${tw`bg-gray-700 text-white`}
  }
`;

// import Editor from "@/components/Editor/Editor";

const Editor = dynamic(() => import("@/components/Editor/Editor"));

type BoardType = {
  id: number;
  parentId: number;
  name: string;
  children?: BoardType[];
};

const PostingWrite = () => {
  const router = useRouter();
  const [loginState, setLoginState] = useRecoilState(loginStateSchema);

  const getBoardData = async () => {
    const response = await axiosWithAuth.get(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admin/board/list`
    );

    if (!response.data.ok && response.data.code === 401) {
      console.log(response.data);
      window.alert("session expired login again");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      setLoginState(() => {
        return { isLogin: false, loginCode: "logout" };
      });
      router.replace("/");
      // return;
    }

    return response.data.data
      ? response.data.data.filter((d: any) => d.children.length > 0)
      : false;
  };

  const {
    data: boardData,
    status,
    error,
    isFetching,
  } = useQuery(["data"], getBoardData);

  const [firstBoard, setFirstBoard] = useState<BoardType>({
    id: 0,
    name: "default",
    parentId: 0,
    children: [],
  });

  const [category, setCategory] = useState({
    first: { id: 0, parentId: 0, name: "default" },
    second: { id: 0, parentId: 0, name: "default" },
  });

  useEffect(() => {
    if (boardData) {
      console.log(boardData);
      const parentBoard = boardData[0];
      const board = parentBoard.children[0];

      setFirstBoard((prev) => {
        return { ...parentBoard };
      });

      setCategory({
        first: {
          id: parentBoard.id,
          parentId: parentBoard.parentId,
          name: parentBoard.name,
        },
        second: { id: board.id, parentId: board.parentId, name: board.name },
      });
    }
  }, [boardData]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const selectChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target;
    const selectedValue = selected.value;

    if (selected.id === "postingFirstCategory") {
      const selectedCategory = boardData.filter(
        (data: any) => data.name === selectedValue
      )[0];
      setFirstBoard(selectedCategory);
      setCategory({
        first: {
          id: selectedCategory.id,
          parentId: selectedCategory.parentId,
          name: selectedCategory.name,
        },
        second: {
          id: selectedCategory.children[0].id,
          parentId: selectedCategory.children[0].parentId,
          name: selectedCategory.children[0].name,
        },
      });
    }

    if (selected.id === "postingSecondCategory") {
      const selectedCategory = firstBoard.children!.filter(
        (data: any) => (data: any) => data.name === selectedValue
      )[0];
      setCategory((prev) => ({
        ...prev,
        second: {
          id: selectedCategory.id,
          parentId: selectedCategory.parentId,
          name: selectedCategory.name,
        },
      }));
    }
  };

  const editorChangeHandler = (c: string) => {
    setContent((prev) => c);
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setTitle(value);
  };

  // const formRef = useRef<HTMLFormElement>(null);

  const formSubmitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();

    const data = {
      board: category,
      title,
      content,
    };

    const response = await axiosWithAuth.post(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/admin/posting`,
      data
    );

    if (!response.data.ok && response.data.code === 401) {
    }

    if (response.data.ok) {
      window.alert("Upload Succeeded");
      router.replace("/admin/posting");
      return;
    }
  };

  const cancelClickHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    const answer = window.confirm("Want to move back?");
    if (answer) router.replace("/admin/posting");
  };

  return (
    <NoSSRWrapper>
      <Container>
        <Form id="postingBoard" onSubmit={formSubmitHandler}>
          <OptionContainer>
            {/* <div> */}
            <label
              htmlFor="postinFirstCategory"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              대분류
            </label>
            <select
              id="postingFirstCategory"
              name="postringFirstCategory"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={selectChangeHandler}
            >
              {status === "loading" ? (
                <option>Loading</option>
              ) : status === "error" ? (
                <option>No Data</option>
              ) : boardData ? (
                boardData.map((b: any) => {
                  return <option key={`${b.name}_${b.id}`}>{b.name}</option>;
                })
              ) : (
                <option>No Data</option>
              )}
            </select>
            <label
              htmlFor="postingSecondCategory"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              소분류
            </label>
            <select
              id="postingSecondCategory"
              name="postingSecondCategory"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={selectChangeHandler}
            >
              {status === "loading" ? (
                <option>loding</option>
              ) : status === "error" ? (
                <option>Error</option>
              ) : firstBoard.children ? (
                firstBoard.children.map((d: any) => (
                  <option key={d.name}>{d.name}</option>
                ))
              ) : (
                <option>No Data</option>

                // .map((c: any) => {
                //   return <option key={`${c.name}`}>{c.name}</option>;
                // })
              )}
            </select>
            {/* </div> */}
            {/* <div className="w-full"> */}
            <label htmlFor="postingTitle">제목</label>
            <input
              id="postingTitle"
              type="text"
              className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={inputChangeHandler}
            />
            {/* </div> */}
          </OptionContainer>
          <Editor onContentChange={editorChangeHandler} />
        </Form>
        <div className="flex justify-end h-[100px]">
          <SubmitBtn form="postingBoard" type="submit">
            작성
          </SubmitBtn>
          <CancelBtn onClick={cancelClickHandler}>취소</CancelBtn>
        </div>
      </Container>
    </NoSSRWrapper>
  );
};

export default PostingWrite;
