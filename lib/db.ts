import { Equipment } from '@/types/equipment'

const equipmentDb: Equipment[] = [
  {
    id: '1',
    name: 'Infusion Pump A1',
    category: 'Infusion Pump',
    manufacturer: 'Medtronic',
    serialNumber: 'INF-2026-001',
    status: 'available',
    location: 'ICU - Room 2',
    lastMaintenance: '2026-02-10',
  },
  {
    id: '2',
    name: 'Patient Monitor X5',
    category: 'Monitor',
    manufacturer: 'Philips',
    serialNumber: 'MON-2026-002',
    status: 'in_use',
    location: 'Ward - Bed 14',
    lastMaintenance: '2026-01-18',
  },
]

export const getAllEquipment = () => equipmentDb

export const getEquipmentById = (id: string) =>
  equipmentDb.find((item) => item.id === id)

export const createEquipment = (data: Equipment) => {
  equipmentDb.push(data)
  return data
}

export const updateEquipment = (id: string, data: Partial<Equipment>) => {
  const index = equipmentDb.findIndex((item) => item.id === id)
  if (index === -1) return null

  equipmentDb[index] = { ...equipmentDb[index], ...data }
  return equipmentDb[index]
}

export const deleteEquipment = (id: string) => {
  const index = equipmentDb.findIndex((item) => item.id === id)
  if (index === -1) return false

  equipmentDb.splice(index, 1)
  return true
}