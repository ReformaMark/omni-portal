"use client"

import { Button } from "@/components/ui/button";
import { useAuthActions } from "@convex-dev/auth/react";

const BuyerPage = () => {
    const { signOut } = useAuthActions()

    return <Button
        onClick={signOut}
    >
        Logout
    </Button>
}

export default BuyerPage;