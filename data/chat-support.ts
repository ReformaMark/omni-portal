import { Id } from "../convex/_generated/dataModel";

export interface ChatSupportType {
    _id: Id<"inquiries">;
    buyerId: Id<"users">;
    sellerId: Id<"users">;
    propertyId: Id<"property">;
    subject: string;
    message: string;
    response?: string | undefined;
    respondedAt?: number | undefined;
    _creationTime: number;
}