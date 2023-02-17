import { createReducer, on } from "@ngrx/store";
import * as actions from "./auth.actions";
import { User } from '../models/user.model';

export interface State {
    user: User | null;
}

export const initialState: State = {
    user: null
}

export const sharedReducer = createReducer(
    initialState,
    on(actions.loginUser, (state, { user }) => ({ ...state, user: { ...user } })),
    on(actions.logoutUser, (state) => ({ ...state, user: null })),
  );