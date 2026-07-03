import { create } from "zustand";

export const createLoginSlice = (set:any) => ({
  loginOpen: false,
  toggleLogin: () => set((state:any) => ({ loginOpen: !state.loginOpen })),
  setLogin: (newBool:boolean) => set({ loginOpen: newBool }),
})