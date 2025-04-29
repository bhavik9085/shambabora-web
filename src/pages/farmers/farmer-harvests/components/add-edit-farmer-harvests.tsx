
import { useAppDispatch, useAppSelector } from '@/hooks/store-hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/custom/button';
import {
  getCrops,
  getAMCOSs,
  getFarmers,
  getCollectionCenters,
  updateFarmerHarvests,
  postFarmerHarvests,
} from '@/helpers/api-helper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addAlert } from '@/store/slices/elert-slice';
import { FormSchema, formSchema } from '../data/form-schema';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ReactSelect from 'react-select';
import { useState } from 'react';
import { z } from 'zod';
import { useLocation } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { Layout } from '@/components/custom/layout'
import { Search } from '@/components/search';

interface Bag {
  grossWeight: string;
  netWeight: string;
  moistureContent: string;
  packagingWeight: string;
  tagNumber: number;
}

type BagsDataForm = {
  bagsData: Bag[];
}

// Custom hook to manage bags data
const useBagsForm = (form: any) => {
  const [bags, setBags] = useState<Bag[]>([]);

  const addBag = () => {
    setBags([...bags, {
      grossWeight: '',
      netWeight: '',
      moistureContent: '',
      packagingWeight: '',
      tagNumber: bags.length + 1
    }]);
  };

  const removeBag = (index: number) => {
    setBags(bags.filter((_, i) => i !== index));
  };

  const updateBag = (index: number, field: keyof Bag, value: string | number) => {
    const updatedBags = [...bags];
    updatedBags[index] = {
      ...updatedBags[index],
      [field]: value
    };
    setBags(updatedBags);
    form.setValue('bagsData', updatedBags);
  };

  return { bags, addBag, removeBag, updateBag };
};


// Form schema for bags data
const BagsFormSchema = formSchema.extend({
  bagsData: z.array(z.object({
    grossWeight: z.string(),
    netWeight: z.string(),
    moistureContent: z.string(),
    packagingWeight: z.string(),
    tagNumber: z.number()
  }))
});

// Component for individual bag input fields
const BagFields = ({ bag, index, updateBag, removeBag }: {
  bag: Bag;
  index: number;
  updateBag: (index: number, field: keyof Bag, value: string | number) => void;
  removeBag: (index: number) => void;
}) => (
  <div className="flex gap-4 items-end mb-4">
    <FormItem>
      <FormLabel>Gross Weight</FormLabel>
      <FormControl>
        <Input
          type="number"
          value={bag.grossWeight}
          onChange={(e) => updateBag(index, 'grossWeight', e.target.value)}
        />
      </FormControl>
    </FormItem>
    <FormItem>
      <FormLabel>Net Weight</FormLabel>
      <FormControl>
        <Input
          type="number"
          value={bag.netWeight}
          onChange={(e) => updateBag(index, 'netWeight', e.target.value)}
        />
      </FormControl>
    </FormItem>
    <FormItem>
      <FormLabel>Moisture Content</FormLabel>
      <FormControl>
        <Input
          type="number"
          value={bag.moistureContent}
          onChange={(e) => updateBag(index, 'moistureContent', e.target.value)}
        />
      </FormControl>
    </FormItem>
    <FormItem>
      <FormLabel>Packaging Weight</FormLabel>
      <FormControl>
        <Input
          type="number"
          value={bag.packagingWeight}
          onChange={(e) => updateBag(index, 'packagingWeight', e.target.value)}
        />
      </FormControl>
    </FormItem>
    <Button type="button" variant="destructive" onClick={() => removeBag(index)}>
      Remove
    </Button>
  </div>
);
interface AddEditFarmerHarvestProps {
  mode: 'add' | 'edit';
  //@ts-ignore
  initialData?: {
    id: number;
    farmer: string;
    farmerName: string;
    farmerPhoneNumber: string;
    quantity: string;
    tagNumber: string;
    receiptNumber: string;
    amcos: string;
    registar: string;
    registarName: string;
    collectionCenter: string;
    crop: string;
  } | null;
  handleCancel: () => void;
}

