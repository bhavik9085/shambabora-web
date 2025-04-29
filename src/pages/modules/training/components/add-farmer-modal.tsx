// AddFarmers.tsx
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
    getFarmers,
    postTraining,
    updateTraining,
  } from '@/helpers/api-helper'
  import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
  import { addAlert } from '@/store/slices/elert-slice'
import MultiSelectReactSelect from './multiselect-crops'
  
  const formSchema = z.object({
    id: z.number().optional(),
    farmers: z.array(z.any()).optional(),
  })
  
  type FormSchema = z.infer<typeof formSchema>
  
  interface AddFarmersProps {
    mode: 'add' | 'edit'
    initialData?: FormSchema | null
    handleCancel: () => void
  }
  
  const AddFarmers = ({ mode, initialData, handleCancel }: AddFarmersProps) => {
    const dispatch = useAppDispatch()
    const queryClient = useQueryClient()
  
    const form = useForm<FormSchema>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        farmers: initialData?.farmers || [],
      },
    });

      // Fetch Farmers
      const {
        data: farmers,
        // isLoading:loadFarmers,
        // error: errorFarmers,
      } = useQuery({
        queryKey: ['farmers'],
        queryFn: async () => {
          const response: any = await getFarmers();
          return response;
        },
      });
      
  

    const mutation = useMutation({
      mutationFn: async (data: FormSchema) => {
        if (mode === 'edit' && initialData?.id) {
         
          const updatedData = {
            ...initialData,
            farmers: data.farmers,
            //@ts-ignore
            amcos: initialData.amcos.id,
          }
          return await updateTraining(initialData.id, updatedData)
        } else {
          return await postTraining(data)
        }
      },
      onSuccess: () => {
        dispatch(
          addAlert({
            message:
              mode === 'edit'
                ? 'Training updated successfully!'
                : 'Training added successfully!',
            title: mode === 'edit' ? 'Edit Success' : 'Add Success',
            type: 'success',
          })
        )
        queryClient.invalidateQueries({ queryKey: ['training-details'] })
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
            <DialogTitle>
              {mode === 'edit' ? 'Edit Training' : 'Add Training'}
            </DialogTitle>
            <DialogDescription>
              {mode === 'edit'
                ? 'Add Farmers to this training.'
                : 'Enter the training details.'}
            </DialogDescription>
          </DialogHeader>
  
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               

                 {/* AMCOS Multi-Select Field */}
                 <FormField
                  control={form.control}
                  name="farmers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farmers</FormLabel>
                      <FormControl>
                        <MultiSelectReactSelect
                          options={farmers?.map((fm: any) => ({
                            value: fm.id,
                            label: `${fm.firstName} ${fm.lastName}`,
                          }))}
                          value={field.value || []}
                          onChange={(selected) =>
                            form.setValue('farmers', selected)
                          }
                          placeholder="Select farmers"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

        
  
              {/* Submit Button */}
              <div className="mt-4">
                <Button
                  type="submit"
                  className="btn-primary"
                  disabled={mutation.isPending}
                  loading={mutation.isPending}
                >
                  {mode === 'edit' ? 'Update Training' : 'Create Training'}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  }
  
  export default AddFarmers
  