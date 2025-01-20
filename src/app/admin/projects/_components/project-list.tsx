"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VerticalSeparator } from "@/components/vertical-separator"
import { PlusIcon } from "lucide-react"
import { ProjectCard } from "./project-card"
import { useCallback, useState } from "react"
import { AddProjectModal } from "./add-project-modal"
import { useDebounce } from "@/hooks/use-debounce"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

export const ProjectList = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const debouncedSearch = useDebounce(search, 300)

    const projects = useQuery(api.projects.search, {
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
                        placeholder="Search project"
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
                            Add Project
                        </span>
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1300px]">
                    {projects?.map((project) => (
                        <ProjectCard
                            key={project._id}
                            project={project}
                        />
                    ))}
                </div>
            </div>

            <AddProjectModal
                onOpen={() => setOpen(false)}
                open={open}
            />
        </>
    )
}