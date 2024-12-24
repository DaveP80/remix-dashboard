import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

import "./tailwind.css";
import { Layout } from "./components/layout";
import React, { createContext, useState } from "react";
import { User, UserContextType } from "./types/types";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];
export const GlobalContext = createContext<UserContextType | undefined>(undefined);

export default function App() {
  const [user, setUser] = useState<User>(null);
  const clearUser = () => setUser({name: null});
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <Meta />
      <Links />
    </head>
    <body className="flex-col">
      <GlobalContext.Provider value={{user, setUser, clearUser }} >
      <Layout>
      <Outlet/>
      </Layout>
      </GlobalContext.Provider>
      <ScrollRestoration />
      <Scripts />
    </body>
  </html>
);
}
