import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-3">Page not found</h1>
      <p className="mb-6 text-gray-700">The page you are looking for does not exist.</p>
      <Link href="/equipment" className="bg-blue-600 text-white px-4 py-2 rounded">
        Back to equipment list
      </Link>
    </main>
  )
}
