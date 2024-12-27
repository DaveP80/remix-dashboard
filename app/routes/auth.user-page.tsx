import { BTChart } from "~/components/BTChart";
import { useProtectedRoute } from "~/hooks/protected-route";

export default function UserPage() {
  const { isAuthenticated, user } = useProtectedRoute();

  if (!isAuthenticated) {
    return <div>Redirecting...</div>;
  } else {
    return (
      <div>
        <div className="text-xl font-bold">Welcome back {user?.name}</div>
        <BTChart />
      </div>
    );
  }
}
