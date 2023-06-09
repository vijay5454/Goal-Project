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
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
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

//DELETE goals
export const delete_goals = createAsyncThunk(
  "goals/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(id, token);
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
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_goals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(get_goals.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(get_goals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.goalsList = action.payload;
        state.isError = false;
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
        state.isError = false;
        state.message = "Goal Added successfully!";
      })
      .addCase(delete_goals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(delete_goals.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(delete_goals.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Goal Deleted successfully!";
      });
  },
});

export default goalSlice.reducer;
export const { reset } = goalSlice.actions;
