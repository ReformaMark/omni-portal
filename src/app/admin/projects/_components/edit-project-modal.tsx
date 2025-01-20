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
import { Pencil } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import z from "zod"
import { api } from "../../../../../convex/_generated/api"

const formSchema = z.object({
    projectName: z.string().min(1, "Project name is required"),
    tagName: z.string().min(1, "Tag name is required"),
    projectLocation: z.string().min(1, "Description is required"),
})

interface EditProjectModalProps {
    project: {
        _id: string;
        projectName: string;
        tagName: string;
        projectLocation: string;
        photo: string | null;
    };
    isOpen: boolean;
    onClose: () => void;
}

export const EditProjectModal = ({
    project,
    isOpen,
    onClose
}: EditProjectModalProps) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(project.photo)
    const imageInput = useRef<HTMLInputElement>(null)

    const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
    const editProject = useMutation(api.projects.edit);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: project.projectName,
            tagName: project.tagName,
            projectLocation: project.projectLocation,
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
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

            await editProject({
                id: project._id,
                ...values,
                ...(storageId && { storageId }),
            });

            toast.success("Project updated successfully");
            onClose();
        } catch (error) {
            toast.error("Failed to update project");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className="text-dark font-bold text-3xl flex items-center gap-2"
                    >
                        <Pencil className="h-5 w-5" />
                        Edit Project
                    </DialogTitle>
                </DialogHeader>

                <div
                    className="w-full border border-lightGray"
                />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        {/* <div className="flex flex-col items-center gap-3">
                            <div
                                className="relative w-32 h-32 border-2 border-dotted rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => document.getElementById("coverPhoto")?.click()}
                            >
                                {selectedImage ? (
                                    <Image
                                        src={imagePreview}
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
                        </div> */}

                        <div className="relative aspect-video">
                            <Image
                                src={imagePreview!}
                                alt="Project"
                                fill
                                className="object-cover rounded-md"
                            />
                            <Button
                                onClick={() => imageInput.current?.click()}
                                type="button"
                                variant="secondary"
                                className="absolute bottom-2 right-2"
                            >
                                Change Image
                            </Button>
                            <input
                                type="file"
                                ref={imageInput}
                                onChange={handleImageChange}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        <div
                            className="grid grid-cols-5 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="projectName"
                                render={({ field }) => (
                                    <FormItem className="col-span-3">
                                        <FormLabel>Project Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Project Name" {...field} />
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
                        <FormField
                            control={form.control}
                            name="projectLocation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Project Location</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Project Location" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

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