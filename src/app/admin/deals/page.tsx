"use client"

import { useState } from "react";
import { PropertyCard } from "./_components/property-card";
import { DealFinalizationModal } from "./_components/deal-finalization-modal";

const properties = [
    {
        block: "Block 4 Lot 14",
        lotArea: "122.45 sqm",
        pricePerSqm: "6,500",
        terms: "57 months",
        totalContractPrice: "4,956,257.57",
        netContractPrice: "6,500",
        totalSellingPrice: "6,956,257.57",
        propertySpecialist: "Maria Cebu",
        client: "Wendell Dangcalan",
        reservationDate: "12/20/2024",
        realty: "Living Water Subdivision"
    },
    {
        block: "Block 1 Lot 300",
        lotArea: "150.32 sqm",
        pricePerSqm: "7,200",
        terms: "60 months",
        totalContractPrice: "5,234,567.89",
        netContractPrice: "7,200",
        totalSellingPrice: "7,234,567.89",
        propertySpecialist: "Maria Cebu",
        client: "John Smith",
        reservationDate: "12/21/2024",
        realty: "Living Water Subdivision"
    },
    {
        block: "Block 2 Lot 156",
        lotArea: "98.75 sqm",
        pricePerSqm: "6,800",
        terms: "48 months",
        totalContractPrice: "3,876,543.21",
        netContractPrice: "6,800",
        totalSellingPrice: "4,876,543.21",
        propertySpecialist: "Maria Cebu",
        client: "Sarah Johnson",
        reservationDate: "12/22/2024",
        realty: "Living Water Subdivision"
    },
    {
        block: "Block 3 Lot 78",
        lotArea: "135.60 sqm",
        pricePerSqm: "7,500",
        terms: "54 months",
        totalContractPrice: "6,123,456.78",
        netContractPrice: "7,500",
        totalSellingPrice: "8,123,456.78",
        propertySpecialist: "Maria Cebu",
        client: "Michael Brown",
        reservationDate: "12/23/2024",
        realty: "Living Water Subdivision"
    },
    {
        block: "Block 5 Lot 222",
        lotArea: "110.25 sqm",
        pricePerSqm: "6,900",
        terms: "52 months",
        totalContractPrice: "4,567,890.12",
        netContractPrice: "6,900",
        totalSellingPrice: "5,567,890.12",
        propertySpecialist: "Maria Cebu",
        client: "Emily Davis",
        reservationDate: "12/24/2024",
        realty: "Living Water Subdivision"
    },
    {
        block: "Block 6 Lot 45",
        lotArea: "145.80 sqm",
        pricePerSqm: "7,100",
        terms: "58 months",
        totalContractPrice: "5,789,012.34",
        netContractPrice: "7,100",
        totalSellingPrice: "6,789,012.34",
        propertySpecialist: "Maria Cebu",
        client: "David Wilson",
        reservationDate: "12/25/2024",
        realty: "Living Water Subdivision"
    },
]

const DealsPage = () => {
    const [selectedProperty, setSelectedProperty] = useState<typeof properties[0] | null>(null)
    const [modalOpen, setModalOpen] = useState(false)

    const handleFinalize = (property: typeof properties[0]) => {
        setSelectedProperty(property)
        setModalOpen(true)
    }

    return (
        <div className="flex flex-1 overflow-hidden items-center justify-center mt-[40px]">
            <div className="h-full overflow-x-auto">
                <div className="flex gap-6 p-6 min-w-max">
                    {properties.map((property) => (
                        <div className="w-[400px]" key={property.block}>
                            <PropertyCard
                                key={property.block}
                                {...property}
                                onFinalize={() => handleFinalize(property)}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {selectedProperty && (
                <DealFinalizationModal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    block={selectedProperty.block}
                    propertySpecialist={selectedProperty.propertySpecialist}
                    client={selectedProperty.client}
                />
            )}
        </div>

    )
}

export default DealsPage;