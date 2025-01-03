import { DateRange } from "react-day-picker";

interface DynamicArrayObject {
  [key: string]: Array<any>; // For any type of array
}

interface TransformArrayObject {
  [key: string]: string | number; // For any type of array
}

let unixStart: any = "1727755200";
let unixStop: any = "1729828800";

export function transformData(
  args: DynamicArrayObject
): TransformArrayObject[] {
  const initData = args.prices;
  const finalArr: TransformArrayObject[] = [];
  let avg_marketcap: number = 0;
  //find highest price in every 24 part window. if remaining window is less
  //then the length of 24, find the highest in what is remaining.
  let l = initData.length;
  let max_p = Number.MIN_SAFE_INTEGER;
  let inner_c = 0;
  let day = 0;
  let storObj: TransformArrayObject = {};
  let flag = false;
  for (let i = 0; i < l; i++) {
    if (l - i < 24) {
      flag = true;
    }
    if (initData[i][1] > max_p) {
      max_p = initData[i][1];
    }
    avg_marketcap += initData[i][0];
    if (inner_c == 24 || (flag && i == l - 1)) {
      storObj["day"] = (day + 1).toString();
      storObj["assetprice"] = +max_p.toFixed();
      storObj["average_marketcap"] = flag ? avg_marketcap / l-1-i : avg_marketcap / 24;
      finalArr.push(storObj);
      day++;
      inner_c = 0;
      storObj = {};
      max_p = Number.MIN_SAFE_INTEGER;
      avg_marketcap = 0;
      continue;
    }
    inner_c++;
  }
  return finalArr;
}

export async function fetchBitcoinData(
  environ: string | undefined,
  value: string,
  date_picker: DateRange | undefined
) {
  const options: { [key: string]: any } = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": environ,
    },
  };

  if (date_picker) {
    unixStart = date_picker?.from
      ? Math.floor(date_picker.from?.getTime() / 1000).toString()
      : unixStart;
    unixStop = date_picker?.to
      ? Math.floor(date_picker.to?.getTime() / 1000).toString()
      : unixStop;
  }

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${value}/market_chart/range?vs_currency=usd&from=${unixStart}&to=${unixStop}&precision=0`,
      options
    );
    return await response.json();
  } catch (error) {
    console.error("Error fetching Bitcoin data:", error);
    return null;
  }
}

export function isUSLocaleFormat(dateString: string): string {
  // Matches format: "M/D/YYYY, HH:MM:SS AM/PM"
  const usLocalePattern =
    /^\d{1,2}\/\d{1,2}\/\d{4},\s\d{1,2}:\d{2}:\d{2}\s[AP]M$/;
  return usLocalePattern.test(dateString) ? "true" : "false";
}

export function isCompatibleDateStrings(string1: any, string2: any): boolean {
  return string1 && string2 && string1.toString() !== string2.toString();
}

export function getDateOneYearAgo(): Date {
  const today = new Date();
  return new Date(today.setDate(today.getDate() - 365));
}