"use client"

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const BuyerPage = () => {
    const router = useRouter()

    useEffect(()=>{
        router.push('/buyer/owned-properties')
    },[])
    return (
        <div className=""></div>
    )
}

export default BuyerPage;