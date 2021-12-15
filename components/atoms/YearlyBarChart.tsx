import { Box, Text, Button } from "@chakra-ui/react";
import { timeFormat } from "d3-time-format";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleTime } from "@visx/scale";
import { extent } from "d3-array";
import React, { FC, useMemo, useCallback, useState, useRef, useEffect } from "react";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import useResize from "hooks/useResize";
import { AxisBottom } from "@visx/axis";

export type ChartData = {
  key: string;
  value: number;
  date: number;
};

const BOTTOM_BASE = 30;
const TOP_BASE = 70;

const YearlyBarChart: FC<{
  chartData: Array<ChartData>;
  startYear: number;
  years: number[];
  title: string;
  yearSelectedCallback: (year: number) => void;
}> = ({ chartData, startYear, years, title, yearSelectedCallback }) => {
  const [hoverDate, setHoverDate] = useState<number | null>(null);
  const [barWidth, setBarWidth] = useState<number>(0);
  const [year, setYear] = useState<number>(startYear);
  const ref = useRef(null);
  const { width, height } = useResize(ref, 0.246);
  const format = timeFormat("%B / %Y");
  // @ts-ignore
  const formatDate = (date: number) => format(new Date(date)) as Date;
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

  useEffect(() => {
    const currentBarWidth = width / Object.keys(chartData).length - 10;

    if (currentBarWidth > 0) {
      setBarWidth(currentBarWidth);
    }
  }, [chartData, width]);

  const hideHover = () => {
    hideTooltip();
    setHoverDate(null);
  };

  const handleYearClick = (currentYear: number) => {
    setYear(currentYear);
    yearSelectedCallback(currentYear);
  };

  const xScale = useMemo(
    () =>
      scaleTime({
        range: [0 + barWidth / 2, width - barWidth / 2],
        domain: extent(chartData, (d) => d.date.valueOf()) as number[],
      }),
    [barWidth, chartData, width],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height, 0 + TOP_BASE + BOTTOM_BASE],
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

      setHoverDate(closestDate);

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
    <Box width="100%" height="100%" ref={ref} position="relative">
      <Box position="absolute">
        <Text
          backgroundColor="black"
          color="white"
          p="18px"
          fontFamily="body_bold"
          fontWeight="800"
          fontSize="28px"
          zIndex="9999"
        >
          {title}
        </Text>
      </Box>
      <Box position="absolute" right="0">
        {years.map((currentYear) => (
          <Button
            _focus={{ boxShadow: "none" }}
            onClick={() => handleYearClick(currentYear)}
            variant="unstyled"
            zIndex="9999"
            key={`yearly_bar_chart_years_buttons_${currentYear}`}
          >
            <Text
              px="13px"
              py="8px"
              background={currentYear === year ? "yellow" : "black"}
              color={currentYear === year ? "black" : "white"}
              key={`yearly_bar_chart_years_buttons_text_${currentYear}`}
            >
              {currentYear}
            </Text>
          </Button>
        ))}
      </Box>
      <svg width={width} height={height}>
        <defs>
          <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E0E0E0" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height={height - BOTTOM_BASE} fill="url(#grid)" />

        {chartData?.map((currentData) => {
          const barHeight = height - (yScale(currentData.value) ?? 0);
          const barX = xScale(currentData.date);
          const barY = height - barHeight - BOTTOM_BASE;
          return (
            <Bar
              key={`bar-${currentData.date}`}
              x={barX - barWidth / 2}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={hoverDate && hoverDate === currentData.date ? "#8B2CFF" : "#D9BAFF"}
            />
          );
        })}
        <AxisBottom
          top={height - BOTTOM_BASE}
          scale={xScale}
          // @ts-ignore
          tickFormat={formatDate}
          stroke=""
          tickStroke="yellow"
          tickLabelProps={() => ({
            fill: "black",
            fontSize: 9,
            fontWeight: 400,
            textAnchor: "middle",
          })}
        />

        {chartData.length > 0 && (
          <rect
            width={width}
            height={height - BOTTOM_BASE}
            opacity="0"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => hideHover()}
            onTouchMove={handleMouseMove}
            onTouchEnd={() => hideHover()}
          />
        )}
      </svg>

      {tooltipOpen && tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop - BOTTOM_BASE}
            left={tooltipLeft}
            style={{ position: "absolute", pointerEvents: "none" }}
          >
            <Box background="white" border="2px" borderColor="#8B2CFF" p="10px">
              <Text fontFamily="body_bold" fontWeight="800" fontSize="24px" color="black">
                $ROBOT
              </Text>
              <Text fontFamily="body_regular" fontSize="18px">
                {(tooltipData as ChartData).value}
              </Text>
              <Text fontFamily="body" fontSize="14px">
                {format(new Date((tooltipData as ChartData).date))}
              </Text>
            </Box>
          </TooltipWithBounds>
        </div>
      )}
    </Box>
  );
};

export default YearlyBarChart;
