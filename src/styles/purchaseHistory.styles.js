const _tableCell = { borderBottom: "1px solid #2a2f42", color: "#e8eaf2", fontFamily: "'DM Sans', sans-serif", fontSize: 13, py: 1.5, px: 2 };

export const sx = {
  sectionHeader:  { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5, mb: 3 },
  sectionTitle:   { fontSize: 15, fontWeight: 600, color: "#e8eaf2", fontFamily: "'DM Sans', sans-serif" },
  txnSummary:     { color: "#5c6278", fontSize: 12 },
  txnTotalText:   { color: "#34d399" },
  txnChip:        (paid) => ({ background: paid ? "rgba(52,211,153,0.12)" : "rgba(248,113,113,0.12)", color: paid ? "#34d399" : "#f87171", border: `1px solid ${paid ? "rgba(52,211,153,0.25)" : "rgba(248,113,113,0.25)"}`, fontSize: 11, fontWeight: 500, height: 22, borderRadius: "5px", fontFamily: "'DM Sans', sans-serif" }),
  tableContainer: { background: "#161921", border: "1px solid #2a2f42", borderRadius: "10px", overflowX: "auto" },
  table:          { minWidth: 760 },
  headCell:       { borderBottom: "1px solid #2a2f42", color: "#5c6278", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "#161921", py: 1.5, px: 2 },
  tableCell:      _tableCell,
  tableCellMuted: { ..._tableCell, color: "#8b92ab" },
  amountCell:     (paid) => ({ ..._tableCell, color: paid ? "#34d399" : "#f87171" }),
  monoCell:       { borderBottom: "1px solid #2a2f42", color: "#8b92ab", fontFamily: "'DM Mono', monospace", fontSize: 12, py: 1.5, px: 2 },
  tableRow:       { "&:last-child td": { borderBottom: 0 }, "&:hover": { background: "#1e2130" } },
};
