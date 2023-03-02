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
  },
});

export const create = createAsyncThunk(
  'user/create',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    const { data, error } = await userService.createUser(email, password);
    const { data: oldUser } = await userService.signInWithEmail(email, password);
       
    if (error) {
      return rejectWithValue(error.message);
    }

    if (oldUser) {
      return rejectWithValue('Oops! Looks like someone beat you to it. That email address is already taken. Try another one!');
    }

    return data.user || null ;
  }
);

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
    const { data, error } = await userService.signInWithEmail(email, password);
    
    if (error) {
      return rejectWithValue(error.message);
    }

    return data.user || null ;
  }
);

export const signOut = createAsyncThunk(
  'user/signout',
  async () => {
    const responce = await userService.signOut();

    return responce;
  }
);

export default userSlice.reducer;
export const { clearNotification } = userSlice.actions;
