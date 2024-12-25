import { type LoaderFunction } from "@remix-run/node";
import { Await, useLoaderData } from "@remix-run/react";
import { SetStateAction, Suspense, useEffect, useState } from "react";
import { supabase } from "~/utils/supabase.server";

export const loader: LoaderFunction = async () => {
  const dataPromise = supabase.from("tefst").select();

  return { dataPromise: dataPromise.then() };
};

export default function Dashboard() {
  const { dataPromise } = useLoaderData<typeof loader>();

  const [header, setHeader] = useState<SetStateAction<any>>(null);

  useEffect(() => {
    dataPromise.then((res: any) => {
      res?.data?.length && setHeader(JSON.stringify(res.data));
    });
  }, []);

  return (
    <div className="flex-grow min-h-screen p-4">
      {header ? "supabase query" : "requesting"}
      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="spinner"></div>{" "}
          </div>
        }
      >
        <Await
          resolve={dataPromise}
          errorElement={<div className="text-red-500">Error loading data</div>}
        >
          {(response) => {
            return (
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-black">
                {JSON.stringify(response.data, null, 2)}
              </pre>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
