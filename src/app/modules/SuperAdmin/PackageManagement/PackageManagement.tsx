import { PackageApi } from '@/app/apis/AUTH/package.api'
import { Badge } from '@/app/components/ui/badge'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { Edit, Eye, Package, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import type { PackageData } from './models/package.type'
import { CreatePackageDialog, DeletePackageDialog, EditPackageDialog, ViewPackageDialog } from './partials'

const PAGE_SIZE = 10

function PackageManagement() {
  const [packages, setPackages] = useState<PackageData[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(PAGE_SIZE)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [packageToDelete, setPackageToDelete] = useState<PackageData | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<PackageData | null>(null)

  // Extracted loader so we can reload after operations
  const loadPackages = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const resp: any = await PackageApi.getAllPackages(page, limit)
      if (resp?.data) {
        setPackages(resp.data || [])
        setTotal(resp.total || 0)
      } else {
        setPackages([])
        setTotal(0)
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load packages')
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    loadPackages()
  }, [loadPackages])

  const openDeleteDialog = (pkg: PackageData) => {
    setPackageToDelete(pkg)
  }

  const closeDeleteDialog = () => {
    setPackageToDelete(null)
  }

  const confirmDelete = async () => {
    if (!packageToDelete) return
    setDeleteLoading(true)
    try {
      const resp = await PackageApi.deletePackage(packageToDelete.id)
      if (resp?.success) {
        await loadPackages()
        closeDeleteDialog()
        toast.success('Package deleted successfully')
      } else {
        setError(resp?.message || 'Failed to delete package')
        toast.error(resp?.message || 'Failed to delete package')
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to delete package')
      toast.error(err?.message || 'Failed to delete package')
    } finally {
      setDeleteLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return packages.filter((pkg) => {
      const textMatch = !q || [pkg.name, pkg.description, pkg.price.toString()].join(' ').toLowerCase().includes(q)
      const statusMatch = selectedStatus === 'all' || (pkg.status ?? '').toLowerCase() === selectedStatus
      return textMatch && statusMatch
    })
  }, [packages, search, selectedStatus])

  // sorting state: key can be 'name' | 'price' | 'duration' | 'status' or null; dir: 1 asc, -1 desc
  const [sortKey, setSortKey] = useState<'name' | 'price' | 'duration' | 'status' | null>(null)
  const [sortDir, setSortDir] = useState<1 | -1>(1)

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    const arr = [...filtered]
    arr.sort((a, b) => {
      let A: string | number = ''
      let B: string | number = ''

      switch (sortKey) {
        case 'name':
          A = a.name.toLowerCase()
          B = b.name.toLowerCase()
          break
        case 'price':
          A = a.price
          B = b.price
          break
        case 'duration':
          A = a.duration_in_months
          B = b.duration_in_months
          break
        case 'status':
          A = a.status.toLowerCase()
          B = b.status.toLowerCase()
          break
      }

      if (A < B) return -1 * sortDir
      if (A > B) return 1 * sortDir
      return 0
    })
    return arr
  }, [filtered, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  const handleAddPackage = () => setCreateOpen(true)
  const handleEditPackage = (pkg: PackageData) => {
    setSelectedPackage(pkg)
    setEditOpen(true)
  }
  const handleViewPackage = (pkg: PackageData) => {
    setSelectedPackage(pkg)
    setViewOpen(true)
  }
  const handleCreateSuccess = () => loadPackages()
  const handleEditSuccess = () => loadPackages()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const formatDuration = (months: number) => {
    if (months === 1) return '1 month'
    if (months < 12) return `${months} months`
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    if (remainingMonths === 0) {
      return years === 1 ? '1 year' : `${years} years`
    }
    return `${years}y ${remainingMonths}m`
  }

  return (
    <div className='flex flex-col min-h-screen gap-6'>
      <h1 className='text-4xl font-semibold'>Package Management</h1>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div className='flex items-center gap-4 w-full md:max-w-2xl'>
          <div className='relative w-full'>
            <Input
              placeholder='Search packages by name or description...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='pr-12'
            />
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v)}>
            <SelectTrigger size='default' className='min-w-[150px]'>
              <SelectValue>
                {selectedStatus === 'all'
                  ? 'All Statuses'
                  : selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Statuses</SelectItem>
              <SelectItem value='active'>Active</SelectItem>
              <SelectItem value='inactive'>Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <section className='rounded-md border bg-background p-4 shadow-sm'>
        {error && <div className='text-destructive mb-2'>{error}</div>}

        <div>
          <Table>
            <TableHeader>
              <tr>
                <TableHead
                  className='cursor-pointer'
                  onClick={() => {
                    if (sortKey !== 'name') {
                      setSortKey('name')
                      setSortDir(1)
                    } else {
                      setSortDir((d) => (d === 1 ? -1 : 1))
                    }
                  }}
                >
                  Package {sortKey === 'name' ? (sortDir === 1 ? '▲' : '▼') : ''}
                </TableHead>
                <TableHead
                  className='cursor-pointer'
                  onClick={() => {
                    if (sortKey !== 'price') {
                      setSortKey('price')
                      setSortDir(1)
                    } else {
                      setSortDir((d) => (d === 1 ? -1 : 1))
                    }
                  }}
                >
                  Price {sortKey === 'price' ? (sortDir === 1 ? '▲' : '▼') : ''}
                </TableHead>
                <TableHead
                  className='cursor-pointer'
                  onClick={() => {
                    if (sortKey !== 'duration') {
                      setSortKey('duration')
                      setSortDir(1)
                    } else {
                      setSortDir((d) => (d === 1 ? -1 : 1))
                    }
                  }}
                >
                  Duration {sortKey === 'duration' ? (sortDir === 1 ? '▲' : '▼') : ''}
                </TableHead>
                <TableHead
                  className='cursor-pointer'
                  onClick={() => {
                    if (sortKey !== 'status') {
                      setSortKey('status')
                      setSortDir(1)
                    } else {
                      setSortDir((d) => (d === 1 ? -1 : 1))
                    }
                  }}
                >
                  Status {sortKey === 'status' ? (sortDir === 1 ? '▲' : '▼') : ''}
                </TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Actions</TableHead>
              </tr>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className='p-8 text-center'>
                    Loading packages...
                  </TableCell>
                </TableRow>
              ) : sorted.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className='p-8 text-center'>
                    No packages found.
                  </TableCell>
                </TableRow>
              ) : (
                sorted.map((pkg) => (
                  <TableRow key={pkg.id}>
                    <TableCell className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center'>
                        <Package className='w-5 h-5 text-purple-600' />
                      </div>
                      <div>
                        <div className='font-medium'>{pkg.name}</div>
                        <div className='text-muted-foreground text-sm line-clamp-1'>{pkg.description}</div>
                      </div>
                    </TableCell>

                    <TableCell className='font-medium text-green-600'>{formatPrice(pkg.price)}</TableCell>

                    <TableCell>{formatDuration(pkg.duration_in_months)}</TableCell>

                    <TableCell>
                      <Badge
                        variant={pkg.status === 'active' ? 'default' : 'destructive'}
                        className={
                          pkg.status === 'active'
                            ? 'bg-green-100 text-green-800 border-transparent'
                            : 'bg-red-100 text-red-800 border-transparent'
                        }
                      >
                        {pkg.status.toUpperCase()}
                      </Badge>
                    </TableCell>

                    <TableCell className='text-sm text-muted-foreground'>
                      {pkg.created_at ? new Date(pkg.created_at).toLocaleDateString('en-GB') : '-'}
                    </TableCell>

                    <TableCell className='text-sm'>{pkg.features?.length || 0} features</TableCell>

                    <TableCell>
                      <div className='flex items-center justify-start gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          aria-label={`View ${pkg.name}`}
                          onClick={() => handleViewPackage(pkg)}
                        >
                          <Eye className='size-4' />
                        </Button>

                        <Button
                          variant='ghost'
                          size='icon'
                          aria-label={`Edit ${pkg.name}`}
                          onClick={() => handleEditPackage(pkg)}
                        >
                          <Edit className='size-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <tr>
                <td colSpan={7} className='px-2 py-3 bg-white'>
                  <div className='flex items-center justify-between'>
                    <div className='text-sm text-muted-foreground'>
                      Showing {Math.min((page - 1) * limit + 1, total)} - {Math.min(page * limit, total)} of {total}
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        Prev
                      </Button>
                      <div className='text-sm'>
                        Page {page} / {totalPages}
                      </div>
                      <Button
                        size='sm'
                        variant='ghost'
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </td>
              </tr>
            </TableFooter>
          </Table>
        </div>

        <DeletePackageDialog
          open={Boolean(packageToDelete)}
          package={packageToDelete}
          loading={deleteLoading}
          onClose={closeDeleteDialog}
          onConfirm={confirmDelete}
        />

        <CreatePackageDialog open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={handleCreateSuccess} />

        <EditPackageDialog
          open={editOpen}
          package={selectedPackage}
          onClose={() => setEditOpen(false)}
          onSuccess={handleEditSuccess}
        />

        <ViewPackageDialog open={viewOpen} package={selectedPackage} onClose={() => setViewOpen(false)} />
      </section>
    </div>
  )
}

export default PackageManagement
