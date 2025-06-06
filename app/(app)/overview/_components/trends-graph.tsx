import { Noise } from "@/components/backgrounds/noise";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function TrendsGraph() {
  return (
    <div className="sh-default w-full rounded-sm border border-gray-300/90 bg-gray-50/80 md:w-3/4 dark:border-gray-600/60 dark:bg-[hsl(218,_13%,_6%,_.95)]">
      <Noise variant="lighter" />
      <div className="grid-border-color relative flex divide-x-0 divide-y divide-blue-200/50 border-b p-4 sm:divide-x sm:divide-y-0 dark:divide-blue-300/8">
        <ToggleGroup type="multiple">
          <ToggleGroupItem value="all">All</ToggleGroupItem>
          <ToggleGroupItem value="total-balance">Total Balance</ToggleGroupItem>
          <ToggleGroupItem value="emergency-fund">
            Emergency fund
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
