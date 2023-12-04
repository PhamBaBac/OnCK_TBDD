import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
export const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    addUser: (state, action) => {
      const { username, password, role } = action.payload;
      const newUser = { id: uuidv4(), username, password, role };
      state.users.push(newUser);
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
    updateUser: (state, action) => {
      const { id, username, password, role } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.username = username;
        user.password = password;
        user.role = role;
      }
    },
    searchUser: (state, action) => {
      const { username } = action.payload;
      const user = state.users.find((user) => user.username === username);
      if (user) {
        user.username = username;
      }
    },
  },
});

export const { addUser, deleteUser, updateUser, searchUser } = userSlice.actions;

export default userSlice.reducer;
