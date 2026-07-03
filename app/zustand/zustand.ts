import { create } from 'zustand'
import { createLoginSlice } from './loginSlice'

export const useBoundStore = create((...a) => ({
  ...createLoginSlice(...a),
}))