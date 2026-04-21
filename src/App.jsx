import { useEffect, useMemo, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { generateUsers } from './data/mockData'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'
import Settings from './components/Settings'
import {
  THEME_STORAGE_KEY,
  applyTheme,
  getInitialThemeId,
  getTheme,
} from './theme/themes'
import { sx } from './styles/app.styles'

const INITIAL_USERS = generateUsers();

function App() {
  const [users, setUsers]           = useState(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [view, setView] = useState("customers");
  const [themeId, setThemeId] = useState(getInitialThemeId);
  const currentTheme = getTheme(themeId);

  const muiTheme = useMemo(() => createTheme({
    palette: {
      mode: currentTheme.mode,
      background: {
        paper:   currentTheme.vars['--surface'],
        default: currentTheme.vars['--bg'],
      },
      text: {
        primary:   currentTheme.vars['--text'],
        secondary: currentTheme.vars['--text2'],
        disabled:  currentTheme.vars['--text3'],
      },
      divider: currentTheme.vars['--border'],
      primary: { main: currentTheme.vars['--accent'] },
      action:  { hover: currentTheme.vars['--surface2'] },
    },
    typography: { fontFamily: "'DM Sans', sans-serif" },
  }), [currentTheme]);

  useEffect(() => {
    applyTheme(currentTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, currentTheme.id);
  }, [currentTheme]);

  const onUpdateUser = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser);
  };

  const showCustomers = () => setView("customers");
  const showSettings = () => {
    setSelectedUser(null);
    setView("settings");
  };

  return (
    <ThemeProvider theme={muiTheme}>
    <Box sx={sx.root}>
      <Box sx={sx.header}>
        <Box>
          <Typography sx={sx.title}>
            AMP <Box component="span" sx={sx.titleAccent}>CSR</Box> Portal
          </Typography>
          <Typography sx={sx.subtitle}>
            Customer Service Representative Dashboard
          </Typography>
        </Box>
        <Box sx={sx.nav}>
          <Button onClick={showCustomers} sx={sx.navBtn(view === "customers")}>
            Customers
          </Button>
          <Button onClick={showSettings} sx={sx.navBtn(view === "settings")}>
            Settings
          </Button>
        </Box>
      </Box>

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
        <UserList users={users} onSelectUser={setSelectedUser} />
      )}
    </Box>
    </ThemeProvider>
  );
}

export default App
