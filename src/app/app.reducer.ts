import { ActionReducerMap } from "@ngrx/store";
import * as sharedReducer from "./shared/shared.reducer";
import * as authReducer from "./auth/auth.reducer";

export interface AppState {
    app: sharedReducer.State,
    user: authReducer.State
}

export const appReducer: ActionReducerMap<AppState> = {
    app: sharedReducer.sharedReducer,
    user: authReducer.sharedReducer
}