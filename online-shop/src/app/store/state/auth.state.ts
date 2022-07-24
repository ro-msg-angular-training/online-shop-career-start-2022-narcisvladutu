import {User} from "../../types/user.model";

export interface AuthState {
  currentUser: User | null;
  error: string | null,
  status: 'pending'|'loading'|'error'|'success'
}

export const initialAuthState: AuthState = {
  currentUser: null,
  status: "pending",
  error: "",
};
