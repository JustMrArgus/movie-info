import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      isAuthenticated: false,
      changeAuthenticationStatus: (status) => {
        set(() => ({ isAuthenticated: status }));
      },
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useStore;
