import React, { useEffect, useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Card, CardHeader } from '@mui/material'
import { listAuthors } from '../../services/AuthorService';
import { useNavigate } from 'react-router-dom';


const AuthorTable = () => {
    const [authors, setAuthors] = useState()
    const navigator = useNavigate()
    useEffect(()=>{
        getAllAuthors()
    }, [])
    function getAllAuthors(){
        listAuthors().then((response)=>{
            setAuthors(response.data)
        }).catch(error=>{
            console.error(error)
        });
    }
    function AddAuthor(){
        navigator('/admin/author/create')
    }
  return (
    <div className="p-5">
    <Card className="mt-2 bt=[#1b1b1b]">
      <CardHeader title="All Authors"></CardHeader>
      <Button onClick={AddAuthor}>Add Author</Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              {/* <TableCell align="right">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {authors?.map((row) => (
              <TableRow
                key={row.authorId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.authorId}
                </TableCell>
                <TableCell align="right">{row.authorName}</TableCell>
                {/* <TableCell align="right"> */}
                  {/* <Button onClick={AddAuthor} variant="outlined">
                      Add Author
                  </Button> */}
                  {/* <Button variant="outlined">
                      Delete
                  </Button> */}
                {/* </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  </div>
  )
}

export default AuthorTable