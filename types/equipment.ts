export type EquipmentStatus = 'available' | 'in_use' | 'maintenance' | 'retired'

export interface Equipment {
  id: string
  name: string
  category: string
  manufacturer: string
  serialNumber: string
  status: EquipmentStatus
  location: string
  lastMaintenance: string
}