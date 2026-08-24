import ProductDashboard from "@/components/dashboards/ProductDashboard";

type QualitySafetyDashboardProps = {
  onWatchDemo?: () => void;
  data: import("@/components/dashboards/ProductDashboard").DashboardData;
};

export default function QualitySafetyDashboard({
  onWatchDemo,
  data,
}: QualitySafetyDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
