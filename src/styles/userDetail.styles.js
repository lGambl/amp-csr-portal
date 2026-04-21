export const sx = {
  wrapper:       { background: "#0d0f14", minHeight: "100vh" },
  header:        { px: 3, py: 2.5, background: "#161921", borderBottom: "1px solid #2a2f42" },
  headerMain:    { mt: 0.5 },
  headerNameRow: { display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" },
  content:       { p: { xs: 2, md: 3 } },
  backBtn:       { color: "#8b92ab", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", p: 0, minWidth: 0, mb: 1, "&:hover": { color: "#e8eaf2", background: "transparent" } },
  userName:      { fontSize: 22, fontWeight: 700, color: "#e8eaf2", fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" },
  userMeta:      { fontSize: 12, color: "#5c6278", fontFamily: "'DM Sans', sans-serif", mt: 0.5 },
  statusChip:    (sc) => ({ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontSize: 11, fontWeight: 500, height: 22, borderRadius: "5px", fontFamily: "'DM Sans', sans-serif" }),
  tabsBar:       { background: "#161921", borderBottom: "1px solid #2a2f42", px: 3 },
  tabs:          { "& .MuiTabs-indicator": { backgroundColor: "#4f8fff" }, minHeight: 42 },
  tab:           { color: "#5c6278", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 500, textTransform: "none", minHeight: 42, "&.Mui-selected": { color: "#4f8fff" } },
};
