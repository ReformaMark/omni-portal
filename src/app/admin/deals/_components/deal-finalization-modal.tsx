"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { useState } from "react"

interface DealFinalizationModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    block: string
    propertySpecialist: string
    client: string
}

export const DealFinalizationModal = ({
    block,
    client,
    onOpenChange,
    open,
    propertySpecialist,
}: DealFinalizationModalProps) => {

    const [documents, setDocuments] = useState<{ [key: number]: File | null }>({
        1: null,
        2: null,
        3: null,
        4: null,
        5: null,
    })

    const handleFileChange = (index: number, file: File | null) => {
        setDocuments(prev => ({ ...prev, [index]: file }))
    }

    const handleCloseDeal = () => {
        console.log("Closing deal with documents:", documents)
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
                <DialogHeader className="bg-[#0A1D3B] text-white p-6 space-y-1">
                    <DialogTitle className="text-xl">Deal Finalization</DialogTitle>
                    <p className="text-sm text-white/70">{block}</p>
                </DialogHeader>

                <div className="p-6 space-y-6">
                    {/* Specialist and Client Info */}
                    <div className="grid grid-cols-2 gap-8 ml-[70px]">
                        <div className="space-y-1">
                            <h3 className="font-medium">{propertySpecialist}</h3>
                            <p className="text-sm text-muted-foreground">Property Specialist</p>
                        </div>
                        <div className="space-y-1">
                            <h3 className="font-medium">{client}</h3>
                            <p className="text-sm text-muted-foreground">Client</p>
                        </div>
                    </div>

                    <Separator />

                    {/* Document Upload Section */}
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((index) => (
                            <div key={index} className="flex flex-col justify-center gap-4 px-5">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src="/folder-cloud.svg"
                                        width={17}
                                        height={17}
                                        alt="folder cloud icon"
                                    />
                                    <span className="text-sm font-medium">Document {index}</span>
                                </div>
                                <div className="flex-1 flex items-center gap-2">
                                    <Button
                                        type="button"
                                        className="bg-[#0A1D3B] hover:bg-[#152C4F] text-white rounded-full"
                                        onClick={() => {
                                            document.getElementById(`document-${index}`)?.click()
                                        }}
                                    >
                                        Upload File
                                    </Button>
                                    <div className="flex-1 text-sm text-muted-foreground px-3 py-2 bg-transparent rounded-full border">
                                        {documents[index]?.name || "No file chosen"}
                                    </div>
                                    <input
                                        type="file"
                                        id={`document-${index}`}
                                        className="hidden"
                                        onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="px-8"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleCloseDeal}
                            className="px-8 bg-[#0A1D3B] hover:bg-[#152C4F]"
                        >
                            Close Deal
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}