'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import EquipmentTable from '@/components/EquipmentTable'
import { getAll } from '@/lib/storage'
import { Equipment } from '@/types/equipment'

export default function EquipmentPage() {
  const [data, setData] = useState<Equipment[]>([])

  useEffect(() => {
    setData(getAll())
  }, [])

  const handleDelete = (id: string) => {
    setData((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <main className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Equipment List</h1>
        <Link href="/equipment/new" className="bg-green-600 text-white px-4 py-2 rounded">
          Add Equipment
        </Link>
      </div>

      <EquipmentTable data={data} onDelete={handleDelete} />
    </main>
  )
}