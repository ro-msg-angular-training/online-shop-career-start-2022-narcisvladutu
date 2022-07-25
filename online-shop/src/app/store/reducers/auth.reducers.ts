import {initialAuthState} from "../state/auth.state";
import {createReducer, on} from "@ngrx/store";
import {loginUser, loginUserFailure, loginUserSuccess} from "../actions/auth.actions";

export const authReducer = createReducer(
  initialAuthState,

  on(loginUser, (state) => ({
    ...state,
    loading: true,
  })),

  on(loginUserSuccess, (state, { user }) => ({
    ...state,
    currentUser: user,
    status: "success",
    error: "",
  })),

  on(loginUserFailure, (state) => ({
    ...state,
    status: "error",
    error: "",
  }))
);
