import ProductDashboard from "@/components/dashboards/ProductDashboard";

type CoreDashboardProps = {
  onWatchDemo?: () => void;
  data: import("@/components/dashboards/ProductDashboard").DashboardData;
};

export default function CoreDashboard({
  onWatchDemo,
  data,
}: CoreDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
