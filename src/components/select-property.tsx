"use client";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect } from "react";
import { usePropertyStore } from "@/store/property-store";
import { useProjectStore } from "@/store/project-store";

interface SelectProperTyProps {
    onPropertySelect: (propertyId: Id<"property"> | null) => void;
    defaultValue?: Id<"property">
}

export const SelectProperTy = ({
    onPropertySelect,
    defaultValue
}: SelectProperTyProps) => {
    const selectedProjectId = useProjectStore(state => state.selectedProjectId)
    const setSelectedPropertyId = usePropertyStore(state => state.setSelectedPropertyId)
    const properties = useQuery(api.property.getUserProperty,  {projectId: selectedProjectId ?? undefined});

    useEffect(() => {
        if (properties && properties.length > 0 && !defaultValue) {
            onPropertySelect(properties[0]._id)
            setSelectedPropertyId(properties[0]._id)
        }
    }, [properties, defaultValue, onPropertySelect, setSelectedPropertyId])

    if (!properties) {
        return <div>Loading...</div>;
    }

   
    return (
        <Select
            defaultValue={defaultValue ?? properties[0]?._id}
            onValueChange={(value) => onPropertySelect(value as Id<"property">)}
        >
            <SelectTrigger className="w-[170px]">
                <SelectValue
                    placeholder="Select a project"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Properties</SelectLabel>
                    {properties.map((property) => (
                        <SelectItem
                            key={property._id}
                            value={property._id}
                            className="flex items-center gap-2"
                        >
                            <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4">
                                {/* <div className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full">
                                    <Image
                                        src={property.photo!}
                                        alt={property.propertyName}
                                        className="aspect-square h-full w-full"
                                        width={24}
                                        height={24}
                                    />
                                </div> */}
                                <span>Block {property.block} Lot {property.lot}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}