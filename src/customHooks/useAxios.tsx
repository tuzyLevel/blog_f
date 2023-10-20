import React, { useState } from "react";

import { useSetRecoilState } from "recoil";

import axios from "axios";

import { useRouter } from "next/navigation";

import { loginStateSchema } from "@/states/loginState";

const baseURL =
  process.env.NEXT_PUBLIC_API_SERVER_URL || process.env.API_SERVER_URL;

const UseAxios = () => {
  const setLoginState = useSetRecoilState(loginStateSchema);
  const router = useRouter();
  const axiosInstance = axios.create({ baseURL });

  axiosInstance.interceptors.request.use(
    function (request) {
      const accessToken = localStorage.getItem("accessToken");
      request.headers.Authorization = `Bearer ${accessToken}`;

      return request;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    async function (response) {
      const { ok, code, msg, description } = response.data;
      if (!ok && code === 401) {
        setLoginState({ isLogin: false, loginCode: "default" });
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        router.replace("/");
        return new Promise((resolve, reject) => {});
      }
      if (!ok && code === 4011) {
        //Expired Token
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");

        const URL =
          process.env.NEXT_PUBLIC_API_SERVER_URL || process.env.API_SERVER_URL;
        const res = await axios.get(URL + `/api/token/renewal`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            refresh: refreshToken,
          },
        });

        const data = res.data;
        if (data.ok) {
          console.log("accesstoken 재등록");
          localStorage.setItem("accessToken", data.data.accessToken);
          localStorage.setItem("refreshToken", data.data.refreshToken);

          console.log(res);
          return axiosInstance({
            ...response.config,
            headers: { Authorization: `Bearer ${data.data.accessToken}` },
          });
        }
        return res;
      }

      return response;
    },
    async function (error) {
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default UseAxios;
