import { NextResponse } from 'next/server'
import { createEquipment, getAllEquipment } from '@/lib/db'
import { Equipment } from '@/types/equipment'

export async function GET() {
  return NextResponse.json(getAllEquipment())
}

export async function POST(req: Request) {
  const body: Equipment = await req.json()
  const created = createEquipment(body)
  return NextResponse.json(created, { status: 201 })
}