import logoFlowpilot from '@/app/assets/LogoFlowPilot.png'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { PATH } from '@/app/routes/path'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { object, string } from 'yup'
import type { ForgotPasswordForm } from './models/ForgetPasswordFormInterface'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/app/apis/AUTH/Auth.api'
import { toast } from 'react-toastify'
import type { LoginResponse } from '../Login/models/LoginFormInterface'

const forgotPasswordSchema = object({
  email: string().email('Invalid email address').required('Email is required')
})

const ForgotPassword = () => {
  const navigate = useNavigate()

  const form = useForm<ForgotPasswordForm>({
    mode: 'onBlur',
    defaultValues: {
      email: ''
    },
    resolver: yupResolver(forgotPasswordSchema)
  })

  const { control, handleSubmit } = form

  const sendOtpMutation = useMutation<LoginResponse, { data?: LoginResponse; message?: string }, { email: string }>({
    mutationFn: (payload: { email: string }) => authApi.sendOtpForgotPassword(payload.email),
    onSuccess: (data) => {
      if (data && data.success) {
        toast.success('OTP sent successfully!')
        navigate(PATH.RESET_PASSWORD, { state: { email: form.getValues('email') } })
      } else {
        const errorMessage = typeof data.message === 'string' ? data.message : data.message?.message || 'Failed to send OTP!'
        toast.error(errorMessage)
      }
    },
    onError: (error: { data?: LoginResponse; message?: string }) => {
      let errorMessage = 'Failed to send OTP!'
      if (error?.data?.message) {
        errorMessage = typeof error.data.message === 'string' ? error.data.message : error.data.message.message
      } else if (error?.message) {
        errorMessage = error.message
      }
      toast.error(errorMessage)
    }
  })

  const isLoading = sendOtpMutation.status === 'pending'

  const onSubmit: SubmitHandler<ForgotPasswordForm> = (data) => {
    sendOtpMutation.mutate({ email: data.email })
  }

  return (
    <div
      className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300'
      style={{ backgroundAttachment: 'fixed' }}
    >
      <Card className='w-full max-w-md bg-white/90 rounded-2xl shadow-2xl flex flex-col items-center p-10 border-0 relative'>
        <CardContent className='w-full flex flex-col items-center p-0 '>
          <button
            className='absolute left-8 top-8 flex items-center gap-1 text-blue-500 hover:text-blue-700 font-medium px-2 py-1 rounded-md z-10'
            onClick={() => navigate(PATH.LOGIN)}
            aria-label='Back'
          >
            <svg width='20' height='20' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
            </svg>
            Back
          </button>
          <div className='flex flex-col items-center mb-8'>
            <img className='w-28 h-28 object-contain drop-shadow-lg' src={logoFlowpilot} alt='flow-pilot-logo' />
            <p className='text-gray-400 text-sm text-center'>
              Please provide your email address, and we’ll send you an OTP to reset your password.
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center gap-4'>
              <FormField
                control={control}
                name='email'
                render={({ field }) => (
                  <FormItem className='w-full max-w-sm'>
                    <FormLabel className='text-base font-medium text-gray-700'>Email</FormLabel>
                    <FormControl>
                      <Input {...field} type='email' placeholder='Enter your email' autoComplete='email' />
                    </FormControl>
                    <FormMessage className='text-red-500 text-xs mt-1' />
                  </FormItem>
                )}
              />

              <Button
                type='submit'
                className='w-full max-w-sm bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 rounded-full text-lg transition mb-4 border-0 shadow-md'
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : 'Submit'}
              </Button>
            </form>
          </Form>
          <div className='flex flex-col gap-2 w-full text-sm text-gray-500 mt-2'>
            <span className='text-center'>
              Already have an account?{' '}
              <Link to={PATH.LOGIN} className='text-blue-500 hover:underline font-medium'>
                Click here
              </Link>
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ForgotPassword
