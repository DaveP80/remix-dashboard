import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "~/components/ui/chart";
import Spinner from "./Spinner";
import {
  fetchBitcoinData,
  transformData,
  unixStart,
  unixStop,
} from "~/lib/data";
import { useEffect, useState } from "react";
import { ChartObj } from "~/types/types";


export function BTChart({value_obj}: {value_obj: ChartObj| undefined}) {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const chartConfig = {
    assetprice: {
      label: value_obj?.value || "bitcoin",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    async function loadBitcoinData() {
      try {
        const apiKey = import.meta.env.VITE_PUBLIC_API_KEY;
        const data = await fetchBitcoinData(apiKey, value_obj?.value || "bitcoin");
        setBitcoinData(data);
      } catch (err) {
        setError("Failed to fetch Bitcoin data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    loadBitcoinData();
  }, [value_obj]);

  if (isLoading)
    return (
      <div>
        <Spinner h={""} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!bitcoinData) return <div>No data available</div>;
  return (
    <Card className="m-8 max-h-300px">
      <CardHeader>
        <CardTitle>Asset Chart Historical</CardTitle>
        <CardDescription>
          Showing Daily High {value_obj?.value || "bitcoin"} prices.
          <details className="detail">hourly intervals in data set</details>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={transformData(bitcoinData)}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={true}
              axisLine={false}
              tickMargin={1}
              tickFormatter={(value) => value.slice(0, 3)}
              label={{
                value: "day"
              }}              
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="assetprice"
              type="natural"
              fill="var(--color-area-char)"
              fillOpacity={0.4}
              stroke="var(--color-area-char)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              {value_obj?.label || "BTC"} Price
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              {`${new Date(+unixStart * 1000).toLocaleString()} - ${new Date(
                +unixStop * 1000
              ).toLocaleString()}`}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
