import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomRow from '../../components/TableRow';
import { getAccounts } from '../../api'

export default function CollapsibleTable() {
  const [rows, setRows] = React.useState([])
  const [headers, setHeaders] = React.useState([])
  React.useEffect(() => {
    const accountsData = getAccounts()
    setRows(accountsData.rows)
    setHeaders(accountsData.headers)
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {headers.map((row, index) => (
              <TableCell key={index}>
                {row}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <CustomRow key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}