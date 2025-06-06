"use client";

import { useEffect, useRef, useState } from "react";
import { Noise } from "@/components/backgrounds/noise";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

const chartConfig = {
  total: {
    label: "Total Balance",
    color: "#2563eb",
  },
  emergencyFund: {
    label: "Emergency Fund",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

export function TrendsGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number | null>(null);

  // Helper to generate last 12 months with 10% total growth per month
  const getLast12MonthsChartData = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const now = new Date();
    const data = [];
    let total = 250000;
    const emergencyFund = 128000;
    const emergencyFundRatio = emergencyFund / total;
    // Go back 11 months from now (so current month is last in array)
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      data.push({
        month: monthNames[d.getMonth()],
        total: Math.round(total),
        emergencyFund: Math.round(total * emergencyFundRatio),
      });
      total *= 1.1;
    }
    return data;
  };

  const chartData = getLast12MonthsChartData();

  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.clientHeight - 80;
        setContainerHeight(height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div className="sh-default w-full rounded-sm border border-gray-300/90 bg-gray-50/80 md:w-3/4 dark:border-gray-600/60 dark:bg-[hsl(218,_13%,_6%,_.95)]">
      <Noise variant="lighter" />
      <div className="grid-border-color relative flex divide-x-0 divide-y divide-blue-200/50 border-b p-4 sm:divide-x sm:divide-y-0 dark:divide-blue-300/8">
        <ToggleGroup type="multiple" value={["all"]}>
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="total-balance">Total Balance</ToggleGroupItem>
          <ToggleGroupItem value="emergency-fund">
            Emergency fund
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div ref={containerRef} className="h-full min-h-[200px]">
        {containerHeight && (
          <ChartContainer
            config={chartConfig}
            className="!aspect-auto min-h-[0px] w-full"
            style={{ height: `${containerHeight}px` }}
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: -40,
                right: 20,
                top: 40,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={-8}
                textAnchor="start"
                dy={-8}
                tickCount={3}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Area
                dataKey="total"
                type="natural"
                fill="var(--color-total)"
                fillOpacity={0.4}
                stroke="var(--color-total)"
                stackId="a"
              />
              <Area
                dataKey="emergencyFund"
                type="natural"
                fill="var(--color-emergencyFund)"
                fillOpacity={0.4}
                stroke="var(--color-emergencyFund)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </div>
    </div>
  );
}
