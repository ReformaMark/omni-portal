import { ConvexClientProvider } from "@/components/convex-client-provider"
import { ConvexAuthNextjsServerProvider } from "@convex-dev/auth/nextjs/server"
import "@/lib/globals.css"
import { Poppins } from "next/font/google"

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: "400",
})

export const metadata = {
  title: 'Buyer Dashboard',
  description: 'Buyer Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ConvexAuthNextjsServerProvider>
      <ConvexClientProvider>
        <html lang="en">
          <body
            className={`${poppinsFont.className} bg-[#F6F6F6]`}
          >
            {children}
          </body>
        </html>
      </ConvexClientProvider>
    </ConvexAuthNextjsServerProvider>
  )
}
