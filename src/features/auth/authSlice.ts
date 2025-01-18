import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAsync, logoutAsync, signupAsync } from './authThunks';

interface AuthState {
  name: string;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  name: localStorage.getItem('name') ?? '',
  token: localStorage.getItem('token'),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
     resetAuthState: (state) => {
      state.name = '';
      state.token = null;
      state.loading = false;
      state.error = null;

      // Remove persisted data from localStorage
      localStorage.removeItem('name');
      localStorage.removeItem('token');
    },
    // Normal logout action
    logout: (state) => {
      state.name = '';
      state.token = null;
      state.loading = false;
      state.error = null;

      // Remove persisted data from localStorage
      localStorage.removeItem('name');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.name = action.payload.name;
        state.token = action.payload.authtoken;
        state.loading = false;

        localStorage.setItem('name', action.payload.name);
        localStorage.setItem('token', action.payload.authtoken);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Login failed';
      })

  

    //signup 
      .addCase(signupAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
     .addCase(signupAsync.fulfilled, (state,action) => {
       state.name = action.payload.name;
       state.token = action.payload.authtoken;
       state.loading = false;

      localStorage.setItem('name', action.payload.name);
      localStorage.setItem('token', action.payload.authtoken);
       
     })
     .addCase(signupAsync.rejected, (state, action) => {
        state.loading = false;
       state.error = action.payload ?? 'Login failed';
      //  state.name = ""
      //  state.token = ""
       
      //   // Remove persisted data from localStorage
      // localStorage.removeItem('name');
      // localStorage.removeItem('token');
      })
  },
});

export const { setError,logout,resetAuthState } = authSlice.actions;
export default authSlice.reducer;
