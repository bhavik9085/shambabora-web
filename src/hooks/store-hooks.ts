import {useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import {AppDispatcher, RootState} from "../store/store";

export const useAppDispatch = () => useDispatch<AppDispatcher>();
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
