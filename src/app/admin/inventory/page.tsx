"use client"

import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProjectStore } from "@/store/project-store";
import { useQuery } from "convex/react";
import { useCallback, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { PropertyType } from "../../../../data/dummy";
import { InventoryActions } from "../_components/inventory-actions";
import { InventoryCard } from "../_components/inventory-card";
import { inventoryColumns } from "../_components/inventory-columns";

const InventoryPage = () => {
    const selectedProjectId = useProjectStore(state => state.selectedProjectId)
    const [selectedRows, setSelectedRows] = useState<Id<"property">[]>([]);

    const handleRowSelection = useCallback((rows: PropertyType[]) => {
        if (!rows.length) {
            setSelectedRows([]);
            return;
        }

        const validRows = rows.filter(row => row?._id);
        setSelectedRows(validRows.map(row => row._id));
    }, []);

    const properties = useQuery(api.property.get, {
        projectId: selectedProjectId ?? undefined
    })

    const stats = useQuery(api.property.getStats, {
        projectId: selectedProjectId ?? undefined
    });

    const availableProperties = properties?.filter(property => property.status === "available");

    const reservedProperties = properties?.filter(property => property.status === "reserved");

    const soldProperties = properties?.filter(property => property.status === "sold");

    const dueProperties = properties?.filter(property => property.status === "due");

    return (
        <section
            className="flex flex-col justify-start items-center pt-8 min-h-screen h-full"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full px-[50px]">
                <InventoryCard
                    count={properties?.length ?? 0}
                    title="Total Properties"
                    difference={stats?.total.difference ?? 0}
                />
                <InventoryCard
                    count={availableProperties?.length ?? 0}
                    title="Available Properties"
                    difference={stats?.available.difference ?? 0}
                />

                <InventoryCard
                    count={reservedProperties?.length ?? 0}
                    title="Reserved Properties"
                    difference={stats?.reserved.difference ?? 0}
                />

                <InventoryCard
                    count={soldProperties?.length ?? 0}
                    title="Sold Properties"
                    difference={stats?.sold.difference ?? 0}
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
                            onRowSelectionChange={handleRowSelection}
                        />
                    </TabsContent>

                    <TabsContent value="available" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={availableProperties ?? []}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                            onRowSelectionChange={handleRowSelection}
                        />
                    </TabsContent>

                    <TabsContent value="reserved" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={reservedProperties ?? []}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                            onRowSelectionChange={handleRowSelection}
                        />
                    </TabsContent>

                    <TabsContent value="sold" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={soldProperties ?? []}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                            onRowSelectionChange={handleRowSelection}
                        />
                    </TabsContent>

                    <TabsContent value="due" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={dueProperties ?? []}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                            onRowSelectionChange={handleRowSelection}
                        />
                    </TabsContent>
                </Tabs>

                <div className="absolute right-0 top-[65px]">
                    <InventoryActions
                        projectId={selectedProjectId}
                        selectedRows={selectedRows}
                    />
                </div>
            </div>
        </section>
    )
}

export default InventoryPage;