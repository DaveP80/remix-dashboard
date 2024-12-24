import { redirect } from "@remix-run/react";
import { useContext } from "react";
import { GlobalContext } from "~/context/globalcontext";

export function logout() {
    const AuthContext = useContext(GlobalContext);
  if (AuthContext?.user?.name){ 
    AuthContext.clearUser();
    redirect("/auth");
}}