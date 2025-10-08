import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog'
import { Button } from '@/app/components/ui/button'
import { Input } from '@/app/components/ui/input'
import { Label } from '@/app/components/ui/label'
import { Textarea } from '@/app/components/ui/textarea'
import { guestApi } from '@/app/apis/AUTH/guest.api'
import * as yup from 'yup'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  packageId: string
  packageName: string
}

interface FormData {
  name: string
  email: string
  phone: string
  company_name: string
  note: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  company_name?: string
  note?: string
}

// Yup validation schema
const consultationSchema = yup.object().shape({
  name: yup.string().trim().required('Họ tên là bắt buộc').min(2, 'Họ tên phải có ít nhất 2 ký tự'),
  email: yup.string().trim().required('Email là bắt buộc').email('Email không hợp lệ'),
  phone: yup
    .string()
    .trim()
    .required('Số điện thoại là bắt buộc')
    .test('vietnam-phone', 'Số điện thoại không đúng định dạng Việt Nam', function (value) {
      if (!value) return false
      // Loại bỏ khoảng trắng, gạch và dấu ngoặc
      const cleanPhone = value.replace(/[\s\-()]/g, '')

      // Cho phép 10 hoặc 11 chữ số
      const vietnamPhonePattern = /(84|0[2|3|5|7|8|9])+([0-9]{9})\b/

      return vietnamPhonePattern.test(cleanPhone)
    }),
  company_name: yup.string().trim(),
  note: yup.string().trim()
})

export function ConsultationModal({ isOpen, onClose, packageId, packageName }: ConsultationModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company_name: '',
    note: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const validateForm = async (): Promise<FormErrors> => {
    try {
      await consultationSchema.validate(formData, { abortEarly: false })
      return {}
    } catch (error) {
      const validationErrors: FormErrors = {}
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path as keyof FormErrors] = err.message
          }
        })
      }
      return validationErrors
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const validationErrors = await validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await guestApi.createConsultationRequest(
        formData.name,
        formData.email,
        formData.phone,
        formData.company_name,
        packageId,
        formData.note
      )

      setSubmitted(true)
      // Reset form after 2 seconds
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company_name: '',
          note: ''
        })
        onClose()
      }, 2000)
    } catch (error: any) {
      console.error('Error submitting consultation request:', error)
      alert('Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        company_name: '',
        note: ''
      })
      setErrors({})
      setSubmitted(false)
      onClose()
    }
  }

  if (submitted) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className='sm:max-w-md'>
          <div className='text-center py-8'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
              </svg>
            </div>
            <h3 className='text-lg font-semibold text-gray-900 mb-2'>Gửi yêu cầu thành công!</h3>
            <p className='text-gray-600'>Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.</p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className='sm:max-w-lg max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Đăng ký tư vấn - {packageName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-4 pt-2'>
          {/* Name */}
          <div className='space-y-1'>
            <Label htmlFor='name'>
              Họ tên <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='name'
              type='text'
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              placeholder='Nhập họ tên của bạn'
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && <p className='text-sm text-red-500'>{errors.name}</p>}
          </div>

          {/* Email */}
          <div className='space-y-1'>
            <Label htmlFor='email'>
              Email <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='email'
              type='email'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder='Nhập địa chỉ email'
              className={errors.email ? 'border-red-500' : ''}
            />
            {errors.email && <p className='text-sm text-red-500'>{errors.email}</p>}
          </div>

          {/* Phone */}
          <div className='space-y-1'>
            <Label htmlFor='phone'>
              Số điện thoại <span className='text-red-500'>*</span>
            </Label>
            <Input
              id='phone'
              type='tel'
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder='Nhập số điện thoại'
              className={errors.phone ? 'border-red-500' : ''}
            />
            {errors.phone && <p className='text-sm text-red-500'>{errors.phone}</p>}
          </div>

          {/* Company Name */}
          <div className='space-y-1'>
            <Label htmlFor='company_name'>Tên công ty</Label>
            <Input
              id='company_name'
              type='text'
              value={formData.company_name}
              onChange={(e) => handleInputChange('company_name', e.target.value)}
              placeholder='Nhập tên công ty (tùy chọn)'
            />
          </div>

          {/* Note */}
          <div className='space-y-1'>
            <Label htmlFor='note'>Ghi chú</Label>
            <Textarea
              id='note'
              value={formData.note}
              onChange={(e) => handleInputChange('note', e.target.value)}
              placeholder='Nhập ghi chú hoặc yêu cầu đặc biệt (tùy chọn)'
              rows={3}
            />
          </div>

          {/* Buttons */}
          <div className='flex gap-3 pt-4'>
            <Button type='button' variant='outline' onClick={handleClose} className='flex-1' disabled={isSubmitting}>
              Hủy
            </Button>
            <Button
              type='submit'
              className='flex-1 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-500 text-white hover:scale-105 transition-transform'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