const AddEditFarmerHarvest = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const location = useLocation();
  const initialData = location?.state?.record;
  const mode = initialData ? 'edit' : 'add';
  const currentUser = useAppSelector((state:any) => state?.user.userInfo)
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      farmer: initialData?.farmer || '',
      farmerName: initialData?.farmerName || '',
      farmerPhoneNumber: initialData?.farmerPhoneNumber || '',
      quantity: initialData?.quantity || '',
      tagNumber: initialData?.tagNumber || '',
      receiptNumber: initialData?.receiptNumber || '',
      amcos: initialData?.amcos || '',
      collectionCenter: initialData?.collectionCenter || '',
    },
  });
  const { bags, addBag, removeBag, updateBag } = useBagsForm(form);
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
  
  // Fetch Crops
  const {
    data: crops,
    isLoading: loadingCrops,
    // error: errorCrops,
  } = useQuery({
    queryKey: ['crops'],
    queryFn: async () => {
      const response: any = await getCrops();
      return response;
    },
  });

  // Fetch AMCOS
  const {
    data: amcos,
  } = useQuery({
    queryKey: ['amcos'],
    queryFn: async () => {
      const response: any = await getAMCOSs();
      return response;
    },
  });

  // Fetch CollectionCenter
  const {
    data: collectionCenters,
    isLoading: loadingCollectionCenter,
    // error: errorCollectionCenter,
  } = useQuery({
    queryKey: ['CollectionCenter'],
    queryFn: async () => {
      const response: any = await getCollectionCenters();
      return response;
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (mode === 'edit' && initialData) {
        return await updateFarmerHarvests(initialData.id, data);
      } else {
        return await postFarmerHarvests(data);
      }
    },
    onSuccess: () => {
      dispatch(
        addAlert({
          message:
            mode === 'edit'
              ? 'FarmerHarvest updated successfully!'
              : 'FarmerHarvest added successfully!',
          title: mode === 'edit' ? 'Edit Success' : 'Add Success',
          type: 'success',
        })
      );
      queryClient.invalidateQueries({ queryKey: ['faharvests'] });
    },
    onError: (error: any) => {
      dispatch(
        addAlert({
          message: error.message || 'Something went wrong!',
          title: mode === 'edit' ? 'Edit Failed' : 'Add Failed',
          type: 'error',
        })
      );
    },
  });

  function onSubmit(data: FormSchema) {
    const finalData = {
      ...data,
      farmer: data.farmer?.value,
      registar:currentUser?.id,
      registarName: currentUser?.name,
      amcos: data.amcos?.value,
      collectionCenter: parseInt(data?.collectionCenter)
    };
    console.log(finalData);

    mutation.mutate(finalData);
  }

  return (
    <Layout>
    {/* ===== Top Heading ===== */}
    <Layout.Header sticky>
      <Search />
      <div className='ml-auto flex items-center space-x-4'>
        <ThemeSwitch />
        <UserNav />
      </div>
    </Layout.Header>

    <Layout.Body className='mb-8'>
    <div>
            <h2 className='text-2xl font-bold tracking-tight'>Add Harvest</h2>
            <p className='text-muted-foreground mb-3'>
              Add Farmer Harvest
            </p>
          </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
               
               
                {/* AMCOS Multi-Select Field */}
                <FormField
                  control={form.control}
                  name="farmer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farmer</FormLabel>
                      <FormControl>
                        <ReactSelect
                          options={farmers?.map((fmr: any) => ({
                            value: fmr.id,
                            label: `${fmr.firstName} ${fmr.lastName}`,
                          }))}
                           className="my-react-select-container"
                           classNamePrefix="my-react-select"
                          value={field.value || []}
                          onChange={(selected:any) =>
                            form.setValue('farmer', selected)
                          }
                          placeholder="Select Farmer"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
      
                {/* Middle Name Field */}
                <FormField
                  control={form.control}
                  name="farmerName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Farmer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter farmer Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="farmerPhoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                    {/* Member ID Field */}
                    <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantity</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter quantity " type='number' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                          {/* ID Number Field */}
                          <FormField
                  control={form.control}
                  name="tagNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Tag Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              
              <FormField
                control={form.control}
                name="grossWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gross Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter gross weight" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="netWeight" 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Net Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter net weight" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="packagingWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Packaging Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter packaging weight" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

         
              </div>

              {/* Right Column */}
              <div className="space-y-4">
              <FormField
                control={form.control}
                name="moistureContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Moisture Content</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter moisture content" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            
            <FormField
                  control={form.control}
                  name="receiptNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receipt Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Receipt Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                  {/* AMCOS Multi-Select Field */}
                  <FormField
                  control={form.control}
                  name="amcos"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>AMCOS</FormLabel>
                      <FormControl>
                        <ReactSelect
                          options={amcos?.map((amcos: any) => ({
                            value: amcos.id,
                            label: amcos.name,
                          }))}
                           className="my-react-select-container"
                           classNamePrefix="my-react-select"
                          value={field.value}
                          onChange={(selected:any) =>
                            form.setValue('amcos', selected)
                          }
                          placeholder="Select AMCOS"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                {/* Main Crop Select Field */}
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Crop</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(value: any) =>
                            form.setValue('crop', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select  Crop" />
                          </SelectTrigger>
                          <SelectContent>
                            {loadingCrops ? (
                              <div>
                                Loading...
                              </div>
                            ) : crops?.length > 0 ? (
                              crops.map((crop: any) => (
                                <SelectItem
                                  key={crop.id}
                                  value={crop.id?.toString()}
                                >
                                  {crop.name}
                                </SelectItem>
                              ))
                            ) : (
                              <div>
                                No Crops Found
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
                  name="collectionCenter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Collection center</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(value: any) =>
                            form.setValue('collectionCenter', value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Collection center" />
                          </SelectTrigger>
                          <SelectContent>
                            {loadingCollectionCenter ? (
                              <div>
                                Loading...
                              </div>
                            ) : collectionCenters?.length > 0 ? (
                              collectionCenters.map((coll: any) => (
                                <SelectItem
                                  key={coll.id}
                                  value={coll.id?.toString()}
                                >
                                {coll.amcosName}-{coll.name}
                                </SelectItem>
                              ))
                            ) : (
                              <div>
                                No Collection center Found
                              </div>
                            )}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
               <div className="space-y-4">
                      <div className="flex justify-between items-center">
                      <h3 className="text-lg font-medium">Bags</h3>
                      <Button type="button" onClick={addBag}>Add Bag</Button>
                      </div>
                      {bags.map((bag, index) => (
                      <BagFields
                        key={index}
                        bag={bag}
                        index={index}
                        updateBag={updateBag}
                        removeBag={removeBag}
                      />
                      ))}
                    </div>
              

                {/* Submit Button */}
                <div className="mt-4 ">
                  <Button
                    type="submit"
                    className="btn-primary w-full"
                    disabled={mutation.isPending}
                    loading={mutation.isPending}
                  >
                    {mode === 'edit' ? 'Update Farmer Harvest' : 'Create Farmer Harvest'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
        </Layout.Body>
        </Layout>
  );
};

export default AddEditFarmerHarvest;
