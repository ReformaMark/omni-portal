import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { usePasswordVisibility } from "@/hooks/use-password-visibility";
import { useAuthActions } from "@convex-dev/auth/react";
import { Eye, EyeOff, TriangleAlertIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { AuthFlow } from "./auth-screen";

export const SignInCard = ({
    setState
}: {
    setState: (state: AuthFlow) => void
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
    const [pending, setPending] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState(false);

    const { signIn } = useAuthActions()
    const { inputType, isVisible, toggleVisibility } = usePasswordVisibility()
    const [savedCredentials, setSavedCredentials] = useLocalStorage('credentials', {
        email: '',
        password: ''
    });

    useEffect(() => {
        if (savedCredentials.email && savedCredentials.password) {
            setEmail(savedCredentials.email);
            setPassword(savedCredentials.password);
            setRememberMe(true);
        }
    }, [savedCredentials]);

    const onSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (pending) return

        setPending(true);
        setError("");

        try {
            await signIn("password", {
                email,
                password,
                flow: "signIn"
            });

            setError("")

            if (rememberMe) {
                setSavedCredentials({ email, password });
            } else {
                setSavedCredentials({ email: '', password: '' });
            }

        } catch (error) {
            console.error("Sign in error:", error);

            if (error instanceof Error) {
                if (error.message.includes("Failed to fetch")) {
                    setError("Connection error. Please check your internet connection and try again.");
                } else {
                    setError("Invalid email or password");
                }
            } else {
                setError("Invalid email or password");
            }
        } finally {
            setPending(false);
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
                    Login to your account
                </p>

                <p className="text-sm">
                    Welcome back!
                </p>
            </div>

            {!!error && (
                <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                    <TriangleAlertIcon className="size-4" />
                    {error}
                </div>
            )}

            <form onSubmit={onSignIn} className="space-y-4 mt-2 w-full">
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
                        placeholder="Email"
                        type="email"
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

                <div className="flex flex-col lg:flex-row lg:items-center items-start justify-between w-full space-y-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <label
                            htmlFor="remember"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Remember me
                        </label>
                    </div>

                    <div>
                        <a
                            href="#"
                            className="text-dark text-sm font-medium"
                        >
                            Forgot password?
                        </a>
                    </div>
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
                    Don&apos;t have a buyer account?  <span
                        className="text-primary hover:underline cursor-pointer"
                        onClick={() => setState("signUp")}>
                        <span className="text-dark font-semibold"> Sign up</span>
                    </span>
                </p>
            </div>
        </div >
        // <div className="relative h-full w-full flex items-center justify-center ">
        //     <Card className="w-full h-full p-8 z-50">
        //         <CardHeader className="px-0 pt-0">
        //             <CardTitle className="text-primary">
        //                 Login to continue
        //             </CardTitle>
        //             <CardDescription>
        //                 Please fill in the form below to login to your account.
        //             </CardDescription>
        //         </CardHeader>
        //         {!!error && (
        //             <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
        //                 <TriangleAlertIcon className="size-4" />
        //                 {error}
        //             </div>
        //         )}
        //         <CardContent className="space-y-5 px-0 pb-0">
        //             <form onSubmit={onSignIn} className="space-y-2.5">
        //                 <Input
        //                     disabled={pending}
        //                     value={email}
        //                     onChange={(e) => setEmail(e.target.value)}
        //                     placeholder="Email"
        //                     type="email"
        //                     required
        //                 />
        //                 <Input
        //                     disabled={pending}
        //                     value={password}
        //                     onChange={(e) => setPassword(e.target.value)}
        //                     placeholder="Password"
        //                     type="password"
        //                     required
        //                 />
        //                 <Button
        //                     type="submit"
        //                     className="w-full text-white"
        //                     size={"lg"}
        //                     disabled={pending}
        //                 >
        //                     Continue
        //                 </Button>
        //             </form>
        //             <Separator />
        //             <div className="space-y-1">
        //                 <p className="text-sm text-muted-foreground">
        //                     Don&apos;t have an account? <span
        //                         className="text-primary hover:underline cursor-pointer"
        //                         onClick={() => setState("signUp")}>
        //                         Sign up
        //                     </span>
        //                 </p>

        //                 {/* <p className="block lg:hidden text-sm text-muted-foreground">
        //                     Changed your mind? <span
        //                         className="text-primary hover:underline cursor-pointer"
        //                         onClick={() => router.push("/")}>
        //                         Go back to homepage.
        //                     </span>
        //                 </p> */}
        //             </div>
        //         </CardContent>
        //     </Card>
        // </div>
    )
}