import { DataBaseUrl } from "./base-url";
// AUTH
// export const POST_LOGIN_USER = `${DataBaseUrl}/auth/login`;
export const POST_LOGIN_USER = `${DataBaseUrl}/authentication`;
export const POST_REGISTER_USER = `${DataBaseUrl}/auth/register`;
export const REFRESH_TOKEN = `${DataBaseUrl}/auth/register`;
export const Dashboard = `${DataBaseUrl}/dashboard-stats`;


//LOCATION
export const REGIONS = `${DataBaseUrl}/region/`;
export const DISTRICTS = `${DataBaseUrl}/district/`;
export const WARDS = `${DataBaseUrl}/ward/`;
export const VILLAGES = `${DataBaseUrl}/village/`;

//CROPS
export const CROP_TYEPS = `${DataBaseUrl}/crop-type/`;
export const CROPS = `${DataBaseUrl}/crop/`;
export const MEASUREMENT_UNITS = `${DataBaseUrl}/measurement-unit/`;

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
