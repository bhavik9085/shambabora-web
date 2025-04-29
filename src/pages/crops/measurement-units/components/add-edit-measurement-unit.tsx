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
  postMeasurementUnit,
  updateMeasurementUnit,
} from '@/helpers/api-helper'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addAlert } from '@/store/slices/elert-slice'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter measurement unit name' }),
  type: z.string().min(1, { message: 'Please choose name' }),
})

interface AddEditMeasurementUnitProps {
  mode: 'add' | 'edit'
  initialData?: { name: string; id: number; type: string } | null
  handleCancel: () => void
}

const AddEditMeasurementUnit = ({
  mode,
  initialData,
  handleCancel,
}: AddEditMeasurementUnitProps) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      type: initialData?.type || '',
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: z.infer<typeof formSchema>) => {
      if (mode === 'edit' && initialData?.id) {
        return await updateMeasurementUnit(initialData.id, data)
      } else {
        return await postMeasurementUnit(data)
      }
    },
    onSuccess: () => {
      dispatch(
        addAlert({
          message:
            mode === 'edit'
              ? 'Measurement Unit updated successfully!'
              : 'Measurement Unit added successfully!',
          title: mode === 'edit' ? 'Edit Success' : 'Add Success',
          type: 'success',
        })
      )
      handleCancel()
      //ts-ignore
      queryClient.invalidateQueries({ queryKey: ['units'] })
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
            {mode === 'edit' ? 'Edit Measurement Unit' : 'Add Measurement Unit'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Update the Measurement Unit details.'
              : 'Enter the Measurement Unit details.'}
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
                    <FormLabel>Measurement Unit name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter MeasurementUnit name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toLocaleString()}
                        onValueChange={(value: any) => {
                          form.setValue('type', value)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a Type' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='WEIGHT'>WEIGHT</SelectItem>
                          <SelectItem value='VOLUME'>VOLUME</SelectItem>
                          <SelectItem value='LENGTH'>LENGTH</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='btn'
                loading={mutation.isPending}
              >
                {mode === 'edit' ? 'Update Measurement Unit' : 'Create Measurement Unit'}{' '}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditMeasurementUnit
