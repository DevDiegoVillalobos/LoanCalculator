"use client";
import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import * as z from "zod"
import { Button } from './ui/button';

// Validation schema definition
const formSchema = z.object({
  amountMortg: z
    .number()
    .positive({ message: 'Amount of the mortgage must be a positive number.' }),
  interestRate: z
    .number()
    .positive({ message: 'Interest rate must be a positive number.' })
    .max(100.00, { message: 'Interest rate must be less than or equal to 100.0' }),
  loanTerm: z
    .number()
    .positive({ message: 'Loan term must be a positive number.' })
    .int({ message: 'Loan term must be an integer.' }),
});

// Component properties
interface MortgageCalculatorProps {
  amountMortg: number;
  interestRate: number;
  loanTerm: number;
  displayButton?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

// Main component
const MortgageCalculator: React.FC<MortgageCalculatorProps> = ({
  amountMortg: initialPrincipal,
  interestRate: initialInterestRate,
  loanTerm: initialLoanTerm,
  displayButton = true,
  buttonText = 'Redirect to another Page',
  buttonLink = '/',
}) => {
  // Local states
  const [amountMortg, setAmountMortg] = useState(initialPrincipal);
  const [interestRate, setInterestRate] = useState(initialInterestRate);
  const [loanTerm, setLoanTerm] = useState(initialLoanTerm);
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  // UseEffect for calculating monthly payment
  useEffect(() => {
    calculateMonthlyPayment();
  }, [amountMortg, interestRate, loanTerm]);

  // Form handling with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amountMortg: initialPrincipal,
      interestRate: initialInterestRate,
      loanTerm: initialLoanTerm,
    },
  });

  // Form submission handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  // Monthly payment calculation function
  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = interestRate / 1200;
    const totalPayments = loanTerm * 12;

    const numerator =
      amountMortg * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalPayments);
      
    const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;

    const payment = numerator / denominator;

    setMonthlyPayment(isFinite(payment) ? payment : null);
  };

  // Handlers for form field changes
  const handleAmountMortgChange = (value: number) => {
    setAmountMortg(value);
    form.setValue('amountMortg', value);
    form.handleSubmit(onSubmit)();
  };

  const handleInterestRateChange = (value: number) => {
    setInterestRate(value);
    form.setValue('interestRate', value);
    form.handleSubmit(onSubmit)();
  };

  const handleLoanTermChange = (value: number) => {
    setLoanTerm(value);
    form.setValue('loanTerm', value);
    form.handleSubmit(onSubmit)();
  };

  return (
    <Card className="w-full shadow-md dark:shadow-xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
        <CardHeader className='justify-self-center'>
          <CardTitle>Mortgage Calculator</CardTitle>
        </CardHeader>
        <div className=" items-center justify-center gap-4 p-4 bg-gray-100 dark:bg-gray-800">
          {monthlyPayment !== null ? (
            <div className="text-2xl font-bold overflow-hidden ">
              Monthly Payment: ${monthlyPayment.toFixed(2)}
            </div>
          ) : null}
        </div>
      </div>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4">
            <FormField
              control={form.control}
              name="amountMortg"
              render={({ field }) => (
                <FormItem className='sm:pt-2 md:pt-4'>
                  <FormLabel>Amount of the mortgage *</FormLabel>
                  <FormControl>
                    <Input
                      id="amountMortg"
                      type="number"
                      defaultValue={amountMortg}
                      onChange={(e) => handleAmountMortgChange(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormDescription>Principal loan amount</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interestRate"
              render={({ field }) => (
                <FormItem className='sm:pt-2 md:pt-4'>
                  <FormLabel>Annual Interest rate *</FormLabel>
                  <FormControl>
                    <Input
                      id="interestRate"
                      type="number"
                      defaultValue={interestRate}
                      onChange={(e) => handleInterestRateChange(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="loanTerm"
              render={({ field }) => (
                <FormItem className='sm:pt-2 md:pt-4'>
                  <FormLabel>Loan term (years) *</FormLabel>
                  <FormControl>
                    <Input
                      id="loanTerm"
                      type="number"
                      defaultValue={loanTerm}
                      onChange={(e) => handleLoanTermChange(parseFloat(e.target.value))}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="justify-self-end md:justify-self-start lg:justify-self-end self-end">
              {displayButton && <a href={buttonLink}><Button type='button'> {buttonText}</Button></a>}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;
