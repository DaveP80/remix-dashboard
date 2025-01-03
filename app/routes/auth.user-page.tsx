import { useContext } from "react";
import { BTChart } from "~/components/BTChart";
import { ChartSelector } from "~/components/ChartSelector";
import { DatePickerWRange } from "~/components/DatePickerWRange";
import { GlobalContext } from "~/context/globalcontext";
import { useProtectedRoute } from "~/hooks/protected-route";

export default function UserPage() {
  const { isAuthenticated, user } = useProtectedRoute();
  const ChartContext = useContext(GlobalContext);

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  } else {
    return (
      <div>
        <div className="text-xl font-bold">Welcome back {user?.name}</div>
        <ChartSelector />
        <DatePickerWRange />
        <BTChart value_obj={ChartContext?.value_obj} date_picker={ChartContext?.date} summary_view={null} />
      </div>
    );
  }
}
