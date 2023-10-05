import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EmailState {
  email: string;
  checkEmail: string;
  isvalidEmail:boolean;
}

const initialState: EmailState = {
  email: '',
  checkEmail: '',
  isvalidEmail:false,
};

const emailSlice = createSlice({
  name: 'email',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
      state.isvalidEmail=isValidEmail(action.payload)
      state.checkEmail = isValidEmail(action.payload)
        ? 'Email format valid'
        : 'Email format is not valid';
    },
  },
});

export const { setEmail } = emailSlice.actions;

export default emailSlice.reducer;

function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/;
  
  return emailRegex.test(email);
}