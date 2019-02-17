// @flow
import { createSelector } from 'reselect';

export const selectState = (state: any) => state.fileTag || {};

export const selectFileTags = createSelector(selectState, state => state.tags);
