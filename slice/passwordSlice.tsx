import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface passwordState {
  password: string;
  isVisible: boolean;
  visibleImg:string;
}

const initialState: passwordState = {
  password: '',
  isVisible: false ,
  visibleImg:'',
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setVisible: (state, action: PayloadAction<boolean>) => {
      state.isVisible = action.payload;
    },
  },
});

export const { setPassword } = passwordSlice.actions;
export const { setVisible} = passwordSlice.actions;
export default passwordSlice.reducer;