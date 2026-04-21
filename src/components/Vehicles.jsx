import { useState } from "react";
import {
    Box,
    Typography,
    Chip,
    Button,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import { WASH_PLANS_PRICING, STATUS, MAKES, MODELS, COLORS } from "../data/mockData";
import { STATUS_COLORS } from "../styles/userList.styles";
import { sx } from "../styles/vehicles.styles";
import { useToast } from "../context/ToastContext";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2009 }, (_, i) => String(2010 + i));
const WASH_PLANS = WASH_PLANS_PRICING.map((p) => p.name);
const PLAN_PRICES = Object.fromEntries(WASH_PLANS_PRICING.map((p) => [p.name, p.price]));
const STATUSES = STATUS.map((s) => s.name);

const EMPTY_VEHICLE_FORM = { year: "2022", make: "Toyota", model: "Camry", color: "White", plate: "" };
const EMPTY_SUB_FORM = { plan: "Basic", status: "Active" };

function daysFromNow(days) {
    return new Date(Date.now() + days * 24 * 3600 * 1000).toISOString().split("T")[0];
}

function VehicleForm({ form, setForm }) {
    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
    const onMakeChange = (e) =>
        setForm((f) => ({ ...f, make: e.target.value, model: MODELS[e.target.value][0] }));

    return (
        <Box sx={sx.vehicleFormGrid}>
            <Box>
                <Typography sx={sx.fieldLabel}>Year</Typography>
                <Select value={form.year} onChange={set("year")} size="small" fullWidth sx={sx.selectField} MenuProps={sx.menuProps}>
                    {YEARS.map((y) => <MenuItem key={y} value={y} sx={sx.menuItem}>{y}</MenuItem>)}
                </Select>
            </Box>
            <Box>
                <Typography sx={sx.fieldLabel}>Make</Typography>
                <Select value={form.make} onChange={onMakeChange} size="small" fullWidth sx={sx.selectField} MenuProps={sx.menuProps}>
                    {MAKES.map((m) => <MenuItem key={m} value={m} sx={sx.menuItem}>{m}</MenuItem>)}
                </Select>
            </Box>
            <Box>
                <Typography sx={sx.fieldLabel}>Model</Typography>
                <Select value={form.model} onChange={set("model")} size="small" fullWidth sx={sx.selectField} MenuProps={sx.menuProps}>
                    {(MODELS[form.make] || []).map((m) => <MenuItem key={m} value={m} sx={sx.menuItem}>{m}</MenuItem>)}
                </Select>
            </Box>
            <Box>
                <Typography sx={sx.fieldLabel}>Color</Typography>
                <Select value={form.color} onChange={set("color")} size="small" fullWidth sx={sx.selectField} MenuProps={sx.menuProps}>
                    {COLORS.map((c) => <MenuItem key={c} value={c} sx={sx.menuItem}>{c}</MenuItem>)}
                </Select>
            </Box>
            <Box sx={sx.spanTwo}>
                <Typography sx={sx.fieldLabel}>License Plate</Typography>
                <TextField value={form.plate} onChange={set("plate")} size="small" fullWidth sx={sx.textField} placeholder="e.g. CA ABC-1234" />
            </Box>
        </Box>
    );
}

function SubForm({ form, setForm }) {
    const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
    return (
        <Box sx={sx.subFormGrid}>
            <Box>
                <Typography sx={sx.fieldLabel}>Wash Plan</Typography>
                <Select value={form.plan} onChange={set("plan")} size="small" fullWidth sx={sx.selectField} MenuProps={sx.menuProps}>
                    {WASH_PLANS.map((p) => (
                        <MenuItem key={p} value={p} sx={sx.menuItem}>{p} — ${PLAN_PRICES[p]}/mo</MenuItem>
                    ))}
                </Select>
            </Box>
            <Box>
                <Typography sx={sx.fieldLabel}>Status</Typography>
                <Select value={form.status} onChange={set("status")} size="small" fullWidth sx={sx.selectField} MenuProps={sx.menuProps}>
                    {STATUSES.map((s) => <MenuItem key={s} value={s} sx={sx.menuItem}>{s}</MenuItem>)}
                </Select>
            </Box>
        </Box>
    );
}

