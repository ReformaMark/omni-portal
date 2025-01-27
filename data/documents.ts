// deal finalization table then relationship with documents passed.

import { Id } from "../convex/_generated/dataModel";

export interface DocumentsType {
    _id: Id<"document">;
    dealId: Id<"deal">;
    documentType: string;
    file: string;
}
export interface BuyerDocumentsType {
    _id: Id<"document">;
    dealId: Id<"deal">;
    documentType: string;
    file: string;
    status: string;
}

export const dummyDocuments: DocumentsType[] = [
    {
        _id: "doc1" as Id<"document">,
        dealId: "deal1" as Id<"deal">,
        documentType: "Contract",
        file: "contract1.pdf"
    },
    {
        _id: "doc2" as Id<"document">,
        dealId: "deal2" as Id<"deal">,
        documentType: "Invoice",
        file: "invoice1.pdf"
    },
    {
        _id: "doc3" as Id<"document">,
        dealId: "deal3" as Id<"deal">,
        documentType: "Report",
        file: "report1.pdf"
    }
];
export const buyerDummyDocuments: BuyerDocumentsType[] = [
    {
        _id: "doc1" as Id<"document">,
        dealId: "deal1" as Id<"deal">,
        documentType: "Contract",
        file: "contract1.pdf",
        status: "approved"
    },
    {
        _id: "doc2" as Id<"document">,
        dealId: "deal2" as Id<"deal">,
        documentType: "Invoice",
        file: "invoice1.pdf",
        status: "approved"
    },
    {
        _id: "doc3" as Id<"document">,
        dealId: "deal3" as Id<"deal">,
        documentType: "Report",
        file: "report1.pdf",
        status: "approved"
    }
];