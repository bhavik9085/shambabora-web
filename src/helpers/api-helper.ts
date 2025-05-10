import { APIClient } from "./api-client";
import * as url from "../constants/api-endpoints"


const api = new APIClient();

export const postLogin = (data:any) => api.create(url.POST_LOGIN_USER, data);
export const postUserSetup = (data:any) => api.create(url.POST_REGISTER_USER, data);
export const getDashboard = () => api.get(url.Dashboard);

//LOCATION
export const postLocationRegion = (data:any) => api.create(url.REGIONS, data);
export const getRegions = () => api.get(url.REGIONS);
export const deleteRegion = (id:number, data:any) => api.delete(url.REGIONS + id, data);
export const updateRegion = (id:number, data:any) => api.put(url.REGIONS + id, data);

export const postLocationDistrict = (data:any) => api.create(url.DISTRICTS, data);
export const getRDistrict = () => api.get(url.DISTRICTS);
export const deleteDistrict = (id:number, data:any) => api.delete(url.DISTRICTS + id, data);
export const updateDistrict = (id:number, data:any) => api.put(url.DISTRICTS + id, data);

export const postLocationWards = (data:any) => api.create(url.WARDS, data);
export const getRWards = () => api.get(url.WARDS);
export const deleteWards = (id:number, data:any) => api.delete(url.WARDS + id, data);
export const updateWards = (id:number, data:any) => api.put(url.WARDS + id, data);

export const postLocationVillages = (data:any) => api.create(url.VILLAGES, data);
export const getRVillages = () => api.get(url.VILLAGES);
export const deleteVillages = (id:number, data:any) => api.delete(url.VILLAGES + id, data);
export const updateVillages = (id:number, data:any) => api.put(url.VILLAGES + id, data);

//CROPS $ TYPES
export const postLocationCropTypes = (data:any) => api.create(url.CROP_TYEPS, data);
export const getCropTypes = () => api.get(url.CROP_TYEPS);
export const deleteCropTypes = (id:number, data:any) => api.delete(url.CROP_TYEPS + id, data);
export const updateCropTypes = (id:number, data:any) => api.patch(url.CROP_TYEPS + id, data);

export const postCrops = (data:any) => api.create(url.CROPS, data);
export const getCrops = () => api.get(url.CROPS);
export const deleteCrops = (id:number, data:any) => api.delete(url.CROPS + id, data);
export const updateCrops = (id:number, data:any) => api.patch(url.CROPS + id, data);

export const postMeasurementUnit = (data:any) => api.create(url.MEASUREMENT_UNITS, data);
export const getMeasurementUnit = () => api.get(url.MEASUREMENT_UNITS);
export const deleteMeasurementUnit = (id:number, data:any) => api.delete(url.MEASUREMENT_UNITS + id, data);
export const updateMeasurementUnit = (id:number, data:any) => api.patch(url.MEASUREMENT_UNITS + id, data);


//MCUS
export const postMCU = (data:any) => api.create(url.MCUS, data);
export const getMCUs = () => api.get(url.MCUS);
export const deleteMCU = (id:number, data:any) => api.delete(url.MCUS + id, data);
export const updateMCU = (id:number, data:any) => api.put(url.MCUS + id, data);

export const postAMCOS = (data:any) => api.create(url.AMCOS, data);
export const getAMCOSs = () => api.get(url.AMCOS);
export const deleteAMCOS = (id:number, data:any) => api.delete(url.AMCOS + id, data);
export const updateAMCOS = (id:number, data:any) => api.put(url.AMCOS + id, data);

export const postCollectionCenter = (data:any) => api.create(url.COLLECTION_CENTEER, data);
export const getCollectionCenters = () => api.get(url.COLLECTION_CENTEER);
export const deleteCollectionCenter = (id:number, data:any) => api.delete(url.COLLECTION_CENTEER + id, data);
export const updateCollectionCenter = (id:number, data:any) => api.put(url.COLLECTION_CENTEER + id, data);


//FARMERS
export const postFarmer = (data:any) => api.create(url.FARMERS, data);
export const postFarms = (data:any) => api.create(url.FARMS, data);

//  The search is not complete and can not filter the result
export const getFarmers = () => api.get(url.FARMERS);
export const getFarmerHarvests = (id:any) => api.get(url.FARMERS_HARVERSTS + id);
export const deleteFarmer = (id:number, data:any) => api.delete(url.FARMERS + id, data);
export const updateFarmer = (id:number, data:any) => api.put(url.FARMERS + id, data);
export const retrieveFarmer = (id:string) => api.get(url.FARMERS + id);
export const retrieveFarmerFarms = (id:string) => api.get(url.FARMERS + id);

export const getAllFarmersHarvests = () => api.get(url.FARMERS_HARVERSTS);
export const postFarmerHarvests = (data:any) => api.create(url.FARMERS_HARVERSTS, data);
export const deleteFarmerHarvests = (id:number, data:any) => api.delete(url.FARMERS_HARVERSTS + id, data);
export const updateFarmerHarvests = (id:number, data:any) => api.put(url.FARMERS_HARVERSTS + id, data);
export const retrieveFarmerHarvest = (id:string) => api.get(url.FARMERS_HARVERSTS + id);

//MODULES
export const postTraining = (data:any) => api.create(url.TRAINING, data);
export const getTrainings = () => api.get(url.TRAINING);
export const deleteTraining = (id:number, data:any) => api.delete(url.TRAINING + id, data);
export const retrieveTraining = (id:string) => api.get(url.TRAINING + id);
export const updateTraining = (id:number, data:any) => api.put(url.TRAINING + id, data);

// SMS MODULE
export const postSMS = (data: any) => api.create(url.SMSMODULE, data);
export const getSMS = () => api.get(url.SMSMODULE);
export const deleteSMS = (id: number, data: any) => api.delete(url.SMSMODULE + id, data);
export const retrieveSMS = (id: string) => api.get(url.SMSMODULE + id);
export const updateSMS = (id: number, data: any) => api.put(url.SMSMODULE + id, data);