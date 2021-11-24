import { LinePath, Line } from "@visx/shape";
import { scaleLinear, scaleTime } from "@visx/scale";
import { extent } from "d3-array";
import React, { FC, useMemo, useCallback } from "react";
import { useTooltip, defaultStyles, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";

type ChartData = {
  key: string;
  value: number;
  date: number;
};

const GraphChart: FC<{ chartData: Array<ChartData>; width: number }> = ({ chartData, width }) => {
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
    [chartData, width],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height, 0],
        round: true,
        domain: [0, Math.max(...chartData.map((d) => d.value))],
      }),
    [chartData, height],
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

  const { value } = tooltipData as ChartData;

  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <svg width={width} height={height}>
        <image width={width} height={height} href="bg-gradient-grid.svg" />
        <linearGradient
          id="gradient"
          x1="-6.84708e-06"
          y1="53"
          x2="919"
          y2="52.9999"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2ECE" />
          <stop offset="0.234375" stopColor="#8B2CFF" />
          <stop offset="0.494792" stopColor="#2EEFFF" />
          <stop offset="0.75" stopColor="#4FF970" />
          <stop offset="1" stopColor="#FFEE36" />
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
            {value}
          </TooltipWithBounds>
        </div>
      )}
    </div>
  );
};

export default GraphChart;
