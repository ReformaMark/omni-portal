import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useConfirm } from "@/hooks/use-confirm"
import { useConvexMutation } from "@convex-dev/react-query"
import { useMutation } from "@tanstack/react-query"
import { MapPin, SquarePen, Trash2Icon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"
import { EditProjectModal } from "./edit-project-modal"

interface Project {
    _id: Id<"project">;
    projectName: string;
    tagName: string;
    projectLocation: string;
    photo: string | null;
}

interface ProjectCardProps {
    project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)

    const { mutate: deleteProject } = useMutation({
        mutationFn: useConvexMutation(api.projects.remove)
    })

    const [DeleteConfirmDialog, confirmDelete] = useConfirm(
        "Delete Project",
        "Are you sure you want to delete this project? This action cannot be undone."
    )

    const handleDelete = async () => {
        const confirmed = await confirmDelete()

        if (confirmed) {
            try {
                await deleteProject({ id: project._id })
                toast.success("Project deleted successfully")
                setOpen(false)
                setSelectedProject(null)
            } catch (error) {
                toast.error("Failed to delete project")
            }
        }
    }

    const handleCardClick = (project: Project) => {
        setSelectedProject(null)
        setEditOpen(false)

        setTimeout(() => {
            setSelectedProject(project)
            setOpen(true)
        }, 0)
    }

    const handleEditClick = (project: Project) => {
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
            <Card
                className="cursor-pointer"
                onClick={() => handleCardClick(project)}
            >
                <CardContent
                    className="flex flex-col gap-2 py-3"
                >
                    <Image
                        src={project.photo!}
                        alt={project.projectName}
                        width={500}
                        height={500}
                        className="rounded-md"
                    />

                    <p className="text-center font-bold text-dark">
                        {project.tagName}
                    </p>
                </CardContent>
            </Card>

            {selectedProject && (
                <Dialog open={open} onOpenChange={handleDialogClose}>
                    <DialogContent className="h-[400px]">
                        <DialogHeader>
                            <DialogTitle className="text-3xl text-dark">{selectedProject.tagName}</DialogTitle>
                            <DialogDescription>{selectedProject.projectName}</DialogDescription>
                        </DialogHeader>
                        <div className="border-t w-full" />

                        <div className="text-gray flex justify-end w-full gap-3">
                            <SquarePen
                                className="h-5 w-5 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditClick(selectedProject)
                                }}
                            />
                            <Trash2Icon
                                className="h-5 w-5 cursor-pointer text-red-500"
                                onClick={handleDelete}
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

            <DeleteConfirmDialog />

            {selectedProject && (
                <EditProjectModal
                    isOpen={editOpen}
                    onClose={handleEditModalClose}
                    project={selectedProject}
                />
            )}
        </>
    )
}