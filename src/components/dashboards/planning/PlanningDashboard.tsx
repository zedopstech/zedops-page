import ProductDashboard, { type DashboardData } from "@/components/dashboards/ProductDashboard";

type PlanningDashboardProps = {
  onWatchDemo?: () => void;
  data: DashboardData;
};

export default function PlanningDashboard({ onWatchDemo, data }: PlanningDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
