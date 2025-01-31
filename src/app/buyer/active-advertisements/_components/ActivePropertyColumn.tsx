"use client"

import { BadgeStatus } from "@/components/badge-status";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { Eye} from "lucide-react";
import { useState } from "react";
import { PropertyType } from "../../../../../data/dummy";
import InquiryDialog from "./InquiryDialog";
import { useProjectStore } from "@/store/project-store";

export const ActivePropertyColumns: ColumnDef<PropertyType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="flex items-center justify-center" >
                <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                />
           </div>
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
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
            const selectedProjectId = useProjectStore(state => state.selectedProjectId)
            const [showModal, setShowModal] = useState(false)
            const data = row.original
            
           
            return (
                <div className="flex items-center justify-center gap-2">
                    <div className="flex items-center justify-center gap-2">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => setShowModal(true)}
                        >
                            <Eye className="h-8 w-8" />
                        </Button>
                    </div>
                    <InquiryDialog data={data} projectId={selectedProjectId}/>

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
                                    <div className="bg-white p-2 text-center">
                                        {formatPrice(data.totalContractPrice.toFixed(2))}
                                    </div>

                                    <div className="bg-[#EDEDED] text-gray p-2">MISCELLANEOUS FEE</div>
                                    <div className="bg-white p-2 text-center">
                                        {/* {formatPrice(data.miscellaneousFee.toFixed(2))} */}
                                        0.00
                                    </div>

                                    <div className="bg-[#EDEDED] text-gray p-2">NET CONTRACT PRICE</div>
                                    <div className="bg-white p-2 text-center">
                                        {formatPrice(data.netContractPrice.toFixed(2))}
                                    </div>

                                    <div className="bg-[#EDEDED] text-gray p-2">TOTAL SELLING PRICE</div>
                                    <div className="bg-white p-2 text-center">{formatPrice(data.totalSellingPrice.toFixed(2))}</div>

                                    <div className="bg-[#EDEDED] text-gray p-2">MONTHLY AMORT</div>
                                    <div className="bg-white p-2 text-center">{formatPrice(data.monthlyAmortization.toFixed(2))}</div>

                                    <div className="bg-[#EDEDED] text-gray p-2">TERM</div>
                                    <div className="bg-white p-2 text-center">
                                        {data.term} months
                                    </div>
                                </div>
                            </div>

                          
                        </DialogContent>
                    </Dialog>
                  
                </div>
            )
        }
    },
]