import { useCallback, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import { ToastContext } from "./ToastContextDef";

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const show = useCallback((message, severity = "success") => {
        setToast({ message, severity, key: Date.now() });
    }, []);

    const handleClose = (_, reason) => {
        if (reason === "clickaway") return;
        setToast(null);
    };

    return (
        <ToastContext.Provider value={show}>
            {children}
            <Snackbar
                key={toast?.key}
                open={!!toast}
                autoHideDuration={3500}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={toast?.severity ?? "success"}
                    variant="filled"
                    sx={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        borderRadius: "8px",
                        "& .MuiAlert-icon": { fontSize: 18 },
                        "& .MuiAlert-action .MuiIconButton-root": {
                            color: "rgba(255,255,255,0.8)",
                            "&:hover": {
                                color: "#fff",
                                background: "rgba(255,255,255,0.15)",
                            },
                        },
                    }}
                >
                    {toast?.message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
}
