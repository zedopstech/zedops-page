import ProductDashboard, { type DashboardData } from "@/components/dashboards/ProductDashboard";

type BudgetDashboardProps = {
  onWatchDemo?: () => void;
  data: DashboardData;
};

export default function BudgetDashboard({ onWatchDemo, data }: BudgetDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
