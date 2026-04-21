import { useState } from "react";
import { Box, Typography, TextField, Select, MenuItem, Button, Divider, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { sx } from "../styles/accountInfo.styles";
import { ACCOUNT_STATUSES } from "../data/mockData";
import { useToast } from "../context/ToastContext";

function InfoField({ label, editing, value, span, children }) {
  return (
    <Box sx={{ ...sx.fieldGroup, ...(span ? { gridColumn: { xs: "span 1", md: `span ${span}` } } : {}) }}>
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

function cardLabel(payment) {
  return `${payment.cardType} ···· ${payment.last4}`;
}

export default function AccountInfo({ user, onUpdateUser }) {
  const showToast = useToast();
  const [editing, setEditing] = useState(false);
  const [form, setForm]       = useState(() => toForm(user));
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    try {
      onUpdateUser({ ...user, ...form });
      setEditing(false);
      showToast("Account info saved");
    } catch {
      showToast("Failed to save account info", "error");
    }
  };
  const handleCancel = () => { setForm(toForm(user)); setEditing(false); };

  const handleSendPaymentLink = () => {
    try {
      setPaymentDialogOpen(false);
      showToast(`Payment update link sent to ${user.email}`);
    } catch {
      showToast("Failed to send payment link", "error");
    }
  };

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

      <Divider sx={sx.divider} />
      <Box sx={sx.sectionHeader}>
        <Typography sx={sx.sectionSubtitle} style={{ marginBottom: 0 }}>Payment Method</Typography>
        <Button onClick={() => setPaymentDialogOpen(true)} sx={sx.editBtn}>Update Payment Method</Button>
      </Box>

      <Box sx={{ ...sx.fieldGrid, mt: 2 }}>
        <Box sx={sx.fieldGroup}>
          <Typography sx={sx.fieldLabel}>Card</Typography>
          <Typography sx={sx.fieldValue}>{cardLabel(user.payment)}</Typography>
        </Box>
        <Box sx={sx.fieldGroup}>
          <Typography sx={sx.fieldLabel}>Expiry</Typography>
          <Typography sx={sx.fieldValue}>{user.payment.expMonth}/{user.payment.expYear}</Typography>
        </Box>
      </Box>

      <Dialog open={paymentDialogOpen} onClose={() => setPaymentDialogOpen(false)} PaperProps={{ sx: sx.dialogPaper }}>
        <DialogTitle sx={sx.dialogTitle}>Update Payment Method</DialogTitle>
        <DialogContent sx={sx.dialogContent}>
          <Typography sx={sx.dialogBody}>
            To securely update the payment method on file, a link will be sent to the customer at:
          </Typography>
          <Typography sx={sx.dialogEmail}>{user.email}</Typography>
          <Typography sx={sx.dialogBody} style={{ marginTop: 8 }}>
            The link expires in 24 hours and will allow the customer to enter new card details.
          </Typography>
        </DialogContent>
        <DialogActions sx={sx.dialogActions}>
          <Button onClick={() => setPaymentDialogOpen(false)} sx={sx.cancelBtn}>Cancel</Button>
          <Button onClick={handleSendPaymentLink} sx={sx.saveBtn}>Send Link</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
