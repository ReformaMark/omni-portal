import { ConvexError, convexToJson, v } from "convex/values"
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

export const edit = mutation({
    args: {
        id: v.id("realty"),
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

        const existing = await ctx.db.get(args.id);
        if (!existing) throw new ConvexError("Realty does not exist");

        const existingName = await ctx.db
            .query("realty")
            .filter((q) =>
                q.and(
                    q.eq(q.field("realtyName"), args.realtyName),
                    q.neq(q.field("_id"), args.id)
                )
            )
            .first()

        if (existingName) throw new ConvexError("Realty name already exists");

        return await ctx.db
            .patch(args.id, {
                realtyName: args.realtyName,
                tagName: args.tagName,
                contactPerson: args.contactPerson,
                contactNumber: args.contactNumber,
                photo: args.storageId,
            })
    }
})

export const remove = mutation({
    args: {
        id: v.id("realty"),
    },
    handler: async (ctx, args) => {
        const adminId = await getAuthUserId(ctx);
        if (!adminId) throw new ConvexError("Not authenticated");

        const admin = await ctx.db.get(adminId);
        if (!admin || admin.role !== "admin") {
            throw new ConvexError("Unauthorized");
        }

        const existing = await ctx.db.get(args.id);
        if (!existing) throw new ConvexError("Realty not found");

        await ctx.storage.delete(existing.photo);

        await ctx.db.delete(args.id);
    }
})

export const getWithoutImage = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("realty")
            .collect()
    }
})

export const getById = query({
    args: { id: v.optional(v.id("realty")) },
    handler: async (ctx, args) => {
        if (!args.id) return null;
        return await ctx.db.get(args.id);
    }
});