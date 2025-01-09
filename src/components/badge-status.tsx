import { cn } from "@/lib/utils"
import { Badge } from "./ui/badge"

export const BadgeStatus = ({ status }: { status: string }) => {
    return (
        <Badge
            variant="outline"
            className={cn(
                "rounded-[15px]",
                status === "Available"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : status === "Reserved"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200" : status === "Sold"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-[#FFD9B2] text-[#DD6109]"
            )}
        >
            • {status}
        </Badge>
    )
}