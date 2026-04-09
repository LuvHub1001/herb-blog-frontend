import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBoardStats } from "@/apis/BoardFetcher";
import { getVisitorStats } from "@/apis/VisitorFetcher";
import type { BoardStats, VisitorStats } from "@/types";

function formatMonthlyViews(
  monthly: BoardStats["monthly"] | undefined,
): { x: string; y: number }[] {
  return Array.from({ length: 12 }, (_, i) => {
    const month = `${i + 1}`.padStart(2, "0");
    const found = monthly?.find((v) => v.month.endsWith(`-${month}`));
    return { x: `${i + 1}월`, y: found ? found.totalViews : 0 };
  });
}

function formatMonthlyVisitors(
  monthlyStats: VisitorStats["monthlyStats"] | undefined,
): { x: string; y: number }[] {
  return Array.from({ length: 12 }, (_, i) => {
    const month = `${i + 1}`.padStart(2, "0");
    const found = monthlyStats?.find((v) => v.month.endsWith(`-${month}`));
    return { x: `${i + 1}월`, y: found ? found.count : 0 };
  });
}

const useAdminChart = () => {
  const { data: boardStats } = useQuery<BoardStats>({
    queryKey: ["boards", "stats"],
    queryFn: getBoardStats,
  });

  const { data: visitorStats } = useQuery<VisitorStats>({
    queryKey: ["visitor", "stats"],
    queryFn: getVisitorStats,
  });

  const formattedViewsData = useMemo(
    () => formatMonthlyViews(boardStats?.monthly),
    [boardStats],
  );

  const formattedVisitorsData = useMemo(
    () => formatMonthlyVisitors(visitorStats?.monthlyStats),
    [visitorStats],
  );

  const chartData = useMemo(
    () => ({
      datasets: [
        {
          type: "line" as const,
          label: "조회 수 총합",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderWidth: 2,
          data: formattedViewsData,
        },
        {
          type: "line" as const,
          label: "방문 수 총합",
          borderColor: "rgb(54, 162, 235)",
          backgroundColor: "rgba(54, 162, 235, 0.5)",
          borderWidth: 2,
          data: formattedVisitorsData,
        },
      ],
    }),
    [formattedViewsData, formattedVisitorsData],
  );

  const todayViews = boardStats?.today ?? 0;
  const yesterdayViews = boardStats?.yesterday ?? 0;
  const totalViews = boardStats?.total ?? 0;

  const todayVisitors = visitorStats?.today ?? 0;
  const yesterdayVisitors = visitorStats?.yesterday ?? 0;
  const totalVisitors = visitorStats?.total ?? 0;

  const isLoading = !boardStats || !visitorStats;

  return {
    chartData,
    todayViews,
    yesterdayViews,
    totalViews,
    todayVisitors,
    yesterdayVisitors,
    totalVisitors,
    isLoading,
  };
};

export default useAdminChart;
