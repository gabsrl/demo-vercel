'use client'

import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import EquipmentForm from '@/components/EquipmentForm'
import { getById } from '@/lib/storage'
import { Equipment } from '@/types/equipment'

export default function EditEquipmentPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const router = useRouter()
  const [equipment, setEquipment] = useState<Equipment | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const item = getById(id)
    if (!item) {
      router.replace('/equipment')
      return
    }
    setEquipment(item)
    setLoaded(true)
  }, [id, router])

  if (!loaded) return null

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Edit Equipment</h1>
      <EquipmentForm mode="edit" initialData={equipment!} />
    </main>
  )
}