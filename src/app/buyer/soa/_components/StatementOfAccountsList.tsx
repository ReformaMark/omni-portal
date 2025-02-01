'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { formatDateVerbose, formatPrice } from '@/lib/utils'
import { usePropertyStore } from '@/store/property-store'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import SOATable from './SOATable'

function StatementOfAccountsList() {
     const selectedPropertyId = usePropertyStore(state => state.selectedPropertyId)

     const statementOfAccounts = useQuery(api.statementOfAccount.get, {propertyId: selectedPropertyId ?? undefined})
     const property = useQuery(api.deal.getPropertyById, {propertyId: selectedPropertyId ?? undefined})

    const totalAmountPaid = statementOfAccounts?.reduce((total, account) => total + account.totalAmountPaid, 0) ?? 0;
    const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' })

    const totals = [
        {
            title: 'Total Amount Paid',
            value: totalAmountPaid,
            data: statementOfAccounts
        },
        {
            title: 'Total Selling Price',
            value: property?.dealPrice,
            data: statementOfAccounts
        },
        {
            title: 'Total Outstanding Balance',
            value: statementOfAccounts && statementOfAccounts.length > 1 ?  statementOfAccounts[0]?.remainingBalance : property?.dealPrice,
            data: statementOfAccounts
        }
    ]
  return (
    <div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-10 gap-y-3 px-5 justify-between items-center mb-10">
            {totals.map((total, index) => (
                <Card  key={total.title} className='p-0 rounded-3xl shadow-lg'>
                 <CardHeader>
                     <CardTitle className='text-xs lg:text-[0.8rem] font-extralight'>{total.title}</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <h1 className='text-black text-xl md:text-xl lg:text-2xl font-medium'>
                        {total.value ? (<span>₱ {formatPrice(total.value ?? 0).split('.')[0]}</span>) : "-"}
                        {total.value ? (<span className='text-[#D9D9D9]'>.{formatPrice(totalAmountPaid).split('.')[1]}</span>) : ""}
                     </h1>
                 </CardContent>
                 <CardFooter className='bg-[#F7F8F9] flex flex-row py-3 items-center w-full rounded-b-3xl'>
                    {index === 1 ? (
                        <h4 className='text-[#828C98] text-xs lg:text-sm my-auto '>Block {property?.property?.block} Lot {property?.property?.lot}</h4>
                    ) : (

                     <h4 className='text-[#828C98] text-xs lg:text-sm'>As of {statementOfAccounts && statementOfAccounts?.length < 1 ? <span className='text-black'>{currentDate}</span> : (<span className='text-black'>{formatDateVerbose(statementOfAccounts ? statementOfAccounts.length < 1 ? 0 : statementOfAccounts[0]._creationTime : 0)}</span>) }</h4>
                    )}
                 </CardFooter>
             </Card>
            ))}
        </div>
        <SOATable data={statementOfAccounts ?? []}/>
    </div>
  )
}

export default StatementOfAccountsList