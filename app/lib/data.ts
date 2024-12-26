export const chartData: {month: string, desktop: number, mobile: number}[] = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ]

  interface DynamicArrayObject {
    [key: string]: Array<any>; // For any type of array
  }

  interface TransformArrayObject {
    [key: string]: string | number; // For any type of array
  }


export function transformData(args: DynamicArrayObject): TransformArrayObject[] {
    const initData = args.prices.slice(0,10);
    const finalArr: TransformArrayObject[] = [];

    let l = initData.length;
    for (let i = 0; i<l; i++) {
        let storObj: TransformArrayObject = {};
        let day = (i+1).toString();
        let marketcap = initData[i][0];
        let btcprice = initData[i][1];
        storObj["day"] = day;
        storObj["marketcap"] = +marketcap.toFixed();
        storObj["btcprice"] = +btcprice.toFixed();
        finalArr.push(storObj);
    }
    console.log(finalArr)
    return finalArr.slice(0,6);
}

export async function fetchBitcoinData(environ: string | undefined) {
    const options: {[key: string]: any} = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": environ,
      },
    };
  
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=usd&from=1727763018&to=1729059018",
        options
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching Bitcoin data:", error);
      return null;
    }
  }
  