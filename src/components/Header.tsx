"use client"

import * as React from "react"
import Link from "next/link"
import { Bell, ChevronDown, DownloadIcon, User } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SelectWithImages } from "./select-with-images"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { UserDropdown } from "./user-dropdown"

interface NavItem {
    title: string
    href: string
    isActive?: boolean
}

const navItems: NavItem[] = [
    {
        title: "HDC Properties",
        href: "/hdc-properties",
        isActive: true,
    },
    {
        title: "Other Properties",
        href: "/other-properties",
    },
]

export function Header() {
    return (
        <header className="border-b bg-white">
            <div className="flex h-16 items-center px-4 md:px-6">
                <div className="flex items-center gap-4 ml-12">
                    <Link href="/" className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span className="text-lg font-semibold">OMNI Portal</span>
                    </Link>
                    <nav className="hidden md:flex items-center gap-12 ml-[120px]">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "text-sm font-medium transition-colors hover:text-primary relative py-4",
                                    item.isActive ? "text-dark" : "text-muted-foreground"
                                )}
                            >
                                {item.title}
                                {item.isActive && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-dark" />
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="ml-auto items-center gap-4 mr-12 hidden lg:flex">
                    <SelectWithImages />
                    <Button variant="semiGhost" size="icon">
                        <DownloadIcon className="h-5" />
                        <span className="sr-only">User account</span>
                    </Button>
                    <Button variant="semiGhost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-500" />
                        <span className="sr-only">Notifications</span>
                    </Button>

                    <UserDropdown
                        avatarUrl="https://github.com/shadcn.png"
                        name="John Kevin"
                        role="President"
                        key={1}
                    />
                </div>
            </div>
        </header>
    )
}