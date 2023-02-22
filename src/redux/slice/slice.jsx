import { createSlice } from '@reduxjs/toolkit';

const spaceSlice = createSlice({
  name: 'space',
  initialState: { id : 0, name : "" },
  reducers: {
    chooseID : (state, action) => {
      state.id = action.payload;
      console.log(state.id);
    },
    chooseName : (state, action) => {
      state.name = action.payload;
      console.log(state.name);
    }
  }
});

export default spaceSlice;
export const {currentID, chooseID, currentName, chooseName} = spaceSlice.actions;
