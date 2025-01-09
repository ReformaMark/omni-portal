"use client"

import { BadgeStatus } from "@/components/badge-status";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { DummyType } from "../../../../data/dummy";
import { InventoryEditModal } from "./inventory-edit-modal";

export const inventoryColumns: ColumnDef<DummyType>[] = [
    {
        accessorKey: "lotId",
        header: () => <div className="text-center">LOT ID NO.</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.lotId}
                </p>
            )
        }
    },
    {
        accessorKey: "block",
        header: () => <div className="text-center">BLOCK</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.block}
                </p>
            )
        }
    },
    {
        accessorKey: "lot",
        header: () => <div className="text-center">LOT</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.lot}
                </p>
            )
        }
    },
    {
        accessorKey: "lotArea",
        header: () => <div className="text-center">LOT AREA</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.lotArea.toFixed(2)}
                </p>
            )
        }
    },
    {
        accessorKey: "pricePerSqm",
        header: () => <div className="text-center">PRICE PER SQM</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {formatPrice(row.original.pricePerSqm.toFixed(2))}
                </p>
            )
        }
    },
    {
        accessorKey: "totalSellingPrice",
        header: () => <div className="text-center">TOTAL SELLING PRICE</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {formatPrice(row.original.totalSellingPrice.toFixed(2))}
                </p>
            )
        }
    },
    {
        accessorKey: "monthlyAmortization",
        header: () => <div className="text-center">MONTHLY AMORT</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {formatPrice(row.original.monthlyAmortization.toFixed(2))}
                </p>
            )
        }
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center">STATUS</div>,
        cell: ({ row }) => {
            const status = row.original.status

            return (
                <BadgeStatus status={status} />
            )
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">ACTION</div>,
        cell: function Cell({ row }) {
            const [showModal, setShowModal] = useState(false)
            const [showEditModal, setShowEditModal] = useState(false)

            const data = row.original

            return (
                <>
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => setShowModal(true)}
                        >
                            <Eye className="h-8 w-8" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => setShowEditModal(true)}
                        >
                            <Pencil className="h-8 w-8" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 text-red-600"
                        >
                            <Trash2 className="h-8 w-8" />
                        </Button>
                    </div>

                    <Dialog
                        open={showModal}
                        onOpenChange={setShowModal}
                    >
                        <DialogContent
                            className="p-0 border-none bg-[#F6F6F6]"
                        >
                            <DialogHeader
                                className="bg-dark p-4 rounded-tl-lg rounded-tr-lg"
                            >
                                <DialogTitle
                                    className="flex items-center gap-2 text-white justify-between px-8"
                                >
                                    Block {data.block} Lot {data.lot}

                                    <BadgeStatus status={data.status} />
                                </DialogTitle>
                                <DialogDescription
                                    className="text-lightGray px-8"
                                >
                                    Lot ID: {data.lotId}
                                </DialogDescription>
                            </DialogHeader>

                            <div className="px-4 pb-4">
                                <div className="grid grid-cols-2 gap-[1px] bg-gray-200 rounded-lg overflow-hidden font-semibold border border-lightGray">
                                    <div className="bg-[#EDEDED] text-gray p-2">LOT AREA (SQM)</div>
                                    <div className="bg-white p-2 text-center">{data.lotArea}</div>

                                    <div className="bg-[#EDEDED] text-gray p-2">PRICE PER SQM</div>
                                    <div className="bg-white p-2 text-center">{formatPrice(data.pricePerSqm.toFixed(2))}</div>

                                    <div className="bg-[#EDEDED] text-gray p-2">TOTAL CONTRACT PRICE</div>
                                    <div className="bg-white p-2 text-center">273,036.50</div>

                                    <div className="bg-[#EDEDED] text-gray p-2">MISCELLANEOUS FEE</div>
                                    <div className="bg-white p-2 text-center">24,821.50</div>

                                    <div className="bg-[#EDEDED] text-gray p-2">NET CONTRACT PRICE</div>
                                    <div className="bg-white p-2 text-center">270,036.50</div>

                                    <div className="bg-[#EDEDED] text-gray p-2">TOTAL SELLING PRICE</div>
                                    <div className="bg-white p-2 text-center">{formatPrice(data.totalSellingPrice.toFixed(2))}</div>

                                    <div className="bg-[#EDEDED] text-gray p-2">MONTHLY AMORT</div>
                                    <div className="bg-white p-2 text-center">{formatPrice(data.monthlyAmortization.toFixed(2))}</div>

                                    <div className="bg-[#EDEDED] text-gray p-2">TERM</div>
                                    <div className="bg-white p-2 text-center">60</div>
                                </div>
                            </div>

                            {(data.status === "Sold" || data.status === "Due") && (
                                <div className="px-4 pb-4">
                                    <div className="grid grid-cols-2 gap-[1px] bg-gray-200 rounded-lg overflow-hidden font-semibold border border-lightGray">
                                        <div className="bg-[#EDEDED] text-gray p-2">BUYER&apos;S NAME</div>
                                        <div className="bg-white p-2 text-center">Ria Francisco</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">SELLER&apos;S NAME</div>
                                        <div className="bg-white p-2 text-center">Jinky Gonzaga</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">REALTY</div>
                                        <div className="bg-white p-2 text-center">ZONAL</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">BROKER</div>
                                        <div className="bg-white p-2 text-center">Jomar Aquino</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">DUE DATE</div>
                                        <div className="bg-white p-2 text-center">Every 15th</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">FIRST DUE</div>
                                        <div className="bg-white p-2 text-center">February 2022</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">2ND MA - 60TH MA</div>
                                        <div
                                            className={`p-2 text-center ${data.status === "Due" ? "bg-[#FCE6E8]" : "bg-white"}`}
                                        >
                                            4,500.00
                                        </div>
                                    </div>
                                </div>
                            )}

                            {data.status === "Reserved" && (
                                <div className="px-4 pb-4">
                                    <div className="grid grid-cols-2 gap-[1px] bg-gray-200 rounded-lg overflow-hidden font-semibold border border-lightGray">
                                        <div className="bg-[#EDEDED] text-gray p-2">CLIENT</div>
                                        <div className="bg-white p-2 text-center">Ria Francisco</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">SELLER&apos;S NAME</div>
                                        <div className="bg-white p-2 text-center">Jinky Gonzaga</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">REALTY</div>
                                        <div className="bg-white p-2 text-center">ZONAL</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">DATE RESERVED</div>
                                        <div className="bg-white p-2 text-center">12/26/2025</div>

                                        <div className="bg-[#EDEDED] text-gray p-2">RESERVATION EXPIRY</div>
                                        <div className="bg-white p-2 text-center">12/28/2025</div>
                                    </div>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>

                    <InventoryEditModal
                        data={data}
                        onClose={() => setShowEditModal(false)}
                        open={showEditModal}
                    />
                </>
            )
        }
    },
]