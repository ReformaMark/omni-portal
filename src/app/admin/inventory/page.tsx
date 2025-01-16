import { DataTable } from "@/components/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dummy } from "../../../../data/dummy";
import { InventoryActions } from "../_components/inventory-actions";
import { InventoryCard } from "../_components/inventory-card";
import { inventoryColumns } from "../_components/inventory-columns";

const InventoryPage = () => {

    const filteredAvailableDummy = dummy.filter((item) => item.status === "Available");
    const filteredReservedDummy = dummy.filter((item) => item.status === "Reserved");
    const filteredSoldDummy = dummy.filter((item) => item.status === "Sold");
    const filteredDueDummy = dummy.filter((item) => item.status === "Due");

    return (
        <section
            className="flex flex-col justify-start items-center pt-8 min-h-screen h-full"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 w-full px-[50px]">
                <InventoryCard
                    count={126}
                    title="Total Properties"
                />

                <InventoryCard
                    count={63}
                    title="Available Properties"
                />

                <InventoryCard
                    count={17}
                    title="Reserved Properties"
                />

                <InventoryCard
                    count={46}
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
                            data={dummy}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                        />
                    </TabsContent>

                    <TabsContent value="available" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={filteredAvailableDummy}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                        />
                    </TabsContent>

                    <TabsContent value="reserved" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={filteredReservedDummy}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                        />
                    </TabsContent>

                    <TabsContent value="sold" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={filteredSoldDummy}
                            isInventory
                            placeholder="Search a property"
                            search="lot"
                        />
                    </TabsContent>

                    <TabsContent value="due" className="space-y-4">
                        <DataTable
                            columns={inventoryColumns}
                            data={filteredDueDummy}
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