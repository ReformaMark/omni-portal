import { ConvexError, v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { asyncMap } from "convex-helpers";

export const getByUser = query({
    args: {
        projectId: v.optional(v.id("project"))
    },
    handler: async (ctx, args) => {
        const buyerId = await getAuthUserId(ctx)
        if (!buyerId) throw new ConvexError("Not authenticated.");
        if (!args.projectId) return;

       
        const deals = await ctx.db.query("deal").filter(q => q.eq(q.field("buyerId"), buyerId)).filter(q=>q.eq(q.field('status'), 'closed')).collect()

        const userDeals = await asyncMap(deals, async (deal) => {
            const paymentCount = {
                paid: 0,
                unPaid: deal.dealPrice
            };


            let totalAmountPaid = 0
            let remainingBalance = 0
            const property = await ctx.db.get(deal.propertyId)
            const monthlyPaymentTransactions = await ctx.db.query('monthlyPayment').withIndex('by_dealId', (q)=> q.eq('dealId', deal._id)).collect()

            monthlyPaymentTransactions.forEach(p => {
                paymentCount.unPaid -= p.totalAmountPaid
                paymentCount.paid += p.totalAmountPaid 

                
                totalAmountPaid += p.totalAmountPaid
                remainingBalance = p.remainingBalance
            })

            return {
                ...deal,
                property: property,
                monthlyPayments: monthlyPaymentTransactions,
                downPayment: paymentCount,
                totalAmountPaid: totalAmountPaid,
                remainingBalance: remainingBalance
            }
        })
        return userDeals
    }
})