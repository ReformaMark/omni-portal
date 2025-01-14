"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { VerticalSeparator } from "@/components/vertical-separator"
import { PlusIcon } from "lucide-react"
import { ProjectCard } from "./project-card"
import { useState } from "react"
import { AddProjectModal } from "./add-project-modal"

export const ProjectList = () => {
    const [open, setOpen] = useState<boolean>(false)
    
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

                <ProjectCard />
            </div>

            <AddProjectModal
                onOpen={() => setOpen(false)}
                open={open}
            />
        </>
    )
}