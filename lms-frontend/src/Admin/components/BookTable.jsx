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
import { useNavigate } from "react-router-dom";


const BookTable = () => {
  const [books, setBooks] = useState();
  const navigator = useNavigate()
  useEffect(() => {
    getAllBooks();
  });
  function getAllBooks() {
    listBooks()
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function addBook(){
    navigator('/admin/book/create')
  }
  function addQuantity(){
    navigator('/admin/book/addquantity')
  }
  function updateBook(id){
    navigator(`/admin/book/create/${id}`)
  }
  function deleteQuantity(id){
    navigator(`/admin/book/deletequantity/${id}`)
  }
  return (
    <div className="p-5">
      <Card className="mt-2 bt=[#1b1b1b]">
        <CardHeader title="All Books"></CardHeader>
        <Button onClick={addBook}>Add book</Button>
        <Button onClick={addQuantity}>Add Quantity</Button>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Title</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Author</TableCell>
                <TableCell align="right">Category</TableCell>
                <TableCell align="right">Publisher</TableCell>
                <TableCell align="right">Publish Year</TableCell>
                <TableCell align="right">Available</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books?.map((row) => (
                <TableRow
                  key={row.bookId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.bookId}
                  </TableCell>
                  <TableCell align="right">{row.title}</TableCell>
                  <TableCell align="right">{row.description}</TableCell>
                  <TableCell align="right">
                    {row.authors.length > 0
                      ? row.authors
                          .map((author) => (
                            <a
                              href={`#author/${author.authorId}`}
                              key={author.authorId}
                            >
                              {author.authorName}
                            </a>
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])
                      : "No authors"}
                  </TableCell>
                  <TableCell align="right">
                    {row.categories.length > 0
                      ? row.categories
                          .map((category) => (
                            <a
                              href={`#author/${category.categoryId}`}
                              key={category.categoryId}
                            >
                              {category.categoryName}
                            </a>
                          ))
                          .reduce((prev, curr) => [prev, ", ", curr])
                      : "No Category"}
                  </TableCell>
                  <TableCell align="right">
                    {row.publisher.publisherId}
                  </TableCell>
                  <TableCell align="right">
                    {row.publishYear.substring(0, 4)}
                  </TableCell>
                  <TableCell align="right">
                    {row.bookItems.filter((item) => item.status === 0).length >
                    0
                      ? row.bookItems.length
                      : "Out of Stock"}
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={()=> updateBook(row.bookId)} variant="outlined">
                        Update
                    </Button>
                    <Button onClick={()=> deleteQuantity(row.bookId)} variant="outlined">
                        Delete
                    </Button>
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

export default BookTable;
