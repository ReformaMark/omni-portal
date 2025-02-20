//inventory dummy

import { Id } from "../convex/_generated/dataModel"

export type PropertyStatus = "available" | "reserved" | "sold" | "due";

export interface PropertyType {
    _id: Id<"property">;
    lotId: string;
    _creationTime: number;
    projectId: Id<"project">;
    block: string;
    lot: string;
    lotArea: number;
    pricePerSqm: number;
    totalContractPrice: number;
    netContractPrice: number;
    totalSellingPrice: number;
    monthlyAmortization: number;
    term: number;
    status: PropertyStatus;
    dueDate?: number;
}

export const dummy = [
    {
        lotId: 102001,
        block: "1",
        lot: "1A",
        lotArea: 45.13,
        pricePerSqm: 5500,
        totalSellingPrice: 248215.00,
        monthlyAmortization: 4500.00,
        status: "Available",
    },
    {
        lotId: 102002,
        block: "1",
        lot: "1B",
        lotArea: 50.00,
        pricePerSqm: 5600,
        totalSellingPrice: 280000.00,
        monthlyAmortization: 5000.00,
        status: "Available",
    },
    {
        lotId: 102003,
        block: "2",
        lot: "2A",
        lotArea: 60.00,
        pricePerSqm: 5700,
        totalSellingPrice: 342000.00,
        monthlyAmortization: 6000.00,
        status: "Sold",
    },
    {
        lotId: 102004,
        block: "2",
        lot: "2B",
        lotArea: 55.00,
        pricePerSqm: 5800,
        totalSellingPrice: 319000.00,
        monthlyAmortization: 5500.00,
        status: "Reserved",
    },
    {
        lotId: 102005,
        block: "3",
        lot: "3A",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Due",
    },
    {
        lotId: 102006,
        block: "3",
        lot: "3B",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Due",
    },
    {
        lotId: 102007,
        block: "3",
        lot: "4A",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Reserved",
    },
    {
        lotId: 102008,
        block: "3",
        lot: "4B",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Sold",
    },
    {
        lotId: 102009,
        block: "3",
        lot: "5A",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Sold",
    },
    {
        lotId: 102010,
        block: "3",
        lot: "5B",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Available",
    },
    {
        lotId: 102011,
        block: "3",
        lot: "6A",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Available",
    },
    {
        lotId: 102012,
        block: "3",
        lot: "6B",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Reserved",
    },
    {
        lotId: 102013,
        block: "3",
        lot: "7A",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Due",
    },
    {
        lotId: 102014,
        block: "3",
        lot: "7B",
        lotArea: 70.00,
        pricePerSqm: 5900,
        totalSellingPrice: 413000.00,
        monthlyAmortization: 7000.00,
        status: "Due",
    },
]