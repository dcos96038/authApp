import {Usuario} from "../interfaces/authInterfaces";

export interface AuthState {
  status: "checking" | "authenticated" | "not-authenticated";
  token: string | null;
  errorMessage: string;
  user: Usuario | null;
}

export type AuthAction =
  | {type: "signUp"; payload: {token: string; user: Usuario}}
  | {type: "signIn"; payload: {token: string; user: Usuario}}
  | {type: "addError"; payload: string}
  | {type: "removeError"}
  | {type: "notAuthenticated"}
  | {type: "logout"};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  if (action.type === "addError") {
    return {
      ...state,
      user: null,
      status: "not-authenticated",
      errorMessage: action.payload,
      token: null,
    };
  }

  if (action.type === "removeError") {
    return {
      ...state,
      errorMessage: "",
    };
  }

  if (action.type === "signUp" || action.type === "signIn") {
    return {
      ...state,
      errorMessage: "",
      status: "authenticated",
      token: action.payload.token,
      user: action.payload.user,
    };
  }

  if (action.type === "logout") {
    return {
      ...state,
      status: "not-authenticated",
      token: null,
      user: null,
    };
  }

  return state;
};
