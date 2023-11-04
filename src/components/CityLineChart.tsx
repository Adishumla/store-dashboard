// components/CityLineChart.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="text-sm shadow-lg rounded-lg bg-white text-black p-0 w-48  border-[0.5px] border-gray-400 border-opacity-50
      black:bg-gray-900 black:text-zinc-100
      "
      >
        <p
          className="font-semibold text-md px-2 py-2
        "
        >
          {label}
        </p>
        <div className="flex items-center border-t border-gray-400 border-opacity-25"></div>
        <div
          className="flex justify-between items-center w-full px-2 py-2
           "
        >
          <div className="flex items-center">
            <span
              className="w-3 h-3 shadow-md rounded-full bg-indigo-500 inline-block mr-2 border-2
               border-white 
            "
            ></span>
            <span className="mr-2">sales</span>
          </div>
          <span>{`${valueFormatter(payload[0].value)}`}</span>
        </div>
      </div>
    );
  }

  return null;
};

const valueFormatter = (number: number | bigint) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" }).format(
    number
  );

const CityLineChart = ({ data }: any) => {
  const customTickFormatter = (value: any, index: number) => {
    return index % 2 === 0 ? value : "";
  };

  return (
    <ResponsiveContainer width="100%" height={300} className={"mt-4 pb-2"}>
      <LineChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <CartesianGrid stroke="#1f2937" opacity={0.1} vertical={false} />
        <XAxis
          style={{ paddingBottom: 10 }}
          dataKey="name"
          fontSize={12}
          tickMargin={10}
          tickFormatter={customTickFormatter}
          padding={{ left: 20, right: 20 }}
          color="#1f2937"
          tick={{ fill: "#6b7280" }}
          strokeOpacity={0}
        />
        <YAxis
          fontSize={12}
          tickFormatter={(value) => valueFormatter(value)}
          strokeOpacity={0}
          color="#1f2937"
          width={100}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          verticalAlign="top"
          align="right"
          fontSize={12}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ top: -10 }}
          formatter={(value) => (
            <span className="text-zinc-500 text-sm">{value}</span>
          )}
        />

        <Line
          type="monotone"
          dataKey="sales"
          stroke="#6366f1"
          activeDot={{ r: 4 }}
          strokeWidth={2}
          dot={{ r: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CityLineChart;
