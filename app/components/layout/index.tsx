import { Header } from "./Header";
import { Footer } from "./Footer";
import type { PropsWithChildren } from "react";
import { useNavigation } from "@remix-run/react";

export function Layout({ children }: PropsWithChildren) {
    const navigation = useNavigation();
  return (
    <>
      <Header />
      { 
        navigation.state !== "idle" ? (
<div className="flex justify-center items-center min-h-screen"><div className="spinner"></div> </div>
        ) : <>{children}</>
      }
      <Footer/>
    </>
  );
}