import { create } from "zustand"

const useThemeStore = create((set, get) => ({
  isDarkMode: true,
  toggleTheme: () => set((state) => ({
    isDarkMode: !state.isDarkMode
  }))
}))

export default useThemeStore