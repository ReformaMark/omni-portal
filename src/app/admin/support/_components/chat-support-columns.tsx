"use client"
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDateVerbose } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { useQuery } from "convex/react";
import Image from "next/image";
import { api } from "../../../../../convex/_generated/api";
import { ChatSupportType } from "../../../../../data/chat-support";
import { useState } from "react";
import { ChatViewDialog } from "./chat-view-dialog";
import { Loader2Icon } from "lucide-react";
import { ChatRespondDialog } from "./chat-respond-dialog";

export const ChatSupportColumns: ColumnDef<ChatSupportType>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <div className="text-center font-semibold">
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
        accessorKey: "buyerId",
        header: () => <div className="text-start font-semibold">NAME</div>,
        cell: function Cell({ row }) {
            const user = useQuery(api.users.getUserById, { buyerId: row.original.buyerId })
            const property = useQuery(api.property.getPropertyById, { propertyId: row.original.propertyId })
            return (
                <div className="text-start">
                    <p className="text-base text-black">
                        {user?.fname + " " + user?.lname}
                    </p>

                    <p className="text-muted-foreground text-xs font-normal">
                        Property: Block {property?.block} Lot {property?.lot}
                    </p>
                </div>
            )
        }
    },
    {
        accessorKey: "buyerId.role",
        header: () => <div className="text-center font-semibold">ROLE</div>,
        cell: function Cell({ row }) {
            const user = useQuery(api.users.getUserById, { buyerId: row.original.buyerId })

            return (
                <p className="w-[150px] md:w-full font-normal">
                    {user?.role === "buyer" && "Buyer"}
                </p>
            )
        }
    },
    {
        accessorKey: "_creationTime",
        header: () => <div className="text-center font-semibold">DATE / TIME RECEIVED</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {formatDateVerbose(row.original._creationTime)}
                </p>
            )
        }
    },
    {
        accessorKey: "subject",
        header: () => <div className="text-center font-semibold">SUBJECT</div>,
        cell: ({ row }) => {
            return (
                <p className="font-normal">
                    {row.original.subject}
                </p>
            )
        }
    },
    {
        accessorKey: "message",
        header: () => <div className="text-center font-semibold">MESSAGE</div>,
        cell: ({ row }) => {
            return (
                <p className="font-normal truncate max-w-[200px] text-center mx-auto">
                    {row.original.message}
                </p>
            )
        }
    },
    {
        accessorKey: "action",
        header: () => <div className="text-center font-semibold">ACTION</div>,
        cell: function Cell({ row }) {
            const [viewOpen, setViewOpen] = useState(false)
            const [respondOpen, setRespondOpen] = useState(false)

            const user = useQuery(api.users.getUserById, { buyerId: row.original.buyerId })
            const property = useQuery(api.property.getPropertyById, { propertyId: row.original.propertyId })

            if (!user) return <Loader2Icon className="h-7 w-7 animate-spin" />
            if (!property) return <Loader2Icon className="h-7 w-7 animate-spin" />
            return (
                <>
                    <div className="flex items-center justify-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => setViewOpen(true)}
                        >
                            <Image
                                src="/eye-icon.svg"
                                width={18}
                                height={18}
                                alt="paper send icon"
                            />
                        </Button>

                        {row.original.response ? (<>

                        </>) : (<>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 p-0 text-red-600"
                                onClick={() => setRespondOpen(true)}
                            >
                                <Image
                                    src="/email-icon.svg"
                                    width={18}
                                    height={18}
                                    alt="paper send icon"
                                />
                            </Button>
                        </>)}

                    </div>

                    <ChatViewDialog
                        open={viewOpen}
                        onOpenChange={setViewOpen}
                        user={user!}
                        property={property!}
                        inquiry={row.original}
                    />

                    <ChatRespondDialog
                        open={respondOpen}
                        onOpenChange={setRespondOpen}
                        user={user}
                        property={property}
                        inquiry={row.original}
                    />
                </>
            )
        }
    }
]