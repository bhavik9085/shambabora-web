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
  getCrops,
  getRVillages,
  getMCUs,
  postAMCOS,
  updateAMCOS,
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
import MultiSelectReactSelect from './multiselect-crops'
// import { FormSchema, formSchema } from './formSchema';
// import { MeasurementUnit, Village, Crop, AddEditAmcosData } from './types';

interface AddEditAmcosProps {
  mode: 'add' | 'edit'
  //@ts-ignore
  initialData?: {
    name: string
    id: number
    mcu: number
    village: number
    contactPhoneNumber:string
    crops: number[]
  } | null
  handleCancel: () => void
}

export const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter Amcos name' }),
  mcu: z.string().min(1, { message: 'Please choose a Mcu' }).transform(Number),
  village: z
    .string()
    .min(1, { message: 'Please select a village' })
    .transform(Number),
    contactPhoneNumber: z.string().min(1, { message: 'Please enter contact phone number' }),
  crops: z.any(),
})

type FormSchema = z.infer<typeof formSchema>

interface AddEditAmcosProps {
  mode: 'add' | 'edit'
  //@ts-ignore
  initialData?:
    | {
        name: string
        id: number
        contactPhoneNumber:string
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
      name: initialData?.name || '',
      contactPhoneNumber: initialData?.contactPhoneNumber || '',
      // mcu: initialData?.mcu ? initialData.mcu.toString() : '',
      // village: initialData?.village ? initialData.village.toString() : '',
      // crops: initialData?.crops ? initialData.crops.map(String) : [],
    },
  })

  // Fetch Mcus (mcu)
  const {
    data: mcus,
    isLoading: loadingMCU,
  } = useQuery({
    queryKey: ['mcus'],
    queryFn: async () => {
      const response: any = await getMCUs()
      return response
    },
  })

  // Fetch Villages
  const {
    data: villages,
    isLoading: loadingVillages,
  } = useQuery({
    queryKey: ['villages'],
    queryFn: async () => {
      const response: any = await getRVillages()
      return response
    },
  })

  // Fetch Crops
  const {
    data: crops,
    // isLoading: loadingCrops,
  } = useQuery({
    queryKey: ['crops'],
    queryFn: async () => {
      const response: any = await getCrops()
      return response
    },
  })

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (mode === 'edit' && initialData?.id) {
        return await updateAMCOS(initialData.id, data)
      } else {
        return await postAMCOS(data)
      }
    },
    onSuccess: () => {
      dispatch(
        addAlert({
          message:
            mode === 'edit'
              ? 'Amcos updated successfully!'
              : 'Amcos added successfully!',
          title: mode === 'edit' ? 'Edit Success' : 'Add Success',
          type: 'success',
        })
      )
      queryClient.invalidateQueries({ queryKey: ['amcos'] })
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
    const finalData = {
      name: data.name,
      contactPhoneNumber: data.contactPhoneNumber,
      mcu: data.mcu,
      village: data.village,
      crops: data.crops,
    }
    console.log(finalData)

    mutation.mutate(finalData);
  }

  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'edit' ? 'Edit Amcos' : 'Add Amcos'}
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
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amcos Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Amcos name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField control={form.control} name='contactPhoneNumber' render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder='Enter contact phone number' {...field} />
                  </FormControl>
                  <FormMessage />
                  </FormItem>
              )} /> 

              {/* Mcu (mcu) Select Field */}
              <FormField
                control={form.control}
                name='mcu'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mcu</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value: any) => {
                          form.setValue('mcu', value)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a Mcu' />
                        </SelectTrigger>
                        <SelectContent>
                          {loadingMCU ? (
                            <div>Loading...</div>
                          ) : mcus?.length > 0 ? (
                            mcus.map((unit: any) => (
                              <SelectItem
                                key={unit.id}
                                value={unit.id?.toString()}
                              >
                                {unit.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div>No Mcus found</div>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Village Select Field */}
              <FormField
                control={form.control}
                name='village'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Village</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toString()}
                        onValueChange={(value: any) => {
                          form.setValue('village', value)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a Village' />
                        </SelectTrigger>
                        <SelectContent>
                          {loadingVillages ? (
                            <div>Loading...</div>
                          ) : villages?.length > 0 ? (
                            villages.map((village: any) => (
                              <SelectItem
                                key={village.id}
                                value={village.id?.toString()}
                              >
                                {village.wardName}-{village.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div>No Villages found</div>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Crops Multi-Select Field */}
              <FormField
                control={form.control}
                name='crops'
                render={({ field }:any) => (
                  <FormItem>
                    <FormLabel>Crops</FormLabel>
                    <FormControl>
                      <MultiSelectReactSelect
                        options={crops?.map((crop: any) => ({
                          value: crop.id,
                          label: crop.name,
                        }))}
                        value={field.value || []}
                        onChange={(selected) =>
                         {
                          console.log(selected);
                          
                          form.setValue('crops', selected)
                         }
                        }
                        placeholder='Select Crops'
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
                {mode === 'edit' ? 'Update Amcos' : 'Create Amcos'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditAmcos
