import { Header } from "@/components/Header"
import "@/lib/globals.css"
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
        <html
            lang="en"
        >
            <body
                className={`${poppinsFont.className} antialiased flex flex-col min-h-screen`}
            >
                <Header />
                {children}
            </body>
        </html>
    )
}