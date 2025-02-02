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
  transformData
} from "~/lib/data";
import { useEffect, useState } from "react";
import { ChartObj } from "~/types/types";
import { testdata } from "~/lib/testdata";
import { DateRange } from "react-day-picker";
import { Button } from "./ui/button";
import { Form, useLocation, useNavigate, useNavigation } from "@remix-run/react";

export function BTChart({ value_obj, date_picker, summary_view }: { value_obj: ChartObj | undefined, date_picker: DateRange | undefined, summary_view: any }) {
  const [bitcoinData, setBitcoinData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

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
          if (summary_view) {
            console.log("using storage")
            setBitcoinData(summary_view);
          } else {
            const data = await fetchBitcoinData(
              apiKey,
              value_obj?.value || "bitcoin", date_picker
            );
            setBitcoinData(data);
          }
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

  const handleButton = () => {
    setButtonLoading(true);
    navigate(`/auth/crypto/${value_obj?.label}`)
  }

  if (isLoading)
    return (
      <div>
        <Spinner h={""} />
      </div>
    );
  if (error) return <div>Error: {error}</div>;
  if (!bitcoinData) return <div>No data available</div>;

  const allChartData = summary_view ? bitcoinData : transformData(bitcoinData);
  return (
    <Card className="mx-8 my-2 max-h-300px">
      <CardHeader>
        <CardTitle>Asset Chart Historical</CardTitle>
        <CardDescription>
          Showing Daily High {value_obj?.value || "bitcoin"} prices.
          <details className="detail">hourly intervals in data set</details>
          {
            !location.pathname.includes("crypto") && (
              <Form method="post" action={`/auth/crypto/${value_obj?.label}`}>
                <input type="hidden" name="chart_data" value={JSON.stringify(allChartData)} />
                <Button onClick={handleButton}><>{
                  buttonLoading ? <Spinner h={""} />
                    :
                    "Get AI summary"
                }
                </></Button>

              </Form>

            )
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={allChartData}
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
