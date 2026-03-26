'use client'

import Link from 'next/link'
import { Equipment } from '@/types/equipment'
import { trackEvent } from '@/lib/analytics'
import { remove } from '@/lib/storage'

type Props = {
  data: Equipment[]
  onDelete: (id: string) => void
}

export default function EquipmentTable({ data, onDelete }: Props) {
  const handleDelete = (id: string, category: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this equipment?')
    if (!confirmed) return

    const success = remove(id)
    if (success) {
      trackEvent('equipment_deleted', {
        equipment_category: category,
      })
      onDelete(id)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3 text-left">Name</th>
            <th className="border p-3 text-left">Category</th>
            <th className="border p-3 text-left">Manufacturer</th>
            <th className="border p-3 text-left">Status</th>
            <th className="border p-3 text-left">Location</th>
            <th className="border p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="border p-3">{item.name}</td>
              <td className="border p-3">{item.category}</td>
              <td className="border p-3">{item.manufacturer}</td>
              <td className="border p-3">{item.status}</td>
              <td className="border p-3">{item.location}</td>
              <td className="border p-3 space-x-3">
                <Link href={`/equipment/${item.id}/edit`} className="text-blue-600 underline">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item.id, item.category)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}