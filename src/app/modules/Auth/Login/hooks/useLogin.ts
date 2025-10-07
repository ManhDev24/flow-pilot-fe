import { authApi } from '@/app/apis/AUTH/Auth.api'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { LoginResponse } from '../models/LoginFormInterface'
import { setLocalStorage } from '@/app/utils'
import { useDispatch } from 'react-redux'
import { setUser } from '@/app/redux/slices/user.slice'
import type { IUserStatePayload } from '@/app/models'
import { useNavigate } from 'react-router-dom'
import { PATH } from '@/app/routes/path'
import { useState } from 'react'
import { setRole } from '@/app/redux/slices/role.slice'

export const useLogin = () => {
  const [email, setEmail] = useState<string>('')
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (variables: { email: string; password: string }) => {
      const { email, password } = variables
      setEmail(email)
      return authApi.login(email, password) as Promise<LoginResponse>
    },
    onSuccess: (data: LoginResponse) => {
      if (data.data) {
        const { accessToken, refreshToken, role, wsid, isFirstLogin, projectId } = data.data;
        const userStatePayload: IUserStatePayload = { accessToken, refreshToken, role, wsid, projectId };
        setLocalStorage('user', userStatePayload);
        dispatch(setUser(userStatePayload));

        if (!isFirstLogin) {
          setEmail('');
          setLocalStorage('role', role);
          dispatch(setRole(role));
          toast.success('Login successful!')
        }

        navigate(PATH.FIRST_LOGIN, { state: { email: email } });
      } else {
        toast.error('Login failed!');
      }
    },
    onError: (error: { response?: { data?: LoginResponse }; message?: string }) => {
      let message = 'Login failed!';
      const apiMessage = error?.response?.data?.message;
      if (typeof apiMessage === 'string') {
        message = apiMessage;
      } else if (typeof apiMessage === 'object' && apiMessage?.message) {
        message = apiMessage.message;
      } else if (error?.message) {
        message = error.message;
      }
      toast.error(message);
    }
  })
}
