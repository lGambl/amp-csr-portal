export const STATUS_COLORS = {
  Active:    { color: "var(--green)", bg: "var(--green-bg)",  border: "var(--green-border)"  },
  Inactive:  { color: "var(--text2)", bg: "var(--muted-bg)", border: "var(--muted-border)"  },
  Suspended: { color: "var(--yellow)", bg: "var(--yellow-bg)", border: "var(--yellow-border)"  },
  Overdue:   { color: "var(--red)", bg: "var(--red-bg)", border: "var(--red-border)" },
  Cancelled: { color: "var(--red)", bg: "var(--red-bg)", border: "var(--red-border)" },
};

export const STAT_CARDS = (users) => [
  { label: "Total Customers",       value: users.length,                                                           color: "var(--accent)" },
  { label: "Active Accounts",       value: users.filter(u => u.accountStatus === "Active").length,                 color: "var(--green)" },
  { label: "Active Subscriptions",  value: users.reduce((sum, u) => sum + u.subscriptions.filter(s => s.status === "Active").length, 0),  color: "var(--accent)" },
  { label: "Overdue Subscriptions", value: users.reduce((sum, u) => sum + u.subscriptions.filter(s => s.status === "Overdue").length, 0), color: "var(--red)" },
];

export const DROPDOWN_MENU_PROPS = {
  paperprops: {
    sx: {
      background: "var(--surface2)",
      border: "1px solid var(--border)",
      borderRadius: "6px",
      mt: 0.5,
      "& .MuiMenuItem-root": { color: "var(--text)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
      "& .MuiMenuItem-root:hover": { background: "var(--surface3)" },
      "& .MuiMenuItem-root.Mui-selected": { background: "var(--surface3)", color: "var(--accent)" },
      "& .MuiMenuItem-root.Mui-selected:hover": { background: "var(--surface-hover)" },
    },
  },
};

const cell = {
  borderBottom: "1px solid var(--border)",
  color: "var(--text)",
  fontFamily: "'DM Sans', sans-serif",
  fontSize: 13,
  py: 1.5,
  px: 2,
};

export const sx = {
  wrapper:        { p: { xs: 2, md: 3 }, background: "var(--bg)" },
  statGrid:       { display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: { xs: 1.5, md: 2 }, mb: { xs: 2, md: 3 } },
  statCard:       (color) => ({ background: "var(--surface)", border: "1px solid var(--border)", borderTop: `2px solid ${color}`, borderRadius: "10px", p: 2.5 }),
  statNumber:     (color) => ({ fontSize: 30, fontWeight: 700, color, fontFamily: "'Syne', sans-serif", lineHeight: 1 }),
  statLabel:      { fontSize: 12, color: "var(--text3)", mt: 0.75, fontFamily: "'DM Sans', sans-serif" },
  toolbar:        { display: "flex", alignItems: { xs: "stretch", md: "center" }, flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 2, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", p: 1.5 },
  searchWrap:     { display: "flex", alignItems: "center", gap: 1, flex: 1, background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "6px", px: 1.5, py: 0.75 },
  searchIcon:     { color: "var(--text3)", fontSize: 15, lineHeight: 1 },
  searchInput:    { flex: 1, color: "var(--text)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", "& input::placeholder": { color: "var(--text3)", opacity: 1 } },
  filterSelect:   { color: "var(--text)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "var(--surface2)", borderRadius: "6px", "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border)" }, "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border2)" }, "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent)" }, "& .MuiSvgIcon-root": { color: "var(--text3)" } },
  resultCount:    { color: "var(--text3)", fontSize: 12, whiteSpace: "nowrap", pr: 0.5 },
  tableContainer: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", overflowX: "auto" },
  table:          { minWidth: 980 },
  headCell:       { ...cell, color: "var(--text3)", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--surface)" },
  tableRow:       { cursor: "pointer", transition: "background 0.12s", "&:hover": { background: "var(--surface2)" }, "&:focus-visible": { outline: "2px solid var(--accent)", outlineOffset: "-2px" }, "&:last-child td": { borderBottom: 0 } },
  cellDefault:    { ...cell },
  cellId:         { ...cell, color: "var(--accent)", fontFamily: "'DM Mono', monospace", fontSize: 12 },
  cellMuted:      { ...cell, color: "var(--text2)" },
  cellMono:       { ...cell, color: "var(--text2)", fontFamily: "'DM Mono', monospace", fontSize: 12 },
  cellCenter:     { ...cell, color: "var(--text2)", textAlign: "center" },
  nameText:       { fontSize: 13, fontWeight: 500, color: "var(--text)", fontFamily: "'DM Sans', sans-serif" },
  statusChip:     (sc) => ({ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, height: 22, borderRadius: "5px" }),
  pagination:     { color: "var(--text2)", fontFamily: "'DM Sans', sans-serif", fontSize: 12, "& .MuiTablePagination-select": { color: "var(--text)" }, "& .MuiTablePagination-selectIcon": { color: "var(--text3)" }, "& .MuiIconButton-root": { color: "var(--text2)" }, "& .MuiIconButton-root.Mui-disabled": { color: "var(--disabled-text)" }, "& .MuiTablePagination-displayedRows": { fontFamily: "'DM Sans', sans-serif", fontSize: 12 }, "& .MuiTablePagination-selectLabel": { fontFamily: "'DM Sans', sans-serif", fontSize: 12 } },
};
