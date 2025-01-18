import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string; // Optional field
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

// Async thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk<User, void, { rejectValue: string }>(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/user/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to fetch user profile');
    }
  }
);

// Async thunk to update user profile
export const updateUserProfile = createAsyncThunk<
  User,
  Partial<User>,
  { rejectValue: string }
>('user/updateProfile', async (updatedUser, { rejectWithValue }) => {
  try {
    const response = await axios.put('/api/user/profile', updatedUser);
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to update user profile');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch user profile';
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to update user profile';
      });
  },
});

export default userSlice.reducer;
