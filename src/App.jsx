import { useState } from 'react'
import { Box, Typography } from '@mui/material'
import { generateUsers } from './data/mockData'
import UserList from './components/UserList'
import UserDetail from './components/UserDetail'

const INITIAL_USERS = generateUsers();

function App() {
  const [users, setUsers]           = useState(INITIAL_USERS);
  const [selectedUser, setSelectedUser] = useState(null);

  const onUpdateUser = (updatedUser) => {
    setUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
    setSelectedUser(updatedUser);
  };

  return (
    <Box sx={{ background: "#0d0f14", minHeight: "100vh" }}>
      <Box sx={{
        px: 3, pt: 3, pb: 0,
        borderBottom: "1px solid #2a2f42",
        background: "#161921",
        display: "flex", alignItems: "center", gap: 2,
      }}>
        <Box>
          <Typography sx={{ fontSize: 20, fontWeight: 700, color: "#e8eaf2", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>
            AMP <span style={{ color: "#4f8fff" }}>CSR</span> Portal
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#5c6278", fontFamily: "'DM Sans', sans-serif", mb: 1.5 }}>
            Customer Service Representative Dashboard
          </Typography>
        </Box>
      </Box>

      {selectedUser ? (
        <UserDetail
          user={selectedUser}
          onBack={() => setSelectedUser(null)}
          onUpdateUser={onUpdateUser}
        />
      ) : (
        <UserList users={users} onSelectUser={setSelectedUser} />
      )}
    </Box>
  );
}

export default App
