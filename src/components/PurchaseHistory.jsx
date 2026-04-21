import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import styles from "../styles/PurchaseHistory.module.css";

export default function PurchaseHistory({ purchases }) {
  const totalPaid = purchases
    .filter(p => p.status === "Paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>Purchase History</h2>
        <p className={styles.txnSummary}>
          {purchases.length} transaction{purchases.length !== 1 ? "s" : ""} | Total paid:{" "}
          <span className={styles.txnTotal}>${totalPaid.toFixed(2)}</span>
        </p>
      </div>

      <TableContainer className={styles.tableContainer}>
        <Table style={{ minWidth: 760 }}>
          <TableHead>
            <TableRow>
              {["Date", "Transaction ID", "Description", "Type", "Amount", "Status"].map(col => (
                <TableCell key={col}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map(p => {
              const paid = p.status === "Paid";
              return (
                <TableRow key={p.id}>
                  <TableCell className={styles.cellMono}>{p.date}</TableCell>
                  <TableCell className={styles.cellMono}>{p.id}</TableCell>
                  <TableCell>{p.description}</TableCell>
                  <TableCell className={styles.cellMuted}>{p.type}</TableCell>
                  <TableCell className={paid ? styles.amountPaid : styles.amountFailed}>
                    ${p.amount}
                  </TableCell>
                  <TableCell>
                    <span className="status-chip" data-status={p.status}>{p.status}</span>
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
