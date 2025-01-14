"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { MapPin, Pencil } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { ProjectDummyType } from "../../../../../data/dummy-project"

const formSchema = z.object({
    projectName: z.string().min(1, "Project name is required"),
    tagName: z.string().min(1, "Tag name is required"),
    projectLocation: z.string().min(1, "Description is required"),
})

interface EditProjectModalProps {
    data: ProjectDummyType;
    open: boolean;
    onClose: () => void;
}

export const EditProjectModal = ({
    data,
    onClose,
    open,
}: EditProjectModalProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectLocation: data.projectLocation,
            projectName: data.projectName,
            tagName: data.tagName,
        }
    })

    const handleSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)

        form.reset()

        onClose()
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
                        Edit Project
                    </DialogTitle>
                    <DialogDescription
                        className="text-muted-foreground text-xs ml-[29px]"
                    >
                        Project Details
                    </DialogDescription>
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
                            className="grid grid-cols-1 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="projectName"
                                render={({ field }) => (
                                    <FormItem>
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
                                    <FormItem>
                                        <FormLabel>Tag Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Tag Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="projectLocation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Description" {...field} />
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
                                onClick={onClose}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="bg-dark"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}