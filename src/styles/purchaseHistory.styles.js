const _tableCell = { borderBottom: "1px solid var(--border)", color: "var(--text)", fontFamily: "'DM Sans', sans-serif", fontSize: 13, py: 1.5, px: 2 };

export const sx = {
  sectionHeader:  { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5, mb: 3 },
  sectionTitle:   { fontSize: 15, fontWeight: 600, color: "var(--text)", fontFamily: "'DM Sans', sans-serif" },
  txnSummary:     { color: "var(--text3)", fontSize: 12 },
  txnTotalText:   { color: "var(--green)" },
  txnChip:        (paid) => ({ background: paid ? "var(--green-bg)" : "var(--red-bg)", color: paid ? "var(--green)" : "var(--red)", border: `1px solid ${paid ? "var(--green-border)" : "var(--red-border)"}`, fontSize: 11, fontWeight: 500, height: 22, borderRadius: "5px", fontFamily: "'DM Sans', sans-serif" }),
  tableContainer: { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", overflowX: "auto" },
  table:          { minWidth: 760 },
  headCell:       { borderBottom: "1px solid var(--border)", color: "var(--text3)", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", background: "var(--surface)", py: 1.5, px: 2 },
  tableCell:      _tableCell,
  tableCellMuted: { ..._tableCell, color: "var(--text2)" },
  amountCell:     (paid) => ({ ..._tableCell, color: paid ? "var(--green)" : "var(--red)" }),
  monoCell:       { borderBottom: "1px solid var(--border)", color: "var(--text2)", fontFamily: "'DM Mono', monospace", fontSize: 12, py: 1.5, px: 2 },
  tableRow:       { "&:last-child td": { borderBottom: 0 }, "&:hover": { background: "var(--surface2)" } },
};
