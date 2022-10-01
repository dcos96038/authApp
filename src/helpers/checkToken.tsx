import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../api/cafeApi";
import {AuthAction} from "../context/AuthReducer";
import {LoginResponse} from "../interfaces/authInterfaces";

export const checkToken = async (dispatch: React.Dispatch<AuthAction>) => {
  const token = await AsyncStorage.getItem("token");

  if (!token) return dispatch({type: "logout"});

  const resp = await api.get<LoginResponse>("/auth/");

  if (resp.status !== 200) return dispatch({type: "logout"});

  await AsyncStorage.setItem("token", resp.data.token);
  dispatch({type: "signUp", payload: {token: resp.data.token, user: resp.data.usuario}});
};
