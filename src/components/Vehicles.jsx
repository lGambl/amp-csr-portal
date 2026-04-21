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
import { WASH_PLANS_PRICING, STATUS } from "../data/mockData";
import { STATUS_COLORS } from "../styles/userList.styles";
import { sx } from "../styles/vehicles.styles";
import { MAKES, MODELS, COLORS } from "../data/mockData";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2009 }, (_, i) => String(2010 + i));
const WASH_PLANS = WASH_PLANS_PRICING.map((p) => p.name);
const PLAN_PRICES = Object.fromEntries(
    WASH_PLANS_PRICING.map((p) => [p.name, p.price]),
);
const STATUSES = STATUS.map((s) => s.name);
const EMPTY_FORM = {
    year: "2022",
    make: "Toyota",
    model: "Camry",
    color: "White",
    plate: "",
    plan: "Basic",
    status: "Active",
};

function daysFromNow(days) {
    return new Date(Date.now() + days * 24 * 3600 * 1000)
        .toISOString()
        .split("T")[0];
}

function normalizeVehicle(vehicle) {
    return {
        ...vehicle,
        plate: (vehicle.plate || "").trim(),
        planPrice: PLAN_PRICES[vehicle.plan],
        nextBillingDate:
            vehicle.status === "Cancelled"
                ? null
                : vehicle.nextBillingDate || daysFromNow(30),
    };
}

