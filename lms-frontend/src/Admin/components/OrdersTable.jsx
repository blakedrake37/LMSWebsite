import React, { useEffect, useState } from 'react';
import { listBorrowDetails, updateBorrowDetail } from '../../services/BorrowDetailService';
import { getBook } from '../../services/BookService';
import { getAccount } from '../../services/AccountService';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Card, CardHeader } from "@mui/material";

const OrdersTable = () => {
  const [borrowDetails, setBorrowDetails] = useState([]);
  const [bookTitles, setBookTitles] = useState({});
  const [accountEmails, setAccountEmails] = useState({});

  const changeStatus = (borrowDetail) => {
    const updatedDetail = { ...borrowDetail, status: borrowDetail.status + 1 };
    updateBorrowDetail(borrowDetail.borrowDetailId, updatedDetail)
      .then(() => {
        setBorrowDetails(prevDetails => prevDetails.map(detail =>
          detail.borrowDetailId === borrowDetail.borrowDetailId ? updatedDetail : detail
        ));
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    getAllBorrowDetails();
  }, []);

  useEffect(() => {
    if (borrowDetails.length > 0) {
      borrowDetails.forEach(detail => {
        getBook(detail.bookItem.bookId).then(response => {
          setBookTitles(prev => ({
            ...prev,
            [detail.bookItem.bookId]: response.data.title
          }));
        });

        getAccount(detail.borrow.accountID).then(response => {
          setAccountEmails(prev => ({
            ...prev,
            [detail.borrow.accountID]: response.data.email
          }));
        });
      });
    }
  }, [borrowDetails]);

  const getAllBorrowDetails = () => {
    listBorrowDetails()
      .then((response) => {
        setBorrowDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="p-5">
      <Card className="mt-2 bt=[#1b1b1b]">
        <CardHeader title="All Orders"></CardHeader>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Book</TableCell>
                <TableCell align="right">Account</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {borrowDetails.map((row) => (
                <TableRow
                  key={row.borrowDetailId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.borrowDetailId}
                  </TableCell>
                  <TableCell align="right">
                    {bookTitles[row.bookItem.bookId] || 'Loading...'}
                  </TableCell>
                  <TableCell align="right">
                    {accountEmails[row.borrow.accountID] || 'Loading...'}
                  </TableCell>
                  <TableCell align="right">
                    {row.status === 1 && "Pending"}
                    {row.status === 2 && "Borrowed"}
                    {row.status === 3 && "Returned"}
                  </TableCell>
                  <TableCell align="right">
                    {row.status === 1 && (
                      <Button onClick={() => changeStatus(row)} variant="outlined">
                        Approve
                      </Button>
                    )}
                    {row.status === 2 && (
                      <Button onClick={() => changeStatus(row)} variant="outlined">
                        Return
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTable;
