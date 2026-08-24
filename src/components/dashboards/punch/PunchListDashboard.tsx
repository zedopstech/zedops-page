import ProductDashboard, { type DashboardData } from "@/components/dashboards/ProductDashboard";

type PunchListDashboardProps = {
  onWatchDemo?: () => void;
  data: DashboardData;
};

export default function PunchListDashboard({ onWatchDemo, data }: PunchListDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
