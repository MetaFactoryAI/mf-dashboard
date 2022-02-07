import { Box, Text } from "@chakra-ui/react";
import { timeFormat } from "d3-time-format";
import { LinePath, Line } from "@visx/shape";
import { scaleLinear, scaleTime } from "@visx/scale";
import { extent } from "d3-array";
import React, { FC, useMemo, useCallback, useRef } from "react";
import { useTooltip, TooltipWithBounds } from "@visx/tooltip";
import { localPoint } from "@visx/event";
import useResize from "hooks/useResize";
import useChakraBreakpoints from "@/hooks/useChakraBreakpoints";
import SelectButtons from "./chart/SelectButtons";
import type { ChartTab } from "./chart/SelectButtons";
import { formatNumber } from "@/utils/presentationHelper";

export type ChartData = {
  key: string;
  value: number;
  toolBarTitle?: string;
  date: Date;
};

// produces warnings connected to this issue https://github.com/airbnb/visx/issues/737
const TimeRangeGraphChart: FC<{
  chartData: Array<ChartData>;
  titleText: string;
  titleValue: string;
  titleColor: string;
  selectOptions: ChartTab[];
  handleOptionClickCallback: (key: number) => void;
  selectedOption: number;
}> = ({
  chartData,
  titleText,
  titleValue,
  titleColor,
  selectOptions,
  handleOptionClickCallback,
  selectedOption,
}) => {
  const DESKTOP_RATIO = 0.614;
  const MOBILE_RATIO = 1.147;
  const format = timeFormat("%m/%d/%Y");
  const ref = useRef(null);
  const { isDesktopScreen } = useChakraBreakpoints();
  const currentRatio = isDesktopScreen ? DESKTOP_RATIO : MOBILE_RATIO;
  const yScaleLimit = isDesktopScreen ? 150 : 200;

  const { width, height } = useResize(ref, currentRatio);

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
        range: [height - 20, yScaleLimit],
        round: true,
        domain: [
          Math.min(...chartData.map((d) => d.value)),
          Math.max(...chartData.map((d) => d.value)),
        ],
      }),
    [chartData, height, yScaleLimit],
  );

  const findClosest = (input: Array<number>, element: number): number =>
    input.reduce((a, b) => (Math.abs(b - element) < Math.abs(a - element) ? b : a));

  const handleMouseMove = useCallback(
    (event: React.TouchEvent<SVGRectElement> | React.MouseEvent<SVGRectElement>) => {
      const { x } = localPoint(event) || { x: 0 };

      const currentDate = xScale.invert(x);
      const datesArray = chartData.map((element) => element.date.valueOf());
      const closestDate = findClosest(datesArray, currentDate.valueOf());
      const currentData = chartData.find((element) => element.date.valueOf() === closestDate);

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
      ref={ref}
    >
      <Box position="absolute">
        <Box backgroundColor={titleColor}>
          <Text
            color="white"
            p="18px"
            pb="0px"
            fontFamily="body"
            fontWeight="400"
            fontSize="24px"
            zIndex="8888"
          >
            {titleText}
          </Text>
          <Text
            color="white"
            p="18px"
            pt="0px"
            fontFamily="body_bold"
            fontWeight="800"
            fontSize="32px"
            zIndex="8888"
          >
            {titleValue}
          </Text>
        </Box>
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

      <svg width={width} height={height}>
        <linearGradient
          id="gradientX"
          x1="-1"
          y1="1"
          x2={width}
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2ECE" />
          <stop offset="0.234375" stopColor="#8B2CFF" />
          <stop offset="0.494792" stopColor="#2EEFFF" />
          <stop offset="0.75" stopColor="#4FF970" />
          <stop offset="1" stopColor="#FFEE36" />
        </linearGradient>

        <linearGradient
          id="gradientY"
          x1="1"
          y1={height}
          x2="1"
          y2="-1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2ECE" />
          <stop offset="0.234375" stopColor="#8B2CFF" />
          <stop offset="0.494792" stopColor="#2EEFFF" />
          <stop offset="0.75" stopColor="#4FF970" />
          <stop offset="1" stopColor="#FFEE36" />
        </linearGradient>

        <defs>
          <pattern id="gridX" width={width} height="24" patternUnits="userSpaceOnUse">
            {/* <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E0E0E0" strokeWidth="1" /> */}
            <line y1="0" x2={width} y2="0" stroke="url(#gradientX)" strokeWidth="4" />
          </pattern>
          <pattern id="gridY" width="24" height={height} patternUnits="userSpaceOnUse">
            {/* <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#E0E0E0" strokeWidth="1" /> */}
            <line x1="0" x2="0" y2={height} stroke="url(#gradientY)" strokeWidth="4" />
          </pattern>
        </defs>
        <rect width="100%" height={height} fill="url(#gridX)" opacity="0.25" />
        <rect width="100%" height={height} fill="url(#gridY)" opacity="0.25" />

        <LinePath
          stroke="url(#gradientX)"
          strokeWidth={6}
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
            style={{ position: "absolute", pointerEvents: "none" }}
          >
            <Box background="white" border="4px" borderColor="#00ECFF" p="10px" zIndex="9999">
              <Text fontFamily="body_bold" fontWeight="800" fontSize="24px" color="black">
                ${formatNumber((tooltipData as ChartData).value)}
              </Text>
              <Text fontFamily="body_regular" fontSize="18px">
                {(tooltipData as ChartData).toolBarTitle}
              </Text>
              <Text fontFamily="body" fontSize="14px">
                {format(new Date((tooltipData as ChartData).date))}
              </Text>
            </Box>
          </TooltipWithBounds>
        </div>
      )}
    </div>
  );
};

export default TimeRangeGraphChart;
