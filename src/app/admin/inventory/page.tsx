"use client"

import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummy } from "../../../../data/dummy";
import { InventoryActions } from "../_components/inventory-actions";
import { InventoryCard } from "../_components/inventory-card";
import { inventoryColumns } from "../_components/inventory-columns";
import { useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { SelectWithImages } from "@/components/select-with-images";

const InventoryPage = () => {
    const [selectedProjectId, setSelectedProjectId] = useState<Id<"project"> | null>(null);

    const properties = useQuery(api.property.get, {
        projectId: selectedProjectId ?? undefined
    });

    console.log(properties)

    const availableProperties = useQuery(api.property.getByStatus, {
        projectId: selectedProjectId ?? undefined,
        status: "available"
    });

    const reservedProperties = useQuery(api.property.getByStatus, {
        projectId: selectedProjectId ?? undefined,
        status: "reserved"
    });

    const soldProperties = useQuery(api.property.getByStatus, {
        projectId: selectedProjectId ?? undefined,
        status: "sold"
    });

    const dueProperties = useQuery(api.property.getByStatus, {
        projectId: selectedProjectId ?? undefined,
        status: "due"
    });

    return (
        <section
            className="flex flex-col justify-start items-center pt-8 min-h-screen h-full"
        >
            <SelectWithImages onProjectSelect={setSelectedProjectId} />

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full px-[50px]">
                <InventoryCard
                    count={properties?.length ?? 0}
                    title="Total Properties"
                />
                <InventoryCard
                    count={availableProperties?.length ?? 0}
                    title="Available Properties"
                />

                <InventoryCard
                    count={reservedProperties?.length ?? 0}
                    title="Reserved Properties"
                />

                <InventoryCard
                    count={soldProperties?.length ?? 0}
                    title="Sold Properties"
                />
            </div>

            <div className="container mx-auto py-10 px-[50px] relative">
                <Tabs defaultValue="all" className="w-full">
                    <TabsList className="bg-lightGray text-gray absolute top-[15px] xl:top-[64px]">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="available">Available</TabsTrigger>
                        <TabsTrigger value="reserved">Reserved</TabsTrigger>
                        <TabsTrigger value="sold">Sold</TabsTrigger>
                        <TabsTrigger value="due">Due</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={properties ?? []}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                        />
                    </TabsContent>

                    <TabsContent value="available" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={availableProperties ?? []}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                        />
                    </TabsContent>

                    <TabsContent value="reserved" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={reservedProperties ?? []}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                        />
                    </TabsContent>

                    <TabsContent value="sold" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={soldProperties ?? []}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                        />
                    </TabsContent>

                    <TabsContent value="due" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={dueProperties ?? []}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                        />
                    </TabsContent>
                </Tabs>

                <div className="absolute right-0 top-[65px]">
                    <InventoryActions />
                </div>
            </div>
        </section>
    )
}

export default InventoryPage;