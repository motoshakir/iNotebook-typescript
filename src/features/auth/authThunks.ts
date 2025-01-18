import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface SignupResponse {
  id: string;
  name: string;
  email: string;
  authtoken: string;
}

interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

const HOST = 'http://localhost:5000';

// Login thunk
export const loginAsync = createAsyncThunk<
  { name: string; authtoken: string },
  { email: string; password: string; },
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${HOST}/api/auth/login`, credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error || "Invalid email or password");
      } else {
        console.log("Unexpected error:", error);
        return rejectWithValue("An unexpected error occurred");
      }
  }
});

// Logout thunk
export const logoutAsync = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${HOST}/api/auth/logout`);
    } catch (error) {
      return rejectWithValue('Failed to logout');
    }
  }
);

// Signup thunk
export const signupAsync = createAsyncThunk<
  SignupResponse,
  SignupPayload,
  { rejectValue: string }
>('auth/signup', async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${HOST}/api/auth/createuser`, payload);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to sign up');
  }
});
