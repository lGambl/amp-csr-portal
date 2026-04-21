export const STATUS_COLORS = {
  Active:    { color: "#34d399", bg: "rgba(52,211,153,0.12)",  border: "rgba(52,211,153,0.25)"  },
  Inactive:  { color: "#8b92ab", bg: "rgba(139,146,171,0.1)", border: "rgba(139,146,171,0.2)"  },
  Suspended: { color: "#fbbf24", bg: "rgba(251,191,36,0.12)", border: "rgba(251,191,36,0.25)"  },
  Overdue:   { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)" },
  Cancelled: { color: "#f87171", bg: "rgba(248,113,113,0.12)", border: "rgba(248,113,113,0.25)" },
};

export const STAT_CARDS = (users) => [
  { label: "Total Customers",       value: users.length,                                                           color: "#4f8fff" },
  { label: "Active Accounts",       value: users.filter(u => u.accountStatus === "Active").length,                 color: "#34d399" },
  { label: "Active Subscriptions",  value: users.filter(u => u.vehicles.some(v => v.status === "Active")).length,  color: "#4f8fff" },
  { label: "Overdue Subscriptions", value: users.filter(u => u.vehicles.some(v => v.status === "Overdue")).length, color: "#f87171" },
];

export const DROPDOWN_MENU_PROPS = {
  PaperProps: {
    sx: {
      background: "#1e2130",
      border: "1px solid #2a2f42",
      borderRadius: "6px",
      mt: 0.5,
      "& .MuiMenuItem-root": { color: "#e8eaf2", fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
      "& .MuiMenuItem-root:hover": { background: "#252a3a" },
      "& .MuiMenuItem-root.Mui-selected": { background: "#252a3a", color: "#4f8fff" },
      "& .MuiMenuItem-root.Mui-selected:hover": { background: "#2e3448" },
    },
  },
};

const cell = {
  borderBottom: "1px solid #2a2f42",
  color: "#e8eaf2",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  py: 1.5,
  px: 2,
};

export const sx = {
  wrapper:        { p: 3, background: "#0d0f14", minHeight: "100vh" },
  statGrid:       { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 2, mb: 3 },
  statCard:       (color) => ({ background: "#161921", border: "1px solid #2a2f42", borderTop: `2px solid ${color}`, borderRadius: "10px", p: 2.5 }),
  statNumber:     (color) => ({ fontSize: 30, fontWeight: 700, color, fontFamily: "'Syne', sans-serif", lineHeight: 1 }),
  statLabel:      { fontSize: 12, color: "#5c6278", mt: 0.75, fontFamily: "'DM Sans', sans-serif" },
  toolbar:        { display: "flex", alignItems: "center", gap: 2, mb: 2, background: "#161921", border: "1px solid #2a2f42", borderRadius: "10px", p: 1.5 },
  searchWrap:     { display: "flex", alignItems: "center", gap: 1, flex: 1, background: "#1e2130", border: "1px solid #2a2f42", borderRadius: "6px", px: 1.5, py: 0.75 },
  searchIcon:     { color: "#5c6278", fontSize: 15, lineHeight: 1 },
  searchInput:    { flex: 1, color: "#e8eaf2", fontSize: 13, fontFamily: "'DM Sans', sans-serif", "& input::placeholder": { color: "#5c6278", opacity: 1 } },
  filterSelect:   { color: "#e8eaf2", fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "#1e2130", borderRadius: "6px", "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2a2f42" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#343a50" }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4f8fff" }, "& .MuiSvgIcon-root": { color: "#5c6278" } },
  resultCount:    { color: "#5c6278", fontSize: 12, whiteSpace: "nowrap", pr: 0.5 },
  tableContainer: { background: "#161921", border: "1px solid #2a2f42", borderRadius: "10px", overflow: "hidden" },
  headCell:       { ...cell, color: "#5c6278", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "#161921" },
  tableRow:       { cursor: "pointer", transition: "background 0.12s", "&:hover": { background: "#1e2130" }, "&:last-child td": { borderBottom: 0 } },
  cellDefault:    { ...cell },
  cellId:         { ...cell, color: "#4f8fff", fontFamily: "'DM Mono', monospace", fontSize: 12 },
  cellMuted:      { ...cell, color: "#8b92ab" },
  cellMono:       { ...cell, color: "#8b92ab", fontFamily: "'DM Mono', monospace", fontSize: 12 },
  cellCenter:     { ...cell, color: "#8b92ab", textAlign: "center" },
  nameText:       { fontSize: 13, fontWeight: 500, color: "#e8eaf2", fontFamily: "'DM Sans', sans-serif" },
  statusChip:     (sc) => ({ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, height: 22, borderRadius: "5px" }),
  pagination:     { color: "#8b92ab", fontFamily: "'DM Sans', sans-serif", fontSize: 12, "& .MuiTablePagination-select": { color: "#e8eaf2" }, "& .MuiTablePagination-selectIcon": { color: "#5c6278" }, "& .MuiIconButton-root": { color: "#8b92ab" }, "& .MuiIconButton-root.Mui-disabled": { color: "#3a3f52" }, "& .MuiTablePagination-displayedRows": { fontFamily: "'DM Sans', sans-serif", fontSize: 12 }, "& .MuiTablePagination-selectLabel": { fontFamily: "'DM Sans', sans-serif", fontSize: 12 } },
};
