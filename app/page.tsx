import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4">Medical Equipment Management</h1>
      <p className="mb-6">Simple CRUD application built with Next.js and Google Analytics 4.</p>
      <Link href="/equipment" className="bg-blue-600 text-white px-4 py-2 rounded">
        Go to Equipment List
      </Link>
    </main>
  )
}