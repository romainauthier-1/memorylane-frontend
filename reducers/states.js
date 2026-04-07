import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isEditing: false,
  selectedMemory: null,
  isLogged: false,
};

export const statesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    toggleIsModalOpen: (state, action) => {
      state.isModalOpen = action.payload;
    },
    toggleIsEditing: (state, action) => {
      state.isEditing = action.payload;
    },
    setSelectedMemory: (state, action) => {
      state.selectedMemory = action.payload;
    },
    toggleIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
  },
});

export const {
  toggleIsModalOpen,
  toggleIsEditing,
  setSelectedMemory,
  toggleIsLogged,
} = statesSlice.actions;
export default statesSlice.reducer;
