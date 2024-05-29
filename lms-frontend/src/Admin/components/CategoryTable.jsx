import React, { useEffect, useState } from 'react'
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Card, CardHeader } from '@mui/material'
import { listCategories } from '../../services/CategoryService';
import { useNavigate } from 'react-router-dom';
const CategoryTable = () => {
    const [categories, setCategories] = useState()
    const navigator= useNavigate()
    useEffect(()=>{
        getAllCategories()
    }, [])
    function getAllCategories(){
        listCategories().then((response)=>{
            setCategories(response.data)
        }).catch(error=>{
            console.error(error)
        });
    }
    function AddCategory(){
        navigator('/admin/category/create')
    }
  return (
    <div className="p-5">
    <Card className="mt-2 bt=[#1b1b1b]">
      <CardHeader title="All Categories"></CardHeader>
      <Button onClick={AddCategory}>Add Category</Button>
      <TableContainer AddCategory={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              {/* <TableCell align="right">Action</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((row) => (
              <TableRow
                key={row.categoryId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.categoryId}
                </TableCell>
                <TableCell align="right">{row.categoryName}</TableCell>
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

export default CategoryTable