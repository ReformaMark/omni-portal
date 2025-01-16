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
import { MapPin, Pencil, Phone, UserIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { UsersDummyType } from "../../../../../data/dummy-users"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

interface EditSellerModalProps {
    data: UsersDummyType;
    open: boolean;
    onClose: () => void;
}

export const EditSellerModal = ({
    data,
    onClose,
    open,
}: EditSellerModalProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            barangay: data.barangay,
            city: data.city,
            contact: data.contact,
            email: data.email,
            fname: data.fname,
            houseNumber: data.houseNumber,
            lname: data.lname,
            street: data.street,
        }
    })

    const handleSubmit = (values: z.infer<typeof formSchema>) => {

        // TODO: WHEN SUCCESS SEND API BACKEND THEN PROCEED TO FORM.RESET
        console.log(values)

        form.reset()
        // toast?? can also add delay when submitting for decent animation
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
                        className="text-dark font-bold text-3xl flex justify-between items-center gap-2"
                    >
                        <div className="flex flex-row items-center gap-1">
                            <Pencil className="h-5 w-5" />
                            Edit Seller
                        </div>

                        <div>
                            <Select>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Realty" className="text-muted-foreground" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="zonal">ZONAL</SelectItem>
                                    <SelectItem value="hrm">HRM</SelectItem>
                                    <SelectItem value="orpc">ORPC</SelectItem>
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
                                            <Input placeholder="Enter First Name" {...field} />
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
                                            <Input placeholder="Enter Surname" {...field} />
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
                                            <Input placeholder="Enter Email Address" {...field} type="email" />
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
                                            <Input placeholder="Enter Contact Number" {...field} />
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
                                            <Input placeholder="Enter House/Unit #" {...field} />
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
                                            <Input placeholder="Enter Street" {...field} />
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
                                            <Input placeholder="Enter Barangay" {...field} />
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
                                            <Input placeholder="Enter City" {...field} />
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
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}