import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useAdminChart } from "@/hooks";

interface StatCardProps {
  label: string;
  value: number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="text-center">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value.toLocaleString()}</p>
    </div>
  );
}

function AdminChart() {
  const {
    chartData,
    todayViews,
    yesterdayViews,
    totalViews,
    todayVisitors,
    yesterdayVisitors,
    totalVisitors,
    isLoading,
  } = useAdminChart();

  if (isLoading) {
    return (
      <div className="w-full p-8 text-center text-slate-400">로딩 중...</div>
    );
  }

  return (
    <div className="w-full px-6 py-8 space-y-6 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-500 mb-4">조회수</h3>
          <div className="flex justify-around">
            <StatCard label="오늘" value={todayViews} />
            <StatCard label="어제" value={yesterdayViews} />
            <StatCard label="누적" value={totalViews} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-500 mb-4">방문자</h3>
          <div className="flex justify-around">
            <StatCard label="오늘" value={todayVisitors} />
            <StatCard label="어제" value={yesterdayVisitors} />
            <StatCard label="누적" value={totalVisitors} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-500 mb-4">월별 추이</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
}

export default AdminChart;
