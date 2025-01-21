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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { MapPin, Phone, UserIcon, UserPlus } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query"
import { api } from "../../../../../convex/_generated/api"
import { getConvexErrorMessage } from "@/lib/utils"
import { toast } from "sonner"
import { useQuery } from "convex/react"
import { useState } from "react"
import { Id } from "../../../../../convex/_generated/dataModel"

const formSchema = z.object({
    fname: z.string().min(1, "First name is required"),
    lname: z.string().min(1, "Last name is required"),
    email: z.string().email().min(1, "Email is required"),
    contact: z.string().min(1, "Contact is required"),
    houseNumber: z.string().min(1, "House Number / Unit is required"),
    street: z.string().min(1, "Street is required"),
    barangay: z.string().min(1, "Barangay is required"),
    city: z.string().min(1, "City is required"),
})

interface AddSellersModalProps {
    open: boolean;
    onClose: () => void;
}

export const AddSellersModal = ({
    onClose,
    open,
}: AddSellersModalProps) => {
    const [selectedRealtyId, setSelectedRealtyId] = useState<string>("");
    const { mutate: createSeller, isPending } = useMutation({
        mutationFn: useConvexMutation(api.users.createSeller)
    })
    const realties = useQuery(api.realty.getWithoutImage);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            barangay: "",
            city: "",
            contact: "",
            email: "",
            fname: "",
            houseNumber: "",
            lname: "",
            street: "",
        }
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!selectedRealtyId) {
            toast.error("Please select a realty");
            return;
        }

        try {

            await createSeller({
                ...values,
                realtyId: selectedRealtyId as Id<"realty">,
            })

            toast.success("Seller created successfully");
            form.reset();
            onClose();
        } catch (error) {
            const ConvexError = getConvexErrorMessage(error as Error);
            toast.error(ConvexError || "Something went wrong");
            console.error("Error creating admin:", error);
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
                        className="text-dark font-bold text-3xl flex justify-between items-center gap-2"
                    >
                        <div className="flex flex-row items-center gap-1">
                            <UserPlus className="h-5 w-5" />
                            Add Seller
                        </div>

                        <div>
                            <Select onValueChange={(value) => setSelectedRealtyId(value)}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Realty" className="text-muted-foreground" />
                                </SelectTrigger>
                                <SelectContent>
                                    {realties?.map((realty) => (
                                        <SelectItem key={realty._id} value={realty._id}>
                                            {realty.realtyName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                        </div>
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
                            <UserIcon className="h-5 w-5" />
                            PERSONAL DETAILS
                        </div>

                        <div
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="fname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter First Name" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Surname</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Surname" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="flex gap-2 text-dark">
                            <Phone className="h-5 w-5" />
                            CONTACT DETAILS
                        </div>

                        <div
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Address</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Email Address" {...field} type="email" disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contact"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Contact Number</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Contact Number" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="flex gap-2 text-dark">
                            <MapPin className="h-5 w-5" />
                            COMPLETE ADDRESS
                        </div>

                        <div
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="houseNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>House / Unit #</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter House/Unit #" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Street</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Street" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="barangay"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Barangay</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Barangay" {...field} disabled={isPending} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter City" {...field} disabled={isPending} />
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
                                disabled={isPending}
                            >
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                className="bg-dark"
                                disabled={isPending}
                            >
                                {isPending ? "Adding..." : "Save Changes"}
                            </Button>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}