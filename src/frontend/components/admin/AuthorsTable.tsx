import { useState, useEffect, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
  ColumnFiltersState,
} from '@tanstack/react-table'
import { ChevronUpIcon, ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { adminApi, Author, AuthorListResponse } from '../../api/admin'
import { LoadingSpinner } from '../ui'

const columnHelper = createColumnHelper<Author>()

export function AuthorsTable() {
  const [data, setData] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  
  // Pagination state for cursor-based pagination
  const [, setCursor] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(25)
  const [pages, setPages] = useState<Array<{ cursor: string | null; pageNumber: number }>>([
    { cursor: null, pageNumber: 1 }
  ])

  // Define columns
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => (
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{info.getValue()}</span>
            {info.row.original.personalName && (
              <span className="text-sm text-gray-500">{info.row.original.personalName}</span>
            )}
          </div>
        ),
      }),
      columnHelper.accessor('alternateNames', {
        header: 'Alternate Names',
        cell: (info) => {
          const names = info.getValue()
          return names.length > 0 ? (
            <div className="text-sm text-gray-600">
              {names.slice(0, 2).join(', ')}
              {names.length > 2 && <span className="text-gray-400"> +{names.length - 2} more</span>}
            </div>
          ) : (
            <span className="text-gray-400">—</span>
          )
        },
        enableSorting: false,
      }),
      columnHelper.accessor('birthDate', {
        header: 'Birth Year',
        cell: (info) => {
          const birthDate = info.getValue()
          return birthDate ? (
            <span className="text-sm text-gray-900">{birthDate}</span>
          ) : (
            <span className="text-gray-400">—</span>
          )
        },
      }),
      columnHelper.accessor('deathDate', {
        header: 'Death Year',
        cell: (info) => {
          const deathDate = info.getValue()
          return deathDate ? (
            <span className="text-sm text-gray-900">{deathDate}</span>
          ) : (
            <span className="text-gray-400">—</span>
          )
        },
      }),
      columnHelper.accessor('location', {
        header: 'Location',
        cell: (info) => {
          const location = info.getValue()
          return location ? (
            <span className="text-sm text-gray-700">{location}</span>
          ) : (
            <span className="text-gray-400">—</span>
          )
        },
        enableSorting: false,
      }),
      columnHelper.accessor('worksCount', {
        header: 'Works',
        cell: (info) => (
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            {info.getValue().toLocaleString()}
          </span>
        ),
        enableSorting: false,
      }),
      columnHelper.display({
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
          <div className="flex space-x-2">
            <button
              onClick={() => handleViewAuthor(info.row.original.id)}
              className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
            >
              View
            </button>
            {info.row.original.wikipedia && (
              <a
                href={info.row.original.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 text-sm font-medium"
              >
                Wikipedia
              </a>
            )}
          </div>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
      columnFilters,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true, // We handle pagination manually with cursor
  })

  // Fetch authors data
  const fetchAuthors = async (requestCursor: string | null = null, search?: string) => {
    try {
      setLoading(true)
      setError(null)

      const sortBy = sorting.length > 0 ? (sorting[0].id as 'name' | 'birthDate' | 'createdAt' | 'id') : 'id'
      const sortOrder = sorting.length > 0 ? (sorting[0].desc ? 'desc' : 'asc') : 'asc'

      const response: AuthorListResponse = await adminApi.getAuthors({
        cursor: requestCursor || undefined,
        limit: pageSize,
        search,
        sortBy,
        sortOrder,
      })

      setData(response.data)
      setHasNextPage(response.pagination.hasNextPage)
      
      // Update cursor for next page
      if (response.pagination.nextCursor && !pages.find(p => p.cursor === response.pagination.nextCursor)) {
        setPages(prev => [...prev, { cursor: response.pagination.nextCursor!, pageNumber: currentPage + 1 }])
      }

    } catch (err) {
      console.error('Error fetching authors:', err)
      setError('Failed to load authors. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Load initial data
  useEffect(() => {
    fetchAuthors()
  }, [pageSize, sorting])

  // Handle search with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (globalFilter !== '') {
        setCurrentPage(1)
        setCursor(null)
        setPages([{ cursor: null, pageNumber: 1 }])
        fetchAuthors(null, globalFilter)
      } else if (globalFilter === '') {
        // Reset to first page when search is cleared
        setCurrentPage(1)
        setCursor(null)
        setPages([{ cursor: null, pageNumber: 1 }])
        fetchAuthors()
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [globalFilter])

  const handleViewAuthor = (authorId: number) => {
    // Navigate to author detail page (implement with router)
    console.log('View author:', authorId)
  }

  const handleNextPage = () => {
    if (hasNextPage) {
      const nextPageData = pages.find(p => p.pageNumber === currentPage + 1)
      if (nextPageData) {
        setCursor(nextPageData.cursor)
        setCurrentPage(currentPage + 1)
        fetchAuthors(nextPageData.cursor, globalFilter || undefined)
      }
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPageData = pages.find(p => p.pageNumber === currentPage - 1)
      if (prevPageData) {
        setCursor(prevPageData.cursor)
        setCurrentPage(currentPage - 1)
        fetchAuthors(prevPageData.cursor, globalFilter || undefined)
      }
    }
  }

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    setCurrentPage(1)
    setCursor(null)
    setPages([{ cursor: null, pageNumber: 1 }])
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
            <div className="mt-4">
              <button
                onClick={() => fetchAuthors()}
                className="bg-red-100 px-3 py-2 rounded-md text-sm font-medium text-red-800 hover:bg-red-200"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header and Search */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Authors</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage and view all authors in the system
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search authors..."
              value={globalFilter ?? ''}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm ring-1 ring-gray-900/5 rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? 'cursor-pointer select-none flex items-center space-x-1'
                              : ''
                          }
                          onClick={header.column.getToggleSortingHandler()}
                        >
                          <span>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </span>
                          {header.column.getCanSort() && (
                            <span className="flex flex-col">
                              <ChevronUpIcon
                                className={`h-3 w-3 ${
                                  header.column.getIsSorted() === 'asc'
                                    ? 'text-gray-900'
                                    : 'text-gray-400'
                                }`}
                              />
                              <ChevronDownIcon
                                className={`h-3 w-3 -mt-1 ${
                                  header.column.getIsSorted() === 'desc'
                                    ? 'text-gray-900'
                                    : 'text-gray-400'
                                }`}
                              />
                            </span>
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center">
                    <LoadingSpinner />
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12 text-center text-gray-500">
                    {globalFilter ? 'No authors found matching your search.' : 'No authors found.'}
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-700">Rows per page:</label>
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">
                Page {currentPage}
              </span>
              <div className="flex space-x-1">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextPage}
                  disabled={!hasNextPage}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}