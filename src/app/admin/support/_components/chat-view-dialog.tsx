"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { ChatSupportType } from "../../../../../data/chat-support";
import { PropertyType } from "../../../../../data/dummy";
import { User } from "../../../../../data/dummy-users";

interface ChatViewDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void
    user: User;
    property: PropertyType;
    inquiry: ChatSupportType
}

export const ChatViewDialog = ({
    onOpenChange,
    open,
    user,
    inquiry,
}: ChatViewDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="h-fit flex flex-col gap-7">
                <DialogHeader className="h-[100px]">
                    <DialogTitle className="text-3xl text-dark flex gap-2">
                        <Image
                            src={"/message-text.svg"}
                            width={25}
                            height={25}
                            alt="Message-Icon"
                        />
                        {user.fname + " " + user.lname}
                    </DialogTitle>
                    <DialogDescription
                        className="ml-[35px] text-md"
                    >
                        {user.role === "buyer" && "Buyer"}
                    </DialogDescription>

                    <div className="border-t w-full" />
                </DialogHeader>

                <div className="text-sm flex flex-col gap-2">
                    Subject
                    <Input
                        defaultValue={inquiry.subject}
                        disabled
                    />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        className="h-[200px] resize-none"
                        defaultValue={inquiry.message}
                        disabled
                    />
                </div>

                {inquiry.response && <div className="grid w-full gap-1.5">
                    <Label htmlFor="response">Response</Label>
                    <Textarea
                        id="response"
                        className="h-[200px] resize-none"
                        defaultValue={inquiry.response}
                        disabled
                    />
                </div>}

            </DialogContent>
        </Dialog>
    )
}