'use client'

import { use } from 'react'
import EquipmentForm from '@/components/EquipmentForm'
import { getById } from '@/lib/storage'
import { notFound } from 'next/navigation'

export default function EditEquipmentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const equipment = getById(id)

  if (!equipment) {
    notFound()
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Equipment</h1>
      <EquipmentForm mode="edit" initialData={equipment} />
    </main>
  )
}