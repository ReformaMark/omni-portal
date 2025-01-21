import { Id } from "../convex/_generated/dataModel";

export type UserRole = "admin" | "buyer" | "seller";

export interface User {
    _id: Id<"users">;
    _creationTime: number;
    accountId: string;
    fname: string;
    lname: string;
    email: string;
    contact: string;
    houseNumber: string;
    street: string;
    barangay: string;
    city: string;
    emailVerified?: string;
    image?: string;
    realtyId?: Id<"realty">;
    role: UserRole;
}