import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { useFetch } from "../../hooks";
import { get } from "../../apis";

interface BoardStats {
  total: number;
  monthly: { month: string; totalViews: number }[];
}

interface VisitorStats {
  total: number;
  monthlyStats: { month: string; count: number }[];
}

function AdminChart() {
  const token = localStorage.getItem("token");

  const boardStats = useFetch<string, BoardStats>(
    get,
    "http://localhost:5000/api/boards/stats",
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );

  const visitorStats = useFetch<string, VisitorStats>(
    get,
    "http://localhost:5000/api/visitor/stats",
    token
      ? {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      : undefined,
  );

  const formattedViewsData = Array.from({ length: 12 }, (_, i) => {
    const month = `${i + 1}`.padStart(2, "0");
    const found = boardStats?.monthly?.find((v) =>
      v.month.endsWith(`-${month}`),
    );
    return { x: `${i + 1}월`, y: found ? found.totalViews : 0 };
  });

  const formattedVisitorsData = Array.from({ length: 12 }, (_, i) => {
    const month = `${i + 1}`.padStart(2, "0");
    const found = visitorStats?.monthlyStats?.find((v) =>
      v.month.endsWith(`-${month}`),
    );
    return { x: `${i + 1}월`, y: found ? found.count : 0 };
  });

  const manageData: any = {
    datasets: [
      {
        type: "line",
        label: "조회 수 총합",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderWidth: 2,
        data: formattedViewsData,
      },
      {
        type: "line",
        label: "방문 수 총합",
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderWidth: 2,
        data: formattedVisitorsData,
      },
    ],
  };

  const [todayViews, setTodayViews] = useState(0);
  const [yesterdayViews, setYesterdayViews] = useState(0);
  const [totalViews, setTotalViews] = useState(0);

  const [todayVisitors, setTodayVisitors] = useState(0);
  const [yesterdayVisitors, setYesterdayVisitors] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);

  useEffect(() => {
    if (boardStats && visitorStats) {
      const yesterdayDate = new Date();
      yesterdayDate.setDate(yesterdayDate.getDate() - 1);

      const todayViewCount = boardStats.total || 0;
      const yesterdayViewCount = 0;

      const todayVisitorCount = visitorStats.total || 0;
      const yesterdayVisitorCount = 0;

      setTodayViews(todayViewCount);
      setYesterdayViews(yesterdayViewCount);
      setTotalViews(boardStats.total || 0);

      setTodayVisitors(todayVisitorCount);
      setYesterdayVisitors(yesterdayVisitorCount);
      setTotalVisitors(visitorStats.total || 0);
    }
  }, [boardStats, visitorStats]);

  return (
    <div className="w-full px-4 py-6 space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:gap-8 p-6 border border-gray-300 rounded-2xl shadow-sm bg-white">
        <div className="flex-1 border-b md:border-b-0 md:border-r border-gray-300 pb-4 md:pb-0 md:pr-6 flex justify-around text-center">
          <div className="text-gray-500">
            오늘 조회수
            <p className="font-bold text-black text-2xl">{todayViews}</p>
          </div>
          <div className="text-gray-500">
            어제 조회수
            <p className="font-bold text-black text-2xl">{yesterdayViews}</p>
          </div>
          <div className="text-gray-500">
            누적 조회수
            <p className="font-bold text-black text-2xl">{totalViews}</p>
          </div>
        </div>

        <div className="flex-1 flex justify-around text-center">
          <div className="text-gray-500">
            오늘 방문자
            <p className="font-bold text-black text-2xl">{todayVisitors}</p>
          </div>
          <div className="text-gray-500">
            어제 방문자
            <p className="font-bold text-black text-2xl">{yesterdayVisitors}</p>
          </div>
          <div className="text-gray-500">
            누적 방문자
            <p className="font-bold text-black text-2xl">{totalVisitors}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm">
        <Line data={manageData} />
      </div>
    </div>
  );
}

export default AdminChart;