function VehicleForm({ form, setForm }) {
    const set = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));
    const onMakeChange = (e) =>
        setForm((f) => ({
            ...f,
            make: e.target.value,
            model: MODELS[e.target.value][0],
        }));

    return (
        <Box sx={sx.vehicleFormGrid}>
            <Box>
                <Typography sx={sx.fieldLabel}>Year</Typography>
                <Select
                    value={form.year}
                    onChange={set("year")}
                    size="small"
                    fullWidth
                    sx={sx.selectField}
                    MenuProps={sx.menuProps}
                >
                    {YEARS.map((y) => (
                        <MenuItem key={y} value={y} sx={sx.menuItem}>
                            {y}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box>
                <Typography sx={sx.fieldLabel}>Make</Typography>
                <Select
                    value={form.make}
                    onChange={onMakeChange}
                    size="small"
                    fullWidth
                    sx={sx.selectField}
                    MenuProps={sx.menuProps}
                >
                    {MAKES.map((m) => (
                        <MenuItem key={m} value={m} sx={sx.menuItem}>
                            {m}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box>
                <Typography sx={sx.fieldLabel}>Model</Typography>
                <Select
                    value={form.model}
                    onChange={set("model")}
                    size="small"
                    fullWidth
                    sx={sx.selectField}
                    MenuProps={sx.menuProps}
                >
                    {(MODELS[form.make] || []).map((m) => (
                        <MenuItem key={m} value={m} sx={sx.menuItem}>
                            {m}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box>
                <Typography sx={sx.fieldLabel}>Color</Typography>
                <Select
                    value={form.color}
                    onChange={set("color")}
                    size="small"
                    fullWidth
                    sx={sx.selectField}
                    MenuProps={sx.menuProps}
                >
                    {COLORS.map((c) => (
                        <MenuItem key={c} value={c} sx={sx.menuItem}>
                            {c}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box sx={sx.spanTwo}>
                <Typography sx={sx.fieldLabel}>License Plate</Typography>
                <TextField
                    value={form.plate}
                    onChange={set("plate")}
                    size="small"
                    fullWidth
                    sx={sx.textField}
                    placeholder="e.g. CA ABC-1234"
                />
            </Box>
            <Box>
                <Typography sx={sx.fieldLabel}>Wash Plan</Typography>
                <Select
                    value={form.plan}
                    onChange={set("plan")}
                    size="small"
                    fullWidth
                    sx={sx.selectField}
                    MenuProps={sx.menuProps}
                >
                    {WASH_PLANS.map((p) => (
                        <MenuItem key={p} value={p} sx={sx.menuItem}>
                            {p} - ${PLAN_PRICES[p]}/mo
                        </MenuItem>
                    ))}
                </Select>
            </Box>
            <Box>
                <Typography sx={sx.fieldLabel}>Status</Typography>
                <Select
                    value={form.status}
                    onChange={set("status")}
                    size="small"
                    fullWidth
                    sx={sx.selectField}
                    MenuProps={sx.menuProps}
                >
                    {STATUSES.map((s) => (
                        <MenuItem key={s} value={s} sx={sx.menuItem}>
                            {s}
                        </MenuItem>
                    ))}
                </Select>
            </Box>
        </Box>
    );
}

function StatusChip({ status }) {
    const sc = STATUS_COLORS[status] ?? STATUS_COLORS.Inactive;
    return <Chip label={status} size="small" sx={sx.statusChip(sc)} />;
}

function VehicleCard({ vehicle, onEdit, onRemove, onTransfer, canTransfer }) {
    return (
        <Box sx={sx.vehicleCard}>
            <Box sx={sx.vehicleCardHeader}>
                <Box>
                    <Typography sx={sx.vehicleTitle}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </Typography>
                    <Typography sx={sx.vehicleMeta}>
                        {vehicle.color} | {vehicle.plate}
                    </Typography>
                </Box>
                <StatusChip status={vehicle.status} />
            </Box>

            <Divider sx={sx.vehicleDivider} />

            <Box sx={sx.vehicleDetailsGrid}>
                <Box>
                    <Typography sx={sx.fieldLabel}>Plan</Typography>
                    <Typography sx={sx.fieldValue}>{vehicle.plan}</Typography>
                </Box>
                <Box>
                    <Typography sx={sx.fieldLabel}>Monthly</Typography>
                    <Typography sx={sx.fieldValueAccent}>
                        ${vehicle.planPrice}/mo
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={sx.fieldLabel}>Start Date</Typography>
                    <Typography sx={sx.fieldValue}>
                        {vehicle.startDate}
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={sx.fieldLabel}>Next Billing</Typography>
                    <Typography sx={sx.fieldValue}>
                        {vehicle.nextBillingDate ?? "-"}
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={sx.fieldLabel}>Vehicle ID</Typography>
                    <Typography sx={sx.vehicleIdText}>{vehicle.id}</Typography>
                </Box>
            </Box>

            <Box sx={sx.vehicleActions}>
                <Button size="small" onClick={onEdit} sx={sx.editBtn}>
                    Edit
                </Button>
                <Button
                    size="small"
                    onClick={onTransfer}
                    disabled={!canTransfer}
                    sx={sx.outlineBtn}
                >
                    Transfer Plan
                </Button>
                <Button size="small" onClick={onRemove} sx={sx.dangerBtn}>
                    Remove
                </Button>
            </Box>
        </Box>
    );
}

export default function Vehicles({ user, onUpdateUser }) {
    const [editForm, setEditForm] = useState(null);
    const [addOpen, setAddOpen] = useState(false);
    const [newForm, setNewForm] = useState({ ...EMPTY_FORM });
    const [removeTarget, setRemoveTarget] = useState(null);
    const [transferSource, setTransferSource] = useState(null);
    const [transferTargetId, setTransferTargetId] = useState("");

    const updateVehicles = (vehicles) => onUpdateUser({ ...user, vehicles });

    const saveEdit = () => {
        updateVehicles(
            user.vehicles.map((v) =>
                v.id === editForm.id
                    ? normalizeVehicle(editForm)
                    : v,
            ),
        );
        setEditForm(null);
    };

    const confirmRemove = () => {
        updateVehicles(user.vehicles.filter((v) => v.id !== removeTarget.id));
        setRemoveTarget(null);
    };

    const addVehicle = () => {
        const newV = normalizeVehicle({
            ...newForm,
            plate: newForm.plate.trim(),
            id: `V${String(Date.now()).slice(-4)}`,
            startDate: new Date().toISOString().split("T")[0],
        });
        updateVehicles([...user.vehicles, newV]);
        setAddOpen(false);
        setNewForm({ ...EMPTY_FORM });
    };

    const doTransfer = () => {
        const nextBilling = daysFromNow(30);
        updateVehicles(
            user.vehicles.map((v) => {
                if (v.id === transferSource.id)
                    return { ...v, status: "Cancelled", nextBillingDate: null };
                if (v.id === transferTargetId)
                    return {
                        ...v,
                        plan: transferSource.plan,
                        planPrice: transferSource.planPrice,
                        status: "Active",
                        nextBillingDate: nextBilling,
                    };
                return v;
            }),
        );
        setTransferSource(null);
        setTransferTargetId("");
    };

    return (
        <Box>
            <Box sx={sx.sectionHeader}>
                <Typography sx={sx.sectionTitle}>
                    Vehicle Subscriptions
                </Typography>
                <Button onClick={() => setAddOpen(true)} sx={sx.saveBtn}>
                    + Add Vehicle
                </Button>
            </Box>

            {user.vehicles.length === 0 && (
                <Typography sx={sx.emptyMsg}>
                    No vehicles on this account.
                </Typography>
            )}

            <Box sx={sx.vehicleGrid}>
                {user.vehicles.map((v) => (
                    <VehicleCard
                        key={v.id}
                        vehicle={v}
                        canTransfer={user.vehicles.length > 1}
                        onEdit={() => setEditForm({ ...v })}
                        onRemove={() => setRemoveTarget(v)}
                        onTransfer={() => {
                            setTransferSource(v);
                            setTransferTargetId("");
                        }}
                    />
                ))}
            </Box>

            {/* Edit Vehicle */}
            <Dialog
                open={!!editForm}
                onClose={() => setEditForm(null)}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: sx.dialogPaper }}
            >
                <DialogTitle sx={sx.dialogTitle}>Edit Vehicle</DialogTitle>
                <DialogContent>
                    {editForm && (
                        <VehicleForm form={editForm} setForm={setEditForm} />
                    )}
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button onClick={() => setEditForm(null)} sx={sx.cancelBtn}>
                        Cancel
                    </Button>
                    <Button
                        onClick={saveEdit}
                        disabled={!(editForm?.plate || "").trim()}
                        sx={sx.saveBtn}
                    >
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Add Vehicle */}
            <Dialog
                open={addOpen}
                onClose={() => setAddOpen(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: sx.dialogPaper }}
            >
                <DialogTitle sx={sx.dialogTitle}>Add Vehicle</DialogTitle>
                <DialogContent>
                    <VehicleForm form={newForm} setForm={setNewForm} />
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button onClick={() => setAddOpen(false)} sx={sx.cancelBtn}>
                        Cancel
                    </Button>
                    <Button
                        onClick={addVehicle}
                        disabled={!newForm.plate.trim()}
                        sx={sx.saveBtn}
                    >
                        Add Vehicle
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Remove Confirmation */}
            <Dialog
                open={!!removeTarget}
                onClose={() => setRemoveTarget(null)}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: sx.dialogPaper }}
            >
                <DialogTitle sx={sx.dialogTitle}>Remove Vehicle</DialogTitle>
                <DialogContent>
                    <Typography sx={sx.dialogWarnText}>
                        Remove the {removeTarget?.year} {removeTarget?.make}{" "}
                        {removeTarget?.model} ({removeTarget?.plate}) and cancel
                        its {removeTarget?.plan} subscription? This cannot be
                        undone.
                    </Typography>
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button
                        onClick={() => setRemoveTarget(null)}
                        sx={sx.cancelBtn}
                    >
                        Cancel
                    </Button>
                    <Button onClick={confirmRemove} sx={sx.dangerBtn}>
                        Remove Vehicle
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Transfer Plan */}
            <Dialog
                open={!!transferSource}
                onClose={() => setTransferSource(null)}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: sx.dialogPaper }}
            >
                <DialogTitle sx={sx.dialogTitle}>Transfer Plan</DialogTitle>
                <DialogContent>
                    <Typography sx={sx.dialogBodyText}>
                        Move the{" "}
                        <strong style={sx.strongText}>
                            {transferSource?.plan}
                        </strong>{" "}
                        plan from{" "}
                        <strong style={sx.strongText}>
                            {transferSource?.plate}
                        </strong>{" "}
                        to:
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
                        <MenuItem value="" disabled sx={sx.menuItem}>
                            Select a vehicle...
                        </MenuItem>
                        {user.vehicles
                            .filter((v) => v.id !== transferSource?.id)
                            .map((v) => (
                                <MenuItem
                                    key={v.id}
                                    value={v.id}
                                    sx={sx.menuItem}
                                >
                                    {v.year} {v.make} {v.model} - {v.plate}
                                </MenuItem>
                            ))}
                    </Select>
                </DialogContent>
                <DialogActions sx={sx.dialogActions}>
                    <Button
                        onClick={() => setTransferSource(null)}
                        sx={sx.cancelBtn}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={doTransfer}
                        disabled={!transferTargetId}
                        sx={sx.saveBtn}
                    >
                        Transfer
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
