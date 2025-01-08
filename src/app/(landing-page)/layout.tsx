import "@/lib/globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: "400",
})

export const metadata: Metadata = {
  title: "Login Page",
  description: "Login to omni-portal to access your account and verify authorization",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsFont.className} antialiased flex flex-col min-h-screen container mx-auto`}
      >
        {children}
      </body>
    </html>
  );
}
