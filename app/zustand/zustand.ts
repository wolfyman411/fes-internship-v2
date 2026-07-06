import { create } from 'zustand'
import { createLoginSlice } from './loginSlice'
import { createUserSlice } from './userSlice'

export const useBoundStore = create((...a) => ({
  ...createLoginSlice(...a),
  ...createUserSlice(...a),
}))