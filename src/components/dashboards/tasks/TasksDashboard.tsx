import ProductDashboard, { type DashboardData } from "@/components/dashboards/ProductDashboard";

type TasksDashboardProps = {
  onWatchDemo?: () => void;
  data: DashboardData;
};

export default function TasksDashboard({ onWatchDemo, data }: TasksDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
