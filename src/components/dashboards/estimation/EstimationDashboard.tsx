import ProductDashboard, { type DashboardData } from "@/components/dashboards/ProductDashboard";

type EstimationDashboardProps = {
  onWatchDemo?: () => void;
  data: DashboardData;
};

export default function EstimationDashboard({ onWatchDemo, data }: EstimationDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
