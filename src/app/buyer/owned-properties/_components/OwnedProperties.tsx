/* eslint-disable */
'use client'
import { useProjectStore } from '@/store/project-store'
import { useQuery } from 'convex/react'
import React, { useEffect, useState } from 'react'
import { api } from '../../../../../convex/_generated/api'
import Loading from '@/components/loading'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import Transaction from '@/../public/transaction-minus.svg'
import SMSEdit from '@/../public/sms-edit.png'
import Link from 'next/link'
import { formatPrice } from '@/lib/utils'
import { ChartConfig, ChartContainer, ChartTooltip } from "@/components/ui/chart"
import { PieChart, Pie } from 'recharts';

function OwnedProperties() {
   const selectedProjectId = useProjectStore(state => state.selectedProjectId)
    const [innerRadius, setInnerRadius] = useState<number>(10)
    const deals = useQuery(api.deal.getByUser, {
        projectId: selectedProjectId ?? undefined
    })

    const filteredDeals = deals?.filter(d => d.property?.projectId === selectedProjectId)
    const projects = useQuery(api.projects.get)

    const project = projects?.find(p => p._id === selectedProjectId)

    const chartConfig = {
       
    } satisfies ChartConfig

    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;
        const dynamicRadius = screenWidth < 768 ? 16 : screenWidth < 1024 ? 18 : 22; 
        setInnerRadius(dynamicRadius);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);


    const MonthsTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0];
        return (
        <div className="bg-white p-2 rounded shadow">
            <p>{`${value.toLocaleString()} months`}</p>
        </div>
        );
    }
    return null;
    };
    const AmountTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0];
        return (
        <div className="bg-white p-2 rounded shadow">
            <p>{`₱${value.toLocaleString()}`}</p>
        </div>
        );
    }
    return null;
    };

  return (
    <div>
        <h1 className='text-darkGray font-semibold text-2xl mb-5'> {project?.projectName}</h1>
        <div className="space-y-5">
            {filteredDeals ? filteredDeals.length > 0 ? 
            filteredDeals.map((deal) => (
                <Card key={deal._id}>
                    <CardHeader className='flex flex-row items-center justify-between'>
                        <CardTitle className='text-xl text-black' >Block {deal.property?.block} Lot {deal.property?.lot}</CardTitle>
                        <div className="flex gap-x-3">
                            <Link href={'#'} className='p-0'>
                                <Image src={Transaction} alt='svg image' className='size-4 cursor-pointer'/>
                            </Link>
                            <Link href={'#'} className='p-0'>
                                <Image src={SMSEdit} alt='SMSEdit image' className='size-4 cursor-pointer'/>
                            </Link>
                        </div>
                    </CardHeader>
                    <CardContent className='grid grid-cols-3 '>
                        <div className="grid items-center px-2 md:px-5  lg:px-10">
                            <h3 className='text-xs text-[#4D4F51] font-extralight'>Monthly Amortization</h3>
                            <h1 className='font-medium text-2xl text-black  mt-2 mb-1'>&#8369;{formatPrice(deal.property?.monthlyAmortization ?? 0)}</h1>
                            <Link href={`/buyer/owned-properties/${deal._id}`} className='text-[0.6rem] text-[#085AD8]'>Pay Now</Link>
                        </div>
                      
                        <div className="grid grid-cols-2 gap-x-1 items-center lg:gap-x-3 border-x border-x-[#D9D9D9] px-2 md:px-5 lg:px-10 ">
                            <div className="grid items-center h-full">
                                <h3 className='text-xs text-[#4D4F51] font-extralight '>Months Paid</h3>
                                <h1 className='font-medium text-2xl text-black mt-2 mb-1'>{deal.monthsPaid ?? 0}</h1>
                                <p className='text-[0.6rem] text-[#888888]'>{deal.term - (deal.monthsPaid ?? 0)} mos still to be paid</p>
                            </div>
                        
                            <ChartContainer config={chartConfig} className="self-center relative mx-auto size-16 md:size-20 lg:size-24 ">
                                <PieChart>
                                    <defs>
                                        <linearGradient id="gradientPaid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1EBBFB" />
                                            <stop offset="50%" stopColor="#074AAC" />
                                        </linearGradient>
                                        <linearGradient id="gradientUnpaid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#031E46" />
                                            <stop offset="80%" stopColor="#126F95" />
                                        </linearGradient>
                                    </defs>
                                    <ChartTooltip
                                            cursor={true}
                                            content={<MonthsTooltip />}
                                            
                                        />
                                    <Pie
                                     data={[
                                        { name: "Paid", value: deal.monthsPaid ?? 0, fill: "url(#gradientPaid)" },
                                        { name: "Unpaid", value: deal.term - (deal.monthsPaid ?? 0) ,fill: "url(#gradientUnpaid)" },
                                    ]}
                                        innerRadius={innerRadius}
                                
                                        dataKey="value"
                                        
                                        nameKey="name"
                                        strokeWidth={10}
                                    >

                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </div>
                       
                       
                        <div className="grid grid-cols-2 gap-x-1 items-center lg:gap-x-3  px-2 md:px-5 lg:px-10 ">
                            <div className="grid items-center h-full">
                                <h3 className='text-xs text-[#4D4F51] font-extralight '>Amount Paid</h3>
                                <h1 className='font-medium text-2xl text-black mt-2 mb-1'>&#8369;{formatPrice(deal.downPayment.paid ?? 0)}</h1>
                                <p className='text-[0.6rem] text-[#888888]'>&#8369;{formatPrice( deal.downPayment.unPaid ?? 0)} still to be paid</p>
                            </div>
                        
                            <ChartContainer config={chartConfig} className="self-center relative mx-auto size-16 md:size-20 lg:size-24 ">
                                <PieChart>
                                    <defs>
                                        <linearGradient id="gradientPaid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#1EBBFB" />
                                            <stop offset="50%" stopColor="#074AAC" />
                                        </linearGradient>
                                        <linearGradient id="gradientUnpaid" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#031E46" />
                                            <stop offset="80%" stopColor="#126F95" />
                                        </linearGradient>
                                    </defs>
                                    <ChartTooltip
                                            cursor={true}
                                            content={<AmountTooltip />}
                                            
                                        />
                                    <Pie
                                    data={[
                                        { name: "Paid", value: deal.downPayment.paid ?? 0, fill: "url(#gradientPaid)" },
                                        { name: "Unpaid", value: deal.downPayment.unPaid ?? 0 ,fill: "url(#gradientUnpaid)" },
                                    ]}
                                        innerRadius={innerRadius}
                                
                                        dataKey="value"
                                        
                                        nameKey="name"
                                        strokeWidth={10}
                                    >

                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </div>
                        
                    </CardContent>
                </Card>
            )): (
                <p className='text-[#4D4F51] text-center.'>You have no owned properties in {project?.projectName}.</p>
            ):(
                <Loading/>
            )}
          
        </div>
    </div>
  )
}

export default OwnedProperties