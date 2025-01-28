import { Doc, Id } from "../../convex/_generated/dataModel";

interface monthlyPayments {
    _id: Id<"statementOfAccount">;
    _creationTime: number;
    paymentMethod?: string | undefined;
    dealId: Id<"deal">;
    particulars: string;
    totalAmountPaid: number;
    remainingBalance: number;
    remainingTerms: number;
}
interface paymentCount  {
    paid: number;
    unPaid: number;
}

export interface HybridDealTypes extends Doc<"deal">{
    property: Doc<'property'> | null,
    seller: Doc<'users'> | null,
    buyer: Doc<'users'> | null,
    monthlyPayments: monthlyPayments[],
    paymentCount: paymentCount,
    totalAmountPaid: number,
    remainingBalance: number,
}