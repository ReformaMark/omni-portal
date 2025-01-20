import { ConvexError, v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { getAuthUserId } from "@convex-dev/auth/server";


export const create = mutation({
    args: {
        realtyName: v.string(),
        tagName: v.string(),
        contactPerson: v.string(),
        contactNumber: v.string(),
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        const adminId = await getAuthUserId(ctx)
        if (!adminId) throw new ConvexError("Not authenticated");

        const admin = await ctx.db.get(adminId);
        if (!admin || admin.role !== "admin") {
            throw new ConvexError("Unauthorized - Only admins can create users");
        }

        const existingRealtyName = await ctx.db
            .query("realty")
            .filter((q) => q.eq(q.field("realtyName"), args.realtyName))
            .first()

        if (existingRealtyName) throw new ConvexError("Realty name already exists")

        return await ctx.db
            .insert("realty", {
                realtyName: args.realtyName,
                tagName: args.tagName,
                contactPerson: args.contactPerson,
                contactNumber: args.contactNumber,
                photo: args.storageId,
            })
    }
})

export const get = query({
    args: {},
    handler: async (ctx) => {
        const realties = await ctx.db
            .query("realty")
            .collect()

        return Promise.all(
            realties.map(async (realty) => ({
                ...realty,
                photo: await ctx.storage.getUrl(realty.photo)
            }))
        )
    }
})

export const search = query({
    args: {
        query: v.string()
    },
    handler: async (ctx, { query }) => {
        if (query === "") {
            const realty = await ctx.db
                .query("realty")
                .collect()

            return Promise.all(
                realty.map(async (realty) => ({
                    ...realty,
                    photo: await ctx.storage.getUrl(realty.photo)
                }))
            )
        }

        const realty = await ctx.db
            .query("realty")
            .withSearchIndex("realtyName", (q) =>
                q.search("realtyName", query)
            )
            .collect()

        return Promise.all(
            realty.map(async (realty) => ({
                ...realty,
                photo: await ctx.storage.getUrl(realty.photo)
            }))
        )
    }
})