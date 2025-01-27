import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from '@/components/data-table';
import { AllDocumentsColumn } from './_components/AllDocumentsColumn';
import { buyerDummyDocuments } from '../../../../data/documents';
import { ApprovedDocumentsColumn } from './_components/ApprovedDocumentsColumn';
import { PendingDocumentsColumn } from './_components/PendingDocumentsColumn';
import { DeclinedDocumentsColumn } from './_components/DeclinedDocumentsColumn';

function DocumentsPage() {
    //Fetch all documents related to the buyer then filter it based on its status.
    const data = buyerDummyDocuments
    const approvedData = data.filter(d => d.status === "approved")
    const declinedData = data.filter(d => d.status === "declined")
    const pendingData = data.filter(d => d.status === "pending")
  return (
    <div className="p-10 h-screen">
    <Tabs defaultValue="all-documents" className="w-full">
        <TabsList className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
            <TabsTrigger
                value="all-documents"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dark data-[state=active]:rounded-none">
                All Documents
            </TabsTrigger>
            <TabsTrigger
                value="approved"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dark data-[state=active]:rounded-none">
                Approved
            </TabsTrigger>
            <TabsTrigger
                value="declined"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dark data-[state=active]:rounded-none">
               Declined
            </TabsTrigger>
            <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dark data-[state=active]:rounded-none">
                Pending
            </TabsTrigger>
        </TabsList>
        <div className="border-b-2 border-gray-200 hidden md:block" />
        <TabsContent value="all-documents">
            <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
                <DataTable
                    columns={AllDocumentsColumn}
                    data={data}
                    placeholder="Search a document"
                    search="file"
                />
            </div>
        </TabsContent>
        <TabsContent value="approved">
            <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
                <DataTable
                    columns={ApprovedDocumentsColumn}
                    data={approvedData}
                    placeholder="Search a document"
                    search="file"
                />
            </div>
        </TabsContent>
        <TabsContent value="declined">
            <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
                <DataTable
                    columns={DeclinedDocumentsColumn}
                    data={declinedData}
                    placeholder="Search a document"
                    search="file"
                />
            </div>
        </TabsContent>
        <TabsContent value="pending">
            <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
                <DataTable
                    columns={PendingDocumentsColumn}
                    data={pendingData}
                    placeholder="Search a document"
                    search="file"
                />
            </div>
        </TabsContent>
    </Tabs>

</div>
  )
}

export default DocumentsPage