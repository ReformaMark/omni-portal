import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { projectDummy } from "../../../../../data/dummy-project"
import Image from "next/image"

export const ProjectCard = () => {
    return (
        <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-[1300px]"
        >
            {projectDummy.map((p) => (
                <Card
                    className=""
                >
                    <CardContent
                        className="flex flex-col gap-2 py-3"
                    >
                        <Image
                            src={p.photo!}
                            alt={p.projectName}
                            width={500}
                            height={500}
                            className="rounded-md"
                        />

                        <p className="text-center font-bold text-dark">
                            {p.tagName}
                        </p>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}