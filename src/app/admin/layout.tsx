
import { AdminGuard } from "@/components/auth/admin-guard"
import { ConvexClientProvider } from "@/components/convex-client-provider"
import { Header } from "@/components/headerTab"
import { AppSidebar } from "@/components/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import "@/lib/globals.css"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"
import { Metadata } from "next"
import { Poppins } from "next/font/google"

const poppinsFont = Poppins({
    subsets: ["latin"],
    weight: "400",
})

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "This is the admin dashboard"
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
                        <AdminGuard>
                            <SidebarProvider>
                                <div className="flex min-h-screen flex-col antialiased w-full">
                                    <Header />
                                    <div className="md:flex">
                                        <AppSidebar />
                                        <main className="flex-1 min-h-screen">{children}</main>
                                    </div>
                                </div>
                            </SidebarProvider>
                        </AdminGuard>
                    </body>
                </html>
            </ConvexClientProvider>
        </ConvexAuthNextjsServerProvider>
    )
}