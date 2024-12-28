export type User = {
    name?: string | null;
  } | null;

export type ChartObj = {
  value: string | "bitcoin";
  label: string | "BTC";
}
  
export type UserContextType = {
    user: User;
    setUser: (user: User) => void;
    clearUser: () => void;
    value_obj: ChartObj;
    setValue: (args: ChartObj) => void;
  };