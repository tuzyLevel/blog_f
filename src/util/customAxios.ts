import axios, { AxiosInstance } from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_SERVER_URL || process.env.API_SERVER_URL;

export const customAxios: AxiosInstance = axios.create({
  // baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
  baseURL,
});

export const axiosWithAuth: AxiosInstance = axios.create({
  baseURL,
});

axiosWithAuth.interceptors.request.use(
  function (request) {
    const accessToken = localStorage.getItem("accessToken");
    request.headers.Authorization = `Bearer ${accessToken}`;

    return request;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosWithAuth.interceptors.response.use(
  async function (response) {
    const { ok, code, msg, description } = response.data;

    if (!ok && code === 4011) {
      console.log("token 만료됨");
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      console.log(accessToken);
      console.log(refreshToken);

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
        return axiosWithAuth({
          ...response.config,
          headers: { Authorization: `Bearer ${data.data.accessToken}` },
        });
      }
      return res;
    }
    return response;
  },
  async function (error) {
    // console.log(error);
    // if (error.status === 401) {
    //   const res = await axios.get(URL + `/api/token/renewal`, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       refresh: refreshToken,
    //     },
    //   });
    // }
    return Promise.reject(error);
  }
);
