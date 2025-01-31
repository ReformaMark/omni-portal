"use client"
import { DataTable } from "@/components/data-table"
import { ChatSupportColumns } from "./chat-support-columns"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Loader2Icon } from "lucide-react"

export const ChatSupportTable = () => {
    const data = useQuery(api.chatSupport.get)

    // const filteredData = data?.filter((d) =>
    //     d.respondedAt === undefined
    // )

    return (
        <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
            {!data ? (
                <Loader2Icon className="w-7 h-7 animate-spin" />
            ) : (
                <DataTable
                    columns={ChatSupportColumns}
                    data={data}
                    placeholder="Search a name"
                    search="buyerId.fname"
                />
            )}
        </div>
    )
}