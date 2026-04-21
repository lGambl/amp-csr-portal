import { useState } from "react";
import { Box, Tabs, Tab, Typography, Button, Chip } from "@mui/material";
import AccountInfo from "./AccountInfo";
import Vehicles from "./Vehicles";
import PurchaseHistory from "./PurchaseHistory";
import { sx } from "../styles/userDetail.styles";
import { STATUS_COLORS } from "../styles/userList.styles";

export default function UserDetail({ user, onBack, onUpdateUser }) {
  const [tab, setTab] = useState(0);
  const sc = STATUS_COLORS[user.accountStatus] ?? STATUS_COLORS.Inactive;

  return (
    <Box sx={sx.wrapper}>
      <Box sx={sx.header}>
        <Button onClick={onBack} sx={sx.backBtn}>Back to Customers</Button>
        <Box sx={sx.headerMain}>
          <Box sx={sx.headerNameRow}>
            <Typography sx={sx.userName}>{user.firstName} {user.lastName}</Typography>
            <Chip label={user.accountStatus} size="small" sx={sx.statusChip(sc)} />
          </Box>
          <Typography sx={sx.userMeta}>
            {user.id} · {user.email}
          </Typography>
          <Typography sx={sx.userMeta}>
            Member since {user.joinDate}
          </Typography>
        </Box>
      </Box>

      <Box sx={sx.tabsBar}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={sx.tabs} variant="scrollable" scrollButtons="auto">
          <Tab label="Account Info"                         disableRipple sx={sx.tab} />
          <Tab label={`Vehicles (${user.vehicles.length})`} disableRipple sx={sx.tab} />
          <Tab label="Purchase History"                     disableRipple sx={sx.tab} />
        </Tabs>
      </Box>

      <Box sx={sx.content}>
        {tab === 0 && <AccountInfo     user={user} onUpdateUser={onUpdateUser} />}
        {tab === 1 && <Vehicles        user={user} onUpdateUser={onUpdateUser} />}
        {tab === 2 && <PurchaseHistory purchases={user.purchases} />}
      </Box>
    </Box>
  );
}
