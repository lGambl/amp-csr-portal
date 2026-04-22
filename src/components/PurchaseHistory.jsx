import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import styles from "../styles/PurchaseHistory.module.css";

export default function PurchaseHistory({ purchases }) {
    const [search, setSearch] = useState("");

    const filtered = search.trim()
        ? purchases.filter((p) => {
              const q = search.toLowerCase();
              return [p.date, p.id, p.description, p.type, p.amount, p.status]
                  .some((v) => String(v ?? "").toLowerCase().includes(q));
          })
        : purchases;

    const totalPaid = filtered
        .filter((p) => p.status === "Paid")
        .reduce((sum, p) => sum + Number(p.amount), 0);

    return (
        <div>
            <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Purchase History</h2>
                <p className={styles.txnSummary}>
                    {filtered.length} transaction
                    {filtered.length !== 1 ? "s" : ""} | Total paid:{" "}
                    <span className={styles.txnTotal}>
                        ${totalPaid.toFixed(2)}
                    </span>
                </p>
            </div>

            <div className={styles.toolbar}>
                <div className={styles.searchWrap}>
                    <span className={styles.searchIcon}>⌕</span>
                    <input
                        className={styles.searchInput}
                        placeholder="Date, ID, description, type, amount..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <span className={styles.resultCount}>
                    {filtered.length} of {purchases.length}
                </span>
            </div>

            <TableContainer className={styles.tableContainer}>
                <Table style={{ minWidth: 760 }}>
                    <TableHead>
                        <TableRow>
                            {[
                                "Date",
                                "Transaction ID",
                                "Description",
                                "Type",
                                "Amount",
                                "Status",
                            ].map((col) => (
                                <TableCell key={col}>{col}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((p) => {
                            const paid = p.status === "Paid";
                            return (
                                <TableRow key={p.id}>
                                    <TableCell className={styles.cellMono}>
                                        {p.date}
                                    </TableCell>
                                    <TableCell className={styles.cellMono}>
                                        {p.id}
                                    </TableCell>
                                    <TableCell>{p.description}</TableCell>
                                    <TableCell className={styles.cellMuted}>
                                        {p.type}
                                    </TableCell>
                                    <TableCell
                                        className={
                                            paid
                                                ? styles.amountPaid
                                                : styles.amountFailed
                                        }
                                    >
                                        ${p.amount}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className="status-chip"
                                            data-status={p.status}
                                        >
                                            {p.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
