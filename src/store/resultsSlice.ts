import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SearchType } from '../constants';

type ResultsState = {
  value: string;
  type: SearchType;
  totalCount: number;
  items: unknown[];
  page: number;
  isLoading: boolean;
  error: string;
  cache: Record<string, { items: unknown[]; totalCount: number }>;
};

const initialState: ResultsState = {
  value: '',
  type: SearchType.users,
  totalCount: 0,
  items: [],
  page: 0,
  isLoading: false,
  error: '',
  cache: {},
};

const resultsSlice = createSlice({
  name: 'results',
  initialState: initialState,
  reducers: {
    valueUpdated(state, action) {
      state.value = action.payload;
      state.page = 0;
      state.items = [];
    },
    typeUpdated(state, action) {
      state.type = action.payload;
      state.page = 0;
      state.items = [];
    },
    resultsUpdated(
      state,
      action: PayloadAction<{
        totalCount: number;
        items: unknown[];
        page: number;
      }>
    ) {
      const { items, totalCount, page } = action.payload;
      state.items = page === 1 ? items : state.items.concat(items);
      state.totalCount = totalCount;
      state.page = page;
      state.isLoading = false;
      state.error = '';
    },
    resultsCleared(state) {
      state.items = initialState.items;
      state.totalCount = 0;
      state.page = 0;
    },
    fetchStarted(state) {
      state.isLoading = true;
      state.error = '';
    },
    errorReceived(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    cacheUpdated(state, action) {
      state.cache[action.payload.cache_key] = action.payload.response;
    },
  },
});

export const resultsActions = resultsSlice.actions;

export default resultsSlice;
