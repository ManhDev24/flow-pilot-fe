import { useEffect, useMemo, useState, useCallback } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { Edit, Trash2, Eye, Settings } from 'lucide-react'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/app/components/ui/select'
import { CreateFeatureDialog, EditFeatureDialog, ViewFeatureDialog, DeleteFeatureDialog } from './partials'
import { FeatureApi } from '@/app/apis/AUTH/feature.api'
import { toast } from 'react-toastify'
import type { FeatureData } from './models/feature.type'

const PAGE_SIZE = 10

function FeatureManagement() {
  const [features, setFeatures] = useState<FeatureData[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(PAGE_SIZE)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [featureToDelete, setFeatureToDelete] = useState<FeatureData | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [selectedFeature, setSelectedFeature] = useState<FeatureData | null>(null)

  // Extracted loader so we can reload after operations
  const loadFeatures = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const resp: any = await FeatureApi.getAllFeature(page, limit)
      if (resp?.data) {
        setFeatures(resp.data || [])
        setTotal(resp.total || 0)
      } else {
        setFeatures([])
        setTotal(0)
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load features')
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    loadFeatures()
  }, [loadFeatures])

  const openDeleteDialog = (feature: FeatureData) => {
    setFeatureToDelete(feature)
  }

  const closeDeleteDialog = () => {
    setFeatureToDelete(null)
  }

  const confirmDelete = async () => {
    if (!featureToDelete) return
    setDeleteLoading(true)
    try {
      const resp = await FeatureApi.deleteFeature(featureToDelete.id)
      if (resp?.success) {
        await loadFeatures()
        closeDeleteDialog()
        toast.success('Feature deleted successfully')
      } else {
        setError(resp?.message || 'Failed to delete feature')
        toast.error(resp?.message || 'Failed to delete feature')
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to delete feature')
      toast.error(err?.message || 'Failed to delete feature')
    } finally {
      setDeleteLoading(false)
    }
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return features.filter((feature) => {
      const textMatch = !q || [feature.name, feature.description].join(' ').toLowerCase().includes(q)
      const statusMatch = selectedStatus === 'all' || (feature.status ?? '').toLowerCase() === selectedStatus
      return textMatch && statusMatch
    })
  }, [features, search, selectedStatus])

  // sorting state: key can be 'name' | 'status' or null; dir: 1 asc, -1 desc
  const [sortKey, setSortKey] = useState<'name' | 'status' | null>(null)
  const [sortDir, setSortDir] = useState<1 | -1>(1)

  const sorted = useMemo(() => {
    if (!sortKey) return filtered
    const arr = [...filtered]
    arr.sort((a, b) => {
      let A: string = ''
      let B: string = ''

      switch (sortKey) {
        case 'name':
          A = a.name.toLowerCase()
          B = b.name.toLowerCase()
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

  const handleAddFeature = () => setCreateOpen(true)
  const handleEditFeature = (feature: FeatureData) => {
    setSelectedFeature(feature)
    setEditOpen(true)
  }
  const handleViewFeature = (feature: FeatureData) => {
    setSelectedFeature(feature)
    setViewOpen(true)
  }
  const handleCreateSuccess = () => loadFeatures()
  const handleEditSuccess = () => loadFeatures()

  return (
    <div className='flex flex-col min-h-screen gap-6'>
      <h1 className='text-4xl font-semibold'>Feature Management</h1>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div className='flex items-center gap-4 w-full md:max-w-2xl'>
          <div className='relative w-full'>
            <Input
              placeholder='Search features by name or description...'
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

          <Button
            variant='default'
            size='default'
            onClick={handleAddFeature}
            className='bg-blue-500 hover:bg-blue-600 text-white'
          >
            + Add New Feature
          </Button>
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
                  Feature {sortKey === 'name' ? (sortDir === 1 ? '▲' : '▼') : ''}
                </TableHead>
                <TableHead>Description</TableHead>
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
                <TableHead>Updated Date</TableHead>
                <TableHead>Actions</TableHead>
              </tr>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className='p-8 text-center'>
                    Loading features...
                  </TableCell>
                </TableRow>
              ) : sorted.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className='p-8 text-center'>
                    No features found.
                  </TableCell>
                </TableRow>
              ) : (
                sorted.map((feature) => (
                  <TableRow key={feature.id}>
                    <TableCell className='flex items-center gap-3'>
                      <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center'>
                        <Settings className='w-5 h-5 text-blue-600' />
                      </div>
                      <div className='text-sm text-muted-foreground' title={feature.name}>
                        {feature.name.length > 30 ? feature.name.slice(0, 30) + '...' : feature.name}
                      </div>
                    </TableCell>

                    <TableCell className='max-w-xs'>
                      <div className='text-sm text-muted-foreground' title={feature.description}>
                        {feature.description.length > 30
                          ? feature.description.slice(0, 30) + '...'
                          : feature.description}
                      </div>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant={feature.status === 'active' ? 'default' : 'destructive'}
                        className={
                          feature.status === 'active'
                            ? 'bg-green-100 text-green-800 border-transparent'
                            : 'bg-red-100 text-red-800 border-transparent'
                        }
                      >
                        {feature.status.toUpperCase()}
                      </Badge>
                    </TableCell>

                    <TableCell className='text-sm text-muted-foreground'>
                      {feature.created_at ? new Date(feature.created_at).toLocaleDateString('en-GB') : '-'}
                    </TableCell>

                    <TableCell className='text-sm text-muted-foreground'>
                      {feature.updated_at ? new Date(feature.updated_at).toLocaleDateString('en-GB') : '-'}
                    </TableCell>

                    <TableCell>
                      <div className='flex items-center justify-start gap-2'>
                        <Button
                          variant='ghost'
                          size='icon'
                          aria-label={`View ${feature.name}`}
                          onClick={() => handleViewFeature(feature)}
                        >
                          <Eye className='size-4' />
                        </Button>

                        <Button
                          variant='ghost'
                          size='icon'
                          aria-label={`Edit ${feature.name}`}
                          onClick={() => handleEditFeature(feature)}
                        >
                          <Edit className='size-4' />
                        </Button>

                        <Button
                          variant='destructive'
                          size='icon'
                          aria-label={`Delete ${feature.name}`}
                          onClick={() => openDeleteDialog(feature)}
                        >
                          <Trash2 className='size-4' />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            <TableFooter>
              <tr>
                <td colSpan={6} className='px-2 py-3 bg-white'>
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

        <DeleteFeatureDialog
          open={Boolean(featureToDelete)}
          feature={featureToDelete}
          loading={deleteLoading}
          onClose={closeDeleteDialog}
          onConfirm={confirmDelete}
        />

        <CreateFeatureDialog open={createOpen} onClose={() => setCreateOpen(false)} onSuccess={handleCreateSuccess} />

        <EditFeatureDialog
          open={editOpen}
          feature={selectedFeature}
          onClose={() => setEditOpen(false)}
          onSuccess={handleEditSuccess}
        />

        <ViewFeatureDialog open={viewOpen} feature={selectedFeature} onClose={() => setViewOpen(false)} />
      </section>
    </div>
  )
}

export default FeatureManagement
