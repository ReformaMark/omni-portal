"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DocumentsType } from "../../../../../data/documents";
import { StatusBadge } from "./StatusBadge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

export const DeclinedDocumentsColumn: ColumnDef<DocumentsType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="text-center">
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
        accessorKey: "file",
        header: () => <div className="text-start">NAME</div>,
        cell: ({ row }) => {
            return (
                <div className="text-start">
                    <p className="text-base text-black">
                        {row.original.file}
                    </p>

                    <p className="text-muted-foreground text-xs font-normal">
                        Created: Jan 16, 2025 · 9:18 AM
                    </p>
                </div>
            )
        }
    },
    {
        accessorKey: "updatedAt",
        header: () => <div className="text-center">LAST ACTIVITY</div>,
        cell: () => {
            return (
                <p className="w-[150px] md:w-full font-normal">
                    {/* {row.original.updatedAt} */}
                    Jan 24, 2025 9:18 AM
                </p>
            )
        }
    },
    {
        accessorKey: "status",
        header: () => <div className="text-center uppercase">STATUS</div>,
        cell: () => {
            return (
                <div className="">
                    <div className="flex justify-center -space-x-4">
                      <StatusBadge status="approved"/>
                       
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">ACTION</div>,
        cell: () => {
            const [dialogOpen, setDialogOpen ] = useState<boolean>(false)

            return (
                <>
                    <div className="flex items-center justify-center">
                        <Dialog onOpenChange={setDialogOpen} open={dialogOpen}>
                            <Button
                                variant="default"
                                className="rounded-md max-md:w-[25%] md:w-fit"
                                onClick={() => {setDialogOpen(!dialogOpen)}}
                                >
                                <span className="">
                                    View
                                </span>
                            </Button>
                            <DialogContent>
                                Actions
                            </DialogContent>
                        </Dialog>
                    </div>
                </>
            )
        }
    }
]