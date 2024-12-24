// app/contexts/GlobalContext.tsx
import { createContext, useState } from "react";
import type { User, UserContextType } from "~/types/types";

export const GlobalContext = createContext<UserContextType | undefined>(
  undefined
);

export default function GlobalContextProvider({ children }: { children: React.ReactNode}) {
  const [user, setUser] = useState<User>(null);

  const clearUser = () => setUser({ name: null });

  return (
    <GlobalContext.Provider value={{ user, setUser, clearUser }}>
      {children}
    </GlobalContext.Provider>
  );
}
