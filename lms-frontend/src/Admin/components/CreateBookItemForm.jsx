import {
    Button,
    Card,
    CardHeader,
    Grid,
    TextField,
    useTheme,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import OutlinedInput from "@mui/material/OutlinedInput";
  import InputLabel from "@mui/material/InputLabel";
  import MenuItem from "@mui/material/MenuItem";
  import FormControl from "@mui/material/FormControl";
  import Select from "@mui/material/Select";
  import { listAuthors } from "../../services/AuthorService";
  import { listCategories } from "../../services/CategoryService";
  import { listPublishers } from "../../services/PublisherService";
  import { useParams, useNavigate } from "react-router-dom";
  import { createBook, getBook, listBooks, updateBook } from "../../services/BookService";
import { createBookItem, deleteBookItem } from "../../services/BookItemService";
  
  const CreateBookItemForm = () => {
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 600
        },
      },
    };
    function getStyles(name, personName, theme) {
      return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState(null)
    const [bookName, setBookName] = useState("");
    const [book, setBook] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
        getAllBooks()
        getBook(id).then((response) => {
            setBook(response.data)
        }).catch(error => {
            console.log(error)
        })
    }, [id])
  
    const saveBookItem = (event) => {
      event.preventDefault();
      let bookItem = {
        bookId: title
      };
      console.log(bookItem)
      if(id){
        if(quantity>book.bookItems.length)
            setQuantity(book.bookItems.length)
        book.bookItems.slice(0, quantity).filter((item)=> item.status===0).map((item)=>{
            deleteBookItem(item.bookItemId).then((response) => {
                console.log("response: ",response.data);
                navigate('/admin/books');
            }).catch(error => {
                console.log(error);
            });
        })
      }else{
        for (let index = 0; index < quantity; index++) {
            createBookItem(bookItem).then((response) => {
                console.log(response.data);
                navigate('/admin/books');
            }).catch(error => {
                console.log(error);
            });
        }

        
      }

    };
  
  
    const handleChangeBook = (event) => {
        const { value } = event.target;
        setTitle(value);
      };
    const handleChangeNumber = (event)=>{
        const {value} = event.target;
        setQuantity(value);
    }
  
  
    function getAllBooks() {
      listBooks()
        .then((response) => {
          setBooks(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    function pageTitle(){
        return id ? 'Delete book quantity ' : 'Add quantity for book'
      }
    return (
      <div className="p-5">
        <Card className="mt-2 bt=[#1b1b1b]">
          <CardHeader title={pageTitle()}></CardHeader>
          <form onSubmit={saveBookItem}>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <FormControl sx={{ width: 1550 }}>
                  <InputLabel id="publisher">Book</InputLabel>
                  <Select
                    labelId="book"
                    id="book"
                    value={title}
                    fullWidth
                    onChange={handleChangeBook}
                    input={<OutlinedInput label="book" />}
                    MenuProps={MenuProps}
                  >
                    {books.map((book) => (
                      <MenuItem
                        key={book.bookId}
                        value={book.bookId}
                        // style={getStyles(publisher.publisherId, publisherName, theme)}
                      >
                        {book.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                    className="w-full"
                    label="Number"
                    type="number"
                    value={quantity}
                    onChange={handleChangeNumber}
                    fullWidth
                />
            </Grid> 
              <Grid item xs={12}>
                <Button
                  className="w-full"
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                  sx={{ padding: ".8rem 0" }}
                  fullWidth
                >
                  {id ? "Delete" : "Create"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
    );
  };
  
  export default CreateBookItemForm;
  