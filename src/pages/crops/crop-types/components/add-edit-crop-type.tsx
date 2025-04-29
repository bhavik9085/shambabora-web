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
import { postLocationCropTypes,updateCropTypes  } from '@/helpers/api-helper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAlert } from '@/store/slices/elert-slice'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter CropType name' }),
})

interface AddEditCropTypeProps {
  mode: 'add' | 'edit'
  initialData?: { name: string; id: number } | null
  handleCancel: () => void
}

const AddEditCropType = ({
  mode,
  initialData,
  handleCancel,
}: AddEditCropTypeProps) => {
  const dispatch = useAppDispatch()
  const queryClient  = useQueryClient();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '', 
    },
  })  


  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (mode === 'edit' && initialData?.id) {
        return await updateCropTypes(initialData.id, data)
      } else {
        return await postLocationCropTypes(data)
      }
    },
    onSuccess: () => {
      dispatch(
        addAlert({
          message: mode === 'edit' ? 'CropType updated successfully!' : 'CropType added successfully!',
          title: mode === 'edit' ? 'Edit Success' : 'Add Success',
          type: 'success',
        })
      )
      handleCancel();
      //ts-ignore
      queryClient.invalidateQueries({queryKey: ['cropTypes']});
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

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate(data) 
  }
  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Crop Type' : 'Add Crop Type'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Update the crop type details.'
              : 'Enter the crop type details.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='space-y-1'>
                    <FormLabel>Crop  type name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter CropType name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='btn'
              loading={mutation.isPending}
              >
                {mode === 'edit' ? 'Update Crop type' : 'Create Crop type'}{' '}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditCropType
