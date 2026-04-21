import { useState, useMemo } from "react";
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TableRow, TablePagination, Chip, InputBase, Select, MenuItem,
  Typography,
} from "@mui/material";
import { STATUS_COLORS, STAT_CARDS, DROPDOWN_MENU_PROPS, sx } from "../styles/userList.styles";

export default function UserList({ users, onSelectUser }) {
  const [search, setSearch]             = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage]                 = useState(0);
  const [rowsPerPage, setRowsPerPage]   = useState(10);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return users.filter(u => {
      const matchSearch = !q || [u.firstName, u.lastName, u.email, u.phone, u.id, u.city]
        .some(f => f.toLowerCase().includes(q));
      const matchStatus = statusFilter === "All" || u.accountStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [users, search, statusFilter]);

  const stats     = useMemo(() => STAT_CARDS(users), [users]);
  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleSearch = (v) => { setSearch(v); setPage(0); };
  const handleFilter = (v) => { setStatusFilter(v); setPage(0); };

  return (
    <Box sx={sx.wrapper}>

      {/* Stat Cards */}
      <Box sx={sx.statGrid}>
        {stats.map(s => (
          <Box key={s.label} sx={sx.statCard(s.color)}>
            <Typography sx={sx.statNumber(s.color)}>{s.value}</Typography>
            <Typography sx={sx.statLabel}>{s.label}</Typography>
          </Box>
        ))}
      </Box>

      {/* Toolbar */}
      <Box sx={sx.toolbar}>
        <Box sx={sx.searchWrap}>
          <Typography sx={sx.searchIcon}>⌕</Typography>
          <InputBase
            placeholder="Search by name, email, phone, ID, or city…"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            sx={sx.searchInput}
          />
        </Box>
        <Select
          value={statusFilter}
          onChange={e => handleFilter(e.target.value)}
          size="small"
          MenuProps={DROPDOWN_MENU_PROPS}
          sx={sx.filterSelect}
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
          <MenuItem value="Suspended">Suspended</MenuItem>
        </Select>
        <Typography sx={sx.resultCount}>
          {filtered.length} customer{filtered.length !== 1 ? "s" : ""}
        </Typography>
      </Box>

      {/* Table */}
      <TableContainer sx={sx.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              {["ID", "Name", "Email", "Phone", "Status", "Vehicles", "Join Date", "Location"].map(col => (
                <TableCell key={col} sx={sx.headCell}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginated.map(u => {
              const sc = STATUS_COLORS[u.accountStatus] ?? STATUS_COLORS.Inactive;
              return (
                <TableRow key={u.id} onClick={() => onSelectUser?.(u)} sx={sx.tableRow}>
                  <TableCell sx={sx.cellId}>{u.id}</TableCell>
                  <TableCell sx={sx.cellDefault}>
                    <Typography sx={sx.nameText}>{u.firstName} {u.lastName}</Typography>
                  </TableCell>
                  <TableCell sx={sx.cellMuted}>{u.email}</TableCell>
                  <TableCell sx={sx.cellMono}>{u.phone}</TableCell>
                  <TableCell sx={sx.cellDefault}>
                    <Chip label={u.accountStatus} size="small" sx={sx.statusChip(sc)} />
                  </TableCell>
                  <TableCell sx={sx.cellCenter}>{u.vehicles.length}</TableCell>
                  <TableCell sx={sx.cellMono}>{u.joinDate}</TableCell>
                  <TableCell sx={sx.cellMuted}>{u.city}, {u.state}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={filtered.length}
        page={page}
        onPageChange={(_, p) => setPage(p)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => { setRowsPerPage(+e.target.value); setPage(0); }}
        rowsPerPageOptions={[10, 25, 50]}
        sx={sx.pagination}
      />
    </Box>
  );
}
