// components/CityBarChart.tsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
  Legend,
  LabelList,
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

import { CircleBackslashIcon } from "@radix-ui/react-icons";

// Define your own Tooltip component
const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="text-sm shadow-lg rounded-lg bg-gray-800 text-white p-3 w-42 h-48">
        <div className="flex justify-center">
          <img src="https://picsum.photos/200" className="w-28 h-28 rounded" />
        </div>
        <p className="font-bold">{label}</p>
        <p>{`Sales: ${valueFormatter(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

const valueFormatter = (number: number | bigint) =>
  new Intl.NumberFormat("sv-SE", { style: "currency", currency: "SEK" }).format(
    number
  );

const CityBarChart = ({ data }: any) => {
  const customTickFormatter = (value: any, index: number) => {
    // Show the first and third bars' names and so on
    return index % 2 === 0 ? value : "";
  };
  const CustomizedLabel = (props: any) => {
    const { x, y, width, height, value } = props;
    const radius = 10;

    return (
      <g>
        <circle cx={x + width / 2} cy={y - radius} r={radius} fill="#6366f1" />
        <text
          x={x + width / 2}
          y={y - radius}
          fill="#fff"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {value}
        </text>
      </g>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300} className={"mt-4 pb-2"}>
      <BarChart
        data={data}
        margin={{ top: 10, right: 10, left: 10, bottom: 20 }}
      >
        <CartesianGrid stroke="#ccc" opacity={0.2} vertical={false} />
        <XAxis
          dataKey="name"
          fontSize={12}
          strokeOpacity={0}
          tickFormatter={customTickFormatter}
          padding={{ left: 20, right: 20 }}
        />
        <YAxis
          strokeOpacity={0}
          fontSize={12}
          tickFormatter={(value) => valueFormatter(value)}
          width={100}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "transparent" }} />
        <Legend
          verticalAlign="top"
          align="right"
          fontSize={12}
          iconType="circle"
          iconSize={8}
          wrapperStyle={{ top: -10, color: "#000" }}
          formatter={(value, entry, index) => {
            return (
              <span
                className="text-gray-500 text-sm
            "
              >
                {value}
              </span>
            );
          }}
        />
        <Bar
          dataKey="sales"
          fill="#6366f1"
          radius={[5, 5, 0, 0]}
          barSize={33}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CityBarChart;
