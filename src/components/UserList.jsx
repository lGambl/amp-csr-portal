import { useState, useMemo, useEffect } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, Select, MenuItem,
} from "@mui/material";
import { ACCOUNT_STATUSES, STATUS } from "../data/mockData";
import styles from "../styles/UserList.module.css";

const SUBSCRIPTION_STATUSES = STATUS.map((s) => s.name);

function statCards(users) {
  return [
    { label: "Total Customers",       value: users.length,                                                                           colorKey: "accent" },
    { label: "Active Accounts",       value: users.filter(u => u.accountStatus === "Active").length,                                 colorKey: "green"  },
    { label: "Active Subscriptions",  value: users.reduce((s, u) => s + u.subscriptions.filter(sub => sub.status === "Active").length, 0),  colorKey: "accent" },
    { label: "Overdue Subscriptions", value: users.reduce((s, u) => s + u.subscriptions.filter(sub => sub.status === "Overdue").length, 0), colorKey: "red"    },
  ];
}

const SKELETON_WIDTHS = [
  [80, 130, 170, 110, 64, 20, 85, 120],
  [72, 110, 200, 95,  64, 20, 85, 100],
  [80, 150, 155, 105, 64, 20, 85, 130],
  [75, 120, 180, 115, 64, 20, 85, 110],
  [80, 140, 165, 100, 64, 20, 85, 125],
  [72, 130, 175, 110, 64, 20, 85, 115],
  [80, 115, 190, 95,  64, 20, 85, 105],
  [75, 145, 160, 105, 64, 20, 85, 120],
];

function UserListSkeleton() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.statGrid}>
        {[...Array(4)].map((_, i) => (
          <div key={i} className={styles.statCard} style={{ borderTopColor: "var(--border)" }}>
            <div className="skeleton" style={{ height: 30, width: 56, marginBottom: 10 }} />
            <div className="skeleton" style={{ height: 12, width: 110 }} />
          </div>
        ))}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap} style={{ opacity: 0.5 }}>
          <div className="skeleton" style={{ height: 13, flex: 1 }} />
        </div>
        <div className="skeleton" style={{ height: 36, width: 140, borderRadius: 4 }} />
        <div className="skeleton" style={{ height: 36, width: 140, borderRadius: 4 }} />
      </div>

      <div className={styles.tableContainer}>
        <div style={{ padding: "10px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 16 }}>
          {[80, 100, 140, 90, 56, 24, 72, 90].map((w, i) => (
            <div key={i} className="skeleton" style={{ height: 11, width: w }} />
          ))}
        </div>
        {SKELETON_WIDTHS.map((cols, row) => (
          <div key={row} style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 16, alignItems: "center" }}>
            {cols.map((w, i) => (
              <div key={i} className="skeleton" style={{ height: i === 4 ? 20 : 13, width: w, borderRadius: i === 4 ? 5 : 4 }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UserList({ users, onSelectUser }) {
  const [ready, setReady] = useState(false);
  const [search, setSearch]                         = useState("");
  const [statusFilter, setStatusFilter]             = useState("All");
  const [subscriptionFilter, setSubscriptionFilter] = useState("All");
  const [page, setPage]                             = useState(0);
  const [rowsPerPage, setRowsPerPage]               = useState(10);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 650);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(u => {
      const vehicleTerms = u.vehicles.flatMap(v => [v.id, v.plate, v.make, v.model]);
      const matchSearch       = !q || [u.firstName, u.lastName, u.email, u.phone, u.id, u.city, ...vehicleTerms].some(f => String(f).toLowerCase().includes(q));
      const matchStatus       = statusFilter === "All" || u.accountStatus === statusFilter;
      const matchSubscription = subscriptionFilter === "All" || u.subscriptions.some(s => s.status === subscriptionFilter);
      return matchSearch && matchStatus && matchSubscription;
    });
  }, [users, search, statusFilter, subscriptionFilter]);

  const stats     = useMemo(() => statCards(users), [users]);
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSearch    = (v) => { setSearch(v);             setPage(0); };
  const handleFilter    = (v) => { setStatusFilter(v);       setPage(0); };
  const handleSubFilter = (v) => { setSubscriptionFilter(v); setPage(0); };

  if (!ready) return <UserListSkeleton />;

  return (
    <div className={styles.wrapper}>
      <div className={styles.statGrid}>
        {stats.map(s => (
          <div key={s.label} className={styles.statCard} data-color={s.colorKey}>
            <p className={styles.statNum} data-color={s.colorKey}>{s.value}</p>
            <p className={styles.statLabel}>{s.label}</p>
          </div>
        ))}
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.searchInput}
            placeholder="Name, email, phone, ID, city, vehicle, or plate..."
            value={search}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onChange={e => handleFilter(e.target.value)} size="small">
          <MenuItem value="All">All Accounts</MenuItem>
          {ACCOUNT_STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </Select>
        <Select value={subscriptionFilter} onChange={e => handleSubFilter(e.target.value)} size="small">
          <MenuItem value="All">All Subscriptions</MenuItem>
          {SUBSCRIPTION_STATUSES.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
        </Select>
        <span className={styles.resultCount}>{filtered.length} customer{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <TableContainer className={styles.tableContainer}>
        <Table style={{ minWidth: 980 }}>
          <TableHead>
            <TableRow>
              {["ID", "Name", "Email", "Phone", "Status", "Vehicles", "Join Date", "Location"].map(col => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map(u => (
              <TableRow
                key={u.id}
                onClick={() => onSelectUser?.(u)}
                onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onSelectUser?.(u); } }}
                role="button"
                tabIndex={0}
                style={{ cursor: "pointer" }}
              >
                <TableCell style={{ color: "var(--accent)", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{u.id}</TableCell>
                <TableCell style={{ fontWeight: 500 }}>{u.firstName} {u.lastName}</TableCell>
                <TableCell style={{ color: "var(--text2)" }}>{u.email}</TableCell>
                <TableCell style={{ color: "var(--text2)", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{u.phone}</TableCell>
                <TableCell>
                  <span className="status-chip" data-status={u.accountStatus}>{u.accountStatus}</span>
                </TableCell>
                <TableCell style={{ color: "var(--text2)", textAlign: "center" }}>{u.vehicles.length}</TableCell>
                <TableCell style={{ color: "var(--text2)", fontFamily: "'DM Mono', monospace", fontSize: 12 }}>{u.joinDate}</TableCell>
                <TableCell style={{ color: "var(--text2)" }}>{u.city}, {u.state}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }}
        rowsPerPageOptions={[10, 25, 50]}
      />
    </div>
  );
}
