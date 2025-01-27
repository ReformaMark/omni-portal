import { BuyerGuard } from "@/components/auth/buyer-guard"
import { ConvexClientProvider } from "@/components/convex-client-provider"
import { Header } from "@/components/headerTab"
import { AppSidebar } from "@/components/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/sonner"
import "@/lib/globals.css"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"
import { Metadata } from "next"
import { Poppins } from "next/font/google"

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: "400",
})

export const metadata: Metadata = {
    title: "Buyer Dashboard",
    description: "This is the buyer dashboard"
}

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <ConvexAuthNextjsServerProvider>
            <ConvexClientProvider>
                <html
                    lang="en"
                >
                    <body
                        className={`${poppinsFont.className} bg-[#F6F6F6]`}
                    >
                        <BuyerGuard>
                            <SidebarProvider>
                                <div className="flex min-h-screen flex-col antialiased w-full">
                                    <Header />
                                    <div className="md:flex">
                                        <AppSidebar />
                                        <main className="flex-1 min-h-screen pt-[70px]">{children}</main>
                                        <Toaster />
                                    </div>
                                </div>
                            </SidebarProvider>
                        </BuyerGuard>
                    </body>
                </html>
            </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
    )
}