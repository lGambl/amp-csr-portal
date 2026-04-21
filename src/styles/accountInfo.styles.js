export const sx = {
  sectionHeader:   { display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 },
  sectionTitle:    { fontSize: 15, fontWeight: 600, color: "#e8eaf2", fontFamily: "'DM Sans', sans-serif" },
  sectionSubtitle: { fontSize: 11, fontWeight: 600, color: "#5c6278", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.08em", mb: 2 },
  divider:         { borderColor: "#2a2f42", my: 3 },
  btnRow:          { display: "flex", gap: 1 },
  fieldGrid:       { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2.5 },
  fieldGroup:      {},
  fieldLabel:      { fontSize: 11, fontWeight: 600, color: "#5c6278", fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase", letterSpacing: "0.06em", mb: 0.5 },
  fieldValue:      { fontSize: 13, color: "#e8eaf2", fontFamily: "'DM Sans', sans-serif" },
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
  menuItem:  { color: "#e8eaf2", fontSize: 13, fontFamily: "'DM Sans', sans-serif" },
  editBtn:   { color: "#4f8fff", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", border: "1px solid rgba(79,143,255,0.3)", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "rgba(79,143,255,0.1)", borderColor: "#4f8fff" } },
  saveBtn:   { color: "#0d0f14", background: "#4f8fff", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", borderRadius: "6px", px: 2, py: 0.5, fontWeight: 600, "&:hover": { background: "#6ba3ff" }, "&.Mui-disabled": { background: "#2a2f42", color: "#5c6278" } },
  cancelBtn: { color: "#8b92ab", fontSize: 12, fontFamily: "'DM Sans', sans-serif", textTransform: "none", borderRadius: "6px", px: 1.5, py: 0.5, "&:hover": { background: "#1e2130" } },
};
