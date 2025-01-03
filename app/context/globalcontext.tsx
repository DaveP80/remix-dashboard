// app/contexts/GlobalContext.tsx
import { addDays } from "date-fns";
import { createContext, useState } from "react";
import { DateRange } from "react-day-picker";
import { getDateOneYearAgo } from "~/lib/data";
import type { ChartObj, User, UserContextType } from "~/types/types";

export const GlobalContext = createContext<UserContextType>(undefined);

export default function GlobalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User>(null);
  //for combobox chart-price selector
  const [value_obj, setValue] = useState<ChartObj>({
    value: "bitcoin",
    label: "BTC",
  });
  const [date, setDate] = useState<DateRange>(() => {
    let f = getDateOneYearAgo();
    return {
      from: f,
      to: addDays(f, 20),

    }
  });

  const clearUser = () => setUser({ name: null });

  return (
    <GlobalContext.Provider
      value={{ user, setUser, clearUser, value_obj, setValue, date, setDate }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
