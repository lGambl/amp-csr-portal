import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import AccountInfo from "./AccountInfo";
import Vehicles from "./Vehicles";
import PurchaseHistory from "./PurchaseHistory";
import { useSimulatedFetch } from "../hooks/useSimulatedFetch";
import styles from "../styles/UserDetail.module.css";

function FieldSkeleton({ labelWidth, valueWidth }) {
  return (
    <div>
      <div className="skeleton" style={{ height: 11, width: labelWidth, marginBottom: 6 }} />
      <div className="skeleton" style={{ height: 13, width: valueWidth }} />
    </div>
  );
}

function AccountInfoSkeleton() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div className="skeleton" style={{ height: 16, width: 150 }} />
        <div className="skeleton" style={{ height: 30, width: 56, borderRadius: 6 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 32 }}>
        <FieldSkeleton labelWidth={70}  valueWidth="75%" />
        <FieldSkeleton labelWidth={75}  valueWidth="80%" />
        <FieldSkeleton labelWidth={100} valueWidth="60%" />
        <FieldSkeleton labelWidth={45}  valueWidth="85%" />
        <FieldSkeleton labelWidth={55}  valueWidth="70%" />
        <FieldSkeleton labelWidth={90}  valueWidth="55%" />
      </div>
      <div className="skeleton" style={{ height: 1, marginBottom: 32 }} />
      <div className="skeleton" style={{ height: 11, width: 60, marginBottom: 20 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        <FieldSkeleton labelWidth={100} valueWidth="90%" />
        <FieldSkeleton labelWidth={40}  valueWidth="70%" />
        <FieldSkeleton labelWidth={50}  valueWidth="65%" />
        <FieldSkeleton labelWidth={65}  valueWidth="55%" />
      </div>
    </div>
  );
}

function VehiclesSkeleton() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div className="skeleton" style={{ height: 16, width: 180 }} />
        <div className="skeleton" style={{ height: 30, width: 100, borderRadius: 6 }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div className="skeleton" style={{ height: 14, width: 140, marginBottom: 6 }} />
                <div className="skeleton" style={{ height: 12, width: 110, marginBottom: 4 }} />
                <div className="skeleton" style={{ height: 11, width: 70 }} />
              </div>
              <div style={{ display: "flex", gap: 4 }}>
                <div className="skeleton" style={{ height: 28, width: 44, borderRadius: 6 }} />
                <div className="skeleton" style={{ height: 28, width: 64, borderRadius: 6 }} />
              </div>
            </div>
            <div className="skeleton" style={{ height: 1, marginBottom: 12 }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <FieldSkeleton labelWidth={40}  valueWidth="80%" />
              <FieldSkeleton labelWidth={60}  valueWidth="70%" />
              <FieldSkeleton labelWidth={70}  valueWidth="75%" />
              <FieldSkeleton labelWidth={80}  valueWidth="65%" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PurchaseHistorySkeleton() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div className="skeleton" style={{ height: 16, width: 140 }} />
        <div className="skeleton" style={{ height: 13, width: 160 }} />
      </div>
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 16 }}>
          {[70, 110, 160, 50, 55, 50].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 11, width: w }} />
          ))}
        </div>
        {[...Array(6)].map((_, row) => (
          <div key={row} style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 16, alignItems: "center" }}>
            {[80, 100, 170, 90, 50, 48].map((w, i) => (
              <div key={i} className="skeleton" style={{ height: i === 5 ? 20 : 13, width: w, borderRadius: i === 5 ? 5 : 4 }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function UserDetailSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className="skeleton" style={{ height: 12, width: 130, marginBottom: 12 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
          <div className="skeleton" style={{ height: 26, width: 210 }} />
          <div className="skeleton" style={{ height: 22, width: 64, borderRadius: 5 }} />
        </div>
        <div className="skeleton" style={{ height: 12, width: 270, marginBottom: 6 }} />
        <div className="skeleton" style={{ height: 12, width: 165 }} />
      </div>
      <div className={styles.tabsBar} style={{ height: 42 }} />
      <div className={styles.content}>
        <AccountInfoSkeleton />
      </div>
    </div>
  );
}

const TAB_SKELETONS = [AccountInfoSkeleton, VehiclesSkeleton, PurchaseHistorySkeleton];

export default function UserDetail({ user, onBack, onUpdateUser }) {
  const { data: profile, loading: profileLoading } = useSimulatedFetch(user, 480);

  const [selectedTab, setSelectedTab] = useState(0);
  const [displayedTab, setDisplayedTab] = useState(0);
  const [tabLoading, setTabLoading] = useState(false);

  const handleTabChange = (_, v) => {
    if (v === selectedTab) return;
    setSelectedTab(v);
    setTabLoading(true);
    setTimeout(() => {
      setDisplayedTab(v);
      setTabLoading(false);
    }, 300);
  };

  if (profileLoading) return <UserDetailSkeleton />;

  const TabSkeleton = TAB_SKELETONS[selectedTab];

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button onClick={onBack} className={styles.backBtn}>← Back to Customers</button>
        <div className={styles.headerNameRow}>
          <h1 className={styles.userName}>{profile.firstName} {profile.lastName}</h1>
          <span className="status-chip" data-status={profile.accountStatus}>{profile.accountStatus}</span>
        </div>
        <p className={styles.userMeta}>{profile.id} · {profile.email}</p>
        <p className={styles.userMeta}>Member since {profile.joinDate}</p>
      </div>

      <div className={styles.tabsBar}>
        <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Account Info" disableRipple />
          <Tab label={`Vehicles (${profile.vehicles.length})`} disableRipple />
          <Tab label="Purchase History" disableRipple />
        </Tabs>
      </div>

      <div className={styles.content}>
        {tabLoading ? (
          <TabSkeleton />
        ) : (
          <>
            {displayedTab === 0 && <AccountInfo     user={profile} onUpdateUser={onUpdateUser} />}
            {displayedTab === 1 && <Vehicles        user={profile} onUpdateUser={onUpdateUser} />}
            {displayedTab === 2 && <PurchaseHistory purchases={profile.purchases} />}
          </>
        )}
      </div>
    </div>
  );
}
