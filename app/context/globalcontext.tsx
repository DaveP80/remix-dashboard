// app/contexts/GlobalContext.tsx
import { createContext, useState } from "react";
import type { ChartObj, User, UserContextType } from "~/types/types";

export const GlobalContext = createContext<UserContextType | undefined>(
  undefined
);

export default function GlobalContextProvider({ children }: { children: React.ReactNode}) {
  const [user, setUser] = useState<User>(null);
  //for combobox chart-price selector
  const [value_obj, setValue] = useState<ChartObj>({value: "", label: ""});

  const clearUser = () => setUser({ name: null });

  

  return (
    <GlobalContext.Provider value={{ user, setUser, clearUser, value_obj, setValue }}>
      {children}
    </GlobalContext.Provider>
  );
}
