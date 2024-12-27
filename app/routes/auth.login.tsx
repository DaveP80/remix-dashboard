import AuthForm from "~/components/AuthForm";
import type { ActionFunctionArgs } from "@remix-run/node";
import { supabase } from "~/utils/supabase.server";
import { Await, useActionData } from "@remix-run/react";
import { useContext, useEffect } from "react";
import { UserContextType } from "~/types/types";
import { GlobalContext } from "~/context/globalcontext";
import React from "react";

type ActionData = {
  dataPromise?: any;
};

type SupaResults = {
  data: { name: string }[];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  try {
    const dataPromise = supabase.from("users").select().eq("name", name);
    return { dataPromise: dataPromise.then() };
  } catch (error) {
    console.error(error);
    return { dataPromise: null };
  }
}

export default function Login() {
  const LoginContext = useContext<UserContextType | undefined>(GlobalContext);
  const LoginAction = useActionData<ActionData | typeof action>();

  useEffect((): ReturnType<any> => {
    if (LoginAction?.dataPromise !== null) {
      LoginAction?.dataPromise.then((res: SupaResults) => {
        res?.data[0]?.name &&
          LoginContext?.setUser({ name: res?.data[0].name });
      });
    }
    return () => true;
  }, [LoginAction]);

  return (
    <main className="flex-grow min-h-screen bg-slate-500">
      <React.Suspense
        fallback={
          <div className="flex justify-center items-center">
            <div className="spinner"></div>{" "}
          </div>
        }
      >
        <Await resolve={LoginAction?.dataPromise}>
          {(response) => {
            const res = response?.data ? response.data[0]?.name : null;
            if (res) {
              return <>{`welcome ${res} you are logged in.`}</>;
            } else if (!LoginAction) return "";
            else if (response?.data && response?.data.length == 0)
              return "user not found, perhaps sign up";
            else return "sorry, server error";
          }}
        </Await>
      </React.Suspense>
      <br />
      <AuthForm label="login" />
    </main>
  );
}
