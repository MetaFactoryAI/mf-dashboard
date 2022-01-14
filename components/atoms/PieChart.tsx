import { Box, HStack, VStack, Text, Center } from "@chakra-ui/react";
import Pie from "@visx/shape/lib/shapes/Pie";
import { useTooltip, defaultStyles } from "@visx/tooltip";
import { Group } from "@visx/group";
import { FC, useState, useRef, useEffect } from "react";
import useResize from "hooks/useResize";
import Image from "next/image";
import { formatNumber } from "@/utils/presentationHelper";

type ChartData = {
  key: string;
  value: number;
  color: string;
  avatarSrc: string;
};

type TooltipData = ChartData & { piePercentage: number };

// produces warnings connected to this issue https://github.com/airbnb/visx/issues/737
const PieChart: FC<{ chartData: Array<ChartData> }> = ({ chartData }) => {
  const [active, setActive] = useState<ChartData | null>(null);
  const [radius, setRadius] = useState<number>(0);
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
  const containerBoxRef = useRef(null);
  const { width } = useResize(containerBoxRef, 1);

  useEffect(() => {
    const radiusGap = width * 0.075;

    setRadius(width / 2 - radiusGap);
  }, [width]);

  return (
    <Center
      width="100%"
      backgroundImage="linear-gradient(to right, #E0E0E0 1px, transparent 1px), linear-gradient(to bottom, #E0E0E0 1px, transparent 1px);"
      backgroundSize="24px 24px"
    >
      <Box width="100%" maxWidth="400px">
        <Box width="100%" height="100%" style={{ position: "relative" }} ref={containerBoxRef}>
          <svg width={width} height={width}>
            <Group top={width / 2} left={width / 2}>
              <Pie
                data={chartData}
                outerRadius={({ data }) => {
                  const outerRatio = width * 0.04;
                  const size =
                    active && active.key === data.key ? radius + outerRatio : radius - outerRatio;

                  return size;
                }}
                innerRadius={({ data }) => {
                  const outerRatio = width * 0.04;
                  const innerRatio2 = width * 0.3;
                  const innerRatio1 = innerRatio2 + outerRatio;
                  const size =
                    active && active.key === data.key ? radius - innerRatio1 : radius - innerRatio2;

                  return size;
                }}
                padAngle={0}
                pieValue={(data) => data.value}
              >
                {(pie) =>
                  pie.arcs.map((arc) => {
                    const { key: arcKey, color } = arc.data;
                    const [x, y] = pie.path.centroid(arc);
                    const piePercentage = ((arc.endAngle - arc.startAngle) * 100) / (Math.PI * 2);

                    return (
                      <g
                        key={`arc-${arcKey}`}
                        onMouseEnter={() => {
                          setActive(arc.data);
                          showTooltip({
                            tooltipData: { ...arc.data, piePercentage },
                            tooltipLeft: x,
                            tooltipTop: y,
                          });
                        }}
                        onMouseLeave={() => {
                          setActive(null);
                          hideTooltip();
                        }}
                      >
                        <path d={pie.path(arc) ?? ""} stroke="#000" fill={color} strokeWidth="1px" />
                      </g>
                    );
                  })
                }
              </Pie>
            </Group>
          </svg>

          {tooltipOpen && tooltipData && (
            <div
              className="tooltip"
              style={{
                ...defaultStyles,
                position: "absolute",
                top: tooltipTop + width / 2,
                left: tooltipLeft + width / 2,
                pointerEvents: "none",
                background: "#fff",
                transform: "translate(-50%, -50%)",
                borderRadius: "0px",
                border: "2px",
                borderColor: "#03DDEF",
                margin: "0px",
                padding: "0px",
              }}
            >
              <Box border="2px" borderColor="#03DDEF">
                <HStack p="12px">
                  <Box minWidth="40px" minHeight="40px">
                    <Image
                      src={(tooltipData as TooltipData).avatarSrc}
                      alt=""
                      width="40px"
                      height="40px"
                    />
                  </Box>
                  <VStack>
                    <Text alignSelf="start" color="black" fontSize="14px" fontFamily="body_regular">
                      {(tooltipData as ChartData).key}
                    </Text>
                    <HStack spacing="0px">
                      <Text
                        alignSelf="start"
                        color="black"
                        fontSize="18px"
                        fontFamily="body_regular"
                      >
                        {formatNumber((tooltipData as TooltipData).value)}&nbsp;|&nbsp;
                      </Text>
                      <Text color="black" fontSize="18px">
                        {formatNumber((tooltipData as TooltipData).piePercentage)}%
                      </Text>
                      <Text />
                    </HStack>
                  </VStack>
                </HStack>
              </Box>
            </div>
          )}
        </Box>
      </Box>
    </Center>
  );
};

export default PieChart;
