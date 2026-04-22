import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Select,
    MenuItem,
} from "@mui/material";
import {
    WASH_PLANS_PRICING,
    STATUS,
    MAKES,
    MODELS,
    COLORS,
} from "../data/mockData";
import { useToast } from "../hooks/useToast";
import styles from "../styles/Vehicles.module.css";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2009 }, (_, i) =>
    String(2010 + i),
);
const WASH_PLANS = WASH_PLANS_PRICING.map((p) => p.name);
const PLAN_PRICES = Object.fromEntries(
    WASH_PLANS_PRICING.map((p) => [p.name, p.price]),
);
const STATUSES = STATUS.map((s) => s.name);

const EMPTY_VEHICLE_FORM = {
    year: "2022",
    make: "Toyota",
    model: "Camry",
    color: "White",
    plate: "",
};
const EMPTY_SUB_FORM = { plan: "Basic", status: "Active" };

function daysFromNow(days) {
    return new Date(Date.now() + days * 24 * 3600 * 1000)
        .toISOString()
        .split("T")[0];
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
        <div className={styles.vehicleFormGrid}>
            <div>
                <p className="field-label">Year</p>
                <Select
                    value={form.year}
                    onChange={set("year")}
                    size="small"
                    fullWidth
                >
                    {YEARS.map((y) => (
                        <MenuItem key={y} value={y}>
                            {y}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div>
                <p className="field-label">Make</p>
                <Select
                    value={form.make}
                    onChange={onMakeChange}
                    size="small"
                    fullWidth
                >
                    {MAKES.map((m) => (
                        <MenuItem key={m} value={m}>
                            {m}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div>
                <p className="field-label">Model</p>
                <Select
                    value={form.model}
                    onChange={set("model")}
                    size="small"
                    fullWidth
                >
                    {(MODELS[form.make] || []).map((m) => (
                        <MenuItem key={m} value={m}>
                            {m}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div>
                <p className="field-label">Color</p>
                <Select
                    value={form.color}
                    onChange={set("color")}
                    size="small"
                    fullWidth
                >
                    {COLORS.map((c) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div className={styles.spanTwo}>
                <p className="field-label">License Plate</p>
                <TextField
                    value={form.plate}
                    onChange={set("plate")}
                    size="small"
                    fullWidth
                    placeholder="e.g. CA ABC-1234"
                />
            </div>
        </div>
    );
}

function SubForm({ form, setForm }) {
    const set = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));
    return (
        <div className={styles.subFormGrid}>
            <div>
                <p className="field-label">Wash Plan</p>
                <Select
                    value={form.plan}
                    onChange={set("plan")}
                    size="small"
                    fullWidth
                >
                    {WASH_PLANS.map((p) => (
                        <MenuItem key={p} value={p}>
                            {p} — ${PLAN_PRICES[p]}/mo
                        </MenuItem>
                    ))}
                </Select>
            </div>
            <div>
                <p className="field-label">Status</p>
                <Select
                    value={form.status}
                    onChange={set("status")}
                    size="small"
                    fullWidth
                >
                    {STATUSES.map((s) => (
                        <MenuItem key={s} value={s}>
                            {s}
                        </MenuItem>
                    ))}
                </Select>
            </div>
        </div>
    );
}

function VehicleCard({
    vehicle,
    sub,
    onEditVehicle,
    onRemoveVehicle,
    onEditSub,
    onAddSub,
    onRemoveSub,
    onTransfer,
    canTransfer,
}) {
    return (
        <div className={styles.vehicleCard}>
            <div className={styles.vehicleCardHeader}>
                <div>
                    <p className={styles.vehicleTitle}>
                        {vehicle.year} {vehicle.make} {vehicle.model}
                    </p>
                    <p className={styles.vehicleMeta}>
                        {vehicle.color} · {vehicle.plate}
                    </p>
                    <p className={styles.vehicleId}>{vehicle.id}</p>
                </div>
                <div className={styles.cardBtns}>
                    <button
                        onClick={onEditVehicle}
                        className="csr-btn csr-btn-edit"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onRemoveVehicle}
                        className="csr-btn csr-btn-danger"
                    >
                        Remove
                    </button>
                </div>
            </div>

            <hr className={styles.vehicleDivider} />

            <div className={styles.subSection}>
                <div className={styles.subHeader}>
                    <p className={styles.subLabel}>Subscription</p>
                    {sub && (
                        <span className="status-chip" data-status={sub.status}>
                            {sub.status}
                        </span>
                    )}
                </div>

                {sub ? (
                    <>
                        <div className={styles.vehicleDetailsGrid}>
                            <div>
                                <p className="field-label">Plan</p>
                                <p className="field-value">{sub.plan}</p>
                            </div>
                            <div>
                                <p className="field-label">Monthly</p>
                                <p className="field-value-accent">
                                    ${sub.planPrice}/mo
                                </p>
                            </div>
                            <div>
                                <p className="field-label">Start Date</p>
                                <p className="field-value">{sub.startDate}</p>
                            </div>
                            <div>
                                <p className="field-label">Next Billing</p>
                                <p className="field-value">
                                    {sub.nextBillingDate ?? "—"}
                                </p>
                            </div>
                        </div>
                        <div className={styles.vehicleActions}>
                            <button
                                onClick={onEditSub}
                                className="csr-btn csr-btn-edit"
                            >
                                Edit Plan
                            </button>
                            <button
                                onClick={onTransfer}
                                disabled={!canTransfer}
                                className="csr-btn csr-btn-outline"
                            >
                                Transfer
                            </button>
                            <button
                                onClick={onRemoveSub}
                                className="csr-btn csr-btn-danger"
                            >
                                Remove Plan
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={styles.noSubRow}>
                        <p className={styles.emptyMsg}>
                            No active subscription
                        </p>
                        <button
                            onClick={onAddSub}
                            className="csr-btn csr-btn-save"
                        >
                            + Add Subscription
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function Vehicles({ user, onUpdateUser }) {
    const showToast = useToast();
    const [search, setSearch] = useState("");

    const [editVehicleForm, setEditVehicleForm] = useState(null);
    const [addVehicleOpen, setAddVehicleOpen] = useState(false);
    const [newVehicleForm, setNewVehicleForm] = useState({
        ...EMPTY_VEHICLE_FORM,
    });
    const [removeVehicleTarget, setRemoveVehicleTarget] = useState(null);

    const [editSubForm, setEditSubForm] = useState(null);
    const [addSubVehicleId, setAddSubVehicleId] = useState(null);
    const [newSubForm, setNewSubForm] = useState({ ...EMPTY_SUB_FORM });
    const [removeSubTarget, setRemoveSubTarget] = useState(null);

    const [transferSub, setTransferSub] = useState(null);
    const [transferTargetId, setTransferTargetId] = useState("");

    const subForVehicle = (vehicleId) =>
        user.subscriptions.find((s) => s.vehicleId === vehicleId) ?? null;
    const vehiclesWithoutSub = user.vehicles.filter(
        (v) => !subForVehicle(v.id),
    );

    const filteredVehicles = search.trim()
        ? user.vehicles.filter((v) => {
              const q = search.toLowerCase();
              const sub = subForVehicle(v.id);
              return [
                  v.year,
                  v.make,
                  v.model,
                  v.color,
                  v.plate,
                  v.id,
                  sub?.plan,
                  sub?.status,
              ].some((t) =>
                  String(t ?? "")
                      .toLowerCase()
                      .includes(q),
              );
          })
        : user.vehicles;

    const update = (vehicles, subscriptions) =>
        onUpdateUser({ ...user, vehicles, subscriptions });

    const saveEditVehicle = () => {
        try {
            update(
                user.vehicles.map((v) =>
                    v.id === editVehicleForm.id
                        ? {
                              ...editVehicleForm,
                              plate: editVehicleForm.plate.trim(),
                          }
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
                user.subscriptions.filter(
                    (s) => s.vehicleId !== removeVehicleTarget.id,
                ),
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
                                      : editSubForm.nextBillingDate ||
                                        daysFromNow(30),
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
                nextBillingDate:
                    newSubForm.status === "Cancelled" ? null : daysFromNow(30),
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
                    s.id === transferSub.id
                        ? { ...s, vehicleId: transferTargetId }
                        : s,
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
        <div>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                    Vehicles & Subscriptions
                </h2>
                <button
                    onClick={() => setAddVehicleOpen(true)}
                    className="csr-btn csr-btn-save"
                >
                    + Add Vehicle
                </button>
            </div>

            <div className={styles.toolbar}>
                <div className={styles.searchWrap}>
                    <span className={styles.searchIcon}>⌕</span>
                    <input
                        className={styles.searchInput}
                        placeholder="Year, make, model, plate, plan..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <span className={styles.resultCount}>
                    {filteredVehicles.length} of {user.vehicles.length}
                </span>
            </div>

            {user.vehicles.length === 0 && (
                <p className={styles.emptyMsg}>No vehicles on this account.</p>
            )}
            {user.vehicles.length > 0 && filteredVehicles.length === 0 && (
                <p className={styles.emptyMsg}>No vehicles match "{search}".</p>
            )}

            <div className={styles.vehicleGrid}>
                {filteredVehicles.map((v) => {
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
                            onAddSub={() => {
                                setAddSubVehicleId(v.id);
                                setNewSubForm({ ...EMPTY_SUB_FORM });
                            }}
                            onRemoveSub={() => setRemoveSubTarget(sub)}
                            onTransfer={() => {
                                setTransferSub(sub);
                                setTransferTargetId("");
                            }}
                        />
                    );
                })}
            </div>

            {/* Edit Vehicle */}
            <Dialog
                open={!!editVehicleForm}
                onClose={() => setEditVehicleForm(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Edit Vehicle</DialogTitle>
                <DialogContent>
                    {editVehicleForm && (
                        <VehicleForm
                            form={editVehicleForm}
                            setForm={setEditVehicleForm}
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setEditVehicleForm(null)}
                        className="csr-btn csr-btn-cancel"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveEditVehicle}
                        disabled={!(editVehicleForm?.plate || "").trim()}
                        className="csr-btn csr-btn-save"
                    >
                        Save
                    </button>
                </DialogActions>
            </Dialog>

            {/* Add Vehicle */}
            <Dialog
                open={addVehicleOpen}
                onClose={() => setAddVehicleOpen(false)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Add Vehicle</DialogTitle>
                <DialogContent>
                    <VehicleForm
                        form={newVehicleForm}
                        setForm={setNewVehicleForm}
                    />
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setAddVehicleOpen(false)}
                        className="csr-btn csr-btn-cancel"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={addVehicle}
                        disabled={!newVehicleForm.plate.trim()}
                        className="csr-btn csr-btn-save"
                    >
                        Add Vehicle
                    </button>
                </DialogActions>
            </Dialog>

            {/* Remove Vehicle */}
            <Dialog
                open={!!removeVehicleTarget}
                onClose={() => setRemoveVehicleTarget(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Remove Vehicle</DialogTitle>
                <DialogContent>
                    <p className={styles.dialogWarnText}>
                        Remove the{" "}
                        <strong className={styles.strong}>
                            {removeVehicleTarget?.year}{" "}
                            {removeVehicleTarget?.make}{" "}
                            {removeVehicleTarget?.model}
                        </strong>{" "}
                        ({removeVehicleTarget?.plate})?{" "}
                        {subForVehicle(removeVehicleTarget?.id ?? "") &&
                            "Its subscription will also be removed. "}
                        This cannot be undone.
                    </p>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setRemoveVehicleTarget(null)}
                        className="csr-btn csr-btn-cancel"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmRemoveVehicle}
                        className="csr-btn csr-btn-danger"
                    >
                        Remove Vehicle
                    </button>
                </DialogActions>
            </Dialog>

            {/* Edit Subscription */}
            <Dialog
                open={!!editSubForm}
                onClose={() => setEditSubForm(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Edit Subscription</DialogTitle>
                <DialogContent>
                    {editSubForm && (
                        <SubForm form={editSubForm} setForm={setEditSubForm} />
                    )}
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setEditSubForm(null)}
                        className="csr-btn csr-btn-cancel"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={saveEditSub}
                        className="csr-btn csr-btn-save"
                    >
                        Save
                    </button>
                </DialogActions>
            </Dialog>

            {/* Add Subscription */}
            <Dialog
                open={!!addSubVehicleId}
                onClose={() => setAddSubVehicleId(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Add Subscription</DialogTitle>
                <DialogContent>
                    <SubForm form={newSubForm} setForm={setNewSubForm} />
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setAddSubVehicleId(null)}
                        className="csr-btn csr-btn-cancel"
                    >
                        Cancel
                    </button>
                    <button onClick={addSub} className="csr-btn csr-btn-save">
                        Add Subscription
                    </button>
                </DialogActions>
            </Dialog>

            {/* Remove Subscription */}
            <Dialog
                open={!!removeSubTarget}
                onClose={() => setRemoveSubTarget(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Remove Subscription</DialogTitle>
                <DialogContent>
                    <p className={styles.dialogWarnText}>
                        Remove the{" "}
                        <strong className={styles.strong}>
                            {removeSubTarget?.plan}
                        </strong>{" "}
                        subscription? The vehicle will have no active plan. This
                        cannot be undone.
                    </p>
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setRemoveSubTarget(null)}
                        className="csr-btn csr-btn-cancel"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirmRemoveSub}
                        className="csr-btn csr-btn-danger"
                    >
                        Remove Plan
                    </button>
                </DialogActions>
            </Dialog>

            {/* Transfer Subscription */}
            <Dialog
                open={!!transferSub}
                onClose={() => setTransferSub(null)}
                maxWidth="xs"
                fullWidth
            >
                <DialogTitle>Transfer Subscription</DialogTitle>
                <DialogContent>
                    <p className={styles.dialogBodyText}>
                        Move the{" "}
                        <strong className={styles.strong}>
                            {transferSub?.plan}
                        </strong>{" "}
                        plan to:
                    </p>
                    <Select
                        value={transferTargetId}
                        onChange={(e) => setTransferTargetId(e.target.value)}
                        displayEmpty
                        size="small"
                        fullWidth
                    >
                        <MenuItem value="" disabled>
                            Select a vehicle...
                        </MenuItem>
                        {vehiclesWithoutSub.map((v) => (
                            <MenuItem key={v.id} value={v.id}>
                                {v.year} {v.make} {v.model} — {v.plate}
                            </MenuItem>
                        ))}
                    </Select>
                    {transferTargetVehicle && (
                        <p className={styles.transferNote}>
                            The source vehicle will have no subscription after
                            transfer.
                        </p>
                    )}
                </DialogContent>
                <DialogActions>
                    <button
                        onClick={() => setTransferSub(null)}
                        className="csr-btn csr-btn-cancel"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={doTransfer}
                        disabled={!transferTargetId}
                        className="csr-btn csr-btn-save"
                    >
                        Transfer
                    </button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
