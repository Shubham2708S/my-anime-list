/* eslint-disable react/prop-types */
import React from 'react';

import TablePagination from '@mui/material/TablePagination';

const Pagination = ({
    page,setPage,rowsPerPage,setRowsPerPage,totalElements
}) => {

  const handleChangePage = (_, newPage) => {
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

export default Pagination
