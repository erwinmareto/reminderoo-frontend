'use client';

import { getMonth } from 'date-fns';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Transaction } from '@/components/parts/SubscriptionTable/types';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';
import { MONTHS } from '@/lib/constants/datas';

export interface SpendingsChartProps {
  data?: Transaction[];
  selectedYear?: number;
  // eslint-disable-next-line no-unused-vars
  selectedYearTotalHandler?: (total: number) => void;
  // eslint-disable-next-line no-unused-vars
  prevYearTotalHandler?: (total: number) => void;
}

const SpendingsChart = ({
  data,
  selectedYear,
  selectedYearTotalHandler,
  prevYearTotalHandler
}: SpendingsChartProps) => {
  const selectedYearData = data?.filter(
    (transaction) => new Date(transaction.paymentDate).getFullYear() === selectedYear
  );

  const selectedYearTotal = data?.reduce((total, transactions) => {
    const year = new Date(transactions.paymentDate).getFullYear();
    if (selectedYear === year) {
      return total + transactions.pricing;
    }
    return total;
  }, 0);

  const prevYearData = data?.filter(
    (transaction) => new Date(transaction.paymentDate).getFullYear() === (selectedYear as number) - 1
  );

  const prevYearTotal = data?.reduce((total, transactions) => {
    const year = new Date(transactions.paymentDate).getFullYear();
    if ((selectedYear as number) - 1 === year) {
      return total + transactions.pricing;
    }
    return total;
  }, 0);

  const chartData = MONTHS.map((month, monthIndex) => {
    const year1 = selectedYearData?.reduce((total, transaction) => {
      if (getMonth(transaction.paymentDate) === monthIndex) {
        return total + transaction.pricing;
      }
      return total;
    }, 0);
    const year2 = prevYearData?.reduce((total, transaction) => {
      if (getMonth(transaction.paymentDate) === monthIndex) {
        return total + transaction.pricing;
      }
      return total;
    }, 0);

    return {
      month,
      year1,
      year2
    };
  });

  const chartConfig = {
    year1: {
      label: selectedYear,
      color: '#4336f3'
    },
    year2: {
      label: (selectedYear as number) - 1,
      color: '#ecebff'
    }
  } satisfies ChartConfig;

  selectedYearTotalHandler && selectedYearTotalHandler(selectedYearTotal ?? 2);
  prevYearTotalHandler && prevYearTotalHandler(prevYearTotal ?? 45);

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <AreaChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          interval="preserveStartEnd"
        />
        <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
        <defs>
          <linearGradient id="secondary-400-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-year1)" stopOpacity={0.8} />
            <stop offset="95%" stopColor="var(--color-year2)" stopOpacity={0.1} />
          </linearGradient>
          <linearGradient id="secondary-0-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-year2)" stopOpacity={0.2} />
            <stop offset="95%" stopColor="var(--color-year2)" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <ChartLegend content={<ChartLegendContent />} />

        <Area dataKey="year2" fill="url(#secondary-0-gradient)" strokeWidth={3} stroke="var(--color-year2)" />
        <Area dataKey="year1" fill="url(#secondary-400-gradient)" strokeWidth={3} stroke="var(--color-year1)" />
      </AreaChart>
    </ChartContainer>
  );
};
export default SpendingsChart;
