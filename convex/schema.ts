import { defineSchema, defineTable } from "convex/server";
import { authTables } from "@convex-dev/auth/server";
import { v } from "convex/values";

export default defineSchema({
    ...authTables,
    users: defineTable({
        accountId: v.string(),
        fname: v.string(),
        lname: v.string(),
        email: v.string(),
        emailVerified: v.optional(v.string()),
        image: v.optional(v.string()),
        contact: v.string(),
        houseNumber: v.string(),
        street: v.string(),
        barangay: v.string(),
        city: v.string(),
        role: v.union(
            v.literal("admin"),
            v.literal("buyer"),
            v.literal("seller"),
        ),

        realtyId: v.optional(v.id("realty"))
    }),
    inventory: defineTable({
        lotId: v.string(),
        block: v.string(),
        lot: v.string(),
        inventoryStatus: v.string(),
        lotArea: v.number(),
        pricePerSqm: v.number(),
        totalSellingPrice: v.number(),
        totalContractPrice: v.number(),
        netContractPrice: v.number(),
        monthlyAmortization: v.number(),
        term: v.string(),
    }),
    project: defineTable({
        projectName: v.string(),
        tagName: v.string(),
        projectLocation: v.string(),
        photo: v.string(),
    }).searchIndex("projectName", {
        searchField: "projectName",
    }),
    realty: defineTable({
        realtyName: v.string(),
        tagName: v.string(),
        contactPerson: v.string(),
        contactNumber: v.string(),
        photo: v.string(),
    }),
})