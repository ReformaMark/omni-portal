"use client"

import { useConvexAuth } from "convex/react";
import { useState } from "react"
import { SignInCard } from "./sign-in-card";
import { SignUpCard } from "./sign-up-card";
import { RoleCheck } from "./logged-in";

export type AuthFlow = "signIn" | "signUp";

export const AuthScreen = () => {
    const [state, setState] = useState<AuthFlow>("signIn")
    const { isAuthenticated } = useConvexAuth()

    if (isAuthenticated) {
        return <RoleCheck />
    }

    return (
        <div className="h-screen w-full lg:flex lg:flex-row">
            <div className="hidden lg:w-[50%] bg-gradient-to-b from-primary to-primary/70 lg:flex lg:flex-col lg:justify-center lg:items-center text-white px-[76px]">
                {/* <h1 className="text-3xl font-bold mb-4 text-center">Simplify your workflow with seamless electronic records management!</h1> */}
                <p className="text-lg font-medium">
                    OMNI Portal
                </p>
            </div>

            <div className="h-full w-full lg:w-[50%] flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-primary to-primary/70">

                <div className="h-full flex items-center justify-center ">
                    <div className="md:h-auto md:w-[420px]">
                        {state === "signIn" ? <SignInCard setState={setState} /> : <SignUpCard setState={setState} />}
                    </div>
                </div>
            </div>
        </div>
    )
}