
// src/components/Timeline.tsx 

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ProcessedDataItem } from '../utils/processData';

interface TimelineProps {
  data: ProcessedDataItem[];
  fonteKeys: string[];
}

const Timeline: React.FC<TimelineProps> = ({ data, fonteKeys }) => {

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];
  const areaKeys = Object.keys(data[0]).filter(key => key !== 'data');

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="data" />
        <YAxis />
        <Tooltip />
        <Legend />
        {areaKeys.map((key, index) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stackId="1"
            stroke={colors[index % colors.length]}
            fill={colors[index % colors.length]}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default Timeline;