import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, SquarePen } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { projectDummy, ProjectDummyType } from "../../../../../data/dummy-project"
import { EditProjectModal } from "./edit-project-modal"

export const ProjectCard = () => {
    const [open, setOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<ProjectDummyType | null>(null)
    const [editOpen, setEditOpen] = useState(false)

    const handleCardClick = (project: ProjectDummyType) => {
        setSelectedProject(null)
        setEditOpen(false)

        setTimeout(() => {
            setSelectedProject(project)
            setOpen(true)
        }, 0)
    }

    const handleEditClick = (project: ProjectDummyType) => {
        setSelectedProject(null)
        setOpen(false)

        setTimeout(() => {
            setSelectedProject(project)
            setEditOpen(true)
        })
    }

    const handleDialogClose = () => {
        setOpen(false)
        setSelectedProject(null)
    }

    const handleEditModalClose = () => {
        setEditOpen(false)
        setSelectedProject(null)
    }

    return (
        <>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1300px]"
            >
                {projectDummy.map((p) => (
                    <>
                        <Card
                            className="cursor-pointer"
                            onClick={() => handleCardClick(p)}
                        >
                            <CardContent
                                className="flex flex-col gap-2 py-3"
                            >
                                <Image
                                    src={p.photo!}
                                    alt={p.projectName}
                                    width={500}
                                    height={500}
                                    className="rounded-md"
                                />

                                <p className="text-center font-bold text-dark">
                                    {p.tagName}
                                </p>
                            </CardContent>
                        </Card>
                    </>
                ))}
            </div>

            {selectedProject && (
                <Dialog open={open} onOpenChange={handleDialogClose}>
                    <DialogContent className="h-[400px]">
                        <DialogHeader>
                            <DialogTitle className="text-3xl">{selectedProject.tagName}</DialogTitle>
                            <DialogDescription>{selectedProject.projectName}</DialogDescription>
                        </DialogHeader>
                        <div className="border-t w-full" />

                        <div className="text-gray flex justify-end w-full">
                            <SquarePen
                                className="h-5 w-5 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditClick(selectedProject)
                                }}
                            />
                        </div>

                        <div className="flex flex-row items-center gap-12">
                            <Image src={selectedProject.photo!} alt={selectedProject.projectName} width={200} height={200} className="rounded-md" />
                            <p className="flex flex-row gap-2">
                                <MapPin />
                                {selectedProject.projectLocation}
                            </p>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            {selectedProject && (
                <EditProjectModal
                    open={editOpen}
                    onClose={handleEditModalClose}
                    data={selectedProject}
                />
            )}
        </>
    )
}