"use client"

import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { Eye, Mail, Pencil, PlusIcon, Trash2, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { EditSellerModal } from "./edit-sellers-modal"
import { AddSellersModal } from "./add-sellers-modal"
import { User } from "../../../../../data/dummy-users"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

export const AccountColumn: ColumnDef<User>[] = [
    {
        accessorKey: "accountId",
        header: () => <div className="text-center">Account ID</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.accountId}
                </p>
            )
        }
    },
    {
        accessorKey: "fname",
        header: () => <div className="text-center">FIRST NAME</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.fname}
                </p>
            )
        }
    },
    {
        accessorKey: "lname",
        header: () => <div className="text-center">SURNAME</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.lname}
                </p>
            )
        }
    },
    {
        accessorKey: "email",
        header: () => <div className="text-center">EMAIL ADDRESS</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.email}
                </p>
            )
        }
    },
    {
        accessorKey: "contact",
        header: () => <div className="text-center">CONTACT NUMBER</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.contact}
                </p>
            )
        }
    },
    {
        accessorKey: "barangay",
        header: () => <div className="text-center">BARANGAY</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.barangay}
                </p>
            )
        }
    },
    {
        accessorKey: "city",
        header: () => <div className="text-center">CITY</div>,
        cell: ({ row }) => {
            return (
                <p>
                    {row.original.city}
                </p>
            )
        }
    },
    {
        accessorKey: "actions",
        header: () => <div className="text-center">ACTIONS</div>,
        cell: function Cell({ row }) {
            const [showEditModal, setShowEditModal] = useState(false)

            const data = row.original

            return (
                <>
                    <div className="flex items-center justify-center gap-2">
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
                            className="h-8 w-8 p-0"
                            onClick={() => { }}
                        >
                            <Eye className="h-8 w-8" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0"
                            onClick={() => { }}
                        >
                            <Mail className="h-8 w-8" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 p-0 text-red-600"
                            onClick={() => { }}
                        >
                            <Trash2 className="h-8 w-8" />
                        </Button>
                    </div>

                    <EditSellerModal
                        data={data}
                        onClose={() => setShowEditModal(false)}
                        open={showEditModal}
                    />
                </>
            )
        }
    },
]

export const SellersList = () => {
    const [showAddSellerModal, setShowAddSellerModal] = useState(false)
    const sellers = useQuery(api.users.get, { role: "seller" })

    return (
        <>
            <div className="container mx-auto py-10 px-[50px] relative">
                <DataTable
                    data={sellers ?? []}
                    columns={AccountColumn}
                    search="fname"
                    placeholder="Search an account"
                />

                <div className="flex flex-row gap-3 absolute right-[50px] top-[40px]">
                    <div className="">
                        <Button
                            variant="outline"
                            className="text-gray"
                            onClick={() => setShowAddSellerModal(true)}
                        >
                            <PlusIcon className="w-7 h-7" />
                        </Button>
                    </div>

                    <div className="">
                        <Button
                            variant="outline"
                            className="text-gray"
                        >
                            <Trash2Icon className="w-7 h-7" />
                        </Button>
                    </div>
                </div>
            </div>

            <AddSellersModal
                onClose={() => setShowAddSellerModal(false)}
                open={showAddSellerModal}
            />
        </>
    )
}