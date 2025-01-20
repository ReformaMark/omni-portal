import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SquarePen, Trash2Icon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { EditRealtyModal } from "./edit-realty-modal"
import { Id } from "../../../../../convex/_generated/dataModel"
import { useConvexMutation } from "@convex-dev/react-query"
import { api } from "../../../../../convex/_generated/api"
import { useConfirm } from "@/hooks/use-confirm"
import { toast } from "sonner"

interface Realty {
    _id: Id<"realty">;
    realtyName: string;
    tagName: string;
    contactPerson: string;
    contactNumber: string;
    photo: string | null;
}

interface RealtyCardProps {
    realty: Realty;
}

export const RealtyCard = ({ realty }: RealtyCardProps) => {
    const [open, setOpen] = useState(false)
    const [editOpen, setEditOpen] = useState(false)
    const [selectedRealty, setSelectedRealty] = useState<Realty | null>(null)

    const { mutate: deleteRealty } = useMutation({
        mutationFn: useConvexMutation(api.realty.remove)
    })

    const [DeleteConfirmDialog, confirmDelete] = useConfirm(
        "Delete Realty",
        "Are you sure you want to delete this realty? This action cannot be undone."
    )

    const handleDelete = async () => {
        const confirmed = await confirmDelete()

        if (confirmed) {
            try {
                await deleteRealty({ id: realty._id })
                toast.success("Project deleted successfully")
                setOpen(false)
                setSelectedRealty(null)
            } catch (error) {
                toast.error("Failed to delete project")
            }
        }
    }

    const handleCardClick = (realty: Realty) => {
        setSelectedRealty(null)
        setEditOpen(false)

        setTimeout(() => {
            setSelectedRealty(realty)
            setOpen(true)
        }, 0)
    }

    const handleEditClick = (realty: Realty) => {
        setSelectedRealty(null)
        setOpen(false)

        setTimeout(() => {
            setSelectedRealty(realty)
            setEditOpen(true)
        })
    }

    const handleDialogClose = () => {
        setOpen(false)
        setSelectedRealty(null)
    }

    const handleEditModalClose = () => {
        setEditOpen(false)
        setSelectedRealty(null)
    }

    return (
        <>
            <Card
                className="cursor-pointer"
                onClick={() => handleCardClick(realty)}
            >
                <CardContent
                    className="flex flex-col gap-2 py-3"
                >
                    <Image
                        src={realty.photo!}
                        alt={realty.realtyName}
                        width={500}
                        height={500}
                        className="rounded-md"
                    />

                    <p className="text-center font-bold text-dark">
                        {realty.tagName}
                    </p>
                </CardContent>
            </Card>

            {selectedRealty && (
                <Dialog open={open} onOpenChange={handleDialogClose}>
                    <DialogContent className="h-[400px]">
                        <DialogHeader>
                            <DialogTitle className="text-3xl text-dark">{selectedRealty.tagName}</DialogTitle>
                            <DialogDescription>{selectedRealty.realtyName}</DialogDescription>
                        </DialogHeader>
                        <div className="border-t w-full" />

                        <div className="text-gray flex justify-end w-full gap-3">
                            <SquarePen
                                className="h-5 w-5 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditClick(selectedRealty)
                                }}
                            />
                            <Trash2Icon
                                className="h-5 w-5 cursor-pointer text-red-500"
                                onClick={handleDelete}
                            />
                        </div>

                        <div className="flex flex-row items-center gap-12">
                            <Image src={selectedRealty.photo!} alt={selectedRealty.realtyName} width={200} height={200} className="rounded-md" />
                            <div className="flex flex-col gap-3">
                                <p className="flex flex-row gap-2">
                                    <Image
                                        src="/contactPerson-icon.svg"
                                        width={15}
                                        height={15}
                                        alt={selectedRealty.contactPerson}
                                    />
                                    {selectedRealty.contactPerson}
                                </p>

                                <p className="flex flex-row gap-2">
                                    <Image
                                        src="/tele-icon.svg"
                                        width={15}
                                        height={15}
                                        alt={selectedRealty.contactNumber}
                                    />
                                    {selectedRealty.contactNumber}
                                </p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}

            <DeleteConfirmDialog />

            {selectedRealty && (
                <EditRealtyModal
                    open={editOpen}
                    onClose={handleEditModalClose}
                    realty={selectedRealty}
                />
            )}
        </>
    )
}