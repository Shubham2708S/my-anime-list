/* eslint-disable react/prop-types */
import * as React from 'react';
import TablePagination from '@mui/material/TablePagination';

export default function Pagination({
    page,setPage,rowsPerPage,setRowsPerPage,totalElements
}) {

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TablePagination
      component="div"
      count={totalElements}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      rowsPerPageOptions={[20,40,60,80,100]}
    />
  );
}
