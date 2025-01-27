import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Eye, EyeOff, TriangleAlertIcon } from "lucide-react"

// import { useRouter } from "next/navigation"
import { usePasswordVisibility } from "@/hooks/use-password-visibility"
import { generateBuyerId } from "@/lib/utils"
import { useAuthActions } from "@convex-dev/auth/react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { AuthFlow } from "./auth-screen"

export const SignUpCard = ({
    setState
}: {
    setState: (state: AuthFlow) => void
}) => {
    const { signIn } = useAuthActions()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [contact, setContact] = useState("");
    // const [houseNumber, setHouseNumber] = useState("");
    // const [street, setStreet] = useState("");
    // const [barangay, setBarangay] = useState("");
    // const [city, setCity] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [terms, setTerms] = useState(false);
    const [pending, setPending] = useState<boolean>(false);
    const [error, setError] = useState("");
    const { inputType, isVisible, toggleVisibility } = usePasswordVisibility()

    const accountId = generateBuyerId();

    // const router = useRouter()

    const onSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setPending(true)

        if (!terms) {
            setError("Please make sure you agree to the terms and privacy")
            setPending(false)
            return
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setPending(false)
            return
        }

        setError("")

        try {

            await signIn("password", {
                accountId,
                email,
                password,
                fname,
                lname,
                contact,
                // houseNumber,
                // street,
                // barangay,
                // city,
                role: "buyer",
                flow: "signUp",
            })

        } catch (error) {
            setError("Something went wrong. Please try again.")
            console.error(error)
        } finally {
            setPending(false)
        }
    }

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <Image
                src="/hdc-logo.svg"
                alt="HDC Logo"
                width={80}
                height={80}
            />
            <p className="text-dark text-sm">
                HENCEFORTH DEVELOPMENT CORPORATION
            </p>
            <div className="flex flex-col w-full space-y-2 mb-3">
                <p className="mt-12 text-dark text-2xl font-semibold">
                    Create a Buyer Account
                </p>

                <p className="text-sm">
                    Welcome! Enter your personal data.
                </p>
            </div>

            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlertIcon className="size-4" />
                    {error}
                </div>
            )}

            <form onSubmit={onSignUp} className="space-y-4 mt-2 w-full">
                <div className="relative">
                    <Image
                        src="/user-pencil.svg"
                        alt="user icon"
                        width={20}
                        height={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />
                    <Input
                        disabled={pending}
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                        placeholder="First Name"
                        type="text"
                        required
                        className="pl-10 h-[50px]"
                    />
                </div>

                <div className="relative">
                    <Image
                        src="/user-pencil.svg"
                        alt="user icon"
                        width={20}
                        height={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />
                    <Input
                        disabled={pending}
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                        placeholder="Last Name"
                        type="emtextail"
                        required
                        className="pl-10 h-[50px]"
                    />
                </div>

                <div className="relative">
                    <Image
                        src="/email-icon.svg"
                        alt="Email Icon"
                        width={20}
                        height={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />
                    <Input
                        disabled={pending}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        type="email"
                        required
                        className="pl-10 h-[50px]"
                    />
                </div>

                <div className="relative">
                    <Image
                        src="/phone.svg"
                        alt="phone icon"
                        width={20}
                        height={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />
                    <Input
                        disabled={pending}
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Contact Number"
                        type="number"
                        required
                        className="pl-10 h-[50px]"
                    />
                </div>

                <div className="relative">
                    <Image
                        src="/password-icon.svg"
                        alt="Password Icon"
                        width={20}
                        height={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />
                    <Input
                        type={inputType}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 h-[50px]"
                    />
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {isVisible ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                        )}
                    </button>
                </div>

                <div className="relative">
                    <Image
                        src="/password-icon.svg"
                        alt="Password Icon"
                        width={20}
                        height={20}
                        className="absolute left-3 top-1/2 transform -translate-y-1/2"
                    />
                    <Input
                        type={inputType}
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 h-[50px]"
                    />
                    <button
                        type="button"
                        onClick={toggleVisibility}
                        className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                        {isVisible ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                        ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                        )}
                    </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center items-start justify-between w-full">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="terms"
                            checked={terms}
                            onCheckedChange={(checked) => setTerms(checked as boolean)}
                        />
                        <label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree to the
                            <Link href="/terms-and-conditions" className="ml-1 text-dark font-semibold">
                                Terms and Privacy
                            </Link>
                        </label>
                    </div>

                    {/* <div>
                        <a
                            href="#"
                            className="text-dark text-sm font-medium"
                        >
                            Forgot password?
                        </a>
                    </div> */}
                </div>

                <Button
                    type="submit"
                    className="w-full text-white h-[50px]"
                    size={"lg"}
                    disabled={pending}
                >
                    Log In
                </Button>
            </form>

            <div className="mt-11">
                <p className="text-sm text-muted-foreground">
                    Already have an account?  <span
                        className="text-primary hover:underline cursor-pointer"
                        onClick={() => setState("signIn")}>
                        <span className="text-dark font-semibold">Log in</span>
                    </span>
                </p>
            </div>
        </div >
        // <Card className="w-full h-full p-8">
        //     <CardHeader className="px-0 pt-0">
        //         <CardTitle className="text-primary">
        //             Sign up to continue
        //         </CardTitle>
        //         <CardDescription>
        //             All fields are required to continue
        //         </CardDescription>
        //     </CardHeader>
        //     {!!error && (
        //         <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
        //             <TriangleAlertIcon className="size-4" />
        //             {error}
        //         </div>
        //     )}
        //     <CardContent className="space-y-5 px-0 pb-0">
        //         <form onSubmit={onSignUp} className="space-y-2.5">
        //             <Input
        //                 disabled={pending}
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 placeholder="Email"
        //                 type="email"
        //                 required
        //             />
        //             <Input
        //                 disabled={pending}
        //                 value={password}
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 placeholder="Password"
        //                 type="password"
        //                 required
        //             />
        //             <Input
        //                 disabled={pending}
        //                 value={confirmPassword}
        //                 onChange={(e) => setConfirmPassword(e.target.value)}
        //                 placeholder="Confirm Password"
        //                 type="password"
        //                 required
        //             />
        //             <Input
        //                 disabled={pending}
        //                 value={fname}
        //                 onChange={(e) => setFname(e.target.value)}
        //                 placeholder="First Name"
        //                 type="text"
        //                 required
        //             />
        //             <Input
        //                 disabled={pending}
        //                 value={lname}
        //                 onChange={(e) => setLname(e.target.value)}
        //                 placeholder="Last Name"
        //                 type="text"
        //                 required
        //             />
        //             <Input
        //                 disabled={pending}
        //                 value={contact}
        //                 onChange={(e) => setContact(e.target.value)}
        //                 placeholder="Contact Number"
        //                 type="text"
        //                 required
        //             />
        //             <Input
        //                 disabled={pending}
        //                 value={houseNumber}
        //                 onChange={(e) => setHouseNumber(e.target.value)}
        //                 placeholder="House Number"
        //                 type="text"
        //                 required
        //             />
        //             <Input
        //                 disabled={pending}
        //                 value={street}
        //                 onChange={(e) => setStreet(e.target.value)}
        //                 placeholder="Street"
        //                 type="text"
        //                 required
        //             />
        //             <Input
        //                 disabled={pending}
        //                 value={barangay}
        //                 onChange={(e) => setBarangay(e.target.value)}
        //                 placeholder="Barangay"
        //                 type="text"
        //                 required
        //             />
        //             <Input
        //                 disabled={pending}
        //                 value={city}
        //                 onChange={(e) => setCity(e.target.value)}
        //                 placeholder="City"
        //                 type="text"
        //                 required
        //             />
        //             <Button
        //                 type="submit"
        //                 className="w-full"
        //                 size={"lg"}
        //                 disabled={pending}
        //             >
        //                 Continue
        //             </Button>
        //         </form>
        //         <Separator />
        //         <div className="space-y-1">
        //             <p className="text-sm text-muted-foreground">
        //                 Already have an account? <span
        //                     className="text-primary hover:underline cursor-pointer"
        //                     onClick={() => setState("signIn")}>
        //                     Sign in
        //                 </span>
        //             </p>

        //             {/* <p className="block lg:hidden text-sm text-muted-foreground">
        //                 Changed your mind? <span
        //                     className="text-primary hover:underline cursor-pointer"
        //                     onClick={() => router.push("/")}>
        //                     Go back to homepage.
        //                 </span>
        //             </p> */}
        //         </div>
        //     </CardContent>
        // </Card>
    )
}