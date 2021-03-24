import React from 'react';
import { ScaleSVG } from '@visx/responsive';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleLinear, scaleBand } from '@visx/scale';
import { AxisLeft, AxisBottom } from '@visx/axis';
import { Text } from '@visx/text';
import { GridRows } from '@visx/grid';
import { format } from 'd3-format';

type Props = {
  data: Datum[];
  width: number;
  height: number;
  margin?: Record<'top' | 'right' | 'bottom' | 'left', number>;
};

type Datum = {
  x: string | number;
  y: number;
};

export const BarChart: React.FC<Props> = ({
  data,
  width,
  height,
  margin = { top: 35, right: 30, bottom: 45, left: 60 },
}) => {
  const xScale = scaleBand({
    range: [margin.left, width - margin.right],
    domain: data.map((d) => d.x),
    round: true,
  });

  const yScale = scaleLinear({
    range: [height - margin.bottom, margin.top],
    domain: [0, Math.max(...data.map((d) => d.y))],
    round: true,
  });

  return (
    <ScaleSVG width={width} height={height}>
      <Group>
        <GridRows
          scale={yScale}
          width={width - margin.left - margin.right}
          left={margin.left}
        />
      </Group>
      <Group>
        <AxisLeft
          scale={yScale}
          left={margin.left}
          hideAxisLine
          hideTicks
          tickFormat={(d) => format('.0f')(d.valueOf() * 100)}
        />
        <Text
          x={margin.left}
          y={margin.top}
          dx="-1em"
          fontSize={10}
          fill="#333"
        >
          %
        </Text>
        <AxisBottom
          scale={xScale}
          top={height - margin.bottom}
          tickValues={data.map((d) => d.x)}
          hideTicks
        />
      </Group>
      <Group>
        {data.map((d, i) => (
          <Bar
            key={'bar-' + i}
            x={xScale(d.x)}
            y={yScale(d.y)}
            width={xScale.bandwidth() - 1}
            height={height - margin.bottom - yScale(d.y)}
            fill="steelblue"
          />
        ))}
      </Group>
    </ScaleSVG>
  );
};
