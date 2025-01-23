import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from "@/components/data-table";
import { dummyDocuments } from "../../../../data/documents";
import { AllDocumentsColumn } from "./_components/all-documents-columns";
import { SentDocumentsColumn } from "./_components/sent-documents-column";
import { ForApprovalDocumentsColumn } from "./_components/for-approval-documents-columns";
import { ApprovedDocumentsColumn } from "./_components/approved-documents-column";
import { DeclinedDocumentsColumn } from "./_components/declined-documents-column";


const AllDocumentsPage = () => {
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
                        value="sent"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dark data-[state=active]:rounded-none">
                        Sent
                    </TabsTrigger>
                    <TabsTrigger
                        value="for-approval"
                        className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-dark data-[state=active]:rounded-none">
                        For Approval
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
                </TabsList>
                <div className="border-b-2 border-gray-200 hidden md:block" />
                <TabsContent value="all-documents">
                    <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
                        <DataTable
                            columns={AllDocumentsColumn}
                            data={dummyDocuments}
                            placeholder="Search a document"
                            search="file"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="sent">
                    <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
                        <DataTable
                            columns={SentDocumentsColumn}
                            data={dummyDocuments}
                            placeholder="Search a document"
                            search="file"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="for-approval">
                    <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
                        <DataTable
                            columns={ForApprovalDocumentsColumn}
                            data={dummyDocuments}
                            placeholder="Search a document"
                            search="file"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="approved">
                    <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
                        <DataTable
                            columns={ApprovedDocumentsColumn}
                            data={dummyDocuments}
                            placeholder="Search a document"
                            search="file"
                        />
                    </div>
                </TabsContent>
                <TabsContent value="declined">
                    <div className="mt-[160px] sm:mt-[110px] md:mt-[60px] lg:mt-[50px] xl:mt-[30px]">
                        <DataTable
                            columns={DeclinedDocumentsColumn}
                            data={dummyDocuments}
                            placeholder="Search a document"
                            search="file"
                        />
                    </div>
                </TabsContent>
            </Tabs>

        </div>
    )
}

export default AllDocumentsPage;