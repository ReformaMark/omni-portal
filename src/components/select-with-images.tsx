"use client";

import Image from "next/image";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select"
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { useEffect } from "react";

interface SelectWithImagesProps {
    onProjectSelect: (projectId: Id<"project"> | null) => void;
    defaultValue?: Id<"project">
}

export const SelectWithImages = ({
    onProjectSelect,
    defaultValue
}: SelectWithImagesProps) => {
    const projects = useQuery(api.projects.get);

    useEffect(() => {
        if (projects && projects.length > 0 && !defaultValue) {
            onProjectSelect(projects[0]._id);
        }
    }, [projects, defaultValue, onProjectSelect]);

    if (!projects) {
        return <div>Loading...</div>;
    }

    return (
        <Select
            defaultValue={defaultValue ?? projects[0]?._id}
            onValueChange={(value) => onProjectSelect(value as Id<"project">)}
        >
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