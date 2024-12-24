import AuthForm from "~/components/AuthForm";
import type { ActionFunctionArgs } from "@remix-run/node";
import { supabase } from "~/utils/supabase.server";
import { useActionData } from "@remix-run/react";
import { useContext } from "react";
import { UserContextType } from "~/types/types";
import { GlobalContext } from "~/context/globalcontext";

type ActionData = {
    error?: any;
    message: string;
    user?: string;
}

export async function action({request}: ActionFunctionArgs) {
    
    const formData = await request.formData();
    const name = formData.get("name");
    try {
        const { data } = await supabase
        .from('users')
        .select()
        .eq('name', name);
        if (data) {
            
            return Response.json({message: `welcome ${data[0].name} you are logged in.`, user: data[0].name})
        } else {
            return Response.json({message: "user not found, perhaps sign up"})
        }
    } catch(error) {
        return Response.json({error, message: "supabase error"});
    }
    
}

export default function Login() {
    const LoginContext = useContext<UserContextType | undefined>(GlobalContext);
    const data = useActionData<ActionData>();
    data?.user && LoginContext?.setUser({name: data.user})
    return (
    <main className="flex-grow min-h-screen bg-slate-500">
    {data?.message || ""}
    <br/>
    <AuthForm label="login"/>
    </main>
  );
}