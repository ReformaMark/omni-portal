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
import { CreditCard, LandPlot, MapPin, Pencil, ReceiptText } from "lucide-react"
import { useForm } from "react-hook-form"
import z from "zod"
import { PropertyType } from "../../../../data/dummy"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { toast } from "sonner"

const formSchema = z.object({
    block: z.string().min(1, "Block is required"),
    lot: z.string().min(1, "Lot is required"),
    lotArea: z.coerce.number().min(1, "Lot area is required"),
    pricePerSqm: z.coerce.number().min(1, "Price per sqm is required"),
    totalContractPrice: z.coerce.number().min(1, "Total contract price is required"),
    netContractPrice: z.coerce.number().min(1, "Net contract price is required"),
    totalSellingPrice: z.coerce.number().min(1, "Total selling price is required"),
    monthlyAmortization: z.coerce.number().min(1, "Monthly amortization is required"),
    term: z.coerce.number().min(1, "Term is required"),
})

interface InventoryEditModalProps {
    data: PropertyType;
    open: boolean;
    onClose: () => void;
    projectName?: string;
}

export const InventoryEditModal = ({
    data,
    onClose,
    open,
    projectName,
}: InventoryEditModalProps) => {
    const editProperty = useMutation(api.property.edit);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            block: data.block,
            lot: data.lot,
            lotArea: data.lotArea,
            monthlyAmortization: data.monthlyAmortization,
            netContractPrice: data.netContractPrice,
            pricePerSqm: data.pricePerSqm,
            term: data.term,
            totalContractPrice: data.totalContractPrice,
            totalSellingPrice: data.totalSellingPrice,
        }
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await editProperty({
                id: data._id,
                ...values,
            });

            toast.success("Property updated successfully");
            form.reset();
            onClose();
        } catch (error) {
            toast.error("Failed to update property");
            console.error(error);
        }
    };
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
                        Edit property
                    </DialogTitle>
                    <DialogDescription
                        className="text-muted-foreground text-xs ml-[29px]"
                    >
                        {projectName ?? "Loading..."}
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
                            PROPERTY LOCATION
                        </div>

                        <div
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="block"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Block</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Block" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lot"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lot</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Lot" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="flex gap-2 text-dark">
                            <LandPlot className="h-5 w-5" />
                            AREA & PRICE DETAILS
                        </div>

                        <div
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="lotArea"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Lot Area (sqm)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Lot Area" {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="pricePerSqm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Price per sqm</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Price per sqm" {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="flex gap-2 text-dark">
                            <ReceiptText className="h-5 w-5" />
                            CONTRACT DETAILS
                        </div>

                        <div
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="totalContractPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Contract Price (TCP)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter TCP" {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="netContractPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Net Contract Price</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Net Contract Price" {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>


                        <div className="flex gap-2 text-dark">
                            <CreditCard className="h-5 w-5" />
                            PAYMENT DETAILS
                        </div>

                        <div
                            className="grid grid-cols-2 gap-4"
                        >
                            <FormField
                                control={form.control}
                                name="totalSellingPrice"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total Selling Price (TSP)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter TSP" {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="monthlyAmortization"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Monthly Amortization</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Monthly Amount" {...field} type="number" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="term"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Term (Months)</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter Term" {...field} type="number" />
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
                                Save changes
                            </Button>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>
    )
}