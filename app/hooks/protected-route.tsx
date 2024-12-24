// app/utils/protected-route.tsx
import { useNavigate } from "@remix-run/react";
import { useContext, useEffect } from "react";
import { GlobalContext } from "~/context/globalcontext";
import { UserContextType } from "~/types/types";


export function useProtectedRoute() {
  const User = useContext<UserContextType | undefined>(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!User?.user) {
      navigate("/auth");
    }
  }, [User]);

  return { isAuthenticated: !!User?.user, user: User?.user };
}
