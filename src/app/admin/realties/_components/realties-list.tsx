"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VerticalSeparator } from "@/components/vertical-separator"
import { PlusIcon } from "lucide-react"
import { RealtyCard } from "./realty-card"
import { useCallback, useState } from "react"
import { AddRealtyModal } from "./add-realty-modal"
import { useDebounce } from "@/hooks/use-debounce"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

export const RealtiesList = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 300)

    const realties = useQuery(api.realty.search, {
        query: debouncedSearch
    })

    const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }, [])

    return (
        <>
            <div
                className="px-[50px] mt-[25px] flex flex-col items-center justify-center space-y-7"
            >
                <div
                    className="flex flex-row items-center gap-3 max-w-[1300px] w-full"
                >
                    <Input
                        className="rounded-2xl max-md:w-[75%]"
                        type="text"
                        placeholder="Search realty"
                        value={search}
                        onChange={handleSearch}
                    />

                    <VerticalSeparator />

                    <Button
                        variant="default"
                        className="rounded-3xl max-md:w-[25%]"
                        onClick={() => setOpen(true)}
                    >
                        <PlusIcon />

                        <span className="hidden md:block">
                            Add realty
                        </span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-[1300px]">
                    {realties?.map((realty) => (
                        <RealtyCard
                            key={realty._id}
                            realty={realty}
                        />
                    ))}
                </div>
            </div>

            <AddRealtyModal
                onOpen={() => setOpen(false)}
                open={open}
            />
        </>
    )
}