function StatusChip({ status }) {
    const sc = STATUS_COLORS[status] ?? STATUS_COLORS.Inactive;
    return <Chip label={status} size="small" sx={sx.statusChip(sc)} />;
}

function VehicleCard({ vehicle, sub, onEditVehicle, onRemoveVehicle, onEditSub, onAddSub, onRemoveSub, onTransfer, canTransfer }) {
    return (
        <Box sx={sx.vehicleCard}>
            <Box sx={sx.vehicleCardHeader}>
                <Box>
                    <Typography sx={sx.vehicleTitle}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </Typography>
                    <Typography sx={sx.vehicleMeta}>
                        {vehicle.color} · {vehicle.plate}
                    </Typography>
                    <Typography sx={sx.vehicleIdText}>{vehicle.id}</Typography>
                </Box>
                <Box sx={sx.cardVehicleBtns}>
                    <Button size="small" onClick={onEditVehicle} sx={sx.editBtn}>Edit</Button>
                    <Button size="small" onClick={onRemoveVehicle} sx={sx.dangerBtn}>Remove</Button>
                </Box>
            </Box>

            <Divider sx={sx.vehicleDivider} />

            <Box sx={sx.subSection}>
                <Box sx={sx.subHeader}>
                    <Typography sx={sx.subLabel}>Subscription</Typography>
                    {sub && <StatusChip status={sub.status} />}
                </Box>

                {sub ? (
                    <>
                        <Box sx={sx.vehicleDetailsGrid}>
                            <Box>
                                <Typography sx={sx.fieldLabel}>Plan</Typography>
                                <Typography sx={sx.fieldValue}>{sub.plan}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={sx.fieldLabel}>Monthly</Typography>
                                <Typography sx={sx.fieldValueAccent}>${sub.planPrice}/mo</Typography>
                            </Box>
                            <Box>
                                <Typography sx={sx.fieldLabel}>Start Date</Typography>
                                <Typography sx={sx.fieldValue}>{sub.startDate}</Typography>
                            </Box>
                            <Box>
                                <Typography sx={sx.fieldLabel}>Next Billing</Typography>
                                <Typography sx={sx.fieldValue}>{sub.nextBillingDate ?? "—"}</Typography>
                            </Box>
                        </Box>
                        <Box sx={sx.vehicleActions}>
                            <Button size="small" onClick={onEditSub} sx={sx.editBtn}>Edit Plan</Button>
                            <Button size="small" onClick={onTransfer} disabled={!canTransfer} sx={sx.outlineBtn}>Transfer</Button>
                            <Button size="small" onClick={onRemoveSub} sx={sx.dangerBtn}>Remove Plan</Button>
                        </Box>
                    </>
                ) : (
                    <Box sx={sx.noSubRow}>
                        <Typography sx={sx.emptyMsg}>No active subscription</Typography>
                        <Button size="small" onClick={onAddSub} sx={sx.saveBtn}>+ Add Subscription</Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default function Vehicles({ user, onUpdateUser }) {
    const showToast = useToast();
    const [editVehicleForm, setEditVehicleForm] = useState(null);
    const [addVehicleOpen, setAddVehicleOpen]   = useState(false);
    const [newVehicleForm, setNewVehicleForm]   = useState({ ...EMPTY_VEHICLE_FORM });
    const [removeVehicleTarget, setRemoveVehicleTarget] = useState(null);

    const [editSubForm, setEditSubForm]       = useState(null);
    const [addSubVehicleId, setAddSubVehicleId] = useState(null);
    const [newSubForm, setNewSubForm]         = useState({ ...EMPTY_SUB_FORM });
    const [removeSubTarget, setRemoveSubTarget] = useState(null);

    const [transferSub, setTransferSub]         = useState(null);
    const [transferTargetId, setTransferTargetId] = useState("");

    const subForVehicle = (vehicleId) =>
        user.subscriptions.find((s) => s.vehicleId === vehicleId) ?? null;

    const vehiclesWithoutSub = user.vehicles.filter((v) => !subForVehicle(v.id));

    const update = (vehicles, subscriptions) =>
        onUpdateUser({ ...user, vehicles, subscriptions });

    const saveEditVehicle = () => {
        try {
            update(
                user.vehicles.map((v) =>
                    v.id === editVehicleForm.id
                        ? { ...editVehicleForm, plate: editVehicleForm.plate.trim() }
                        : v,
                ),
                user.subscriptions,
            );
            setEditVehicleForm(null);
            showToast("Vehicle updated");
        } catch {
            showToast("Failed to update vehicle", "error");
        }
    };

    const addVehicle = () => {
        try {
            const newV = {
                ...newVehicleForm,
                plate: newVehicleForm.plate.trim(),
                id: `V${String(Date.now()).slice(-4)}`,
            };
            update([...user.vehicles, newV], user.subscriptions);
            setAddVehicleOpen(false);
            setNewVehicleForm({ ...EMPTY_VEHICLE_FORM });
            showToast("Vehicle added");
        } catch {
            showToast("Failed to add vehicle", "error");
        }
    };

    const confirmRemoveVehicle = () => {
        try {
            const label = `${removeVehicleTarget.year} ${removeVehicleTarget.make} ${removeVehicleTarget.model}`;
            update(
                user.vehicles.filter((v) => v.id !== removeVehicleTarget.id),
                user.subscriptions.filter((s) => s.vehicleId !== removeVehicleTarget.id),
            );
            setRemoveVehicleTarget(null);
            showToast(`${label} removed`, "warning");
        } catch {
            showToast("Failed to remove vehicle", "error");
        }
    };

    const saveEditSub = () => {
        try {
            update(
                user.vehicles,
                user.subscriptions.map((s) =>
                    s.id === editSubForm.id
                        ? {
                              ...editSubForm,
                              planPrice: PLAN_PRICES[editSubForm.plan],
                              nextBillingDate:
                                  editSubForm.status === "Cancelled"
                                      ? null
                                      : editSubForm.nextBillingDate || daysFromNow(30),
                          }
                        : s,
                ),
            );
            setEditSubForm(null);
            showToast("Subscription updated");
        } catch {
            showToast("Failed to update subscription", "error");
        }
    };

    const addSub = () => {
        try {
            const newSub = {
                id: `SUB-${String(Date.now()).slice(-4)}`,
                vehicleId: addSubVehicleId,
                plan: newSubForm.plan,
                planPrice: PLAN_PRICES[newSubForm.plan],
                status: newSubForm.status,
                nextBillingDate: newSubForm.status === "Cancelled" ? null : daysFromNow(30),
                startDate: new Date().toISOString().split("T")[0],
            };
            update(user.vehicles, [...user.subscriptions, newSub]);
            setAddSubVehicleId(null);
            setNewSubForm({ ...EMPTY_SUB_FORM });
            showToast("Subscription added");
        } catch {
            showToast("Failed to add subscription", "error");
        }
    };

    const confirmRemoveSub = () => {
        try {
            const planName = removeSubTarget.plan;
            update(
                user.vehicles,
                user.subscriptions.filter((s) => s.id !== removeSubTarget.id),
            );
            setRemoveSubTarget(null);
            showToast(`${planName} subscription removed`, "warning");
        } catch {
            showToast("Failed to remove subscription", "error");
        }
    };

    const doTransfer = () => {
        try {
            update(
                user.vehicles,
                user.subscriptions.map((s) =>
                    s.id === transferSub.id ? { ...s, vehicleId: transferTargetId } : s,
                ),
            );
            setTransferSub(null);
            setTransferTargetId("");
            showToast("Subscription transferred");
        } catch {
            showToast("Failed to transfer subscription", "error");
        }
    };

    const transferTargetVehicle = transferTargetId
        ? user.vehicles.find((v) => v.id === transferTargetId)
        : null;

    return (
        <Box>
            <Box sx={sx.sectionHeader}>
                <Typography sx={sx.sectionTitle}>Vehicles & Subscriptions</Typography>
                <Button onClick={() => setAddVehicleOpen(true)} sx={sx.saveBtn}>
                    + Add Vehicle
                </Button>
            </Box>

            {user.vehicles.length === 0 && (
                <Typography sx={sx.emptyMsg}>No vehicles on this account.</Typography>
            )}

            <Box sx={sx.vehicleGrid}>
                {user.vehicles.map((v) => {
                    const sub = subForVehicle(v.id);
                    return (
                        <VehicleCard
                            key={v.id}
                            vehicle={v}
                            sub={sub}
                            canTransfer={vehiclesWithoutSub.length > 0}
                            onEditVehicle={() => setEditVehicleForm({ ...v })}
                            onRemoveVehicle={() => setRemoveVehicleTarget(v)}
                            onEditSub={() => setEditSubForm({ ...sub })}
                            onAddSub={() => { setAddSubVehicleId(v.id); setNewSubForm({ ...EMPTY_SUB_FORM }); }}
                            onRemoveSub={() => setRemoveSubTarget(sub)}
                            onTransfer={() => { setTransferSub(sub); setTransferTargetId(""); }}
                        />
                    );
                })}
            </Box>

            {/* Edit Vehicle */}
            <Dialog open={!!editVehicleForm} onClose={() => setEditVehicleForm(null)} maxWidth="xs" fullWidth paperprops={{ sx: sx.dialogPaper }}>
                <DialogTitle sx={sx.dialogTitle}>Edit Vehicle</DialogTitle>
                <DialogContent>
                    {editVehicleForm && <VehicleForm form={editVehicleForm} setForm={setEditVehicleForm} />}
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button onClick={() => setEditVehicleForm(null)} sx={sx.cancelBtn}>Cancel</Button>
                    <Button onClick={saveEditVehicle} disabled={!(editVehicleForm?.plate || "").trim()} sx={sx.saveBtn}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Add Vehicle */}
            <Dialog open={addVehicleOpen} onClose={() => setAddVehicleOpen(false)} maxWidth="xs" fullWidth paperprops={{ sx: sx.dialogPaper }}>
                <DialogTitle sx={sx.dialogTitle}>Add Vehicle</DialogTitle>
                <DialogContent>
                    <VehicleForm form={newVehicleForm} setForm={setNewVehicleForm} />
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button onClick={() => setAddVehicleOpen(false)} sx={sx.cancelBtn}>Cancel</Button>
                    <Button onClick={addVehicle} disabled={!newVehicleForm.plate.trim()} sx={sx.saveBtn}>Add Vehicle</Button>
                </DialogActions>
            </Dialog>

            {/* Remove Vehicle */}
            <Dialog open={!!removeVehicleTarget} onClose={() => setRemoveVehicleTarget(null)} maxWidth="xs" fullWidth paperprops={{ sx: sx.dialogPaper }}>
                <DialogTitle sx={sx.dialogTitle}>Remove Vehicle</DialogTitle>
                <DialogContent>
                    <Typography sx={sx.dialogWarnText}>
                        Remove the{" "}
                        <Box component="span" sx={sx.strongText}>
                            {removeVehicleTarget?.year} {removeVehicleTarget?.make} {removeVehicleTarget?.model}
                        </Box>{" "}
                        ({removeVehicleTarget?.plate})?{" "}
                        {subForVehicle(removeVehicleTarget?.id ?? "") && "Its subscription will also be removed. "}
                        This cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button onClick={() => setRemoveVehicleTarget(null)} sx={sx.cancelBtn}>Cancel</Button>
                    <Button onClick={confirmRemoveVehicle} sx={sx.dangerBtn}>Remove Vehicle</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Subscription */}
            <Dialog open={!!editSubForm} onClose={() => setEditSubForm(null)} maxWidth="xs" fullWidth paperprops={{ sx: sx.dialogPaper }}>
                <DialogTitle sx={sx.dialogTitle}>Edit Subscription</DialogTitle>
                <DialogContent>
                    {editSubForm && <SubForm form={editSubForm} setForm={setEditSubForm} />}
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button onClick={() => setEditSubForm(null)} sx={sx.cancelBtn}>Cancel</Button>
                    <Button onClick={saveEditSub} sx={sx.saveBtn}>Save</Button>
                </DialogActions>
            </Dialog>

            {/* Add Subscription */}
            <Dialog open={!!addSubVehicleId} onClose={() => setAddSubVehicleId(null)} maxWidth="xs" fullWidth paperprops={{ sx: sx.dialogPaper }}>
                <DialogTitle sx={sx.dialogTitle}>Add Subscription</DialogTitle>
                <DialogContent>
                    <SubForm form={newSubForm} setForm={setNewSubForm} />
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button onClick={() => setAddSubVehicleId(null)} sx={sx.cancelBtn}>Cancel</Button>
                    <Button onClick={addSub} sx={sx.saveBtn}>Add Subscription</Button>
                </DialogActions>
            </Dialog>

            {/* Remove Subscription */}
            <Dialog open={!!removeSubTarget} onClose={() => setRemoveSubTarget(null)} maxWidth="xs" fullWidth paperprops={{ sx: sx.dialogPaper }}>
                <DialogTitle sx={sx.dialogTitle}>Remove Subscription</DialogTitle>
                <DialogContent>
                    <Typography sx={sx.dialogWarnText}>
                        Remove the{" "}
                        <Box component="span" sx={sx.strongText}>{removeSubTarget?.plan}</Box>{" "}
                        subscription? The vehicle will have no active plan. This cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button onClick={() => setRemoveSubTarget(null)} sx={sx.cancelBtn}>Cancel</Button>
                    <Button onClick={confirmRemoveSub} sx={sx.dangerBtn}>Remove Plan</Button>
                </DialogActions>
            </Dialog>

            {/* Transfer Subscription */}
            <Dialog open={!!transferSub} onClose={() => setTransferSub(null)} maxWidth="xs" fullWidth PaperProps={{ sx: sx.dialogPaper }}>
                <DialogTitle sx={sx.dialogTitle}>Transfer Subscription</DialogTitle>
                <DialogContent>
                    <Typography sx={sx.dialogBodyText}>
                        Move the{" "}
                        <Box component="span" sx={sx.strongText}>{transferSub?.plan}</Box>{" "}
                        plan to:
                    </Typography>
                    <Select
                        value={transferTargetId}
                        onChange={(e) => setTransferTargetId(e.target.value)}
                        displayEmpty
                        size="small"
                        fullWidth
                        sx={sx.selectField}
                        MenuProps={sx.menuProps}
                    >
                        <MenuItem value="" disabled sx={sx.menuItem}>Select a vehicle...</MenuItem>
                        {vehiclesWithoutSub.map((v) => (
                            <MenuItem key={v.id} value={v.id} sx={sx.menuItem}>
                                {v.year} {v.make} {v.model} — {v.plate}
                            </MenuItem>
                        ))}
                    </Select>
                    {transferTargetVehicle && (
                        <Typography sx={{ ...sx.dialogBodyText, mt: 1.5, mb: 0 }}>
                            The source vehicle will have no subscription after transfer.
                        </Typography>
                    )}
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button onClick={() => setTransferSub(null)} sx={sx.cancelBtn}>Cancel</Button>
                    <Button onClick={doTransfer} disabled={!transferTargetId} sx={sx.saveBtn}>Transfer</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
