import { Equipment } from '@/types/equipment'

const STORAGE_KEY = 'medical_equipment'

const seedData: Equipment[] = [
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

function load(): Equipment[] {
  if (typeof window === 'undefined') return seedData
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seedData))
    return seedData
  }
  return JSON.parse(stored) as Equipment[]
}

function persist(data: Equipment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getAll(): Equipment[] {
  return load()
}

export function getById(id: string): Equipment | undefined {
  return load().find((item) => item.id === id)
}

export function create(data: Equipment): Equipment {
  const all = load()
  all.push(data)
  persist(all)
  return data
}

export function update(id: string, data: Partial<Equipment>): Equipment | null {
  const all = load()
  const index = all.findIndex((item) => item.id === id)
  if (index === -1) return null
  all[index] = { ...all[index], ...data }
  persist(all)
  return all[index]
}

export function remove(id: string): boolean {
  const all = load()
  const index = all.findIndex((item) => item.id === id)
  if (index === -1) return false
  all.splice(index, 1)
  persist(all)
  return true
}
