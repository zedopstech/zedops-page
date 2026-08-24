import ProductDashboard, { type DashboardData } from "@/components/dashboards/ProductDashboard";

type SupplyChainDashboardProps = {
  onWatchDemo?: () => void;
  data: DashboardData;
};

export default function SupplyChainDashboard({ onWatchDemo, data }: SupplyChainDashboardProps) {
  return <ProductDashboard data={data} onWatchDemo={onWatchDemo} />;
}
