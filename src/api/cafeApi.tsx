import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const baseURL = "http://192.168.1.2:8080/api";

const api = axios.create({baseURL});

api.interceptors.request.use(async (config: any) => {
  const token = await AsyncStorage.getItem("token");

  if (token) {
    config.headers["x-token"] = token || "";
  }

  return config;
});

export default api;
