import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "~/components/ui/chart";
import { fetchBitcoinData, transformData } from "~/lib/data";
import Spinner from "./Spinner";

const chartConfig = {
  btcprice: {
    label: "btcprice",
    color: "#2563eb",
  },
  marketcap: {
    label: "marketcap",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export default function BTChart() {
    const [bitcoinData, setBitcoinData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      async function loadBitcoinData() {
        try {
        const apiKey = import.meta.env.VITE_PUBLIC_API_KEY;
          const data = await fetchBitcoinData(apiKey);
          setBitcoinData(data);
        } catch (err) {
          setError("Failed to fetch Bitcoin data");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
  
      loadBitcoinData();
    }, []);
  
    if (isLoading) return <div><Spinner h={""}/></div>;
    if (error) return <div>Error: {error}</div>;
    if (!bitcoinData) return <div>No data available</div>;
  return (

            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart accessibilityLayer data={transformData(bitcoinData)}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="days"
                  tickLine={false}
                  tickMargin={5}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="btcprice" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="marketcap" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          );
}
