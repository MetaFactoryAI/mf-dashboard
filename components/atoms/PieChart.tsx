import Pie from "@visx/shape/lib/shapes/Pie";
import { useTooltip, defaultStyles } from "@visx/tooltip";
import { Group } from "@visx/group";
import { FC, useState } from "react";

type ChartData = {
  key: string;
  value: number;
  color: string;
};

const PieChart: FC<{ chartData: Array<ChartData>; width: number }> = ({ chartData, width }) => {
  const [active, setActive] = useState<ChartData | null>(null);
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
  const radius = width / 2 - 30;

  const { value, key } = tooltipData as ChartData;

  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={width}>
        <Group top={width / 2} left={width / 2}>
          <Pie
            data={chartData}
            outerRadius={({ data }) => {
              const size = active && active.key === data.key ? radius + 10 : radius - 10;

              return size;
            }}
            innerRadius={({ data }) => {
              const size = active && active.key === data.key ? radius - 130 : radius - 120;

              return size;
            }}
            padAngle={0}
            pieValue={(data) => data.value}
          >
            {(pie) =>
              pie.arcs.map((arc) => {
                const { key: arcKey, color } = arc.data;
                const [x, y] = pie.path.centroid(arc);

                return (
                  <g
                    key={`arc-${arcKey}`}
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
            <strong>{key}</strong>
          </div>
          <div>
            <small>{value}</small>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChart;
