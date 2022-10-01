import {createContext, useEffect, useReducer} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../api/cafeApi";
import {LoginData, LoginResponse, RegisterData, Usuario} from "../interfaces/authInterfaces";
import {checkToken} from "../helpers/checkToken";

import {authReducer, AuthState} from "./AuthReducer";

interface ProviderProps {
  children: React.ReactNode;
}

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: "checking" | "authenticated" | "not-authenticated";
  signUp: (obj: RegisterData) => void;
  signIn: (obj: LoginData) => void;
  logout: () => void;
  removeError: () => void;
};

const authInitialState: AuthState = {
  status: "checking",
  token: null,
  user: null,
  errorMessage: "",
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, authInitialState);

  useEffect(() => {
    checkToken(dispatch);
  }, []);

  const signIn = async ({correo, password}: LoginData) => {
    try {
      const {data} = await api.post<LoginResponse>("/auth/login", {correo, password});

      dispatch({
        type: "signIn",
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem("token", data.token);
    } catch (error: any) {
      dispatch({
        type: "addError",
        payload: error.response.data.msg || "Informacion incorrecta",
      });
    }
  };

  const signUp = async ({nombre, correo, password}: RegisterData) => {
    try {
      const {data} = await api.post<LoginResponse>("/usuarios", {nombre, correo, password});

      dispatch({
        type: "signUp",
        payload: {
          token: data.token,
          user: data.usuario,
        },
      });

      await AsyncStorage.setItem("token", data.token);
    } catch (error: any) {
      dispatch({
        type: "addError",
        payload: error.response.data.errors[0].msg || "Informacion incorrecta",
      });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch({type: "logout"});
  };

  const removeError = () => {
    dispatch({type: "removeError"});
  };

  return (
    <AuthContext.Provider value={{...state, signUp, signIn, logout, removeError}}>
      {children}
    </AuthContext.Provider>
  );
};
