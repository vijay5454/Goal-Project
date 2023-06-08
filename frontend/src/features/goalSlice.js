import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goalsList: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//GET goals
export const get_goals = createAsyncThunk(
  "goals/get",
  async (token, thunkAPI) => {
    try {
      console.log(token);
      return await goalService.getGoals(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//CREATE goals
export const create_goals = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoals(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => {
      initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_goals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_goals.rejected, (state, action) => {
        state.isSuccess = false;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(get_goals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goalsList = action.payload.data;
      })
      .addCase(create_goals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_goals.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(create_goals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goalsList.push(action.payload);
      });
  },
});

export default goalSlice.reducer;
export const { reset } = goalSlice.actions;
