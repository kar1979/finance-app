import { createAction } from '@ngrx/store';

export const isLoading = createAction('[Shared] Is Loading');
export const stopLoading = createAction('[Shared] Stop Loading');