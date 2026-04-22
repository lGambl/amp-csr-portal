import { useContext } from "react";
import { ToastContext } from "../context/ToastContextDef";

export function useToast() {
    return useContext(ToastContext);
}
