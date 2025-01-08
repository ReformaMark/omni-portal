"use client";

import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"

interface Option {
    value: string;
    label: string;
    image: string;
}

const options: Option[] = [
    {
        value: "living-water",
        label: "Living Water Subdivision",
        image: "/living-water.jfif",
    },
    {
        value: "green-meadows",
        label: "Green Meadows Estate",
        image: "/placeholder.svg",
    },
    {
        value: "sunset-valley",
        label: "Sunset Valley Heights",
        image: "/placeholder.svg",
    },
]

export const SelectWithImages = () => {
    return (
        <Select>
            <SelectTrigger className="w-[300px]">
                <SelectValue
                    placeholder="Select a subdivision"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Subdivisions</SelectLabel>
                    {options.map((option) => (
                        <SelectItem
                            key={option.value}
                            value={option.value}
                            className="flex items-center gap-2"
                        >
                            <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4">
                                <div className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full">
                                    <Image
                                        src={option.image}
                                        alt={option.label}
                                        className="aspect-square h-full w-full"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <span>{option.label}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}