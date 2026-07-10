import { create } from "zustand";
import { User } from "../globals";

export const createUserSlice = (set:User) => ({
  user: {} as User,
  setUser: (newUser:User) => set({user:newUser})
})