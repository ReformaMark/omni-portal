'use client'
import { usePropertyStore } from '@/store/property-store'
import { useQuery } from 'convex/react'
import React from 'react'
import { api } from '../../../../../convex/_generated/api'
import { formatPrice } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {  Printer } from 'lucide-react'
import SOATable from './SOATable'

function StatementOfAccountsList() {
     const selectedPropertyId = usePropertyStore(state => state.selectedPropertyId)

     const statementOfAccounts = useQuery(api.statementOfAccount.get, {propertyId: selectedPropertyId ?? undefined})
     const property = useQuery(api.deal.getPropertyById, {propertyId: selectedPropertyId ?? undefined})
     console.log(selectedPropertyId)


  return (
    <div>
        <div className="grid grid-cols-3 justify-between items-center mb-3">
            <h3 className='text-[0.6rem] text-center md:text-left lg:text-[1rem] xl:text-lg font-poppins font-semibold uppercase text-[#A1A7AE]'>TOTAL SELLING PRICE: <span className='md:ml-3 text-black text-lg xl:text-xl'>₱{formatPrice(property?.dealPrice ?? 0)}</span></h3>
            <h3 className='text-[0.6rem] text-right md:text-left lg:text-[1rem] xl:text-lg font-poppins font-semibold uppercase text-[#A1A7AE]'>MONTHLY AMORTIZATION: <span className='text-right md:text-left md:ml-3 text-black text-lg xl:text-xl'>₱{formatPrice(property?.monthlyAmortization ?? 0)}</span></h3>
            <div className="flex justify-end">
                <Button
                    variant="default"
                    className="rounded-md max-md:w-[25%] md:w-fit"
                    onClick={() => {}}
                    >
                    <Printer />
                    <span className="hidden md:block">
                        Print SOA
                    </span>
                </Button>
            </div>
        </div>
        <SOATable data={statementOfAccounts ?? []}/>
    </div>
  )
}

export default StatementOfAccountsList