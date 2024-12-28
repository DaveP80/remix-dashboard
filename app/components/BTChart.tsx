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
  isCompatibleDateStrings,
  isUSLocaleFormat,
  transformData
} from "~/lib/data";
import { useEffect, useState } from "react";
import { ChartObj } from "~/types/types";
import { testdata } from "~/lib/testdata";
import { DateRange } from "react-day-picker";

export function BTChart({ value_obj, date_picker }: { value_obj: ChartObj | undefined, date_picker: DateRange | undefined }) {
  const [bitcoinData, setBitcoinData] = useState<any>(null);
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
        //const isDev = import.meta.env.DEV;
        const isDev = false;
        if (isDev) {
          setBitcoinData(testdata);
        } else {
          const data = await fetchBitcoinData(
            apiKey,
            value_obj?.value || "bitcoin", date_picker
          );
          setBitcoinData(data);
        }
      } catch (err) {
        setError("Failed to fetch Bitcoin data");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    if (value_obj?.value && isCompatibleDateStrings(date_picker?.from, date_picker?.to)) {

      loadBitcoinData();
    }
  }, [value_obj, date_picker]);

  if (isLoading)
    return (
      <div>
        <Spinner h={""} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!bitcoinData) return <div>No data available</div>;
  return (
    <Card className="mx-8 my-2 max-h-300px">
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
                value: "day",
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
              {`${date_picker?.from?.toLocaleString() || new Date()} - ${date_picker?.to?.toLocaleString() || new Date()}`}
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
