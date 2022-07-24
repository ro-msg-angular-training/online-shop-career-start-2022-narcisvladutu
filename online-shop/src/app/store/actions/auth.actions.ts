import {createAction, props} from "@ngrx/store";
import {CredentialsModel} from "../../types/credentials.model";
import {User} from "../../types/user.model";

export const loginUser = createAction('[Auth] Login', props<{ userCredentials: CredentialsModel }>());
export const loginUserSuccess = createAction('[Auth] Login Success', props<{ user: User }>());
export const loginUserFailure = createAction('[Auth] Login Failure', props<{ error: any }>());
