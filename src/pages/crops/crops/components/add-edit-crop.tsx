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
  getCropTypes,
  getMeasurementUnit,
  postCrops,
  updateCrops,
} from '@/helpers/api-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addAlert } from '@/store/slices/elert-slice'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter Crop name' }),
  packaging: z.string().min(1, { message: 'Please select packaging name' }),
  uom: z.string().min(1, { message: 'Please choose Crop name' }),
  type: z.string().min(1, { message: 'Please choose type' }),
})

interface AddEditCropProps {
  mode: 'add' | 'edit'
  initialData?: {
    name: string
    id: number
    type: number
    uom: number
    packaging: string
  } | any
  handleCancel: () => void
}

const AddEditCrop = ({ mode, initialData, handleCancel }: AddEditCropProps) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      type: initialData?.type,
      uom: initialData?.uom,
      packaging: initialData?.packaging || '',
    },
  })

  const { data: mUnits, isLoading: loadingUnits } = useQuery({
    queryKey: ['units'],
    queryFn: async () => {
      const response: any = await getMeasurementUnit()
      console.log("measurement-units",response)
      return response.data   
     },
  })

  const { data: cropTypes, isLoading: loadCTypes } = useQuery({
    queryKey: ['cropTypes'],
    queryFn: async () => {
      const response: any = await getCropTypes()
      console.log("crop-types", response)
      return response.data
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (mode === 'edit' && initialData?.id) {
        return await updateCrops(initialData.id, data)
      } else {
        return await postCrops(data)
      }
    },
    onSuccess: () => {
      dispatch(
        addAlert({
          message:
            mode === 'edit'
              ? 'Crop updated successfully!'
              : 'Crop added successfully!',
          title: mode === 'edit' ? 'Edit Success' : 'Add Success',
          type: 'success',
        })
      )
      handleCancel()
      //ts-ignore
      queryClient.invalidateQueries({ queryKey: ['crops'] })
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
    const finalData = { 
      ...data,
      uom: parseInt(data.uom),
      type: parseInt(data.type),
    }
    mutation.mutate(finalData)
  }
  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Crop' : 'Add Crop'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'edit'
              ? 'Update the Crop details.'
              : 'Enter the Crop details.'}
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
                    <FormLabel>Crop name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Crop name' {...field} />
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
                  <FormLabel>Crop Type</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value?.toLocaleString()}
                      onValueChange={(value: any) => {
                        form.setValue('type', value)
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Select a crop type' />
                      </SelectTrigger>
                      <SelectContent>
                        {loadCTypes ? (
                          <div>Loading...</div>
                        ) : cropTypes?.length > 0 ? (
                          cropTypes?.map((ctyp: any) => (
                            <SelectItem
                              key={ctyp?.id}
                              value={ctyp?.id?.toString()}
                            >
                              {ctyp?.name}
                            </SelectItem>
                          ))
                        ) : (
                          <div >
                            No crop type found
                          </div>
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='uom'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Measurement Unit</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toLocaleString()}
                        onValueChange={(value: any) => {
                          form.setValue('uom', value)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a unit' />
                        </SelectTrigger>
                        <SelectContent>
                          {loadingUnits ? (
                            <div>Loading...</div>
                          ) : mUnits?.length > 0 ? (
                            mUnits?.map((unit: any) => (
                              <SelectItem
                                key={unit?.id}
                                value={unit?.id?.toString()}
                              >
                                {unit?.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value=''>
                              No units found
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <FormField
                control={form.control}
                name='packaging'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Packaging</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toLocaleString()}
                        onValueChange={(value: any) => {
                          form.setValue('packaging', value)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a Packaging' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='BAGS'>BAGS</SelectItem>
                          <SelectItem value='PACKETS'>PACKETS</SelectItem>
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
                {mode === 'edit' ? 'Update Crop' : 'Create Crop'}{' '}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditCrop
