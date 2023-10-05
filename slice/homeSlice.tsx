import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  userName: string;
  userlist: { key: any; username: any; }[];
  userData: { key: any; username: any; }[];
  getUserlist: boolean;
  keyword: string;
  page: number;
  isLoadMoreData: boolean;
}

const initialState: UserState = {
  userName: '',
  userlist: [],
  userData: [],
  getUserlist: true,
  keyword: '',
  page: 6,
  isLoadMoreData: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    setUserlist: (state, action: PayloadAction<{ key: any; username: any; }[]>) => {
      state.userlist = action.payload;
    },
    setUserData: (state, action: PayloadAction<{ key: any; username: any; }[]>) => {
      state.userData = action.payload;
    },
    setGetUserlist: (state, action: PayloadAction<boolean>) => {
      state.getUserlist = action.payload;
    },
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setIsLoadMoreData: (state, action: PayloadAction<boolean>) => {
      state.isLoadMoreData = action.payload;
    },
  },
});

export const {
  setUserName,
  setUserlist,
  setUserData,
  setGetUserlist,
  setKeyword,
  setPage,
  setIsLoadMoreData,
} = userSlice.actions;

export default userSlice.reducer;