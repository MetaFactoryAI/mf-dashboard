import Pie from "@visx/shape/lib/shapes/Pie";
import { useTooltip, defaultStyles, Tooltip, TooltipWithBounds } from "@visx/tooltip";
import { Group } from "@visx/group";
import { FC, useState } from "react";

type ChartData = {
  key: string;
  value: number;
  color: string;
}

// this is only POC (proof of concept) for now
const PieChart: FC = () => {
  const [active, setActive] = useState<ChartData | null>(null);
  const chartData = [
    { key: "TEST", value: 10, color: "#4FF970" },
    { key: "TEST2", value: 20, color: "#FF2ECE" },
    { key: "TEST3", value: 30, color: "#89F6FF" },
  ];

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

  const width = 600;

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={width}>
        <Group top={width / 2} left={width / 2}>
          <Pie
            data={chartData}
            outerRadius={({ data }) => {
              const size = active && active.key === data.key ? 260 : 250;

              return size;
            }}
            innerRadius={({ data }) => {
              const size = active && active.key === data.key ? 130 : 140;

              return size;
            }}
            padAngle={0}
            pieValue={(data) => data.value}
          >
            {(pie) =>
              pie.arcs.map((arc) => {
                const { key, color } = arc.data;
                const [x, y] = pie.path.centroid(arc);

                return (
                  <g
                    key={`arc-${key}`}
                    onMouseEnter={() => {
                      setActive(arc.data);
                      showTooltip({
                        tooltipData: arc.data,
                        tooltipLeft: x,
                        tooltipTop: y,
                      });
                    }}
                    onMouseLeave={() => {
                      setActive(null);
                      hideTooltip();
                    }}
                  >
                    <path d={pie.path(arc)} stroke="#000" fill={color} strokeWidth="1px" />
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
          }}
        >
          <div>
            <strong>{tooltipData.key}</strong>
          </div>
          <div>
            <small>{tooltipData.value}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChart;
