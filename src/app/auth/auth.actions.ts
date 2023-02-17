import { createAction, props } from "@ngrx/store";
import { User } from "../models/user.model"

export const loginUser = createAction('[Auth] Create User', props<{ user: User }>());
export const logoutUser = createAction('[Auth] Delete User');

