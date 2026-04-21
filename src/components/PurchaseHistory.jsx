import { Box, Typography, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { sx } from "../styles/purchaseHistory.styles";

function TxnChip({ status }) {
  return <Chip label={status} size="small" sx={sx.txnChip(status === "Paid")} />;
}

export default function PurchaseHistory({ purchases }) {
  const totalPaid = purchases
    .filter(p => p.status === "Paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <Box>
      <Box sx={sx.sectionHeader}>
        <Typography sx={sx.sectionTitle}>Purchase History</Typography>
        <Typography sx={sx.txnSummary}>
          {purchases.length} transaction{purchases.length !== 1 ? "s" : ""} · Total paid:{" "}
          <span style={sx.txnTotalText}>${totalPaid.toFixed(2)}</span>
        </Typography>
      </Box>

      <TableContainer sx={sx.tableContainer}>
        <Table sx={sx.table}>
          <TableHead>
            <TableRow>
              {["Date", "Transaction ID", "Description", "Type", "Amount", "Status"].map(col => (
                <TableCell key={col} sx={sx.headCell}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {purchases.map(p => (
              <TableRow key={p.id} sx={sx.tableRow}>
                <TableCell sx={sx.monoCell}>{p.date}</TableCell>
                <TableCell sx={sx.monoCell}>{p.id}</TableCell>
                <TableCell sx={sx.tableCell}>{p.description}</TableCell>
                <TableCell sx={sx.tableCellMuted}>{p.type}</TableCell>
                <TableCell sx={sx.amountCell(p.status === "Paid")}>${p.amount}</TableCell>
                <TableCell sx={sx.tableCell}><TxnChip status={p.status} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
