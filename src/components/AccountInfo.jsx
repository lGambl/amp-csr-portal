import { useState } from "react";
import { Box, Typography, TextField, Select, MenuItem, Button, Divider } from "@mui/material";
import { sx } from "../styles/accountInfo.styles";

const ACCOUNT_STATUSES = ["Active", "Inactive", "Suspended"];

function InfoField({ label, editing, value, span, children }) {
  return (
    <Box sx={{ ...sx.fieldGroup, ...(span ? { gridColumn: `span ${span}` } : {}) }}>
      <Typography sx={sx.fieldLabel}>{label}</Typography>
      {editing ? children : <Typography sx={sx.fieldValue}>{value}</Typography>}
    </Box>
  );
}

function toForm(u) {
  return {
    firstName: u.firstName, lastName: u.lastName,
    email: u.email,        phone: u.phone,
    address: u.address,    city: u.city,
    state: u.state,        zip: u.zip,
    accountStatus: u.accountStatus,
  };
}

export default function AccountInfo({ user, onUpdateUser }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState(() => toForm(user));

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSave = () => { onUpdateUser({ ...user, ...form }); setEditing(false); };
  const handleCancel = () => { setForm(toForm(user)); setEditing(false); };

  return (
    <Box>
      <Box sx={sx.sectionHeader}>
        <Typography sx={sx.sectionTitle}>Account Information</Typography>
        <Box sx={sx.btnRow}>
          {editing ? (
            <>
              <Button onClick={handleCancel} sx={sx.cancelBtn}>Cancel</Button>
              <Button onClick={handleSave} sx={sx.saveBtn}>Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setEditing(true)} sx={sx.editBtn}>Edit</Button>
          )}
        </Box>
      </Box>

      <Box sx={sx.fieldGrid}>
        <InfoField label="First Name" editing={editing} value={user.firstName}>
          <TextField value={form.firstName} onChange={set("firstName")} size="small" sx={sx.textField} fullWidth />
        </InfoField>
        <InfoField label="Last Name" editing={editing} value={user.lastName}>
          <TextField value={form.lastName} onChange={set("lastName")} size="small" sx={sx.textField} fullWidth />
        </InfoField>
        <InfoField label="Account Status" editing={editing} value={user.accountStatus}>
          <Select value={form.accountStatus} onChange={set("accountStatus")} size="small" fullWidth sx={sx.selectField} MenuProps={sx.menuProps}>
            {ACCOUNT_STATUSES.map(s => <MenuItem key={s} value={s} sx={sx.menuItem}>{s}</MenuItem>)}
          </Select>
        </InfoField>
        <InfoField label="Email" editing={editing} value={user.email}>
          <TextField value={form.email} onChange={set("email")} size="small" sx={sx.textField} fullWidth />
        </InfoField>
        <InfoField label="Phone" editing={editing} value={user.phone}>
          <TextField value={form.phone} onChange={set("phone")} size="small" sx={sx.textField} fullWidth />
        </InfoField>
        <Box sx={sx.fieldGroup}>
          <Typography sx={sx.fieldLabel}>Member Since</Typography>
          <Typography sx={sx.fieldValue}>{user.joinDate}</Typography>
        </Box>
      </Box>

      <Divider sx={sx.divider} />
      <Typography sx={sx.sectionSubtitle}>Address</Typography>

      <Box sx={sx.fieldGrid}>
        <InfoField label="Street Address" editing={editing} value={user.address} span={3}>
          <TextField value={form.address} onChange={set("address")} size="small" sx={sx.textField} fullWidth />
        </InfoField>
        <InfoField label="City" editing={editing} value={user.city}>
          <TextField value={form.city} onChange={set("city")} size="small" sx={sx.textField} fullWidth />
        </InfoField>
        <InfoField label="State" editing={editing} value={user.state}>
          <TextField value={form.state} onChange={set("state")} size="small" sx={sx.textField} fullWidth />
        </InfoField>
        <InfoField label="ZIP Code" editing={editing} value={user.zip}>
          <TextField value={form.zip} onChange={set("zip")} size="small" sx={sx.textField} fullWidth />
        </InfoField>
      </Box>
    </Box>
  );
}
