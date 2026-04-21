export const sx = {
  wrapper:       { background: "var(--bg)", minHeight: "100vh" },
  header:        { px: 3, py: 2.5, background: "var(--surface)", borderBottom: "1px solid var(--border)" },
  headerMain:    { mt: 0.5 },
  headerNameRow: { display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" },
  content:       { p: { xs: 2, md: 3 } },
  backBtn:       { color: "var(--text2)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", p: 0, minWidth: 0, mb: 1, "&:hover": { color: "var(--text)", background: "transparent" } },
  userName:      { fontSize: 22, fontWeight: 700, color: "var(--text)", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" },
  userMeta:      { fontSize: 12, color: "var(--text3)", fontFamily: "'DM Sans', sans-serif", mt: 0.5 },
  statusChip:    (sc) => ({ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontSize: 11, fontWeight: 500, height: 22, borderRadius: "5px", fontFamily: "'DM Sans', sans-serif" }),
  tabsBar:       { background: "var(--surface)", borderBottom: "1px solid var(--border)", px: 3 },
  tabs:          { "& .MuiTabs-indicator": { backgroundColor: "var(--accent)" }, minHeight: 42 },
  tab:           { color: "var(--text3)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, textTransform: "none", minHeight: 42, "&.Mui-selected": { color: "var(--accent)" } },
};
