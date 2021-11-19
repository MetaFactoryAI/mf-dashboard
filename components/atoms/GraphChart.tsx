import { LinePath, Line } from "@visx/shape";
import { scaleLinear, scaleTime } from "@visx/scale";
import { Grid } from "@visx/grid";
import { LinearGradient } from "@visx/gradient";
import { extent } from "d3-array";
import React, { FC, useState, useMemo, useCallback } from "react";
import { useTooltip, defaultStyles, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";

type ChartData = {
  key: string;
  value: number;
  x: number;
}

// this is only POC (proof of concept) for now
const GraphChart: FC = () => {
  const [active, setActive] = useState<ChartData | null>(null);
  const sampleDate = new Date();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartData = [
    { key: "TEST", value: 0, date: new Date().setDate(sampleDate.getDate() + 1) },
    { key: "TEST", value: 10, date: new Date().setDate(sampleDate.getDate() + 2) },
    { key: "TEST2", value: 20, date: new Date().setDate(sampleDate.getDate() + 3) },
    { key: "TEST3", value: 30, date: new Date().setDate(sampleDate.getDate() + 4) },
    { key: "TEST", value: 40, date: new Date().setDate(sampleDate.getDate() + 5) },
    { key: "TEST2", value: 20, date: new Date().setDate(sampleDate.getDate() + 6) },
    { key: "TEST3", value: 60, date: new Date().setDate(sampleDate.getDate() + 7) },
    { key: "TEST", value: 10, date: new Date().setDate(sampleDate.getDate() + 8) },
    { key: "TEST2", value: 80, date: new Date().setDate(sampleDate.getDate() + 9) },
    { key: "TEST3", value: 70, date: new Date().setDate(sampleDate.getDate() + 10) },
    { key: "TEST", value: 60, date: new Date().setDate(sampleDate.getDate() + 11) },
    { key: "TEST2", value: 50, date: new Date().setDate(sampleDate.getDate() + 12) },
    { key: "TEST3", value: 30, date: new Date().setDate(sampleDate.getDate() + 13) },
    { key: "TEST", value: 100, date: new Date().setDate(sampleDate.getDate() + 14) },
    { key: "TEST2", value: 120, date: new Date().setDate(sampleDate.getDate() + 15) },
    { key: "TEST3", value: 130, date: new Date().setDate(sampleDate.getDate() + 16) },
  ];

  const width = 860;
  const height = 0.614 * width;

  const {
    showTooltip,
    hideTooltip,
    tooltipOpen,
    tooltipData,
    tooltipLeft = 0,
    tooltipTop = 0,
  } = useTooltip({
    // initial tooltip state
    tooltipOpen: false,
  });

  const xScale = useMemo(
    () =>
      scaleTime({
        range: [0, width],
        domain: extent(chartData, (d) => d.date.valueOf()) as number[],
      }),
    [chartData],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height, 0],
        round: true,
        domain: [0, Math.max(...chartData.map((d) => d.value))],
      }),
    [chartData],
  );

  const findClosest = (input: Array<number>, element: number): number =>
    input.reduce((a, b) => (Math.abs(b - element) < Math.abs(a - element) ? b : a));

  const handleMouseMove = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x } = localPoint(event) || { x: 0 };

      const currentDate = xScale.invert(x);
      const datesArray = chartData.map((element) => element.date);
      const closestDate = findClosest(datesArray, currentDate.valueOf());
      const currentData = chartData.find((element) => element.date === closestDate);

      if (currentData !== undefined) {
        showTooltip({
          tooltipData: currentData,
          tooltipLeft: xScale(currentData.date),
          tooltipTop: yScale(currentData.value) ?? 0,
        });
      }
    },
    [chartData, showTooltip, xScale, yScale],
  );

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <svg width={width} height={height}>
        <image width={width} height={height} href="bg-gradient-grid.svg" />
        {/* <LinearGradient id="gradient" from="#FF00FF" to="#ffff00" vertical={false} /> */}
        <linearGradient
          id="gradient"
          x1="-6.84708e-06"
          y1="53"
          x2="919"
          y2="52.9999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2ECE" />
          <stop offset="0.234375" stopColor="#8B2CFF"/>
          <stop offset="0.494792" stopColor="#2EEFFF"/>
          <stop offset="0.75" stopColor="#4FF970"/>
          <stop offset="1" stopColor="#FFEE36"/>
        </linearGradient>
        <LinePath
          stroke="url(#gradient)"
          strokeWidth={4}
          data={chartData}
          x={(d) => xScale(d.date) ?? 0}
          y={(d) => yScale(d.value) ?? 0}
        />
        <g>
          <Line
            from={{ x: tooltipLeft, y: tooltipTop - 50 }}
            to={{ x: tooltipLeft, y: height }}
            stroke="black"
            strokeWidth={2}
            pointerEvents="none"
            strokeDasharray="2,2"
          />
          <rect
            x={tooltipLeft}
            y={tooltipTop}
            transform="translate(-5 -5)"
            width="10"
            height="10"
            fill="black"
            pointerEvents="none"
          />
        </g>
        <rect
          width={width}
          height={height}
          opacity="0"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => hideTooltip()}
          onTouchMove={handleMouseMove}
          onTouchEnd={() => hideTooltip()}
        />
      </svg>

      {tooltipOpen && tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop}
            left={tooltipLeft}
            style={{ ...defaultStyles }}
          >
            {tooltipData.value}
          </TooltipWithBounds>
        </div>
      )}
    </div>
  );
};

export default GraphChart;
