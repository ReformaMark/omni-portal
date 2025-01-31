'use client'
import { useProjectStore } from '@/store/project-store'
import { useQuery } from 'convex/react'
import React, { useCallback, useState } from 'react'
import { api } from '../../../../../convex/_generated/api'
import { DataTable } from '@/components/data-table'
import { PropertyType } from '../../../../../data/dummy'
import { Id } from '../../../../../convex/_generated/dataModel'
import { ActivePropertyColumns } from './ActivePropertyColumn'

export default function ActiveAdvertisementList() {
   const selectedProjectId = useProjectStore(state => state.selectedProjectId)
    const [,setSelectedRows] = useState<Id<"property">[]>([]);

    const projects = useQuery(api.projects.get)
    const project = projects?.find(p => p._id === selectedProjectId)
   
    const handleRowSelection = useCallback((rows: PropertyType[]) => {
        if (!rows.length) {
            setSelectedRows([]);
            return;
        }

        const validRows = rows.filter(row => row?._id);
        setSelectedRows(validRows.map(row => row._id));
    }, []);

    const properties = useQuery(api.property.get, {
        projectId: selectedProjectId ?? undefined
    })

    const availableProperties = properties?.filter(property => property.status === "available");
  return (
    <div>
        <h1 className='text-darkGray font-semibold text-2xl mb-5'> {project?.projectName}</h1>
        <div className="">
            <DataTable
                columns={ActivePropertyColumns}
                data={availableProperties ?? []}
              
                isActiveAdvertisement={true}
                onRowSelectionChange={handleRowSelection}
            />
        </div>
    </div>
  )
}

