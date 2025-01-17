'use client';

import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarDays, ChevronLeft, ChevronRight, CreditCardIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useStep1Form } from '@/context/step1Global';
import { useStep2Form } from '@/context/step2Global';
import { PAYMENT_METHODS } from '@/lib/constants/datas';
import { cn } from '@/lib/utils';
import { step2Schema } from '@/lib/validations/add';

import { StepFormProps } from './types';

const Step2Form = ({ prevData, currentId }: StepFormProps<z.infer<typeof step2Schema>>) => {
  const router = useRouter();
  const appNameGlobal = useStep1Form((state) => state.appName);
  const cycleGlobal = useStep2Form((state) => state.cycle);
  const paymentStartGlobal = useStep2Form((state) => state.paymentStart);
  const paymentEndGlobal = useStep2Form((state) => state.paymentEnd);
  const priceGlobal = useStep2Form((state) => state.price);
  const paymentMethodGlobal = useStep2Form((state) => state.paymentMethod);
  const setCycleGlobal = useStep2Form((state) => state.setCycle);
  const setPaymentStartGlobal = useStep2Form((state) => state.setPaymentStart);
  const setPaymentEndGlobal = useStep2Form((state) => state.setPaymentEnd);
  const setPriceGlobal = useStep2Form((state) => state.setPrice);
  const setPaymentMethodGlobal = useStep2Form((state) => state.setPaymentMethod);

  const step2Form = useForm<z.infer<typeof step2Schema>>({
    resolver: zodResolver(step2Schema)
  });

  function onSubmit(values: z.infer<typeof step2Schema>) {
    setCycleGlobal(values.cycle);
    setPaymentStartGlobal(values.paymentStart);
    setPaymentEndGlobal(values.paymentEnd);
    setPriceGlobal(values.price);
    setPaymentMethodGlobal(values.paymentMethod);

    if (currentId) {
      return router.push(`/edit/${currentId}/step-3`);
    }
    return router.push('/add/step-3');
  }

  useEffect(() => {
    // If you reload the dates will turn into strings
    let typedStartDate: Date | undefined = undefined;
    let typedEndDate: Date | undefined = undefined;

    if (typeof paymentStartGlobal === 'string' || paymentStartGlobal !== undefined) {
      typedStartDate = new Date(paymentStartGlobal);
    } else if (typeof prevData?.paymentStart === 'string') {
      typedStartDate = new Date(prevData?.paymentStart);
    }

    if (typeof paymentEndGlobal === 'string' || paymentEndGlobal !== undefined) {
      typedEndDate = new Date(paymentEndGlobal);
    } else if (typeof prevData?.paymentEnd === 'string') {
      typedEndDate = new Date(prevData?.paymentEnd);
    }

    if (currentId) {
      step2Form.reset({
        cycle: cycleGlobal || prevData?.cycle,
        paymentStart: typedStartDate || prevData?.paymentStart,
        paymentEnd: typedEndDate || prevData?.paymentEnd,
        price: priceGlobal || prevData?.price,
        paymentMethod: paymentMethodGlobal || prevData?.paymentMethod
      });
    } else {
      step2Form.reset({
        cycle: cycleGlobal || prevData?.cycle,
        paymentStart: typedStartDate || new Date(),
        paymentEnd: typedEndDate || new Date(),
        price: priceGlobal || prevData?.price,
        paymentMethod: paymentMethodGlobal || prevData?.paymentMethod
      });
    }

    // if you reload this will trigger because for some reason global state isn't there in the very beginning
    // if (!appNameGlobal) {
    //   router.replace('/dashboard');
    // }
  }, [
    router,
    prevData,
    currentId,
    cycleGlobal,
    paymentStartGlobal,
    paymentEndGlobal,
    priceGlobal,
    paymentMethodGlobal,
    step2Form,
    appNameGlobal
  ]);

  return (
    <Card className="px-6 py-8">
      <Form {...step2Form}>
        <form onSubmit={step2Form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={step2Form.control}
            name="cycle"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-500'>Payment Cycle</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-primary-0 mt-2 capitalize">
                      <SelectValue placeholder={field.value || 'Select cycle'} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="3 months">3 Months</SelectItem>
                    <SelectItem value="6 months">6 Months</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex gap-4">
            <FormField
              control={step2Form.control}
              name="paymentStart"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-500'>Payment Start</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarDays className="ml-auto h-4 w-4 text-primary-40" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={step2Form.control}
              name="paymentEnd"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-500'>Payment End</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn('pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                        >
                          {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                          <CalendarDays className="ml-auto h-4 w-4 text-primary-40" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={step2Form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-500'>Price</FormLabel>
                <FormControl>
                  <div className="flex">
                    <div className="flex items-center text-primary-55 text-body-md gap-4 pl-4 border rounded-l">
                      Rp
                      <Separator orientation="vertical" />
                    </div>

                    <Input type="string" placeholder="0" {...field} className="rounded-l-none" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={step2Form.control}
            name="cycle"
            render={() => (
              <FormItem className="flex flex-col">
                <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-500'>
                  Payment Cycle
                </FormLabel>
                <Button variant="secondary" className="w-1/4">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Payment
                </Button>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* <div className="flex flex-col gap-2">
            <p className="font-medium text-body-md after:content-['*'] after:ml-0.5 after:text-red-500 ">
              Payment Method
            </p>
            <Button type="button" variant="secondary" className="w-1/4">
              <Plus className="mr-2 h-4 w-4" />
              Add Payment
            </Button>
          </div> */}

          <FormField
            control={step2Form.control}
            name="paymentMethod"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className='after:content-["*"] after:ml-0.5 after:text-red-500'>Payment Method</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col lg:grid lg:grid-cols-2 gap-4"
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <Card key={method} className="col-span-1 px-4 py-3">
                        <FormItem className="flex items-start gap-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={method} className="mt-2" />
                          </FormControl>
                          <FormLabel className="leading-normal flex items-center gap-2">
                            {method.split(' ')[1] === 'card' ? (
                              <CreditCardIcon />
                            ) : (
                              <Image src={`/payment-icons/${method}.svg`} alt={method} width={24} height={24} />
                            )}
                            <p className="font-medium text-heading-6 capitalize">{method}</p>
                          </FormLabel>
                        </FormItem>
                      </Card>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2">
            {/* {!currentId ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <> */}
            <Link href={currentId ? `/edit/${currentId}/step-1` : '/add/step-1'}>
              <Button type="button" variant="secondary">
                <ChevronLeft className="w-4 h-4 mr-2" />
                Prev
              </Button>
            </Link>
            {/* </>
            )} */}

            <Button type="submit">
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};

export default Step2Form;
