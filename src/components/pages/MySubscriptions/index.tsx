'use client';

import { useSearchParams } from 'next/navigation';

import ChartInfo from '@/components/parts/ChartInfo';
import ChartSkeleton from '@/components/parts/ChartInfo/Skeleton';
import { MonthlySpending } from '@/components/parts/ChartInfo/types';
import CostChart from '@/components/parts/CostChart';
import ReactQuery from '@/components/parts/ReactQuery';
import SpendingsChart from '@/components/parts/SpendingsChart';
import SubscriptionTable from '@/components/parts/SubscriptionTable';
import { listColumns, transactionColumns } from '@/components/parts/SubscriptionTable/columns';
import SubscriptionTableSkeleton from '@/components/parts/SubscriptionTable/Skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCostChart, useSpendingsChart } from '@/queries/charts';
import { useAllSubscriptions } from '@/queries/subscriptions';
import { useAllTransactions } from '@/queries/transactions';

const MySubscriptions = () => {
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get('tabs');

  const subscriptionsQuery = useAllSubscriptions();
  const transactionsQuery = useAllTransactions();
  const { data: spendingsChartData, isLoading: spendingsChartLoading } = useSpendingsChart();
  const { data: costChartData, isLoading: costChartLoading } = useCostChart();

  // const transactionYears = [
  //   ...new Set(transactionsQuery?.data?.map((item: Transaction): number => getYear(item.payment_date)))
  // ];

  const transactionYears: number[] = [
    ...new Set(
      spendingsChartData?.chartData?.flatMap((item: MonthlySpending) =>
        Object.keys(item)
          .filter((key) => key !== 'month')
          .map((key) => +key)
      )
    )
  ];

  const lowestYear = Math.min(...transactionYears);
  const filteredYears = transactionYears.filter((year) => year > lowestYear);

  return (
    <section className="col-span-12 rounded-lg">
      <h6 className="font-medium text-primary-80 text-body-lg mb-4 md:text-heading-6">My Subscription</h6>
      <article className="bg-primary-0 px-5 py-2">
        <Tabs defaultValue={selectedTab === 'history' ? selectedTab : 'list'}>
          <TabsList className="mb-6">
            <TabsTrigger value="list" className="font-medium text-body-sm md:text-body-md">
              List of Subscriptions
            </TabsTrigger>
            <TabsTrigger value="history" className="font-medium text-body-sm md:text-body-md">
              Payment History
            </TabsTrigger>
          </TabsList>
          <TabsContent value="list">
            <ReactQuery
              queryResult={subscriptionsQuery}
              render={(subscriptionData) => (
                <SubscriptionTable columns={listColumns} data={subscriptionData} variant="list" />
              )}
              renderLoading={<SubscriptionTableSkeleton />}
            />
          </TabsContent>
          <TabsContent value="history">
            <div className="flex flex-col gap-6 mb-9 lg:grid lg:grid-cols-12">
              <section className="lg:col-span-7">
                {spendingsChartLoading ? (
                  <ChartSkeleton isSpendings />
                ) : (
                  <ChartInfo transactionYears={filteredYears} total="spendings">
                    <SpendingsChart data={spendingsChartData} />
                  </ChartInfo>
                )}
              </section>
              <section className="lg:col-span-5">
                {costChartLoading ? (
                  <ChartSkeleton />
                ) : (
                  <ChartInfo transactionYears={filteredYears} total="cost">
                    <CostChart data={costChartData} />
                  </ChartInfo>
                )}
              </section>
            </div>

            <ReactQuery
              queryResult={transactionsQuery}
              render={(transactionData) => (
                <SubscriptionTable columns={transactionColumns} data={transactionData} variant="transactions" />
              )}
              renderLoading={<SubscriptionTableSkeleton />}
            />
          </TabsContent>
        </Tabs>
      </article>
    </section>
  );
};

export default MySubscriptions;
