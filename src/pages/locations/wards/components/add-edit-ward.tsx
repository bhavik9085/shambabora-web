import * as React from 'react'
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
import { getRDistrict, getRegions, postLocationWards, updateWards } from '@/helpers/api-helper'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addAlert } from '@/store/slices/elert-slice' 
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'

// // Sample district data, replace with your actual district data
// const allDistricts = [
//   { id: 1, name: 'District A', regionId: 1 },
//   { id: 2, name: 'District B', regionId: 1 },
//   { id: 3, name: 'District C', regionId: 2 },
//   { id: 4, name: 'District D', regionId: 2 },
//   // Add more districts as needed
// ];

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter Ward name' }),
  region: z.string().min(1, { message: 'Please select region' }).transform(Number),
  district: z.string().min(1, { message: 'Please select district' }).transform(Number),
})

type FormSchema = z.infer<typeof formSchema>

interface AddEditWardProps {
  mode: 'add' | 'edit'
  initialData?: { name: string; id: number; district: any } | null
  handleCancel: () => void
}

const AddEditWard = ({
  mode,
  initialData,
  handleCancel,
}: AddEditWardProps) => {
  const dispatch = useAppDispatch()
  const queryClient = useQueryClient()

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || '',
      // region: initialData?.region?.toString() || '',
      district: initialData?.district?.toString() || '',
    },
  })

  const { data: districts } = useQuery({
    queryKey: ["district"],
    queryFn: async () => {
      const response:any = await getRDistrict();
      console.log(response);
      return response;
    },
  });

  const { data: regions, isLoading: isRegionsLoading } = useQuery({
    queryKey: ['regions'],
    queryFn:async () => {
      const response:any = await getRegions();
      return response;
    },
  })

  const [selectedRegion, setSelectedRegion] = React.useState<number | null>(null);

  const filteredDistricts = selectedRegion
    ? districts.filter((district:any) => district.region === selectedRegion)
    : [];

  const mutation = useMutation({
    mutationFn: async (data: FormSchema) => {
      if (mode === 'edit' && initialData?.id) {
        return await updateWards(initialData.id, {
          name: data.name,
          district: data.district
      })
      } else {
        return await postLocationWards(data)
      }
    },
    onSuccess: () => {
      dispatch(
        addAlert({
          message: mode === 'edit' ? 'Ward updated successfully!' : 'Ward added successfully!',
          title: mode === 'edit' ? 'Edit Success' : 'Add Success',
          type: 'success',
        })
      )
      queryClient.invalidateQueries({ queryKey: ['wards'] });
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
    mutation.mutate(data)
  }

  return (
    <Dialog open={true} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === 'edit' ? 'Edit Ward' : 'Add Ward'}</DialogTitle>
          <DialogDescription>
            {mode === 'edit' ? 'Update the Ward details.' : 'Enter the Ward details.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4'>
              {/* Ward Name Field */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Ward name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Region Select Field */}
              <FormField
                control={form.control}
                name='region'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value?.toLocaleString()}
                        onValueChange={(value: any) => {
                          form.setValue('region', value)
                          setSelectedRegion(Number(value));
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a region' />
                        </SelectTrigger>
                        <SelectContent>
                          {isRegionsLoading ? (
                            <div>Loading...</div>
                          ) : regions?.length > 0 ? (
                            regions?.map((reg: any) => (
                              <SelectItem key={reg.id} value={reg.id.toString()}>
                                {reg.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem disabled value=''>
                              No regions found
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* District Select Field */}
              <FormField
                control={form.control}
                name='district'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Select
                        value={field.value.toLocaleString()}
                        onValueChange={(value: any) => {
                          form.setValue('district', value)
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='Select a district' />
                        </SelectTrigger>
                        <SelectContent>
                          {filteredDistricts.length > 0 ? (
                            filteredDistricts.map((district:any) => (
                              <SelectItem key={district.id} value={district.id.toString()}>
                                {district.name}
                              </SelectItem>
                            ))
                          ) : (
                            <div>
                              No districts found
                            </div>
                          )}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Action Buttons */}
              <div className='flex justify-end space-x-2'>
                <Button
                  type='submit'
                  className='btn-primary'
                  disabled={mutation.isPending}
                  loading={mutation.isPending}
                >
                  {mode === 'edit' ? 'Update Ward' : 'Create Ward'}
                </Button>
                <Button type='button' onClick={handleCancel} variant='secondary'>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditWard
