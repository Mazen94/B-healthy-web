import React, { Fragment } from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function HeadersTable({ headerData }) {
  return (
    <Fragment>
      <TableHead>
        <TableRow>
          {headerData.map((row, index) => (
            <TableCell align="left" key={index}>
              {row}
            </TableCell>
          ))}
          <TableCell align="left"></TableCell>
        </TableRow>
      </TableHead>
    </Fragment>
  );
}
