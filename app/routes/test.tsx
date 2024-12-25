import { Await } from "@remix-run/react";
import { Suspense } from "react";
import { useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
// Define the shape of the resolved data
interface MockDataType {
  message: string;
}
// Define the shape of the loader return type
interface LoaderData {
  mockData: Promise<MockDataType>;
}
// Add the return type annotation to the loader
export async function loader(): Promise<LoaderData> {
  const mockData = new Promise<MockDataType>((resolve) => {
    setTimeout(() => {
      const isServer = typeof window === "undefined";
      console.log(isServer);
      resolve({ message: "Data fetched successfully!" });
    }, 3000);
  });

  return { mockData };
}

export default function Test(): React.ReactNode {
  //@ts-expect-error
  const { mockData } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="flex-col justify-items-center">
        <p className="">Thanks for waiting for a server response</p>

        <Button>Test Btn</Button>
      </div>

      <Suspense
        fallback={
          <div className="flex justify-center items-center min-h-screen">
            <div className="spinner"></div>{" "}
          </div>
        }
      >
        <Await resolve={mockData}>
          <div className="flex-grow min-h-screen p-4 text-blue-500 font-serif">
            <div className="div">PROMISE WAS RETURNED!</div>
          </div>
        </Await>
      </Suspense>
    </>
  );
}
