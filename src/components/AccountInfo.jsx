import { useState } from "react";
import {
    TextField,
    Select,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import styles from "../styles/AccountInfo.module.css";
import { ACCOUNT_STATUSES } from "../data/mockData";
import { useToast } from "../hooks/useToast";

function InfoField({ label, editing, value, span, children }) {
    return (
        <div
            className={`${styles.fieldGroup}${span ? ` ${styles.spanThree}` : ""}`}
        >
            <p className="field-label">{label}</p>
            {editing ? children : <p className="field-value">{value}</p>}
        </div>
    );
}

function toForm(u) {
    return {
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        phone: u.phone,
        address: u.address,
        city: u.city,
        state: u.state,
        zip: u.zip,
        accountStatus: u.accountStatus,
    };
}

function cardLabel(payment) {
    return `${payment.cardType} ···· ${payment.last4}`;
}

export default function AccountInfo({ user, onUpdateUser }) {
    const showToast = useToast();
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState(() => toForm(user));
    const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

    const set = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));

    const handleSave = () => {
        try {
            onUpdateUser({ ...user, ...form });
            setEditing(false);
            showToast("Account info saved");
        } catch {
            showToast("Failed to save account info", "error");
        }
    };

    const handleCancel = () => {
        setForm(toForm(user));
        setEditing(false);
    };

    const handleSendPaymentLink = () => {
        try {
            setPaymentDialogOpen(false);
            showToast(`Payment update link sent to ${user.email}`);
        } catch {
            showToast("Failed to send payment link", "error");
        }
    };

    return (
        <div>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Account Information</h2>
                <div className={styles.btnRow}>
                    {editing ? (
                        <>
                            <button
                                onClick={handleCancel}
                                className="csr-btn csr-btn-cancel"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="csr-btn csr-btn-save"
                            >
                                Save Changes
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setEditing(true)}
                            className="csr-btn csr-btn-edit"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>

            <div className={styles.fieldGrid}>
                <InfoField
                    label="First Name"
                    editing={editing}
                    value={user.firstName}
                >
                    <TextField
                        value={form.firstName}
                        onChange={set("firstName")}
                        size="small"
                        fullWidth
                    />
                </InfoField>
                <InfoField
                    label="Last Name"
                    editing={editing}
                    value={user.lastName}
                >
                    <TextField
                        value={form.lastName}
                        onChange={set("lastName")}
                        size="small"
                        fullWidth
                    />
                </InfoField>
                <InfoField
                    label="Account Status"
                    editing={editing}
                    value={user.accountStatus}
                >
                    <Select
                        value={form.accountStatus}
                        onChange={set("accountStatus")}
                        size="small"
                        fullWidth
                    >
                        {ACCOUNT_STATUSES.map((s) => (
                            <MenuItem key={s} value={s}>
                                {s}
                            </MenuItem>
                        ))}
                    </Select>
                </InfoField>
                <InfoField label="Email" editing={editing} value={user.email}>
                    <TextField
                        value={form.email}
                        onChange={set("email")}
                        size="small"
                        fullWidth
                    />
                </InfoField>
                <InfoField label="Phone" editing={editing} value={user.phone}>
                    <TextField
                        value={form.phone}
                        onChange={set("phone")}
                        size="small"
                        fullWidth
                    />
                </InfoField>
                <div className={styles.fieldGroup}>
                    <p className="field-label">Member Since</p>
                    <p className="field-value">{user.joinDate}</p>
                </div>
            </div>

            <hr className="csr-divider" />
            <p className={styles.sectionSubtitle}>Address</p>

            <div className={styles.fieldGrid}>
                <InfoField
                    label="Street Address"
                    editing={editing}
                    value={user.address}
                    span
                >
                    <TextField
                        value={form.address}
                        onChange={set("address")}
                        size="small"
                        fullWidth
                    />
                </InfoField>
                <InfoField label="City" editing={editing} value={user.city}>
                    <TextField
                        value={form.city}
                        onChange={set("city")}
                        size="small"
                        fullWidth
                    />
                </InfoField>
                <InfoField label="State" editing={editing} value={user.state}>
                    <TextField
                        value={form.state}
                        onChange={set("state")}
                        size="small"
                        fullWidth
                    />
                </InfoField>
                <InfoField label="ZIP Code" editing={editing} value={user.zip}>
                    <TextField
                        value={form.zip}
                        onChange={set("zip")}
                        size="small"
                        fullWidth
                    />
                </InfoField>
            </div>

            <hr className="csr-divider" />
            <div className={styles.paymentHeader}>
                <p className={styles.paymentSubtitle}>Payment Method</p>
                <button
                    onClick={() => setPaymentDialogOpen(true)}
                    className="csr-btn csr-btn-edit"
                >
                    Update Payment Method
                </button>
            </div>

            <div className={styles.paymentGrid}>
                <div className={styles.fieldGroup}>
                    <p className="field-label">Card</p>
                    <p className="field-value">{cardLabel(user.payment)}</p>
                </div>
                <div className={styles.fieldGroup}>
                    <p className="field-label">Expiry</p>
                    <p className="field-value">
                        {user.payment.expMonth}/{user.payment.expYear}
                    </p>
                </div>
            </div>

            <Dialog
                open={paymentDialogOpen}
                onClose={() => setPaymentDialogOpen(false)}
            >
                <DialogTitle>Update Payment Method</DialogTitle>
                <DialogContent>
                    <p className={styles.dialogBody}>
                        To securely update the payment method on file, a link
                        will be sent to the customer at:
                    </p>
                    <p className={styles.dialogEmail}>{user.email}</p>
                    <p className={styles.dialogBody} style={{ marginTop: 8 }}>
                        The link expires in 24 hours and will allow the customer
                        to enter new card details.
                    </p>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setPaymentDialogOpen(false)}
                        className="csr-btn csr-btn-cancel"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSendPaymentLink}
                        className="csr-btn csr-btn-save"
                    >
                        Send Link
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
