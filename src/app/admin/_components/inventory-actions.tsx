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
import { CirclePlus, CreditCard, LandPlot, MapPin, PlusIcon, ReceiptText, Trash2 } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import z from "zod"

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

export const InventoryActions = () => {
    const [openAddModal, setOpenAddModal] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            block: "",
            lot: "",
        }
    })

    const handleSubmit = (values: z.infer<typeof formSchema>) => {

        // TODO: WHEN SUCCESS SEND API BACKEND THEN PROCEED TO FORM.RESET
        console.log(values)

        form.reset()
        // toast?? can also add delay when submitting for decent animation
        setOpenAddModal(false)
    }

    return (
        <>
            <div
                className="pr-[50px]"
            >
                <Button
                    className="ml-2 text-gray"
                    variant="outline"
                    onClick={() => setOpenAddModal(true)}
                >
                    <PlusIcon className="w-9 h-9" />
                </Button>

                <Button
                    className="ml-2 text-gray"
                    variant="outline"
                // TODO: MAKE A CONFIRM MODAL COMPONENT FOR FASTER CONFIRMATION ACTIONS
                >
                    <Trash2 className="w-9 h-9" />
                </Button>
            </div>

            <Dialog
                open={openAddModal}
                onOpenChange={setOpenAddModal}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle
                            className="text-dark font-bold text-3xl flex items-center gap-2"
                        >
                            <CirclePlus className="h-5 w-5" />
                            Add property
                        </DialogTitle>
                        <DialogDescription
                            className="text-muted-foreground text-xs ml-[29px]"
                        >
                            Living Water Subdivision
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
                                    onClick={() => setOpenAddModal(false)}
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

        </>
    )
}