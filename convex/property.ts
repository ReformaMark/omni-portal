import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    args: {
        projectId: v.optional(v.id("project"))
    },
    handler: async (ctx, args) => {
        const query = ctx.db
            .query("property")

        if (args.projectId) {
            query.filter((q) => q.eq(q.field("projectId"), args.projectId))
        }

        const properties = await query.collect()

        return properties;
    }
})

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