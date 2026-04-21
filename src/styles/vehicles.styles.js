const _fieldValue = { fontSize: 13, color: "var(--text)", fontFamily: "'DM Sans', sans-serif" };

export const sx = {
  // Section
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 1.5, mb: 3 },
  sectionTitle:  { fontSize: 15, fontWeight: 600, color: "var(--text)", fontFamily: "'DM Sans', sans-serif" },

  // Vehicle grid & card
  vehicleGrid:        { display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(auto-fill, minmax(300px, 1fr))" }, gap: 2 },
  vehicleCard:        { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px", p: 2.5, transition: "border-color 0.15s", "&:hover": { borderColor: "var(--border2)" } },
  vehicleCardHeader:  { display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 },
  cardVehicleBtns:    { display: "flex", gap: 0.5, flexShrink: 0 },
  vehicleDivider:     { borderColor: "var(--border)", mb: 1.5 },
  vehicleDetailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 2 },
  vehicleActions:     { display: "flex", gap: 1, flexWrap: "wrap" },
  vehicleTitle:       { fontSize: 14, fontWeight: 600, color: "var(--text)", fontFamily: "'DM Sans', sans-serif" },
  vehicleMeta:        { fontSize: 12, color: "var(--text2)", fontFamily: "'DM Mono', monospace", mt: 0.25 },
  vehicleIdText:      { fontSize: 11, color: "var(--accent)", fontFamily: "'DM Mono', monospace" },
  emptyMsg:           { color: "var(--text3)", fontSize: 13 },
  statusChip:         (sc) => ({ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontSize: 11, fontWeight: 500, height: 22, borderRadius: "5px", fontFamily: "'DM Sans', sans-serif" }),

  // Subscription section inside card
  subSection:  { mt: 1.5 },
  subHeader:   { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1.5 },
  subLabel:    { fontSize: 11, fontWeight: 600, color: "var(--text3)", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em" },
  noSubRow:    { display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1.5 },
  subFormGrid: { display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mt: 1 },

  // Fields
  fieldLabel:       { fontSize: 11, fontWeight: 600, color: "var(--text3)", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 },
  fieldValue:       _fieldValue,
  fieldValueAccent: { ..._fieldValue, color: "var(--accent)" },

  // Vehicle form
  vehicleFormGrid: { display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2, mt: 1 },
  spanTwo:         { gridColumn: { xs: "span 1", sm: "span 2" } },

  // Inputs
  textField: {
    "& .MuiOutlinedInput-root": {
      color: "var(--text)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "var(--surface2)",
      "& fieldset": { borderColor: "var(--border)" },
      "&:hover fieldset": { borderColor: "var(--border2)" },
      "&.Mui-focused fieldset": { borderColor: "var(--accent)" },
    },
  },
  selectField: {
    color: "var(--text)", fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "var(--surface2)",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border)" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "var(--border2)" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "var(--accent)" },
    "& .MuiSvgIcon-root": { color: "var(--text3)" },
  },
  menuProps: {
    PaperProps: {
      sx: {
        background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: "6px",
        "& .MuiMenuItem-root": { color: "var(--text)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
        "& .MuiMenuItem-root:hover": { background: "var(--surface3)" },
        "& .MuiMenuItem-root.Mui-selected": { background: "var(--surface3)", color: "var(--accent)" },
      },
    },
  },
  menuItem: { color: "var(--text)", fontSize: 13, fontFamily: "'DM Sans', sans-serif" },

  // Dialogs
  dialogPaper:    { background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "10px" },
  dialogTitle:    { color: "var(--text)", fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, pb: 1 },
  dialogActions:  { p: 2, pt: 1, gap: 1 },
  dialogBodyText: { color: "var(--text2)", fontSize: 13, mt: 1, mb: 2 },
  dialogWarnText: { color: "var(--text2)", fontSize: 14, mt: 1 },
  strongText:     { color: "var(--text)" },

  // Buttons
  editBtn:    { color: "var(--accent)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", border: "1px solid var(--accent-border)", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "var(--accent-soft)", borderColor: "var(--accent)" } },
  outlineBtn: { color: "var(--text2)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", border: "1px solid var(--border)", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "var(--surface2)", borderColor: "var(--border2)" }, "&.Mui-disabled": { color: "var(--disabled-text)", borderColor: "var(--surface2)" } },
  saveBtn:    { color: "var(--text-on-accent)", background: "var(--accent)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", borderRadius: "6px", px: 2, py: 0.5, fontWeight: 600, "&:hover": { background: "var(--accent-hover)" }, "&.Mui-disabled": { background: "var(--disabled-bg)", color: "var(--text3)" } },
  cancelBtn:  { color: "var(--text2)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "var(--surface2)" } },
  dangerBtn:  { color: "var(--red)", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", border: "1px solid var(--red-outline)", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "var(--red-soft)", borderColor: "var(--red)" } },
};
