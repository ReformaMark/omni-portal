import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const HomeAvatar = () => {
    return (
        <Link href="/" className="flex items-center gap-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="text-lg font-semibold">OMNI Portal</span>
        </Link>
    )
}

export default HomeAvatar