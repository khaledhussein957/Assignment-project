import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import type { Product } from "../lib/api";

interface StockChartProps {
  products: Product[];
}

const COLORS = [
  "#3b82f6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
];

function StockChart({ products }: StockChartProps) {
  // Sort products by quantity descending and take top 10 for better visualization
  const chartData = [...products]
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 10);

  return (
    <div className="card bg-base-100 shadow-xl overflow-hidden">
      <div className="card-body">
        <h2 className="card-title text-xl mb-4 font-bold">Stock Levels</h2>
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                opacity={0.3}
              />
              <XAxis
                dataKey="name"
                angle={-45}
                textAnchor="end"
                interval={0}
                stroke="currentColor"
                fontSize={12}
                tick={{ fill: "currentColor" }}
              />
              <YAxis
                stroke="currentColor"
                fontSize={12}
                tick={{ fill: "currentColor" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(var(--b1))",
                  border: "none",
                  borderRadius: "var(--rounded-box, 0.5rem)",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                }}
                cursor={{ fill: "oklch(var(--b2))", opacity: 0.4 }}
              />
              <Bar
                dataKey="quantity"
                name="Stock Quantity"
                radius={[4, 4, 0, 0]}
                barSize={40}
              >
                {chartData.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default StockChart;
