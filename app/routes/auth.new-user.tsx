import AuthForm from "~/components/AuthForm";
import type { ActionFunctionArgs } from "@remix-run/node";
import { supabase } from "~/utils/supabase.server";
import { useActionData } from "@remix-run/react";
import {GlobalContext} from "~/root";
import { useContext } from "react";
import { UserContextType } from "~/types/types";

type ActionData = {
  error?: any;
  message: string;
  user?: string;
};

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    try {
        const { data } = await supabase
        .from("users")
        .insert([{ name }])
        .throwOnError();
        return Response.json({ message: "successful added", user: name?.toString() });
    } catch (error) {
        return Response.json({ error, message: "supabase error" });
    }
}

export default function New_User() {
    const User = useContext<UserContextType | undefined>(GlobalContext);
    const data = useActionData<ActionData>();
    data?.user && User?.setUser({name: data.user })
    return (
        <main className="flex-grow min-h-screen bg-slate-500">
      {data?.message || ""}
      <br />
      <AuthForm label="sign-up" />
    </main>
  );
}
