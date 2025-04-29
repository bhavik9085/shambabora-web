import { DataBaseUrl } from "./base-url";
// AUTH
export const POST_LOGIN_USER = `${DataBaseUrl}/auth/login`;
export const POST_REGISTER_USER = `${DataBaseUrl}/auth/register`;
export const REFRESH_TOKEN = `${DataBaseUrl}/auth/register`;
export const Dashboard = `${DataBaseUrl}/dashboard-stats`;


//LOCATION
export const REGIONS = `${DataBaseUrl}/locations/regions/`;
export const DISTRICTS = `${DataBaseUrl}/locations/districts/`;
export const WARDS = `${DataBaseUrl}/locations/wards/`;
export const VILLAGES = `${DataBaseUrl}/locations/villages/`;

//CROPS
export const CROP_TYEPS = `${DataBaseUrl}/crop-types/`;
export const CROPS = `${DataBaseUrl}/crops/`;
export const MEASUREMENT_UNITS = `${DataBaseUrl}/measurement-units/`;

//MCUS
export const MCUS = `${DataBaseUrl}/mcus/`;
export const AMCOS = `${DataBaseUrl}/amcos/`;
export const COLLECTION_CENTEER = `${DataBaseUrl}/collection-centers/`;

//FARMERS && HARVESTS
export const FARMERS = `${DataBaseUrl}/farmers/`;
export const FARMS = `${DataBaseUrl}/farms/`;
export const FARMERS_HARVERSTS = `${DataBaseUrl}/farmer-harvests/`;


//MODULES
export const TRAINING = `${DataBaseUrl}/trainings/`;
export const SMSMODULE = `${DataBaseUrl}/sms-module/`;
