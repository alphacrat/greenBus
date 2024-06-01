import { create } from 'zustand'

const useUserStore = create((set) => ({
  userDetails: {
    loading: true,
    name: '',
    contact_number: '',
    email: '',
    age: 0,
    address: '',
    password: '',
  },
  setUserDetails: (details) =>
    set((state) => ({
      userDetails: { ...state.userDetails, ...details, loading: false },
    })),
  resetUserDetails: () =>
    set(() => ({
      userDetails: {
        loading: false,
        name: '',
        contact_number: '',
        email: '',
        age: 0,
        address: '',
        password: '',
      },
    })),
}))

export default useUserStore
