import axios from "axios"
import store from "../store"
import 'regenerator-runtime'

const http = axios.create({
  baseURL: "/api",
  headers: { "content-type": "application/json" },
})

http.interceptors.request.use(
  config => {
    const isAuthenticated = store.getters["isAuthenticated"]
    if (isAuthenticated) {
      config.headers.common["Authorization"] = `Bearer ${store.getters["getAccessToken"]}`;
    }
    return config
  },
  async error => {
    const {
        config,
        response: { status },
    } = error;
    if (status === 401){
        if (error.response.data.message === "TokenExpiredError") {
            const originalRequest = config;
            const refreshToken = await AsyncStorage.getItem("refreshToken");
            // token refresh 요청
            const { data } = await axios.post(
              `/api/refresh/token`, // token refresh api
              {
                refreshToken,
              }
            );
            // 새로운 토큰 저장
            const {
              accessToken: newAccessToken,
              refreshToken: newRefreshToken,
            } = data;
            await AsyncStorage.multiSet([
              ["accessToken", newAccessToken],
              ["refreshToken", newRefreshToken],
            ]);
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
            return axios(originalRequest);
          }
    }
    // Do something with request error
    return Promise.reject(error)
  }
)
http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded"

export default http