import { useEffect, useState, useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@/app/routes/path'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/app/components/ui/select'
import { Badge } from '@/app/components/ui/badge'
import { Check, Edit, Eye, Trash2 } from 'lucide-react'
import { toast } from 'react-toastify'
import CreateWorkspaceDialog from './partials/CreateWorkspaceDialog'
import EditWorkspaceDialog from './partials/EditWorkspaceDialog'
import DeleteWorkspaceDialog from './partials/DeleteWorkspaceDialog'
import { WorkspaceAPI } from '@/app/apis/AUTH/workspace.api'
import type { Workspace, WorkspaceListResponse } from '@/app/apis/AUTH/workspace.api'

const PAGE_SIZE = 10

function WorkspaceManagement() {
  const navigate = useNavigate()
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(PAGE_SIZE)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPackage, setSelectedPackage] = useState<string>('all')

  // Dialog states
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [workspaceToDelete, setWorkspaceToDelete] = useState<Workspace | null>(null)
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  // Derived filter labels
  const packageLabels = useMemo(
    () => Array.from(new Set(workspaces.map((w) => w.package?.name ?? '').filter(Boolean))),
    [workspaces]
  )
  const selectedPackageLabel =
    selectedPackage === 'all'
      ? 'All Packages'
      : (packageLabels.find((p) => p.toLowerCase() === selectedPackage) ?? selectedPackage)

  const loadWorkspaces = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const resp: WorkspaceListResponse = await WorkspaceAPI.getAllWorkspaces({ page, limit })
      if (resp?.data) {
        setWorkspaces(resp.data.data || [])
        setTotal(resp.data.total || 0)
      } else {
        setWorkspaces([])
        setTotal(0)
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load workspaces')
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    loadWorkspaces()
  }, [loadWorkspaces])

  // Dialog handlers
  const handleAdd = () => setCreateOpen(true)
  const handleCreateSuccess = () => loadWorkspaces()

  const handleView = (workspace: Workspace) => {
    navigate(PATH.SUPER_ADMIN_WORKSPACE_DETAIL.replace(':id', workspace.id))
  }

  const handleEdit = (workspace: Workspace) => {
    setSelectedWorkspace(workspace)
    setEditOpen(true)
  }

  const openDeleteDialog = (workspace: Workspace) => {
    setWorkspaceToDelete(workspace)
  }

  const closeDeleteDialog = () => {
    setWorkspaceToDelete(null)
  }

  const confirmDelete = async () => {
    if (!workspaceToDelete) return
    setDeleteLoading(true)
    try {
      const resp = await WorkspaceAPI.deleteWorkspace(workspaceToDelete.id)
      if (resp?.success) {
        await loadWorkspaces()
        closeDeleteDialog()
        toast.success('Workspace deleted successfully')
      } else {
        setError(resp?.message || 'Failed to delete workspace')
        toast.error(resp?.message || 'Failed to delete workspace')
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to delete workspace')
      toast.error(err?.message || 'Failed to delete workspace')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleActivate = async (workspace: Workspace) => {
    try {
      const resp = await WorkspaceAPI.activateWorkspace(workspace.id)
      if (resp?.success) {
        await loadWorkspaces()
        toast.success('Workspace activated successfully')
      } else {
        setError(resp?.message || 'Failed to activate workspace')
        toast.error(resp?.message || 'Failed to activate workspace')
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to activate workspace')
      toast.error(err?.message || 'Failed to activate workspace')
    }
  }

  // Filters
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return workspaces.filter((w) => {
      const textMatch = !q || [w.name, w.company_name].join(' ').toLowerCase().includes(q)
      const statusMatch = selectedStatus === 'all' || w.status.toLowerCase() === selectedStatus
      const packageMatch = selectedPackage === 'all' || w.package?.name.toLowerCase() === selectedPackage
      return textMatch && statusMatch && packageMatch
    })
  }, [workspaces, search, selectedStatus, selectedPackage])

  const totalPages = Math.max(1, Math.ceil(total / limit))

  return (
    <div className='flex flex-col min-h-screen gap-6'>
      <h1 className='text-4xl font-semibold'>Workspace Management</h1>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        <div className='flex items-center gap-4 w-full md:max-w-2xl'>
          <div className='relative w-full'>
            <Input
              placeholder='Search workspaces by name or company...'
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
          <Select value={selectedPackage.toLowerCase()} onValueChange={(v) => setSelectedPackage(v)}>
            <SelectTrigger size='default' className='min-w-[150px]'>
              <SelectValue>{selectedPackageLabel}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Packages</SelectItem>
              {packageLabels.map((p) => (
                <SelectItem key={p} value={p.toLowerCase()}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            variant='default'
            size='default'
            onClick={handleAdd}
            className='bg-purple-500 hover:bg-purple-600 text-white'
          >
            + Add New Workspace
          </Button>
        </div>
      </div>

      <section className='rounded-md border bg-background p-4 shadow-sm'>
        {error && <div className='text-destructive mb-2'>{error}</div>}

        <div className='overflow-x-auto'>
          <Table>
          <TableHeader>
            <tr>
              <TableHead>Name</TableHead>
              <TableHead>Company Code</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Expire Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className='p-8 text-center'>
                  Loading workspaces...
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className='p-8 text-center'>
                  No workspaces found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.slice(0, 10).map((w) => (
                <TableRow key={w.id}>
                  <TableCell>{w.name}</TableCell>
                  <TableCell>{w.company_code ?? 'N/A'}</TableCell>
                  <TableCell>{w.company_name}</TableCell>
                  <TableCell>{w.package?.name ?? '-'}</TableCell>
                  <TableCell>{new Date(w.start_date).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(w.expire_date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant={w.status === 'active' ? 'default' : 'destructive'}
                      className={
                        w.status === 'active'
                          ? 'bg-green-100 text-green-800 border-transparent'
                          : 'bg-red-100 text-red-800 border-transparent'
                      }
                    >
                      {w.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-start gap-2'>
                      <Button variant='ghost' size='icon' aria-label={`View ${w.name}`} onClick={() => handleView(w)}>
                        <Eye className='size-4' />
                      </Button>
                      <Button variant='ghost' size='icon' aria-label={`Edit ${w.name}`} onClick={() => handleEdit(w)}>
                        <Edit className='size-4' />
                      </Button>

                      {w.status === 'active' ? (
                        <Button
                          variant='destructive'
                          size='icon'
                          aria-label={`Delete ${w.name}`}
                          onClick={() => openDeleteDialog(w)}
                        >
                          <Trash2 className='size-4' />
                        </Button>
                      ) : (
                        <Button
                          variant='default'
                          size='icon'
                          aria-label={`Activate ${w.name}`}
                          onClick={() => handleActivate(w)}
                          className='bg-green-800 hover:bg-green-900 text-white'
                        >
                          <Check className='size-4' />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}

            {/* filler rows to always show VISIBLE_ROWS */}
            {Array.from({ length: Math.max(0, 10 - filtered.slice(0, 10).length) }).map((_, i) => (
              <TableRow key={`filler-${i}`} className='h-14'>
                <TableCell colSpan={6} />
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <tr>
              <td colSpan={8} className='px-2 py-3'>
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
                      disabled={page === totalPages}
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
      </section>

      <CreateWorkspaceDialog
        open={createOpen}
        onClose={() => {
          setCreateOpen(false)
        }}
        onSuccess={handleCreateSuccess}
      />

      <EditWorkspaceDialog
        open={editOpen}
        onClose={() => {
          setEditOpen(false)
          setSelectedWorkspace(null)
        }}
        onSuccess={handleCreateSuccess}
        workspace={selectedWorkspace}
      />

      <DeleteWorkspaceDialog
        open={!!workspaceToDelete}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        workspace={workspaceToDelete}
        loading={deleteLoading}
      />
    </div>
  )
}

export default WorkspaceManagement
