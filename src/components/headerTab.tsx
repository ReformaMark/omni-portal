"use client"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger
} from "@/components/ui/sheet"
import { useCurrentUser } from "@/hooks/use-current-user"
import { cn } from "@/lib/utils"
import { Bell, DownloadIcon, Loader2Icon, MenuIcon } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import HomeAvatar from "./home-avatar"
import { sidebarItems } from './sidebar'
import { UserDropdown } from "./user-dropdown"
import { useProjectStore } from "@/store/project-store"
import { SelectWithImages } from "./select-with-images"


interface NavItem {
    title: string
    href: string
    isActive?: boolean
}

const navItems: NavItem[] = [
    {
        title: "HDC Properties",
        href: "/admin/inventory",
    },
    {
        title: "Other Properties",
        href: "/admin/other-properties",
    },
]

const accountItems: NavItem[] = [
    {
        title: "Buyers",
        href: "/admin/accounts",
    },
    {
        title: "Sellers",
        href: "/admin/sellers",
    },
    {
        title: "Admins",
        href: "/admin/account-admin",
    },
]

export function Header() {
    const { user } = useCurrentUser()
    const pathname = usePathname()
    const setSelectedProjectId = useProjectStore(state => state.setSelectedProjectId)

    const fullname = user?.fname + " " + user?.lname

    const updatedNavItems = navItems.map(item => ({
        ...item,
        isActive: pathname === item.href,
    }))

    const updatedAccountItems = accountItems.map(item => ({
        ...item,
        isActive: pathname === item.href,
    }))

    return (
        <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white">
            <div className="flex h-16 items-center max-md:justify-between px-4 md:px-6">
                <div className="flex items-center gap-4 ml-12">
                    <HomeAvatar />
                    {pathname === "/admin/inventory" && (
                        <nav className="hidden md:flex items-center gap-12 ml-[120px]">
                            {updatedNavItems.map((item) => (
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
                    )}

                    {(pathname === "/admin/accounts" || pathname === "/admin/sellers" || pathname === "/admin/account-admin") && (
                        <nav className="hidden md:flex items-center gap-12 ml-[120px]">
                            {updatedAccountItems.map((item) => (
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
                    )}
                </div>

                <div className="ml-auto items-center gap-4 mr-12 hidden lg:flex">
                    {
                        (pathname === "/admin/inventory" ||
                            pathname === "/admin/other-properties" ||
                            pathname === "/admin/deals") && (
                            <SelectWithImages
                                onProjectSelect={setSelectedProjectId}
                            />
                        )}
                    <Button variant="semiGhost" size="icon">
                        <DownloadIcon className="h-5" />
                        <span className="sr-only">User account</span>
                    </Button>
                    <Button variant="semiGhost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-green-500" />
                        <span className="sr-only">Notifications</span>
                    </Button>

                    {user ? (
                        <UserDropdown
                            avatarUrl={user.image!}
                            name={fullname}
                            role={user.role!}
                            key={user.accountId!}
                        />
                    ) : <Loader2Icon className="w-6 h-6 animate-spin" />}
                </div>

                {/* Sheet */}
                <div className='ml-auto mr-7 lg:hidden'>
                    <Sheet>
                        <SheetTrigger>
                            <MenuIcon className='w-6 h-6' />
                        </SheetTrigger>
                        <SheetContent>
                            <SheetHeader>
                                <section
                                    className='bg-[#FFFFFF]'
                                >
                                    {sidebarItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "w-full flex gap-2 justify-start hover:bg-gray-100 hover:rounded-[27px] py-3 px-4 cursor-pointer items-center",
                                                item.href === pathname && "bg-gray-100 text-dark font-bold text-[16px] rounded-[27px]"
                                            )}
                                        >
                                            <div className='flex items-center gap-2 ml-7'>
                                                <item.icon className={cn(
                                                    "h-5 w-5 text-[#A1A7AE]",
                                                    item.href === pathname && "text-dark"
                                                )} />
                                                <span>{item.label}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </section>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </header>
    )
}