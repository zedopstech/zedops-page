import ProductDashboard, { type DashboardData } from "@/components/dashboards/ProductDashboard";

type WorkforceDashboardProps = {
  onWatchDemo?: () => void;
  data: DashboardData;
};

export default function WorkforceDashboard({ onWatchDemo, data }: WorkforceDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
