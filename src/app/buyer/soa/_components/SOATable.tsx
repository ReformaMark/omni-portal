import React from 'react'
import { Doc} from '../../../../../convex/_generated/dataModel'
import { ColumnDef } from '@tanstack/react-table'
import { Card } from '@/components/ui/card'
import Loading from '@/components/loading'
import { formatDate } from '@/lib/utils'

interface SOATableProps {
    data: Doc<'statementOfAccount'>[]
}

export const soaColumns: ColumnDef<Doc<'statementOfAccount'>>[] = []

function SOATable({data}: SOATableProps) {
  return (
    <div > 
        <div className="grid grid-cols-5 items-center bg-[#EDEDED] py-2 md:py-2 shadow-md">
            <h1 className='uppercase text-[0.5rem] lg:text-sm xl:text-lg font-semibold text-[#888888] text-center'>Date</h1>
            <h1 className='uppercase text-[0.5rem] lg:text-sm xl:text-lg font-semibold text-[#888888] text-center'>Particulars</h1>
            <h1 className='uppercase text-[0.5rem] lg:text-sm xl:text-lg font-semibold text-[#888888] text-center'>Mode of Payment</h1>
            <h1 className='uppercase text-[0.5rem] lg:text-sm xl:text-lg font-semibold text-[#888888] text-center'>Balance</h1>
            <h1 className='uppercase text-[0.5rem] lg:text-sm xl:text-lg font-semibold text-[#888888] text-center'>Amount</h1>
        </div>
        <div className="space-y-2">
            {data ? data.length > 0 ? data.map((soa)=>(
                <Card key={soa._id} className='bg-[#FFFFFF] rounded-sm shadow-sm'>
                    <div className='grid grid-cols-5 items-center text-[0.6rem] text-[#4d4f51] lg:text-sm xl:text-lgtext-center p-0 py-3 md:py-3'>
                        <p>{formatDate(soa._creationTime)}</p>
                        <p>{soa.particulars}</p>
                        <p>{soa.paymentMethod}</p>
                        <p>{soa.remainingBalance}</p>
                        <p>{soa.totalAmountPaid}</p>
                     
                      
                    </div>
                </Card>
            )):(
                <p className='my-10 text-gray-400 text-xs md:text-sm text-center'>No statement of accounts available.</p>
            ):(
                <Loading/>
            )}
        </div>
       
    </div>
  )
}

export default SOATable