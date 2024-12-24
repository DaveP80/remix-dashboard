import { Link, Outlet, useOutletContext } from "@remix-run/react";
import { useContext } from "react";
import {GlobalContext} from "~/root";

export default function Index() {
  const AuthContext = useContext(GlobalContext);
  return (
    <div className="flex-col min-h-screen p-2">
      <div className="h3">Enter your name and sign up or login</div>
      <aside className="flex flex-col space-y-4">
        {JSON.stringify(AuthContext?.user)}
        {AuthContext?.user ? <Link to="/auth/user-page" className="text-blue-600 hover:text-blue-800">
          User Page
        </Link> : 
        <>
                <Link to="/auth/new-user" className="text-blue-600 hover:text-blue-800">
                Sign up
              </Link>
                <Link to="/auth/login" className="text-blue-600 hover:text-blue-800">
                Login
              </Link>
        
        </>
        }
      </aside>

      <Outlet />
    </div>
  );
}
