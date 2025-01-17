import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"
import Image from "next/image"

interface PropertyCardProps {
    block: string
    lotArea: string
    pricePerSqm: string
    terms: string
    totalContractPrice: string
    netContractPrice: string
    totalSellingPrice: string
    propertySpecialist: string
    client: string
    reservationDate: string
    realty: string
    onFinalize: () => void
}

export const PropertyCard = ({
    block,
    client,
    netContractPrice,
    onFinalize,
    pricePerSqm,
    propertySpecialist,
    reservationDate,
    totalContractPrice,
    totalSellingPrice,
    lotArea,
    terms,
    realty
}: PropertyCardProps) => {
    return (
        <Card className="w-full">
            <CardHeader
                className="bg-dark p-4 rounded-tl-lg rounded-tr-lg"
            >
                <CardTitle className="flex flex-row justify-between text-white text-2xl">
                    <span>{block}</span>
                    <MapPin className="h-9 w-9" />
                </CardTitle>
                <CardDescription className="text-white">
                    {realty}
                </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
                <div className="flex justify-end text-sm px-3">
                    <span className="text-muted-foreground">Date Added:</span>12/26/2024
                </div>

                <div className="px-5 text-[#A1A7AE] flex flex-row items-center gap-1 mt-5">
                    <Image
                        alt="icon"
                        src={"/prop-details-icon.svg"}
                        width={15}
                        height={15}
                    />
                    PROPERTY DETAILS
                </div>

                <div className="w-full flex flex-col items-center gap-2 mt-3">
                    <div className="flex flex-row justify-between w-full px-[60px]">
                        <p className="text-[#4D4F51]">Lot Area</p>
                        <p>{lotArea}</p>
                    </div>

                    <div className="flex flex-row justify-between w-full px-[60px]">
                        <p className="text-[#4D4F51]">Price per sqm</p>
                        <p>{pricePerSqm}</p>
                    </div>

                    <div className="flex flex-row justify-between w-full px-[60px]">
                        <p className="text-[#4D4F51]">Term</p>
                        <p>{terms}</p>
                    </div>
                </div>

                <div className="px-5 text-[#A1A7AE] flex flex-row items-center gap-1 mt-5">
                    <Image
                        alt="icon"
                        src={"/receipt-minus.svg"}
                        width={15}
                        height={15}
                    />
                    FINANCIAL DETAILS
                </div>

                <div className="w-full flex flex-col items-center gap-2 mt-3">
                    <div className="flex flex-row justify-between w-full px-[60px]">
                        <p className="text-[#4D4F51]">Total Contract Price</p>
                        <p>{totalContractPrice}</p>
                    </div>

                    <div className="flex flex-row justify-between w-full px-[60px]">
                        <p className="text-[#4D4F51]">Net Contract Price</p>
                        <p>{netContractPrice}</p>
                    </div>

                    <div className="flex flex-row justify-between w-full px-[60px]">
                        <p className="text-[#4D4F51]">Total Selling Price</p>
                        <p>{totalSellingPrice}</p>
                    </div>
                </div>


                <div className="flex items-center justify-center bg-dark h-[1px] mx-7 mt-5" />

                <div className="px-5 text-[#A1A7AE] flex flex-row items-center gap-1 mt-5">
                    <Image
                        alt="icon"
                        src={"/receipt-minus.svg"}
                        width={15}
                        height={15}
                    />
                    FINANCIAL DETAILS
                </div>

                <div className="w-full flex flex-col items-center gap-2 my-3">
                    <div className="flex flex-row justify-between w-full px-[60px]">
                        <p className="text-[#4D4F51]">Property Specialist</p>
                        <p>{propertySpecialist}</p>
                    </div>

                    <div className="flex flex-row justify-between w-full px-[60px]">
                        <p className="text-[#4D4F51]">Client</p>
                        <p>{client}</p>
                    </div>

                    <div className="flex flex-row justify-between w-full px-[60px]">
                        <p className="text-[#4D4F51]">Reservation Expiry</p>
                        <p>{reservationDate}</p>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center px-3 my-5">
                    <Button
                        className="w-[75%]"
                        onClick={onFinalize}
                    >
                        Finalize Deal
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}