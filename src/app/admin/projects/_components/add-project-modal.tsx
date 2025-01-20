import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";

import { CirclePlus, HousePlus } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import { toast } from "sonner";

const formSchema = z.object({
    projectName: z.string().min(1, "Project name is required."),
    tagName: z.string().min(1, "Tag name is required"),
    projectLocation: z.string().min(1, "Project location is required"),
})

interface AddProjectModalProps {
    onOpen: (open: boolean) => void;
    open: boolean;
}

export const AddProjectModal = ({
    onOpen,
    open,
}: AddProjectModalProps) => {
    const generateUploadUrl = useMutation(api.projects.generateUploadUrl);
    const addProject = useMutation(api.projects.create)

    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)
    const imageInput = useRef<HTMLInputElement | null>(null)

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

    const handleAddProject = async (values: z.infer<typeof formSchema>) => {
        try {
            const postUrl = await generateUploadUrl()

            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": selectedImage!.type },
                body: selectedImage,
            });

            const { storageId } = await result.json();

            await addProject({
                storageId,
                ...values,
            })

            form.reset();
            setSelectedImage(null);
            if (imageInput.current) {
                imageInput.current.value = "";
            }

            toast.success(`Successfully added project ${values.projectName}`)

            onOpen(false)
        } catch (error) {
            toast.error("Failed to add project")
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectLocation: "",
            projectName: "",
            tagName: "",
        }
    })

    return (
        <Dialog
            open={open}
            onOpenChange={onOpen}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle
                        className="text-dark font-bold text-3xl flex items-center gap-2"
                    >
                        <CirclePlus className="h-5 w-5" />
                        Add project
                    </DialogTitle>
                </DialogHeader>

                <div
                    className="w-full border border-lightGray"
                />

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleAddProject)}
                        className="space-y-4 flex flex-col items-center justify-center"
                    >
                        <div
                            className="relative w-32 h-32 border-2 border-dotted rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => document.getElementById("coverPhoto")?.click()}
                        >
                            {selectedImage ? (
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
                                        {/* <p className="absolute text-xs top-[60px]">UPLOAD COVER PHOTO</p> */}
                                    </div>
                                )}
                        </div>
                        <p className="text-xs">UPLOAD COVER PHOTO</p>

                        <div
                            className="grid grid-cols-5 gap-4 w-full"
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

                        <div className="w-full">
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
                        </div>

                        <div
                            className="flex justify-end gap-4"
                        >
                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => onOpen(false)}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="bg-dark"
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}