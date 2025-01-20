import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const get = query({
    args: {
        projectId: v.optional(v.id("project"))
    },
    handler: async (ctx, args) => {
        let query = ctx.db.query("property");

        if (args.projectId) {
            query = query.filter((q) => q.eq(q.field("projectId"), args.projectId));
        }

        const properties = await query.collect();
        return properties;
    }
});

export const getByStatus = query({
    args: {
        projectId: v.optional(v.id("project")),
        status: v.string()
    },
    handler: async (ctx, args) => {
        const query = ctx.db.query("property");

        if (args.projectId) {
            query.filter((q) =>
                q.and(
                    q.eq(q.field("projectId"), args.projectId),
                    q.eq(q.field("status"), args.status)
                )
            );
        }

        return await query.collect();
    }
});

const generateLotId = async (ctx: any) => {
    const latestProperty = await ctx.db
        .query("property")
        .order("desc")
        .first()

    if (!latestProperty) {
        return "102001";
    }

    const currentId = parseInt(latestProperty.lotId);
    return (currentId + 1).toString();
}

export const create = mutation({
    args: {
        projectId: v.id("project"),
        block: v.string(),
        lot: v.string(),
        lotArea: v.number(),
        pricePerSqm: v.number(),
        totalContractPrice: v.number(),
        netContractPrice: v.number(),
        totalSellingPrice: v.number(),
        monthlyAmortization: v.number(),
        term: v.number(),
    },
    handler: async (ctx, args) => {
        const adminId = await getAuthUserId(ctx);
        if (!adminId) throw new Error("Unauthorized");

        const admin = await ctx.db.get(adminId);
        if (!admin || admin.role !== "admin") {
            throw new Error("Unauthorized - Only admins can add properties");
        }

        const lotId = await generateLotId(ctx);

        return await ctx.db.insert("property", {
            ...args,
            lotId,
            status: "available",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});

export const edit = mutation({
    args: {
        id: v.id("property"),
        block: v.string(),
        lot: v.string(),
        lotArea: v.number(),
        pricePerSqm: v.number(),
        totalContractPrice: v.number(),
        netContractPrice: v.number(),
        totalSellingPrice: v.number(),
        monthlyAmortization: v.number(),
        term: v.number(),
    },
    handler: async (ctx, args) => {
        const adminId = await getAuthUserId(ctx);
        if (!adminId) throw new Error("Unauthorized");

        const admin = await ctx.db.get(adminId);
        if (!admin || admin.role !== "admin") {
            throw new Error("Unauthorized - Only admins can edit properties");
        }

        const { id, ...updates } = args;
        
        return await ctx.db.patch(id, {
            ...updates,
            updatedAt: Date.now(),
        });
    },
});