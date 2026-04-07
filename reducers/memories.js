import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const memoriesSlice = createSlice({
  name: "memories",
  initialState,
  reducers: {
    setMemories: (state, action) => {
      state.value = action.payload;
    },
    addMemory: (state, action) => {
      state.value.push(action.payload);
    },
    deleteMemory: (state, action) => {
      state.value = state.value.filter(
        (memory) => memory._id !== action.payload,
      );
    },
  },
});

export const { setMemories, addMemory, deleteMemory } = memoriesSlice.actions;
export default memoriesSlice.reducer;
