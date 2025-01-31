import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("inquiries")
            .collect()
    }
})

export const respond = mutation({
    args: {
        inquiryId: v.id("inquiries"),
        response: v.string(),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .patch(args.inquiryId, {
                response: args.response,
                respondedAt: Date.now(),
            })
    }
})