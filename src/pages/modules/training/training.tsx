import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/custom/button';
import { MapPin, Calendar, Phone, Mail, Home, Crop, CropIcon, Eye, PlusCircle } from 'lucide-react';
import { Layout } from '@/components/custom/layout';
import ThemeSwitch from '@/components/theme-switch';
import { UserNav } from '@/components/user-nav';
import { Search } from '@/components/search';
import { Badge } from '@/components/ui/badge';
import { Package, Scale, Tag } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { retrieveFarmerHarvest, retrieveTraining } from '@/helpers/api-helper';
import AddFarmers from './components/add-farmer-modal';

// Type for Amcos
export interface Amcos {
    id: number;
    name: string;
    mcu: number;
    mcuName: string;
    village: number;
    villageName: string;
    contactPhoneNumber: string;
    crops: number[]; // Array of crop IDs
  }
  
  // Type for Farmer
  export interface Farmer {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    sex: "MALE" | "FEMALE"; // Using string literals for predefined values
    idType: string; 
    idNumber: string;
    dob: string; // ISO date string
    phoneNumber: string;
    memberID: string;
    amcosMemberID: string;
    mainCrop: number; // Crop ID
    secondaryCrop: number; // Crop ID
    status: "Active" | "Inactive"; 
    amcos: number; // Amcos ID
  }
  
  // Type for Training
  export interface Training {
    id: number;
    name: string;
    description: string;
    trainer: string;
    amcos: Amcos;
    farmers: Farmer[];
    date: string; // ISO date string
    startTime: string; // ISO datetime string
    endTime: string; // ISO datetime string
    location: string;
  }
  
interface TrainingFarmersDetailsTableProps {
    trainingData: Training;
}

const TrainingDetailsTable: React.FC<TrainingFarmersDetailsTableProps> = ({ trainingData }) => {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Tag className="w-5 h-5" />
            <span>Training Details</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Description:</span> {trainingData?.description}</p>
              <p className="text-sm"><span className="font-medium">Location:</span> {trainingData?.location}</p>
              <p className="text-sm"><span className="font-medium">Total farmers:</span> {trainingData?.farmers?.length}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm"><span className="font-medium">Amcos:</span> {trainingData?.amcos?.name}</p>
              {/* <p className="text-sm"><span className="font-medium">Grade:</span> {harvestData?.cropGradeName}</p> */}
              {/* <p className="text-sm"><span className="font-medium">Received:</span> {new Date(harvestData?.receivedAt).toLocaleDateString()}</p> */}
            </div>
          </div>

          {/* Bags Table */}
          <div className="rounded-md border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-secondary/5">
                  <th className="p-3 text-left">Farmer name</th>
                  <th className="p-3 text-left">phoneNumber </th>
                  <th className="p-3 text-left">Amcos Id</th>
                  <th className="p-3 text-left">Member Id</th>
                  {/* <th className="p-3 text-left">Gender</th> */}
                </tr>
              </thead>
              <tbody>
                {trainingData?.farmers?.map((farmer:Farmer, index:number) => (
                  <tr key={index} className="border-b">
                    <td className="p-3">{farmer.firstName} {farmer.lastName}</td>
                    <td className="p-3">{farmer.phoneNumber}</td>
                    <td className="p-3">{farmer.amcosMemberID}</td>
                    {/* <td className="p-3">{farmer.sex}</td> */}
                    <td className="p-3">{farmer.memberID}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FarmerDetailsPage: React.FC = () => {
  const params = useParams<{ id: string }>();
  const [AddFarmersMOdal, setAddFarmersMOdal] = useState(false);
  const navigate = useNavigate();

  const {
    data: trainingData,
    isLoading: loadingFarmer,
  } = useQuery<Training>({
    queryKey: ['training-details', params?.id],
    queryFn: async () => {
      const response:any = await retrieveTraining(`${params?.id}`);
      return response;
    },
  });

  return (
    <Layout>
      <Layout.Header sticky>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>
      <Layout.Body>
        <div>
          {/* Header Section */}
          <div className="mb-8">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Profile Picture */}
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-secondary/20 flex items-center justify-center">
                    <CropIcon/>
                  </div>
                </div>
                
                {/* Farmer Info */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{trainingData?.name}</h1>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-sm">
                          Trainer: {trainingData?.trainer}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                     
                      <Button variant="default" size="sm"
                    onClick={() => setAddFarmersMOdal(true)}
                      >
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Add Farmer
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-secondary/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Date</p>
                      {/* @ts-ignore */}
                      <p className="text-xl font-semibold"> {new Date(trainingData?.date).toLocaleString()}</p>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Start time</p>
                        {/* @ts-ignore */}
                      <p className="text-xl font-semibold"> {new Date(trainingData?.startTime).toLocaleTimeString()}</p>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">End time</p>
                        {/* @ts-ignore */}
                      <p className="text-xl font-semibold"> {new Date(trainingData?.endTime).toLocaleTimeString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Harvest Details */}
          {trainingData && <TrainingDetailsTable trainingData={trainingData} />}
          {AddFarmersMOdal && <AddFarmers initialData={trainingData} mode='edit' handleCancel={() =>  setAddFarmersMOdal(false)} />}
          
        </div>
      </Layout.Body>
    </Layout>
  );
};

export default FarmerDetailsPage;