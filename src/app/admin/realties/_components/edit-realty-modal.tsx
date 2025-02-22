"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react"
import { HousePlus, MapPin, Pencil } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"

const formSchema = z.object({
    realtyName: z.string().min(1, "Realty name is required."),
    tagName: z.string().min(1, "Tag name is required"),
    contactPerson: z.string().min(1, "Contact person is required"),
    contactNumber: z.string().min(1, "Contact number is required")
})

interface EditRealtyModalProps {
    realty: {
        _id: Id<"realty">;
        realtyName: string;
        tagName: string;
        contactPerson: string;
        contactNumber: string;
        photo: string | null;
    }
    open: boolean;
    onClose: () => void;
}

export const EditRealtyModal = ({
    realty,
    onClose,
    open,
}: EditRealtyModalProps) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(realty.photo)
    const imageInput = useRef<HTMLInputElement>(null)

    const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
    const editRealty = useMutation(api.realty.edit);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contactNumber: realty.contactNumber,
            contactPerson: realty.contactPerson,
            realtyName: realty.realtyName,
            tagName: realty.tagName,
        }
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            let storageId = undefined;

            if (selectedImage) {
                const postUrl = await generateUploadUrl();
                const result = await fetch(postUrl, {
                    method: "POST",
                    headers: { "Content-Type": selectedImage.type },
                    body: selectedImage,
                });
                const { storageId: newStorageId } = await result.json();
                storageId = newStorageId;
            }

            await editRealty({
                id: realty._id,
                realtyName: values.realtyName,
                tagName: values.tagName,
                contactPerson: values.contactPerson,
                contactNumber: values.contactNumber,
                ...(storageId && { storageId }),
            })

            toast.success("Realty updated successfully");
            onClose();
        } catch (error) {
            toast.error("Failed to update realty");
            console.error(error)
        }
    }

    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className="text-dark font-bold text-3xl flex items-center gap-2"
                    >
                        <Pencil className="h-5 w-5" />
                        Edit realty
                    </DialogTitle>
                </DialogHeader>

                <div
                    className="w-full border border-lightGray"
                />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleSubmit)}
                        className="space-y-4"
                    >
                        <div className="flex gap-2 text-dark">
                            <MapPin className="h-5 w-5" />
                            PROJECT DETAILS
                        </div>

                        <div
                            className="grid grid-cols-5 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="realtyName"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>Realty Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Realty Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="tagName"
                                render={({ field }) => (
                                    <FormItem className="col-span-2">
                                        <FormLabel>Tag Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Tag Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="w-full grid grid-cols-5 gap-[55px]">
                            <div className="col-span-3">
                                <FormField
                                    control={form.control}
                                    name="contactPerson"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Person</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Contact Person" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="contactNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Contact Number</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter Contact Number" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="col-span-2">
                                <div
                                    className="relative mb-2 w-32 h-32 border-2 border-dotted rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                                    onClick={() => document.getElementById("coverPhoto")?.click()}
                                >
                                    {(selectedImage || imagePreview) ? (
                                        <Image
                                            src={imagePreview || "/placeholder.svg"}
                                            alt="Preview"
                                            className="w-full h-full object-cover rounded-lg"
                                            width={400}
                                            height={400}
                                            onClick={() => {
                                                setImagePreview(null)
                                                setSelectedImage(null)
                                            }}
                                        />
                                    ) :
                                        (
                                            <div className="">
                                                <HousePlus className="w-12 h-12 text-gray-300" />
                                                <Input
                                                    type="file"
                                                    accept="image/*"
                                                    id="coverPhoto"
                                                    ref={imageInput}
                                                    onChange={handleImageChange}
                                                    disabled={selectedImage !== null}
                                                    className="hidden"
                                                />
                                            </div>
                                        )}
                                </div>
                                <p className="text-xs">UPLOAD COVER PHOTO</p>
                            </div>
                        </div>

                        <div
                            className="flex justify-end gap-4"
                        >
                            <Button
                                variant="outline"
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="bg-dark"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}