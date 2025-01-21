import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils";

interface InventoryCardProps {
    title: string;
    count: number;
    difference: number;
}

export const InventoryCard = ({
    count,
    title,
    difference
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
                        <span className={cn("text-dark", {
                            "text-green-500": difference > 0,
                            "text-red-500": difference < 0
                        })}>
                            {difference > 0 ? "+" : ""}{difference}
                        </span>
                        {" "}last month
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}