import { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { generateUsers } from "./data/mockData";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import Settings from "./components/Settings";
import {
    THEME_STORAGE_KEY,
    applyTheme,
    getInitialThemeId,
    getTheme,
} from "./theme/themes";
import { ToastProvider } from "./context/ToastContext";
import styles from "./styles/App.module.css";

const INITIAL_USERS = generateUsers();

function App() {
    const [users, setUsers] = useState(INITIAL_USERS);
    const [selectedUser, setSelectedUser] = useState(null);
    const [view, setView] = useState("customers");
    const [themeId, setThemeId] = useState(getInitialThemeId);
    const currentTheme = getTheme(themeId);

    const muiTheme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: currentTheme.mode,
                    background: {
                        paper: currentTheme.vars["--surface"],
                        default: currentTheme.vars["--bg"],
                    },
                    text: {
                        primary: currentTheme.vars["--text"],
                        secondary: currentTheme.vars["--text2"],
                        disabled: currentTheme.vars["--text3"],
                    },
                    divider: currentTheme.vars["--border"],
                    primary: { main: currentTheme.vars["--accent"] },
                    action: { hover: currentTheme.vars["--surface2"] },
                },
                typography: { fontFamily: "'DM Sans', sans-serif" },
            }),
        [currentTheme],
    );

    useEffect(() => {
        applyTheme(currentTheme);
        window.localStorage.setItem(THEME_STORAGE_KEY, currentTheme.id);
    }, [currentTheme]);

    const onUpdateUser = (updatedUser) => {
        setUsers((prev) =>
            prev.map((u) => (u.id === updatedUser.id ? updatedUser : u)),
        );
        setSelectedUser(updatedUser);
    };

    const showCustomers = () => setView("customers");
    const showSettings = () => {
        setSelectedUser(null);
        setView("settings");
    };

    return (
        <ThemeProvider theme={muiTheme}>
            <ToastProvider>
                <div className={styles.root}>
                    <header className={styles.header}>
                        <div>
                            <h1 className={styles.appTitle}>
                                AMP{" "}
                                <span className={styles.titleAccent}>CSR</span>{" "}
                                Portal
                            </h1>
                            <p className={styles.appSubtitle}>
                                Customer Service Representative Dashboard
                            </p>
                        </div>
                        <nav className={styles.nav}>
                            <button
                                onClick={showCustomers}
                                className={`${styles.navBtn}${view === "customers" ? ` ${styles.navBtnActive}` : ""}`}
                            >
                                Customers
                            </button>
                            <button
                                onClick={showSettings}
                                className={`${styles.navBtn}${view === "settings" ? ` ${styles.navBtnActive}` : ""}`}
                            >
                                Settings
                            </button>
                        </nav>
                    </header>

                    <div className={styles.contentArea}>
                        {view === "settings" ? (
                            <Settings
                                themeId={currentTheme.id}
                                onThemeChange={setThemeId}
                                onBackToCustomers={showCustomers}
                            />
                        ) : selectedUser ? (
                            <UserDetail
                                user={selectedUser}
                                onBack={() => setSelectedUser(null)}
                                onUpdateUser={onUpdateUser}
                            />
                        ) : (
                            <UserList
                                users={users}
                                onSelectUser={setSelectedUser}
                            />
                        )}
                    </div>
                </div>
            </ToastProvider>
        </ThemeProvider>
    );
}

export default App;
