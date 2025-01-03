import { ActionFunctionArgs } from "@remix-run/node";
import { useActionData, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import { BTChart } from "~/components/BTChart";
import { GlobalContext } from "~/context/globalcontext";
import { generateCryptoSummary } from "~/utils/summarizer.server";
import { ArrowLeftCircleIcon } from "@heroicons/react/16/solid";
import { protectSummaryRoute } from "~/hooks/server-hooks";
import { useProtectedRoute } from "~/hooks/protected-route";

export async function action({ request, params }: ActionFunctionArgs) {
  const symbol = params.symbol;
  const cryptoData = await request.formData();
  // Check if chart_data exists in form data
  const chartData = cryptoData.get("chart_data");
  protectSummaryRoute(chartData)
  try {
    const parsedValue = JSON.parse(chartData as string);
    const prices_array = parsedValue.map((item: { assetprice: any }) => item.assetprice);
    const marketcap_array = parsedValue.map((item: { average_marketcap: any }) => item.average_marketcap);

    const summary = await generateCryptoSummary({
      prices: prices_array,
      average_marketcap: marketcap_array,
      label: symbol ?? ""
    });

    return Response.json({ label: symbol, summary, summary_view: parsedValue });
  } catch (e) {
    console.log(e);
    return Response.json({ label: "", summary: "", summary_view: null });
  }
}

export default function Index() {
  const actionData = useActionData<typeof action>();
  const { summary, summary_view } = actionData ?? { summary: null, summary_view: null };
  const ChartContext = useContext(GlobalContext);
  const { isAuthenticated, user } = useProtectedRoute();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <div className="div">Redirecting...</div>
  } else

    return (
      <div className="p-6 space-y-6">
        <div className="bg-card rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold mb-2">AI Summary</h2>
            <ArrowLeftCircleIcon className="w-8 h-8 text-gray-600 hover:text-gray-800" onClick={() => navigate("/auth/user-page")} />
          </div>
          <p className="text-muted-foreground">{summary || "no ai summary"}</p>
        </div>
        <BTChart value_obj={ChartContext?.value_obj} date_picker={ChartContext?.date} summary_view={summary_view} />
      </div>
    );
}