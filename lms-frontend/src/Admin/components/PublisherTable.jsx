import React, { useEffect, useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Card, CardHeader } from '@mui/material'
import { listPublishers } from '../../services/PublisherService';
import { useNavigate } from 'react-router-dom';


const PublisherTable = () => {
    const [publishers, setPublishers] = useState()
    const navigator= useNavigate()
    useEffect(()=>{
        getAllPublishers()
    }, [])
    function getAllPublishers(){
        listPublishers().then((response)=>{
            setPublishers(response.data)
        }).catch(error=>{
            console.error(error)
        });
    }
    function AddPublisher(){
        navigator('/admin/publisher/create')
    }
  return (
    <div className="p-5">
    <Card className="mt-2 bt=[#1b1b1b]">
      <CardHeader title="All Publishers"></CardHeader>
      <Button onClick={AddPublisher}>Add Publisher</Button>
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
            {publishers?.map((row) => (
              <TableRow
                key={row.publisherId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.publisherId}
                </TableCell>
                <TableCell align="right">{row.publisherName}</TableCell>
                {/* <TableCell align="right">
                  <Button variant="outlined">
                      Update
                  </Button>
                  <Button variant="outlined">
                      Delete
                  </Button>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  </div>
  )
}

export default PublisherTable