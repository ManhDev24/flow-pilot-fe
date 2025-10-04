import type { IUserState } from '@/app/models'
import { PATH } from '@/app/routes/path'
import { removeLocalStorage } from '@/app/utils'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'

const FirstLogin = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>(location.state?.email || '')
  const { currentUser } = useSelector((state: { user: IUserState }) => state.user)

  useEffect(() => {
    if (!email || !currentUser) {
      // Redirect to login if email is not available
      navigate(PATH.LOGIN)
      removeLocalStorage('user')
      removeLocalStorage('role')
    }
    console.log("🚀 ~ FirstLogin ~ currentUser:", currentUser)
    console.log('Email on first login page:', email)
  }, [email, currentUser, navigate])

  return <div>FirstLogin</div>
}

export default FirstLogin
