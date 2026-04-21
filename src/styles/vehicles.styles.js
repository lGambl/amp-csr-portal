const _fieldValue = { fontSize: 13, color: "#e8eaf2", fontFamily: "'DM Sans', sans-serif" };

export const sx = {
  // Section
  sectionHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 },
  sectionTitle:  { fontSize: 15, fontWeight: 600, color: "#e8eaf2", fontFamily: "'DM Sans', sans-serif" },

  // Vehicle grid & card
  vehicleGrid:        { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 2 },
  vehicleCard:        { background: "#161921", border: "1px solid #2a2f42", borderRadius: "10px", p: 2.5, transition: "border-color 0.15s", "&:hover": { borderColor: "#343a50" } },
  vehicleCardHeader:  { display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 },
  vehicleDivider:     { borderColor: "#2a2f42", mb: 1.5 },
  vehicleDetailsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, mb: 2 },
  vehicleActions:     { display: "flex", gap: 1, flexWrap: "wrap" },
  vehicleTitle:       { fontSize: 14, fontWeight: 600, color: "#e8eaf2", fontFamily: "'DM Sans', sans-serif" },
  vehicleMeta:        { fontSize: 12, color: "#8b92ab", fontFamily: "'DM Mono', monospace", mt: 0.25 },
  vehicleIdText:      { fontSize: 11, color: "#4f8fff", fontFamily: "'DM Mono', monospace" },
  emptyMsg:           { color: "#5c6278", fontSize: 13 },
  statusChip:         (sc) => ({ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, fontSize: 11, fontWeight: 500, height: 22, borderRadius: "5px", fontFamily: "'DM Sans', sans-serif" }),

  // Fields
  fieldLabel:       { fontSize: 11, fontWeight: 600, color: "#5c6278", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 },
  fieldValue:       _fieldValue,
  fieldValueAccent: { ..._fieldValue, color: "#4f8fff" },

  // Vehicle form
  vehicleFormGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2, mt: 1 },
  spanTwo:         { gridColumn: "span 2" },

  // Inputs
  textField: {
    "& .MuiOutlinedInput-root": {
      color: "#e8eaf2", fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "#1e2130",
      "& fieldset": { borderColor: "#2a2f42" },
      "&:hover fieldset": { borderColor: "#343a50" },
      "&.Mui-focused fieldset": { borderColor: "#4f8fff" },
    },
  },
  selectField: {
    color: "#e8eaf2", fontSize: 13, fontFamily: "'DM Sans', sans-serif", background: "#1e2130",
    "& .MuiOutlinedInput-notchedOutline": { borderColor: "#2a2f42" },
    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#343a50" },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#4f8fff" },
    "& .MuiSvgIcon-root": { color: "#5c6278" },
  },
  menuProps: {
    PaperProps: {
      sx: {
        background: "#1e2130", border: "1px solid #2a2f42", borderRadius: "6px",
        "& .MuiMenuItem-root": { color: "#e8eaf2", fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
        "& .MuiMenuItem-root:hover": { background: "#252a3a" },
        "& .MuiMenuItem-root.Mui-selected": { background: "#252a3a", color: "#4f8fff" },
      },
    },
  },
  menuItem: { color: "#e8eaf2", fontSize: 13, fontFamily: "'DM Sans', sans-serif" },

  // Dialogs
  dialogPaper:    { background: "#161921", border: "1px solid #2a2f42", borderRadius: "10px" },
  dialogTitle:    { color: "#e8eaf2", fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 700, pb: 1 },
  dialogActions:  { p: 2, pt: 1, gap: 1 },
  dialogBodyText: { color: "#8b92ab", fontSize: 13, mt: 1, mb: 2 },
  dialogWarnText: { color: "#8b92ab", fontSize: 14, mt: 1 },
  strongText:     { color: "#e8eaf2" },

  // Buttons
  editBtn:    { color: "#4f8fff", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", border: "1px solid rgba(79,143,255,0.3)", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "rgba(79,143,255,0.1)", borderColor: "#4f8fff" } },
  outlineBtn: { color: "#8b92ab", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", border: "1px solid #2a2f42", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "#1e2130", borderColor: "#343a50" }, "&.Mui-disabled": { color: "#3a3f52", borderColor: "#1e2130" } },
  saveBtn:    { color: "#0d0f14", background: "#4f8fff", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", borderRadius: "6px", px: 2, py: 0.5, fontWeight: 600, "&:hover": { background: "#6ba3ff" }, "&.Mui-disabled": { background: "#2a2f42", color: "#5c6278" } },
  cancelBtn:  { color: "#8b92ab", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "#1e2130" } },
  dangerBtn:  { color: "#f87171", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", border: "1px solid rgba(248,113,113,0.3)", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "rgba(248,113,113,0.1)", borderColor: "#f87171" } },
};
