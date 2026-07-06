import { create } from "zustand";

export const createUserSlice = (set:User) => ({
  user: {} as User,
  setUser: (newUser:User) => set({user:newUser})
})