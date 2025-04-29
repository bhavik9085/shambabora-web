import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Alert {
  id: number;
  title: string;
  message: string;
  type: "success" | "error" | "warning" | "info"; 
}

const initialState: Alert[] = [];

function removeAlert(id: number) {
  return initialState.filter((alert) => alert.id !== id);
}

let nextAlertId = 0;

export const AlertStateSlice = createSlice({
  name: 'AlertState',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<{ title: string; message: string; type: "success" | "error" | "warning" | "info" }>) => {
      const id = nextAlertId++;
      const { title, message, type } = action.payload;
      const duration = 1000;

      switch (type) {
        case "success":
          toast.success(message, { autoClose: duration });
          break;
        case "error":
          toast.error(message, { autoClose: duration });
          break;
        case "warning":
          toast.warning(message, { autoClose: duration });
          break;
        default:
          toast.info(message, { autoClose: duration });
          break;
      }

      setTimeout(() => {
        removeAlert(id);
      }, duration);

      return [
        ...state,
        { id, title, message, type }
      ];
    },

    cancelAlert: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload;
      const index = state.findIndex((alert) => alert.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  }
});

export const { addAlert, cancelAlert } = AlertStateSlice.actions;
export default AlertStateSlice.reducer;
