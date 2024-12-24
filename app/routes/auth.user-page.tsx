import { redirect } from "@remix-run/react";
import { useContext } from "react";
import { GlobalContext } from "~/root";
import { UserContextType } from "~/types/types";

export default function UserPage() {
    const User = useContext<UserContextType | undefined>(GlobalContext);
    
    if (User?.user?.name == null) redirect("/auth")
        return (
    <div>
                <div className="div">Welcome back {User?.user?.name}</div>
    </div>
  );
}