"use client"
import { Building2, Calculator, CreditCard, FileCheck, FilePenLine, Files, FolderOpen, LayoutGrid, MessageCircle, Package, PiggyBank, Users } from 'lucide-react';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCheckRole } from '@/hooks/use-check-role';

interface SidebarItem {
    icon: React.ElementType;
    label: string;
    href: string;
}

export const adminSidebarItems: SidebarItem[] = [
    {
        icon: LayoutGrid,
        label: "Dashboard",
        href: "/admin",
    },
    {
        icon: FolderOpen,
        label: "Our Projects",
        href: "/admin/projects"
    },
    {
        icon: Package,
        label: "Inventory",
        href: "/admin/inventory"
    },
    {
        icon: Building2,
        label: "Realties",
        href: "/admin/realties"
    },
    {
        icon: Calculator,
        label: "Accounting",
        href: "/admin/accounting"
    },
    {
        icon: Users,
        label: "Users",
        href: "/admin/accounts",
    },
    {
        icon: FileCheck,
        label: "Deal Finalization",
        href: "/admin/deals"
    },
    {
        icon: PiggyBank,
        label: "Commission",
        href: "/admin/commission"
    },
    {
        icon: Files,
        label: "Documents",
        href: "/admin/documents"
    },
    {
        icon: MessageCircle,
        label: "Chat Support",
        href: "/admin/support"
    }
]

export const buyerSidebarItems: SidebarItem[] = [
    {
        icon: LayoutGrid,
        label: "Dashboard",
        href: "/buyer",
    },
    {
        icon: FilePenLine,
        label: "SOA",
        href: "/buyer/soa"
    },
    {
        icon: CreditCard,
        label: "Billing",
        href: "/buyer/billing"
    },
    {
        icon: Building2,
        label: "Documents",
        href: "/buyer/documents"
    },
    {
        icon: MessageCircle,
        label: "Chat Support",
        href: "/buyer/support"
    }
]

const sellerSideBarItems: SidebarItem[] = [
    
]


export const AppSidebar = () => {
    const pathname = usePathname()
    const {data} = useCheckRole()
    const sideBarItems = data && data === 'admin' ? adminSidebarItems : data === 'buyer' ? buyerSidebarItems : sellerSideBarItems
    const isDashboard = pathname === "/buyer/owned-properties" || pathname === "/buyer/active-advertisements"
    return (
        <>
            <section
                className='border-r bg-[#FFFFFF] w-[263px] pt-[85px] px-5 hidden lg:block'
            >
                {sideBarItems?.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "w-full flex gap-2 justify-start hover:bg-gray-100 hover:rounded-[27px] py-3 px-4 cursor-pointer items-center",
                            item.href === pathname && "bg-gray-100 text-dark font-bold text-[16px] rounded-[27px]",
                            item.href === "/buyer" && isDashboard && "bg-gray-100 text-dark font-bold text-[16px] rounded-[27px]"
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
        </>
    )
}
