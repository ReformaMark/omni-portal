import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { ArrowUpRightFromSquare } from "lucide-react";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const create = mutation({
    args: {
        projectName: v.string(),
        tagName: v.string(),
        projectLocation: v.string(),
        storageId: v.id("_storage"),
    },
    handler: async (ctx, args) => {
        const adminId = await getAuthUserId(ctx)

        if (!adminId) throw new ConvexError("Not authenticated");

        const admin = await ctx.db.get(adminId);

        if (!admin || admin.role !== "admin") {
            throw new ConvexError("Unauthorized - Only admins can create users");
        }

        const existingProjectName = await ctx.db
            .query("project")
            .filter((q) => q.eq(q.field("projectName"), args.projectName))
            .first()

        if (existingProjectName) throw new ConvexError("Project name already exists")

        return await ctx.db
            .insert("project", {
                projectLocation: args.projectLocation,
                projectName: args.projectName,
                tagName: args.tagName,
                photo: args.storageId,
            })
    }
})

export const get = query({
    args: {},
    handler: async (ctx) => {
        const projects = await ctx.db
            .query("project")
            .collect()

        return Promise.all(
            projects.map(async (project) => ({
                ...project,
                photo: await ctx.storage.getUrl(project.photo)
            }))
        )
    }
})

export const search = query({
    args: { query: v.string() },
    handler: async (ctx, { query }) => {
        if (query === "") {
            const projects = await ctx.db
                .query("project")
                .collect();

            return Promise.all(
                projects.map(async (project) => ({
                    ...project,
                    photo: await ctx.storage.getUrl(project.photo)
                }))
            );
        }

        const projects = await ctx.db
            .query("project")
            .withSearchIndex("projectName", (q) =>
                q.search("projectName", query)
            )
            .collect()

        return Promise.all(
            projects.map(async (project) => ({
                ...project,
                photo: await ctx.storage.getUrl(project.photo)
            }))
        )
    }
})

export const edit = mutation({
    args: {
        id: v.id("project"),
        projectName: v.string(),
        tagName: v.string(),
        projectLocation: v.string(),
        storageId: v.optional(v.id("_storage")),
    },
    handler: async (ctx, args) => {
        const adminId = await getAuthUserId(ctx)
        if (!adminId) throw new ConvexError("Not authenticated");

        const admin = await ctx.db.get(adminId);
        if (!admin || admin.role !== "admin") {
            throw new ConvexError("Unauthorized - Only admins can create users");
        }

        const existing = await ctx.db.get(args.id);
        if (!existing) throw new ConvexError("Project not found");

        const existingName = await ctx.db
            .query("project")
            .filter((q) =>
                q.and(
                    q.eq(q.field("projectName"), args.projectName),
                    q.neq(q.field("_id"), args.id)
                )
            )
            .first();

        if (existingName) {
            throw new ConvexError("Project name already exists");
        }

        return await ctx.db.patch(args.id, {
            projectName: args.projectName,
            tagName: args.tagName,
            projectLocation: args.projectLocation,
            ...(args.storageId && { photo: args.storageId }),
        });
    }
})