// AddEditAmcos.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useAppDispatch } from '@/hooks/store-hooks'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import {
  getAMCOSs,
  updateSMS,
  postSMS,
} from '@/helpers/api-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addAlert } from '@/store/slices/elert-slice'
import Select from 'react-select';


interface AddEditAmcosProps {
  mode: 'add' | 'edit'
  initialData?: {
    amcos: number
    id: number
    messae:string
  } | null
  handleCancel: () => void
}

export const formSchema = z.object({
  smsMessage: z.string().min(10, { message: 'Please enter message' }),
  amcos: z.number().min(1, { message: 'Please choose a amcos' }).transform(Number),
})

type FormSchema = z.infer<typeof formSchema>

interface AddEditAmcosProps {
  mode: 'add' | 'edit'
  //@ts-ignore
  initialData?:
    | {
      amcos: number
    id: number
    messae:string
        // mcu: any;
        // village: any;
        // crops: any[];
      }
    | any
  handleCancel: () => void
}
const AddEditAmcos = ({
  mode,
  initialData,
  handleCancel,
}: AddEditAmcosProps) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      smsMessage: initialData?.messae || '',
      amcos: initialData?.amcos || undefined,
      // mcu: initialData?.mcu ? initialData.mcu.toString() : '',
      // village: initialData?.village ? initialData.village.toString() : '',
      // crops: initialData?.crops ? initialData.crops.map(String) : [],
    },
  })

  // Fetch Mcus (mcu)
  const {
    data: allAmcos,
    isLoading: loadingAmcos,
  } = useQuery({
    queryKey: ['amcos'],
    queryFn: async () => {
      const response: any = await getAMCOSs()
      return response
    },
  })



  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (mode === 'edit' && initialData?.id) {
        return await updateSMS(initialData.id, data)
      } else {
        return await postSMS(data)
      }
    },
    onSuccess: () => {
      dispatch(
        addAlert({
          message:
            mode === 'edit'
              ? 'SMS updated successfully!'
              : 'SMS added successfully!',
          title: mode === 'edit' ? 'Edit Success' : 'Add Success',
          type: 'success',
        })
      )
      queryClient.invalidateQueries({ queryKey: ['smss'] })
      handleCancel()
    },
    onError: (error: any) => {
      dispatch(
        addAlert({
          message: error.message || 'Something went wrong!',
          title: mode === 'edit' ? 'Edit Failed' : 'Add Failed',
          type: 'error',
        })
      )
    },
  })

  function onSubmit(data: FormSchema) {

    mutation.mutate(data);
  }

  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit SMS' : 'Add SMS'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Update the Amcos details.'
              : 'Enter the Amcos details.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
              {/* Amcos Name Field */}
              <FormField
                control={form.control}
                name='smsMessage'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SMS</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter SMS ' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Crops Multi-Select Field */}
              <FormField
                control={form.control}
                name='amcos'
                render={({ field }:any) => (
                  <FormItem>
                    <FormLabel>Amocs</FormLabel>
                    <FormControl>
                    <Select
                      {...field}
                      options={allAmcos?.map((amcos: any) => ({
                        value: amcos.id,
                        label: amcos.name,
                      }))}
                      placeholder='Select amcos'
                      onChange={(selectedOption:any) => field.onChange(selectedOption?.value)}
                      value={allAmcos?.find((amcos: any) => amcos.id === field.value) || null}
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type='submit'
                className='btn-primary'
                disabled={mutation.isPending}
                loading={mutation.isPending}
              >
                {mode === 'edit' ? 'Update SMS' : 'Create SMS'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditAmcos
