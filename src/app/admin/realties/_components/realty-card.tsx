import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { SquarePen } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { realtyDummy, RealtyDummyType } from "../../../../../data/dummy-realty"
import { EditRealtyModal } from "./edit-realty-modal"

export const RealtyCard = () => {
    const [open, setOpen] = useState(false)
    const [selectedRealty, setSelectedRealty] = useState<RealtyDummyType | null>(null)
    const [editOpen, setEditOpen] = useState(false)

    const handleCardClick = (project: RealtyDummyType) => {
        setSelectedRealty(null)
        setEditOpen(false)

        setTimeout(() => {
            setSelectedRealty(project)
            setOpen(true)
        }, 0)
    }

    const handleEditClick = (project: RealtyDummyType) => {
        setSelectedRealty(null)
        setOpen(false)

        setTimeout(() => {
            setSelectedRealty(project)
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
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1300px]"
            >
                {realtyDummy.map((p) => (
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
                                    alt={p.realtyName}
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

            {selectedRealty && (
                <Dialog open={open} onOpenChange={handleDialogClose}>
                    <DialogContent className="h-[400px]">
                        <DialogHeader>
                            <DialogTitle className="text-3xl text-dark">{selectedRealty.tagName}</DialogTitle>
                            <DialogDescription>{selectedRealty.realtyName}</DialogDescription>
                        </DialogHeader>
                        <div className="border-t w-full" />

                        <div className="text-gray flex justify-end w-full">
                            <SquarePen
                                className="h-5 w-5 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleEditClick(selectedRealty)
                                }}
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

            {selectedRealty && (
                <EditRealtyModal
                    open={editOpen}
                    onClose={handleEditModalClose}
                    data={selectedRealty}
                />
            )}
        </>
    )
}