"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DocumentsType } from "../../../../../data/documents";


export const ApprovedDocumentsColumn: ColumnDef<DocumentsType>[] = [
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
        accessorKey: "RECEPIENTS",
        header: () => <div className="text-center">RECEPIENTS</div>,
        cell: () => {
            return (
                <div className="">
                    <div className="flex justify-center -space-x-4">
                        <Avatar>
                            <AvatarImage src="/girl1.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="/rock1.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                            <AvatarImage src="/boy1.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">ACTIONS</div>,
        cell: () => {
            return (
                <>
                    <div className="flex items-center justify-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => { }}
                        >
                            <Image
                                src="/eye-icon.svg"
                                width={18}
                                height={18}
                                alt="paper send icon"
                            />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => { }}
                        >
                            <Image
                                src="/edit-square.svg"
                                width={18}
                                height={18}
                                alt="paper send icon"
                            />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={() => { }}
                        >
                            <Image
                                src="/paper-send.svg"
                                width={18}
                                height={18}
                                alt="paper send icon"
                            />
                        </Button>
                    </div>
                </>
            )
        }
    }
]