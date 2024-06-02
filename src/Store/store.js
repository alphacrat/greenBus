import { create } from 'zustand'

const useUserStore = create((set) => ({
  userDetails: {
    loading: true,
    data: {},
  },
  setUserDetails: (details) =>
    set(() => ({
      userDetails: { data: { ...details }, loading: false },
    })),
  resetUserDetails: () =>
    set(() => ({
      userDetails: {
        loading: false,
        data: {},
      },
    })),
}))

export default useUserStore
