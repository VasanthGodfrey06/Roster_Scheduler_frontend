import React from 'react';

import { ResponsiveContainer, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const colors = scaleOrdinal(schemeCategory10).range();

const data = [
  // {
  //   name: 'April',
  //   hours: 2400
  // },
  // {
  //   name: 'May',
  //   hours: 1398
  // },
  // {
  //   name: 'June',
  //   hours: 9800
  // },
  // {
  //   name: 'July',
  //   hours: 3908
  // },
  // {
  //   name: 'Augest',
  //   hours: 4800
  // },
  // {
  //   name: 'Septemper',
  //   hours: 3800
  // },
  // {
  //   name: 'Septemper',
  //   hours: 3800
  // },
  // {
  //   name: 'Septemper',
  //   hours: 3800
  // },
  // {
  //   name: 'Augest',
  //   hours: 4800
  // },
  // {
  //   name: 'Septemper',
  //   hours: 3800
  // },
  // {
  //   name: 'Septemper',
  //   hours: 3800
  // },
  // {
  //   name: 'Septemper',
  //   hours: 3800
  // }
];

const getPath = (x, y, width, height) => `M${x},${y + height}
          C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
          C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${
  y + height
}
          Z`;

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke='none' fill={fill} />;
};

const WithCustomShape = ({ datas }) => {
  var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  datas.map((index) => {
    index.month = months[index.month - 1];
  });
  return (
    <ResponsiveContainer height={300} width={'100%'}>
      <BarChart
        height={300}
        data={datas}
        margin={{
          top: 20
        }}
      >
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' />
        <YAxis />
        <Bar dataKey='work_hrs' fill='#8884d8' shape={<TriangleBar />} label={{ position: 'top' }}>
          {datas.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WithCustomShape;
