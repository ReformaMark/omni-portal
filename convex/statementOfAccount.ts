import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
    args:{
        propertyId: v.optional(v.id("property"))
    },
    handler: async(ctx, args)=>{
        const userId = await getAuthUserId(ctx)
        if (!args.propertyId) return;
        const deal = await ctx.db.query('deal').filter(q => q.eq(q.field('propertyId'), args.propertyId)).filter(q => q.eq(q.field('buyerId'), userId)).unique()
        if(!deal) return

        const soa = await ctx.db.query('statementOfAccount').filter(q=> q.eq(q.field('dealId'), deal._id)).collect()

        return soa
    }
})