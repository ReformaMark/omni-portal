"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { ChatSupportType } from "../../../../../data/chat-support";
import { PropertyType } from "../../../../../data/dummy";
import { User } from "../../../../../data/dummy-users";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";

interface ChatRespondDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void
    user: User;
    property: PropertyType;
    inquiry: ChatSupportType
}

export const ChatRespondDialog = ({
    onOpenChange,
    open,
    user,
    inquiry,
}: ChatRespondDialogProps) => {
    const [response, setResponse] = useState<string>("")

    const { mutate: respond, isPending } = useMutation({
        mutationFn: useConvexMutation(api.chatSupport.respond)
    })

    const handleSubmit = async () => {
        try {
            if (response.length <= 5) {
                toast.error("Please enter a valid text")
                return
            }

            await respond({
                inquiryId: inquiry._id,
                response,
            })

            setResponse("")
            toast.success("Message sent successfully.");
            onOpenChange(false)
        } catch (error) {
            toast.error("Failed to respond");
            console.error(error);
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="h-[700px] flex flex-col gap-7">
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
                        className="resize-none h-[150px]"
                        defaultValue={inquiry.message}
                        disabled
                    />
                </div>

                <div className="grid w-full gap-1.5">
                    <Label htmlFor="message">Response</Label>
                    <Textarea
                        id="message"
                        className="resize-none h-[150px]"
                        value={response}
                        onChange={(e) => setResponse(e.target.value)}
                        disabled={isPending}
                        defaultValue={inquiry.response}
                    />
                </div>

                <div className="flex flex-row gap-3 justify-center">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>

                    <Button
                        className="flex flex-row gap-2 w-[120px]"
                        disabled={response.length <= 5 || isPending}
                        onClick={handleSubmit}
                    >
                        <Image
                            src="/send.svg"
                            alt="send icon"
                            height={15}
                            width={15}
                        />
                        Send
                    </Button>
                </div>

            </DialogContent>
        </Dialog>
    )
}