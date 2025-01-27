import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"


export const StatusBadge = ({ status }: { status: string }) => {
    const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);

    return (
        <Badge
            variant="outline"
            className={cn(
                "rounded-[15px]",
                status === "approved"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : status === "pending"
                        ? "bg-yellow-50 text-yellow-700 border-yellow-200" : status === "declined"
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-[#FFD9B2] text-[#DD6109]"
            )}
        >
            <span className="mr-1">
                •
            </span>
            {capitalizedStatus}
        </Badge>
    )
}