import { useEffect, useState, useCallback, useMemo } from 'react'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/app/components/ui/table'
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/app/components/ui/select'
import { Badge } from '@/app/components/ui/badge'
import { Eye, Trash2, Search } from 'lucide-react'
import { toast } from 'react-toastify'
// import EditConsultationReqDialog from './partials/EditConsultationReqDialog'
import DeleteConsultationReqDialog from './partials/DeleteConsultationReqDialog'
import ViewConsultationReqDialog from './partials/ViewConsultationReqDialog'
import { ConsultationRequestAPI } from '@/app/apis/AUTH/consultation-req.api'
import {
  STATUS_CONFIG,
  type ConsultationRequest,
  type ConsultationRequestListResponse
} from './models/ConsultationReqManagementInterface'

const PAGE_SIZE = 10

function ConsultationReqManagement() {
  const [consultationRequests, setConsultationRequests] = useState<ConsultationRequest[]>([])
  const [page, setPage] = useState<number>(1)
  const [limit] = useState<number>(PAGE_SIZE)
  const [total, setTotal] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedPackage, setSelectedPackage] = useState<string>('all')

  // Dialog states
  // const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [viewOpen, setViewOpen] = useState(false)
  const [requestToDelete, setRequestToDelete] = useState<ConsultationRequest | null>(null)
  const [selectedRequest, setSelectedRequest] = useState<ConsultationRequest | null>(null)
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false)

  // Derived filter labels
  const packageLabels = useMemo(
    () => Array.from(new Set(consultationRequests.map((w) => w.package?.name ?? '').filter(Boolean))),
    [consultationRequests]
  )
  const selectedPackageLabel =
    selectedPackage === 'all'
      ? 'All Packages'
      : (packageLabels.find((p) => p.toLowerCase() === selectedPackage) ?? selectedPackage)

  // Load data
  const loadConsultationRequests = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const resp: ConsultationRequestListResponse = await ConsultationRequestAPI.getAllConsultationRequests({
        page,
        limit
      })
      if (resp?.success && resp?.data) {
        setConsultationRequests(resp.data.data || [])
        setTotal(resp.data.total || 0)
      } else {
        setConsultationRequests([])
        setTotal(0)
        setError('Failed to load consultation requests')
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to load consultation requests')
      setConsultationRequests([])
      setTotal(0)
    } finally {
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    loadConsultationRequests()
  }, [loadConsultationRequests])

  // Filter data
  const filteredRequests = useMemo(() => {
    return consultationRequests.filter((request) => {
      const matchesSearch =
        search === '' ||
        request.name.toLowerCase().includes(search.toLowerCase()) ||
        request.email.toLowerCase().includes(search.toLowerCase()) ||
        request.company_name.toLowerCase().includes(search.toLowerCase())

      const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus

      const matchesPackage = selectedPackage === 'all' || request.package_id === selectedPackage

      return matchesSearch && matchesStatus && matchesPackage
    })
  }, [consultationRequests, search, selectedStatus, selectedPackage])

  // Event handlers
  const handleView = (request: ConsultationRequest) => {
    setSelectedRequest(request)
    setViewOpen(true)
  }

  // const handleEdit = (request: ConsultationRequest) => {
  //   setSelectedRequest(request)
  //   setEditOpen(true)
  // }

  const openDeleteDialog = (request: ConsultationRequest) => {
    setRequestToDelete(request)
    setDeleteOpen(true)
  }

  const closeDeleteDialog = () => {
    setRequestToDelete(null)
    setDeleteOpen(false)
  }

  const confirmDelete = async () => {
    if (!requestToDelete) return
    setDeleteLoading(true)
    try {
      const resp = await ConsultationRequestAPI.deleteConsultationRequest(requestToDelete.id)
      if (resp?.success) {
        await loadConsultationRequests()
        closeDeleteDialog()
        toast.success('Consultation request deleted successfully')
      } else {
        setError(resp?.message || 'Failed to delete consultation request')
        toast.error(resp?.message || 'Failed to delete consultation request')
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to delete consultation request')
      toast.error(err?.message || 'Failed to delete consultation request')
    } finally {
      setDeleteLoading(false)
    }
  }

  const handlePlaceOrder = (request: ConsultationRequest) => {
    // TODO: Implement place order functionality
    toast.info(`Place order functionality for ${request.name} will be implemented`)
  }

  // Status badge rendering
  const getStatusBadge = (status: string) => {
    const config = STATUS_CONFIG[status] || STATUS_CONFIG.new
    return (
      <Badge variant={config.variant} className='text-xs'>
        {config.label}
      </Badge>
    )
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  // Pagination
  const totalPages = Math.ceil(total / limit)
  const canPrevious = page > 1
  const canNext = page < totalPages

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-gray-900'>Consultation Requests</h1>
        <p className='text-gray-600'>Manage customer consultation requests and inquiries</p>
      </div>

      {/* Filters and Search */}
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        {/* Search */}
        <div className='flex items-center gap-4 w-full md:max-w-2xl'>
          <div className='relative w-full'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
            <Input
              type='text'
              placeholder='Search by name, email, or company...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='pl-10'
            />
          </div>
        </div>

        <div className='flex items-center gap-3'>
          {/* Status Filter */}
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder='All Statuses' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Statuses</SelectItem>
              <SelectItem value='new'>New</SelectItem>
              <SelectItem value='contacted'>Contacted</SelectItem>
              <SelectItem value='closed'>Closed</SelectItem>
            </SelectContent>
          </Select>

          {/* Package Filter */}
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
        </div>
      </div>

      {/* Error Display */}
      {error && <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded'>{error}</div>}

      {/* Table */}
      <div className='bg-white rounded-lg border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className='text-center py-8'>
                  <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600'></div>
                    <span className='ml-2'>Loading...</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredRequests.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className='text-center py-8 text-gray-500'>
                  No consultation requests found
                </TableCell>
              </TableRow>
            ) : (
              filteredRequests.slice(0, PAGE_SIZE).map((request) => (
                <TableRow key={request.id} className='hover:bg-gray-50'>
                  <TableCell className='font-medium'>{request.name}</TableCell>
                  <TableCell className='text-gray-600'>{request.email}</TableCell>
                  <TableCell>{request.company_name}</TableCell>
                  <TableCell>
                    <span className='text-sm text-blue-600 font-medium'>{request.package?.name || 'N/A'}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell className='text-gray-600'>{formatDate(request.created_at)}</TableCell>
                  <TableCell>
                    <div className='flex items-center justify-start gap-2'>
                      <Button variant='ghost' size='sm' onClick={() => handleView(request)} className='h-8 w-8 p-0'>
                        <Eye className='h-4 w-4' />
                      </Button>
                      {/* <Button variant='ghost' size='sm' onClick={() => handleEdit(request)} className='h-8 w-8 p-0'>
                        <Edit className='h-4 w-4' />
                      </Button> */}
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => openDeleteDialog(request)}
                        className='h-8 w-8 p-0 text-red-600 hover:text-red-700'
                      >
                        <Trash2 className='h-4 w-4' />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}

            {/* filler rows to always show VISIBLE_ROWS */}
            {Array.from({ length: Math.max(0, PAGE_SIZE - filteredRequests.slice(0, PAGE_SIZE).length) }).map(
              (_, i) => (
                <TableRow key={`filler-${i}`} className='h-14'>
                  <TableCell colSpan={6} />
                </TableRow>
              )
            )}
          </TableBody>
          {!loading && filteredRequests.length > 0 && (
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>
                  <div className='flex items-center justify-between'>
                    <div className='text-sm text-gray-600'>
                      Showing {filteredRequests.length} of {total} requests
                    </div>
                    <div className='flex items-center gap-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePageChange(page - 1)}
                        disabled={!canPrevious}
                      >
                        Previous
                      </Button>
                      <span className='text-sm text-gray-600'>
                        Page {page} of {totalPages}
                      </span>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => handlePageChange(page + 1)}
                        disabled={!canNext}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </div>

      {/* Dialogs */}
      {/* <EditConsultationReqDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        onSuccess={loadConsultationRequests}
        consultationRequest={selectedRequest}
      /> */}

      <DeleteConsultationReqDialog
        open={deleteOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        consultationRequest={requestToDelete}
        loading={deleteLoading}
      />

      <ViewConsultationReqDialog
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        consultationRequest={selectedRequest}
        onPlaceOrder={handlePlaceOrder}
      />
    </div>
  )
}

export default ConsultationReqManagement
