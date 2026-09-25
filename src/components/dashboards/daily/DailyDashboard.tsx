import ProductDashboard, { type DashboardData } from "@/components/dashboards/ProductDashboard";

type DailyDashboardProps = {
  onWatchDemo?: () => void;
  data: DashboardData;
};

export default function DailyDashboard({ onWatchDemo, data }: DailyDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
