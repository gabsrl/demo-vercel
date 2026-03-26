'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Equipment, EquipmentStatus } from '@/types/equipment'
import { trackEvent } from '@/lib/analytics'
import { create, update } from '@/lib/storage'

type Props = {
  initialData?: Equipment
  mode: 'create' | 'edit'
}

const defaultData: Equipment = {
  id: '',
  name: '',
  category: '',
  manufacturer: '',
  serialNumber: '',
  status: 'available',
  location: '',
  lastMaintenance: '',
}

export default function EquipmentForm({ initialData, mode }: Props) {
  const router = useRouter()
  const [form, setForm] = useState<Equipment>(initialData || defaultData)
  const [loading, setLoading] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const payload: Equipment = {
      ...form,
      id: mode === 'create' ? crypto.randomUUID() : form.id,
    }

    if (mode === 'create') {
      create(payload)
    } else {
      update(payload.id, payload)
    }

    trackEvent(mode === 'create' ? 'equipment_created' : 'equipment_updated', {
      equipment_category: payload.category,
      equipment_status: payload.status,
    })

    router.push('/equipment')
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-3 rounded" required />
      <input name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full border p-3 rounded" required />
      <input name="manufacturer" placeholder="Manufacturer" value={form.manufacturer} onChange={handleChange} className="w-full border p-3 rounded" required />
      <input name="serialNumber" placeholder="Serial Number" value={form.serialNumber} onChange={handleChange} className="w-full border p-3 rounded" required />
      <select name="status" value={form.status} onChange={handleChange} className="w-full border p-3 rounded">
        <option value="available">Available</option>
        <option value="in_use">In Use</option>
        <option value="maintenance">Maintenance</option>
        <option value="retired">Retired</option>
      </select>
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} className="w-full border p-3 rounded" required />
      <input name="lastMaintenance" type="date" value={form.lastMaintenance} onChange={handleChange} className="w-full border p-3 rounded" required />

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? 'Saving...' : mode === 'create' ? 'Create Equipment' : 'Update Equipment'}
      </button>
    </form>
  )
}