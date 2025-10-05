import logoFlowpilot from '@/app/assets/LogoFlowPilot.png'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent } from '@/app/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/app/components/ui/form'
import { Input } from '@/app/components/ui/input'
import { PATH } from '@/app/routes/path'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { object, ref, string } from 'yup'
import { useResetPassword, useResendOtp } from './hooks/useResetPassword'
import type { ResetPasswordForm } from './models/ResetPasswordFormInterface'

const resetPasswordFormSchema = object({
  code: string()
    .required('OTP code is required')
    .length(6, 'OTP code must be 6 characters'),
  newPassword: string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password cannot exceed 100 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
      'Password must contain at least one uppercase letter, one number, and one special character'
    )
    .required('New password is required'),
  confirmPassword: string()
    .oneOf([ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required')
})

const ResetPassword = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>(location.state?.email || '')
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(300) // Start with 5 minutes (300 seconds)

  const resetPasswordMutation = useResetPassword(email)
  const resendOtpMutation = useResendOtp(email)
  const isLoading = resetPasswordMutation.status === 'pending'
  const isResendingOtp = resendOtpMutation.status === 'pending'

  useEffect(() => {
    if (!email) {
      // Redirect to forgot password if email is not available
      setEmail('')
      navigate(PATH.FORGOT_PASSWORD)
    }
  }, [email, navigate])

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const form = useForm<ResetPasswordForm>({
    mode: 'onBlur',
    defaultValues: {
      code: '',
      newPassword: '',
      confirmPassword: ''
    },
    resolver: yupResolver(resetPasswordFormSchema)
  })

  const { control, handleSubmit } = form

  const onSubmit: SubmitHandler<ResetPasswordForm> = (data) => {
    resetPasswordMutation.mutate({
      code: data.code,
      newPassword: data.newPassword,
      confirmPassword: data.confirmPassword
    })
  }

  const handleResendOtp = () => {
    if (countdown === 0) {
      resendOtpMutation.mutate()
      setCountdown(300) // 5 minutes = 300 seconds
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <div
      className='min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300'
      style={{ backgroundAttachment: 'fixed' }}
    >
      <Card className='w-full max-w-md bg-white/90 rounded-2xl shadow-2xl flex flex-col items-center p-10 border-0 relative'>
        <CardContent className='w-full flex flex-col items-center p-0'>
          <div className='flex flex-col items-center mb-8'>
            <img className='w-28 h-28 object-contain drop-shadow-lg' src={logoFlowpilot} alt='flow-pilot-logo' />
            <p className='text-gray-400 text-sm text-center'>Reset Your Password</p>
            <p className='text-gray-500 text-xs mt-2 text-center'>
              Enter the OTP code sent to <span className='font-semibold text-blue-600'>{email}</span>
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col items-center gap-4'>
              <FormField
                control={control}
                name='code'
                render={({ field }) => (
                  <FormItem className='w-full max-w-sm'>
                    <FormLabel className='text-base font-medium text-gray-700'>OTP Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type='text'
                        placeholder='Enter 6-digit OTP code'
                        maxLength={6}
                        autoComplete='off'
                      />
                    </FormControl>
                    <FormMessage className='text-red-500 text-xs mt-1' />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='newPassword'
                render={({ field }) => (
                  <FormItem className='w-full max-w-sm'>
                    <FormLabel className='text-base font-medium text-gray-700'>New Password</FormLabel>
                    <div className='relative'>
                      <FormControl>
                        <Input
                          {...field}
                          type={showNewPassword ? 'text' : 'password'}
                          placeholder='Enter your new password'
                          autoComplete='new-password'
                          className='pr-10'
                        />
                      </FormControl>
                      <button
                        type='button'
                        tabIndex={-1}
                        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none'
                        onClick={() => setShowNewPassword((v) => !v)}
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.807 6.07 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.01M6.228 6.228A10.45 10.45 0 0 1 12 5.25c3.68 0 7.714 2.943 9.75 6.75a10.48 10.48 0 0 1-4.293 4.736M6.228 6.228l11.544 11.544M6.228 6.228 3 3m0 0l18 18'
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.25 12S5.25 5.25 12 5.25 21.75 12 21.75 12 18.75 18.75 12 18.75 2.25 12 2.25 12z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <FormMessage className='text-red-500 text-xs mt-1' />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name='confirmPassword'
                render={({ field }) => (
                  <FormItem className='w-full max-w-sm'>
                    <FormLabel className='text-base font-medium text-gray-700'>Confirm Password</FormLabel>
                    <div className='relative'>
                      <FormControl>
                        <Input
                          {...field}
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder='Confirm your new password'
                          autoComplete='new-password'
                          className='pr-10'
                        />
                      </FormControl>
                      <button
                        type='button'
                        tabIndex={-1}
                        className='absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none'
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.036 3.807 6.07 6.75 9.75 6.75 1.563 0 3.06-.362 4.396-1.01M6.228 6.228A10.45 10.45 0 0 1 12 5.25c3.68 0 7.714 2.943 9.75 6.75a10.48 10.48 0 0 1-4.293 4.736M6.228 6.228l11.544 11.544M6.228 6.228 3 3m0 0l18 18'
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.25 12S5.25 5.25 12 5.25 21.75 12 21.75 12 18.75 18.75 12 18.75 2.25 12 2.25 12z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z'
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    <FormMessage className='text-red-500 text-xs mt-1' />
                  </FormItem>
                )}
              />
              
              <div className='w-full max-w-sm flex flex-col gap-3'>
                <Button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold py-3 rounded-full text-lg transition border-0 shadow-md'
                  disabled={isLoading}
                >
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>

                <Button
                  type='button'
                  onClick={handleResendOtp}
                  className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 rounded-full text-base transition border border-gray-300'
                  disabled={countdown > 0 || isResendingOtp}
                >
                  {isResendingOtp
                    ? 'Sending...'
                    : countdown > 0
                      ? `Resend OTP (${formatTime(countdown)})`
                      : 'Resend OTP'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default ResetPassword