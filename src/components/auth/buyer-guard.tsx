"use client"

import { useCheckRole } from "@/hooks/use-check-role";
import { useConvexAuth } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function BuyerGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const { isAuthenticated, isLoading: isAuthLoading } = useConvexAuth()
    const { data: role, isLoading: isRoleLoading } = useCheckRole()

    useEffect(() => {
        if (!isAuthLoading && !isRoleLoading) {
            if (!isAuthenticated) {
                router.push("/")
                return
            }

            // Based on schema.ts roles: "admin", "teacher", "school-head", "staff"
            if (role !== "buyer") {
                // Redirect non-admin users to appropriate routes
                switch (role) {
                    case "admin":
                        router.push("/admin")
                        break
                    case "seller":
                        router.push("/seller")
                        break
                    default:
                        router.push("/auth")
                }
                return
            }
        }
    }, [isAuthenticated, isAuthLoading, isRoleLoading, role, router])

    // Show nothing while checking authentication and role
    if (isAuthLoading || isRoleLoading) {
        return null
    }

    // Only render children if authenticated and buyer
    if (isAuthenticated && role === "buyer") {
        return <>{children}</>
    }

    return null
}