import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  isEditing: false,
  isEditingCaption: false,
  isEditingTitle: false,
  isEditingDescription: false,
  selectedMemory: null,
  isLogged: false,
  isLoading: false,
  isMobile: false,
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
    toggleIsEditingCaption: (state, action) => {
      state.isEditingCaption = action.payload;
    },
    toggleIsEditingTitle: (state, action) => {
      state.isEditingTitle = action.payload;
    },
    toggleIsEditingDescription: (state, action) => {
      state.isEditingDescription = action.payload;
    },
    setSelectedMemory: (state, action) => {
      state.selectedMemory = action.payload;
    },
    toggleIsLogged: (state, action) => {
      state.isLogged = action.payload;
    },
    toggleIsLoading: (state, action) => {
      state.isModalOpen = action.payload;
    },
    toggleIsMobile: (state, action) => {
      state.isModalOpen = action.payload;
    },
  },
});

export const {
  toggleIsModalOpen,
  toggleIsEditing,
  toggleIsEditingCaption,
  toggleIsEditingTitle,
  toggleIsEditingDescription,
  setSelectedMemory,
  toggleIsLogged,
  toggleIsLoading,
  toggleIsMobile,
} = statesSlice.actions;
export default statesSlice.reducer;
