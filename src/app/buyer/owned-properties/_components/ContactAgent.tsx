'use client'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import React, { useState } from 'react'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import Image from 'next/image'
import SMSEdit from '@/../public/sms-edit.png'
import { Mail, MessageSquareText, Phone, SendHorizonal } from 'lucide-react'
import { HybridDealTypes } from '@/lib/types'
import { Id } from '../../../../../convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '../../../../../convex/_generated/api'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface ContactAgentDialogProp {
    data: HybridDealTypes,
    projectId: Id<'project'> | null
}

const formSchema = z.object({
    subject: z.string().min(1, "Subject is required"),
    message: z.string().min(1, "Message is required"),
})

export default function ContactAgent({data, projectId}:ContactAgentDialogProp) {
    const project = useQuery(api.projects.getById, {id: projectId ?? undefined})
    const [dialogOpen, setDialogOpen] = useState<boolean>(false)
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            subject: "",
            message: "",
        }
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            if (!projectId) {
                toast.error("Please select a project first.");
                return;
            }

            console.log(values,'Message sent');

            toast.success("Message sent successfully.");
            form.reset();
            setDialogOpen(false);
        } catch (error) {
            toast.error("Failed to send a message.");
            console.error(error);
        }
    };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                <DialogTrigger onClick={()=> setDialogOpen(!dialogOpen)}>
                    <Image src={SMSEdit} alt='svg image' className='size-4 cursor-pointer'/>
                </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Contact Agent</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
        <DialogContent className='max-w-4xl p-5 md:p-10'>
            <DialogHeader className='flex flex-row justify-between items-center'>
                <div className="">
                    <DialogTitle
                        className="text-dark font-bold text-xl md:text-3xl flex items-center gap-2"
                    >
                        <MessageSquareText className="size-6 md:size-10" />
                        Contact Agent
                    </DialogTitle>
                    <DialogDescription
                        className="text-muted-foreground text-sm px-0 flex justify-start"
                    >
                        <div className="w-[2rem] md:w-[3rem]"></div>
                        Block{data.property?.block} Lot {data.property?.lot}
                    </DialogDescription>
                </div>
              
                <div className="relative flex size-12 md:size-16 shrink-0 overflow-hidden rounded-sm">
                    {project?.projectName === 'Living Water Subdivision' && (
                        <Image
                            src={'/living-water.jfif'}
                            alt='living water'
                            className="aspect-square h-full w-full"
                            width={100}
                            height={100}
                        />
                    )}
                    {project?.projectName === 'Havahills Estate' && (
                        <Image
                            src={'/hhe.png'}
                            alt='living water'
                            className="aspect-square h-full w-full"
                            width={100}
                            height={100}
                        />
                    )}
                    
                </div>
            </DialogHeader>
            <Separator className='my-2'/>
            <div className="grid grid-cols-12 gap-2 items-center text-[#A1A7AE] text-xs md:text-sm">
                <div className="col-span-12 md:col-span-5 flex items-center gap-x-2 ">
                    <h3 className='col-span-6 w-10 md:w-11 text-right'>From :</h3>
                    <Avatar className='size-8 md:size-12'>
                        <AvatarImage src={data.buyer?.image} alt="@shadcn" className='size-5' />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className='capitalized text-black font-sans font-semibold tracking-wide'>{data.buyer?.fname} {data.buyer?.lname}</p>
                </div>
                <div className="col-span-12 md:col-span-4 flex items-center gap-x-2">
                    <h3 className='w-10 md:w-16 text-right flex gap-x-1 justify-end'><Mail className='size-5 md:size-7'/> : </h3>
                    <span className='capitalized text-black font-sans font-semibold tracking-wide'>{data.buyer?.email}</span>
                </div>
                <div className="col-span-12 md:col-span-3 flex items-center gap-x-2">
                    <h3 className='w-10 md:w-16 text-right flex gap-x-1 justify-end'><Phone className='size-5 md:size-7'/> : </h3>
                    <span className='capitalized text-black font-sans font-semibold tracking-wide'>{data.buyer?.contact}</span>
                </div>
            </div>
            <div className="text-[#A1A7AE] text-xs md:text-sm">
                <div className="flex items-center gap-x-2">
                    <h3 className='col-span-6 w-10 md:w-11 text-right'>To :</h3>
                    <Avatar className='size-8 md:size-12'>
                        <AvatarImage src={data.buyer?.image} alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className='capitalized text-black font-sans font-semibold tracking-wide'>{data.buyer?.fname} {data.buyer?.lname}</p>
                </div>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                    className="space-y-4"
                >

                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel  className='text-black font-sans font-semibold'>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter Subject" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel className='text-black font-sans font-semibold'>Message</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder="How can we help you?"
                                className="resize-none h-40"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <div className="flex justify-center gap-x-5">
                        <Button variant={'outline'} type='button' onClick={() => setDialogOpen(false)} className='h-10 tracking-widest'>Cancel</Button>
                        <Button variant={'default'} type='submit' className='text-white h-10'><SendHorizonal/> <span className='ml-1 tracking-widest'>Send</span></Button>
                    </div>
                </form>
            </Form>
        </DialogContent>

    </Dialog>
  )
}
