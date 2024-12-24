export type User = {
    name?: string | null;
  } | null;
  
export type UserContextType = {
    user: User;
    setUser: (user: User) => void;
    clearUser: () => void;
  };