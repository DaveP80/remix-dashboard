interface DynamicArrayObject {
  [key: string]: Array<any>; // For any type of array
}

interface TransformArrayObject {
  [key: string]: string | number; // For any type of array
}

export const unixStart = "1727755200";
export const unixStop = "1729828800";

export function transformData(
  args: DynamicArrayObject
): TransformArrayObject[] {
  const initData = args.prices;
  const finalArr: TransformArrayObject[] = [];
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
    if (inner_c == 24 || (flag && i == l - 1)) {
      storObj["day"] = (day + 1).toString();
      storObj["assetprice"] = +max_p.toFixed();
      finalArr.push(storObj);
      day++;
      inner_c = 0;
      storObj = {};
      max_p = Number.MIN_SAFE_INTEGER;
      continue;
    }
    inner_c++;
  }
  return finalArr;
}

export async function fetchBitcoinData(environ: string | undefined, value: string) {
  const options: { [key: string]: any } = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": environ,
    },
  };

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
