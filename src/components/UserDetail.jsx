import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import AccountInfo from "./AccountInfo";
import Vehicles from "./Vehicles";
import PurchaseHistory from "./PurchaseHistory";
import styles from "../styles/UserDetail.module.css";

export default function UserDetail({ user, onBack, onUpdateUser }) {
  const [tab, setTab] = useState(0);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>← Back to Customers</button>
        <div className={styles.headerNameRow}>
          <h1 className={styles.userName}>{user.firstName} {user.lastName}</h1>
          <span className="status-chip" data-status={user.accountStatus}>{user.accountStatus}</span>
        </div>
        <p className={styles.userMeta}>{user.id} · {user.email}</p>
        <p className={styles.userMeta}>Member since {user.joinDate}</p>
      </div>

      <div className={styles.tabsBar}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
          <Tab label="Account Info" disableRipple />
          <Tab label={`Vehicles (${user.vehicles.length})`} disableRipple />
          <Tab label="Purchase History" disableRipple />
        </Tabs>
      </div>

      <div className={styles.content}>
        {tab === 0 && <AccountInfo     user={user} onUpdateUser={onUpdateUser} />}
        {tab === 1 && <Vehicles        user={user} onUpdateUser={onUpdateUser} />}
        {tab === 2 && <PurchaseHistory purchases={user.purchases} />}
      </div>
    </div>
  );
}
