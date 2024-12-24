import { useFetcher } from "@remix-run/react";
import { Fetcher, useLoaderData } from "react-router";
export async function loader(): Promise<any> {
  // Simulate fetching data with a delay
  const mockData = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ message: "Data fetched successfully!" });
    }, 3000);
  });
  const data = await mockData;

  return data;
}

export default function Test(): React.ReactNode {
  const lp = useLoaderData();
  const ss: Fetcher = useFetcher();
  return (
    <div className="flex-grow min-h-screen p-4 text-blue-500 font-serif">
      <div className="div">PROMISE WAS RETURNED!</div>
    </div>
  );
}
