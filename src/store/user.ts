import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../types/User";
import * as userService from '../api/userService';

type userState = {
  user: User | null;
  loading: boolean;
  notification: string;
  isError: boolean;
};

const initialState: userState = {
  user: null,
  loading: false,
  notification: '',
  isError: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearNotification: (state) => {
      state.notification = '';
      state.isError = false;
    },
    setUpLocalStorage: (state) => {
      localStorage.setItem('user', JSON.stringify(state.user));
    },
    getFromLocalStorage: (state) => {
      state.user = JSON.parse(localStorage.getItem('user') as string) || null;
    },
    clearLocalStorage: () => {
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    //creat User
    builder.addCase(create.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(create.fulfilled, (state, action) => {
      state.loading = false;
      state.notification = 'Welcome aboard! Your account has been created successfully.';
    });
    builder.addCase(create.rejected, (state, action) => {
      state.loading = false;
      state.isError = true;
      state.notification = action.payload as string;
    });

    // Login User
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      localStorage.setItem('user', JSON.stringify(state.user));
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isError = true;
      state.notification = action.payload as string;
      state.loading = false;
    });

    //Sign Out
    builder.addCase(signOut.fulfilled, (state) => {
      state.user = null;
    });
    builder.addCase(signOut.rejected, (state, action) => {
      state.isError = true;
      state.notification = action.payload as string;
    });

    // Reset Password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.notification = 'Password reset email sent';
      state.loading = false;
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.isError = true;
      state.notification = action.payload as string;
      state.loading = false;
    });

    // Update Password
    builder.addCase(updateUserPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserPassword.fulfilled, (state) => {
      state.notification = 'Password has been changed';
      state.loading = false;
    });
    builder.addCase(updateUserPassword.rejected, (state, action) => {
      state.isError = true;
      state.notification = action.payload as string;
      state.loading = false;
    });
  },
});

export const create = createAsyncThunk(
  'user/create',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    const { data, error } = await userService.createUser(email, password);

    if (error) {
      return rejectWithValue(error.message);
    }

    return data.user;
  },
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue, dispatch }) => {
    const { data, error } = await userService.signInWithEmail(email, password);
    
    if (error) {
      return rejectWithValue(error.message);
    }

    dispatch(setUpLocalStorage());

    return data.user;
  },
);

export const signOut = createAsyncThunk(
  'user/signout',
  async (_, { dispatch, rejectWithValue }) => {
    const { error } = await userService.signOut();

    if (error) {
      return rejectWithValue(error.message);
    }

    dispatch(clearLocalStorage());

    return null;
  },
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async ( email: string, { rejectWithValue }) => {
    const { data, error } = await userService.resetPassword(email);
    
    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  },
);

export const updateUserPassword = createAsyncThunk(
  'user/updateUserPassword',
  async ( password: string, { rejectWithValue }) => {
    const { data, error } = await userService.updateUserPassword(password);

    if (error) {
      return rejectWithValue(error.message);
    }

    return data;
  },
);

export default userSlice.reducer;
export const { clearNotification, clearLocalStorage, setUpLocalStorage, getFromLocalStorage } = userSlice.actions;
