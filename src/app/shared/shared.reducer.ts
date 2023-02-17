import { createReducer, on } from '@ngrx/store';
import * as actions from './shared.actions';

export interface State {
    isLoading: boolean;
}

export const initialState: State = {
    isLoading: false
};

export const sharedReducer = createReducer(
  initialState,
  on(actions.isLoading, (state) => ({ ...state, isLoading: true })),
  on(actions.stopLoading, (state) => ({ ...state, stopLoading: false })),
);

/*
const _sharedReducer =createReducer(
  initialState,
  on(actions.isLoading, (state) => ({ ...state, isLoading: true })),
);

export function counterReducer(state, action) {
    return _sharedReducer(state, action);
}
*/
