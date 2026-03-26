import { NextResponse } from 'next/server'
import { deleteEquipment, getEquipmentById, updateEquipment } from '@/lib/db'

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const item = getEquipmentById(id)

  if (!item) {
    return NextResponse.json({ message: 'Equipment not found' }, { status: 404 })
  }

  return NextResponse.json(item)
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const updated = updateEquipment(id, body)

  if (!updated) {
    return NextResponse.json({ message: 'Equipment not found' }, { status: 404 })
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const removed = deleteEquipment(id)

  if (!removed) {
    return NextResponse.json({ message: 'Equipment not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}