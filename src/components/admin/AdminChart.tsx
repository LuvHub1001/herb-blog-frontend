import { Line } from "react-chartjs-2";
import "chart.js/auto";

const manageData: any = {
  datasets: [
    {
      type: "line",
      label: "조회 수 총합",
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderWidth: 2,
      data: [
        { x: "1월", y: 0 },
        { x: "2월", y: 0 },
        { x: "3월", y: 0 },
        { x: "4월", y: 0 },
        { x: "5월", y: 0 },
        { x: "6월", y: 0 },
        { x: "7월", y: 0 },
        { x: "8월", y: 0 },
        { x: "9월", y: 0 },
        { x: "10월", y: 0 },
        { x: "11월", y: 0 },
        { x: "12월", y: 0 },
      ],
    },
    {
      type: "line",
      label: "방문 수 총합",
      borderColor: "rgb(54, 162, 235)",
      borderWidth: 2,
      data: [
        { x: "1월", y: 1 },
        { x: "2월", y: 2 },
        { x: "3월", y: 3 },
        { x: "4월", y: 4 },
        { x: "5월", y: 5 },
        { x: "6월", y: 6 },
        { x: "7월", y: 7 },
        { x: "8월", y: 8 },
        { x: "9월", y: 9 },
        { x: "10월", y: 10 },
        { x: "11월", y: 11 },
        { x: "12월", y: 12 },
      ],
    },
  ],
};

function AdminChart() {
  return (
    <div className="chart-wrapper">
      <div className="flex w-300 h-50 border-1 border-gray-300 rounded-2xl justify-between items-center pl-10 pr-10">
        <div className="view-data flex w-150 justify-around">
          <div className="text-gray-500">
            오늘 조회수
            <p className="font-bold text-black text-2xl">0</p>
          </div>
          <div className="text-gray-500">
            어제 조회수
            <p className="font-bold text-black text-2xl">0</p>
          </div>
          <div className="text-gray-500">
            누적 조회수
            <p className="font-bold text-black text-2xl">0</p>
          </div>
        </div>

        <div className="visit-data flex w-150 justify-around">
          <div className="text-gray-500">
            오늘 방문자
            <p className="font-bold text-black text-2xl">0</p>
          </div>
          <div className="text-gray-500">
            어제 방문자
            <p className="font-bold text-black text-2xl">0</p>
          </div>
          <div className="text-gray-500">
            누적 방문자
            <p className="font-bold text-black text-2xl">0</p>
          </div>
        </div>
      </div>

      <br />

      <Line data={manageData} />
    </div>
  );
}

export default AdminChart;
