import { HTMLAttributes } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { postLogin } from '@/helpers/api-helper'
import { useAppDispatch } from '@/hooks/store-hooks'
import { addAlert } from '@/store/slices/elert-slice'
import { loginSuccess, setUserInfo } from '@/store/slices/auth-slice'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
 
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const { mutate: signInMutation, isPending } = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      const respose = await postLogin(data)
      console.log(respose)
      return respose
    },
    onSuccess: async (data: any) => {
      console.log(data)
      dispatch(
        addAlert({
          message: 'User registration successfully',
          title: 'Sign successfull',
          type: 'success',
        })
      )

      dispatch(loginSuccess({ accessToken: data?.token }))
      dispatch(
        setUserInfo({
          id: data?.user?.id,
          email: data?.user?.email,
          createdAt: data?.user?.createdAt,
          name: data?.user?.name,
          role: data?.user?.role,
          status: data?.user?.status,
        })
      )
      navigate('/dashboard')
    },
    onError: (error) => {
      console.log(error)

      dispatch(
        addAlert({
          message: error.message,
          title: 'Sign successfull',
          type: 'error',
        })
      )
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    signInMutation(data)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <div className='flex items-center justify-between'>
                    <FormLabel>Password</FormLabel>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-muted-foreground hover:opacity-75'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='mt-2' loading={isPending}>
              Login
            </Button>

            {/* <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Dont have an account?
                </span>
              </div>
            </div> */}
{/* 
            <div className='flex items-center justify-center gap-2'>
              <a
                href='#'
                className='text-center text-green-500'
                onClick={() => navigate('/sign-up')}
              >
                Sign Up. Here
              </a>
            </div> */}
          </div>
        </form>
      </Form>
    </div>
  )
}
