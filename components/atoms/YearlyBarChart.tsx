import { Box, Text } from "@chakra-ui/react";
import { timeFormat } from "d3-time-format";
import { Bar } from "@visx/shape";
import { scaleLinear, scaleTime } from "@visx/scale";
import { extent } from "d3-array";
import React, { FC, useMemo, useCallback, useState, useRef, useEffect } from "react";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import useResize from "hooks/useResize";
import { AxisBottom } from "@visx/axis";
import useChakraBreakpoints from "@/hooks/useChakraBreakpoints";
import SelectButtons from "./chart/SelectButtons";
import type { ChartTab } from "./chart/SelectButtons";
import { formatNumber } from "@/utils/presentationHelper";

export type ChartData = {
  key: string;
  value: number;
  date: number;
};

const DEFAULT_BOTTOM_BASE = 30;
const TOP_BASE = 70;
const DESKTOP_RATIO = 0.246;
const MOBILE_RATIO = 1.147;

const YearlyBarChart: FC<{
  chartData: Array<ChartData>;
  title: string;
  selectOptions: ChartTab[];
  handleOptionClickCallback: (key: number) => void;
  selectedOption: number;
}> = ({ chartData, title, selectOptions, handleOptionClickCallback, selectedOption }) => {
  const { isDesktopScreen } = useChakraBreakpoints();
  const [hoverDate, setHoverDate] = useState<number | null>(null);
  const [barWidth, setBarWidth] = useState<number>(0);
  const ref = useRef(null);
  const currentRatio = isDesktopScreen ? DESKTOP_RATIO : MOBILE_RATIO;
  const bottomBase = isDesktopScreen ? DEFAULT_BOTTOM_BASE : 0;
  const { width, height } = useResize(ref, currentRatio);
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
    if (Object.keys(chartData).length < 1) return;

    const currentBarWidth = width / Object.keys(chartData).length - 10;

    if (currentBarWidth > 0 && currentBarWidth) {
      setBarWidth(currentBarWidth);
    }
  }, [chartData, width]);

  const hideHover = () => {
    hideTooltip();
    setHoverDate(null);
  };

  const xScale = useMemo(
    () =>
      scaleTime({
        range: [0 + barWidth / 2, width - barWidth / 2],
        domain: extent(chartData, (d) => d.date) as number[],
      }),
    [barWidth, chartData, width],
  );

  const yScale = useMemo(
    () =>
      scaleLinear({
        range: [height, 0 + TOP_BASE + bottomBase],
        round: true,
        domain: [0, Math.max(...chartData.map((d) => d.value))],
      }),
    [bottomBase, chartData, height],
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
          fontSize={{ base: "24px", sm: "24px", md: "28px", lg: "28px" }}
          zIndex="8888"
        >
          {title}
        </Text>
        <Box display={{ base: "block", sm: "block", md: "none", lg: "none" }} zIndex="8888">
          <SelectButtons
            selectOptions={selectOptions}
            handleOptionClickCallback={handleOptionClickCallback}
            selectedOption={selectedOption}
          />
        </Box>
      </Box>
      <Box
        position="absolute"
        right="0"
        display={{ base: "none", sm: "none", md: "block", lg: "block" }}
      >
        <SelectButtons
          selectOptions={selectOptions}
          handleOptionClickCallback={handleOptionClickCallback}
          selectedOption={selectedOption}
        />
      </Box>
      {chartData.length > 0 && width > 0 && height > 0 && (
        <svg width={width} height={height}>
          <defs>
            <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E0E0E0" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height={height - bottomBase} fill="url(#grid)" />

          {chartData.map((currentData) => {
            const barHeight = height - (yScale(currentData.value) ?? 0);
            const barX = xScale(currentData.date);
            const barY = height - barHeight - bottomBase;

            return (
              <Bar
                key={`bar-${currentData.date}-${xScale(currentData.date)}-${yScale(
                  currentData.value,
                )}`}
                x={barX - barWidth / 2}
                y={barY}
                width={barWidth}
                height={barHeight}
                fill={hoverDate && hoverDate === currentData.date ? "#8B2CFF" : "#D9BAFF"}
              />
            );
          })}
          {isDesktopScreen && (
            <AxisBottom
              top={height - bottomBase}
              scale={xScale}
              // @ts-ignore
              tickFormat={formatDate}
              numTicks={chartData.length}
              stroke=""
              tickStroke="none"
              tickLabelProps={() => ({
                fill: "black",
                fontSize: 9,
                fontWeight: 400,
                textAnchor: "middle",
              })}
            />
          )}

          {chartData.length > 0 && (
            <rect
              width={width}
              height={height - bottomBase}
              opacity="0"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => hideHover()}
              onTouchMove={handleMouseMove}
              onTouchEnd={() => hideHover()}
            />
          )}
        </svg>
      )}
      {tooltipOpen && tooltipData && (
        <div>
          <TooltipWithBounds
            key={Math.random()}
            top={tooltipTop - bottomBase - 100}
            left={tooltipLeft}
            style={{ position: "absolute", pointerEvents: "none" }}
          >
            <Box background="white" border="4px" borderColor="#8B2CFF" p="10px" zIndex="9999">
              <Text fontFamily="body_bold" fontWeight="800" fontSize="24px" color="black">
                $ROBOT
              </Text>
              <Text fontFamily="body_regular" fontSize="18px">
                {formatNumber((tooltipData as ChartData).value)}
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
