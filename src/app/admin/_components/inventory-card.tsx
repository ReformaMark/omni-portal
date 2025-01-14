import { Card, CardContent } from "@/components/ui/card"

interface InventoryCardProps {
    title: string;
    count: number;
}

export const InventoryCard = ({
    count,
    title,
}: InventoryCardProps) => {
    return (
        <Card className="w-full h-full py-3">
            <CardContent className="flex flex-col gap-4">
                <p className="text-muted-foreground text-sm">
                    {title}
                </p>
                <div className="flex items-center justify-between">
                    <h1 className="text-[43px] font-bold text-dark">
                        {count}
                    </h1>

                    <p className="text-sm text-muted-foreground">
                        <span className="text-dark">+12 </span>
                        last month
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}