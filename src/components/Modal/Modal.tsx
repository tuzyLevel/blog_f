import React, { useRef, useState, useReducer, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useSetRecoilState } from "recoil";

// import axios from "axios";
import path from "path";
import { getCookie, setCookie, removeCookie } from "@/util/cookies";

import styled, { IStyledComponent } from "styled-components";
import tw from "twin.macro";

import { loginStateSchema } from "@/states/loginState";
import { modalStateSchema } from "@/states/modalState";
import inputReducer, { ReducerAction } from "./inputReducer";
import { customAxios } from "@/util/customAxios";

const ModalWrapper = styled.div`
  ${tw`fixed top-0 w-[100%] h-[100%] bg-gray-500 top-0 left-0 bg-opacity-90 flex justify-center items-center z-10`}
`;

const ModalForm = styled.form`
  ${tw`flex flex-col justify-between items-center bg-white z-20 rounded-2xl w-[20rem] h-[16rem] md:w-[32rem] md:h-[24rem]`}
  &
`;

const StepWrapper = styled.div`
  ${tw`flex justify-between md:w-80`}
`;
const ModalLabel = styled.label`
  ${tw`flex justify-center items-center text-white bg-black rounded-l-2xl w-[5rem] h-8 md:w-24 md:h-8 md:rounded-2xl `}
`;

interface ModalInputProps {
  $valid: boolean;
}
const modalInputCommonStyle = `border-2 rounded-r-2xl px-2 w-40 md:w-48 md:px-3 md:rounded-2xl`;
const ModalInput = styled.input<ModalInputProps>`
  ${(props) =>
    props.$valid
      ? tw`${modalInputCommonStyle} border-black`
      : tw`${modalInputCommonStyle} border-red-500`}
`;

const LoginBtn = styled.button`
  ${tw`border text-white bg-black rounded-2xl w-24 h-8 md:w-32 md:h-8 `}
  &:hover {
    ${tw`bg-white text-black border-black`}
  }
`;

const CancelIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
};

const Modal = () => {
  const [idInputState, idInputDispatch] = useReducer(inputReducer, {
    isValid: true,
    step: "EMPTY",
  });
  const [passwordInputState, passwordInputDispatch] = useReducer(inputReducer, {
    isValid: true,
    step: "EMPTY",
  });
  const setLoginState = useSetRecoilState(loginStateSchema);
  const setModalState = useSetRecoilState(modalStateSchema);

  const idInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const loginBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {}, []);

  const modalCloseHandler = () => {
    setModalState(() => {
      return { isOpen: false };
    });
  };

  const formClickHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.stopPropagation();
  };

  const loginBtnClickHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const idInputDom = idInputRef.current;
    const passwordInputDom = passwordInputRef.current;
    if (!idInputDom || !passwordInputDom) {
      console.log("DOM Error");
      window.alert("DOM Error");
      return;
    }

    const loginId = idInputDom.value;
    const loginPassword = passwordInputDom.value;
    if (loginId.length <= 0 || loginPassword.length <= 0) {
      const errorMsg = "Input Data Error";
      console.log(errorMsg);
      window.alert(errorMsg);
      return;
    }

    const res = await customAxios.post(
      "/api/user/login",
      { loginData: { loginId, loginPassword } },
      { headers: { "Content-Type": "application/json" } }
    );

    console.log(res);
    const data: Result = await res.data;

    if (!data.ok) {
      window.alert(data.msg);
      return;
    }

    // const loginData = { userId: loginId, token: data.data.token };

    // const cookieOptions = { path: "/", secure: true, maxAge: 1800 };
    // setCookie("loginId", loginId, cookieOptions);
    // setCookie("token", data.data.token, cookieOptions);

    localStorage.setItem("accessToken", data.data.accessToken);
    localStorage.setItem("refreshToken", data.data.refreshToken);

    setLoginState({ isLogin: true, loginCode: loginId });
    modalCloseHandler();

    return;
  };

  const inputBlurHandler = (inputDispatch: React.Dispatch<ReducerAction>) => {
    const fn = (e: React.SyntheticEvent) => {
      const name = e.currentTarget.getAttribute("name");

      const targetInput =
        name === "loginIdInput" ? idInputRef.current : passwordInputRef.current;
      const valueLength = targetInput?.value.length!;
      if (valueLength === 0) inputDispatch({ type: "EMPTY" });
      else if (valueLength < 8) inputDispatch({ type: "INVALID" });
      else inputDispatch({ type: "VALID" });
    };
    return fn;
  };

  // const inputChangeHandler = (e: React.ChangeEvent) => {
  //   e.preventDefault();
  //   if (e.currentTarget.getAttribute("name") === "loginIdInput") {
  //     console.log("id");

  //     return;
  //   }

  //   if (e.currentTarget.getAttribute("name") === "loginPasswordInput") {
  //     console.log("password");
  //     return;
  //   }
  // };

  return (
    <ModalWrapper onClick={modalCloseHandler}>
      <ModalForm onClick={formClickHandler}>
        <div className="w-full text-right pt-8 pr-8">
          <button type="button" onClick={modalCloseHandler}>
            <CancelIcon />
          </button>
        </div>
        <div className="flex flex-col flex-1 justify-evenly">
          <StepWrapper>
            <ModalLabel htmlFor="loginIdInput">아이디</ModalLabel>
            <ModalInput
              $valid={idInputState.isValid}
              name="loginIdInput"
              id="loginIdInput"
              placeholder="Enter your ID"
              ref={idInputRef}
              onBlur={inputBlurHandler(idInputDispatch)}
            />
          </StepWrapper>
          <StepWrapper>
            <ModalLabel htmlFor="loginPasswordInput">비밀번호</ModalLabel>
            <ModalInput
              $valid={passwordInputState.isValid}
              type="password"
              name="loginPasswordInput"
              id="loginPasswordInput"
              placeholder="Enter your password"
              ref={passwordInputRef}
              onBlur={inputBlurHandler(passwordInputDispatch)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === "Enter") {
                  loginBtnRef.current?.click();
                }
              }}
            />
          </StepWrapper>
          <StepWrapper className="flex-row-reverse">
            <LoginBtn
              type="button"
              onClick={loginBtnClickHandler}
              ref={loginBtnRef}
            >
              로그인
            </LoginBtn>
          </StepWrapper>
        </div>
      </ModalForm>
    </ModalWrapper>
  );
};

export default Modal;
