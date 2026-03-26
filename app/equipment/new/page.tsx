import EquipmentForm from '@/components/EquipmentForm'

export default function NewEquipmentPage() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create Equipment</h1>
      <EquipmentForm mode="create" />
    </main>
  )
}