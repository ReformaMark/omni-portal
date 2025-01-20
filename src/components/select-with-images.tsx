"use client";

import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

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

interface SelectWithImagesProps {
    onProjectSelect: (projectId: Id<"project"> | null) => void;
}

export const SelectWithImages = ({ onProjectSelect }: SelectWithImagesProps) => {
    const projects = useQuery(api.projects.get);

    if (!projects) {
        return <div>Loading...</div>;
    }

    return (
        <Select onValueChange={(value) => onProjectSelect(value as Id<"project">)} defaultValue={projects[0]._id}>
            <SelectTrigger className="w-[300px]">
                <SelectValue
                    placeholder="Select a project"
                />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Projects</SelectLabel>
                    {projects.map((project) => (
                        <SelectItem
                            key={project._id}
                            value={project._id}
                            className="flex items-center gap-2"
                        >
                            <div className="flex items-center gap-2 [&_svg]:h-4 [&_svg]:w-4">
                                <div className="relative flex h-6 w-6 shrink-0 overflow-hidden rounded-full">
                                    <Image
                                        src={project.photo!}
                                        alt={project.projectName}
                                        className="aspect-square h-full w-full"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <span>{project.projectName}</span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}