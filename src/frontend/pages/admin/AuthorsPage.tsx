import { AuthorsTable } from '../../components/admin/AuthorsTable'

export function AuthorsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <AuthorsTable />
      </div>
    </div>
  )
}

export default AuthorsPage