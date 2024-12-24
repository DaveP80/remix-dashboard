import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { supabase } from "~/utils/supabase.server";

export const loader: LoaderFunction = async () => {

  const { data } = await supabase.from("tefst").select();

  return { data };
};
export default function Dashboard(): React.ReactNode {
  const data = useLoaderData();
  return (
    <div className="flex-grow min-h-screen p-4 text-blue-500 font-serif">
      {JSON.stringify(data)}
    </div>
  );
}
