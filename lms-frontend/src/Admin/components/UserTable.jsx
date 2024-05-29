import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { listBooks } from "../../services/BookService";
import { Button, Card, CardHeader } from "@mui/material";
import { deleteAccount, getAccount, listAccounts, updateAccount } from "../../services/AccountService";


const UserTable = () => {
  const [accounts, setAccounts] = useState();
  useEffect(() => {
    getAllAccounts();
  });

  function getAllAccounts() {
    listAccounts()
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function disableAccount(id){
    console.log(id)

    deleteAccount(id).then(()=>{
        getAllAccounts()
    }).catch(error =>{
        console.error(error);
    })
  }
  function enableAccount(id){
    let account
    getAccount(id).then((response) => {
        account = response.data
        account.active = true;
        updateAccount(account.accountID, account).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.error(error)
        })
    }).catch((error)=>{
        console.error(error)
    })
  }
  function updateRole(id){
    let account
    getAccount(id).then((response) => {
        account = response.data
        account.role = 0;
        updateAccount(account.accountID, account).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.error(error)
        })
    }).catch((error)=>{
        console.error(error)
    })
  }
  return (
    <div className="p-5">
      <Card className="mt-2 bt=[#1b1b1b]">
        <CardHeader title="All Accounts"></CardHeader>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Username</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Active</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accounts?.map((row) => (
                <TableRow
                  key={row.accountID}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.accountID}
                  </TableCell>
                  <TableCell align="right">{row.username}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.role === 1 ? 'Patron' : 'Librian'}</TableCell>
                  <TableCell align="right">
                    {row.active === true ? 'Active' : 'Passive'}
                  </TableCell>
                  <TableCell align="right">
                    {row.role === 1 ? (<Button onClick={() => updateRole(row.accountID) } variant="outlined">
                        Set Librian
                    </Button>) : ""}
                    
                    {row.active===false ? ( <Button onClick={() => enableAccount(row.accountID)} variant="outlined">
                        Enable
                    </Button>) 
                    : <Button onClick={() => disableAccount(row.accountID)} variant="outlined">
                        Delete
                    </Button>}
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

export default UserTable;
