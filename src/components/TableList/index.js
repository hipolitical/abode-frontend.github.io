import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CustomRow from '../TableRow';

export default function CollapsibleTable(props) {
  const { rows, headers, type, openEdit } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            {headers && headers.map((row, index) => (
              <TableCell
                key={index}
                style={{ whiteSpace: 'nowrap' }}
              >
                {row.label}
              </TableCell>
            ))}
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row, index) => (
            <CustomRow
              key={index}
              row={row}
              headers={headers}
              type={type}
              {
                ...type === 'editing' && {
                  onEdit: () => openEdit(row)
                }
              }
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}