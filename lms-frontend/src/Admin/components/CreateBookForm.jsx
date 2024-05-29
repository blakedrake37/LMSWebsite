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
  import { createBook, getBook, updateBook } from "../../services/BookService";
  
  const CreateBookForm = () => {
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
    const [authors, setAuthors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [publishers, setPublishers] = useState([]);
    const theme = useTheme();
    const [authorName, setAuthorName] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [publisherName, setPublisherName] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");
  
    const { id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      getAllAuthors();
      getAllCategories();
      getAllPublishers();
  
      if (id) {
        getBook(id).then((response) => {
          setTitle(response.data.title);
          setDescription(response.data.description);
          setPicture(response.data.picture);
          setAuthorName(response.data.authors.map((author) => author.authorId));
          setCategoryName(response.data.categories.map((category) => category.categoryId));
          setPublisherName(response.data.publisher.publisherId);
        }).catch(error => {
          console.log(error);
        });
      }
    }, [id]);
  
    const saveBook = (event) => {
      event.preventDefault();
      let book = {
        title: title,
        description: description,
        picture: picture,
        authors: authorName.map(id => ({
          authorId: id
        })),
        categories: categoryName.map(id => ({
          categoryId: id
        })),
        publisher: {
          publisherId: publisherName
        },
        price: 7
      };
      console.log(book)
      if (id) {
        updateBook(id, book).then(response => {
          console.log(response.data);
          navigate('/admin/books');
        }).catch(error => {
          console.log(error);
        });
      } else {
        createBook(book).then((response) => {
          console.log(response.data);
          navigate('/admin/books');
        }).catch(error => {
          console.log(error);
        });
      }
    };
  
    const handleChangeAuthor = (event) => {
      const { value } = event.target;
      setAuthorName(typeof value === "string" ? value.split(",") : value);
    };
  
    const handleChangeCategory = (event) => {
      const { value } = event.target;
      setCategoryName(typeof value === "string" ? value.split(",") : value);
    };
  
    const handleChangePublisher = (event) => {
      const { value } = event.target;
      setPublisherName(value);
    };
  
    function getAllAuthors() {
      listAuthors()
        .then((response) => {
          setAuthors(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    function getAllCategories() {
      listCategories()
        .then((response) => {
          setCategories(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  
    function getAllPublishers() {
      listPublishers()
        .then((response) => {
          setPublishers(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    function pageTitle(){
        return id ? 'Update Book' : 'Add a Book'
      }
    return (
      <div className="p-5">
        <Card className="mt-2 bt=[#1b1b1b]">
          <CardHeader title={pageTitle()}></CardHeader>
          <form onSubmit={saveBook}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="title"
                  name="title"
                  label="Title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  fullWidth
                  autoComplete="title"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="picture"
                  name="picture"
                  label="Picture"
                  value={picture}
                  onChange={(event) => setPicture(event.target.value)}
                  fullWidth
                  autoComplete="picture"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 1550 }}>
                  <InputLabel id="author">Author</InputLabel>
                  <Select
                    labelId="author"
                    id="author"
                    multiple
                    value={authorName}
                    fullWidth
                    onChange={handleChangeAuthor}
                    input={<OutlinedInput label="Author" />}
                    MenuProps={MenuProps}
                  >
                    {authors.map((author) => (
                      <MenuItem
                        key={author.authorId}
                        value={author.authorId}
                        style={getStyles(author.authorId, authorName, theme)}
                      >
                        {author.authorName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 1550 }}>
                  <InputLabel id="category">Categories</InputLabel>
                  <Select
                    labelId="category"
                    id="category"
                    multiple
                    value={categoryName}
                    onChange={handleChangeCategory}
                    fullWidth
                    input={<OutlinedInput label="Category" />}
                    MenuProps={MenuProps}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category.categoryId}
                        value={category.categoryId}
                        style={getStyles(category.categoryId, categoryName, theme)}
                      >
                        {category.categoryName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: 1550 }}>
                  <InputLabel id="publisher">Publisher</InputLabel>
                  <Select
                    labelId="publisher"
                    id="publisher"
                    value={publisherName}
                    fullWidth
                    onChange={handleChangePublisher}
                    input={<OutlinedInput label="Publisher" />}
                    MenuProps={MenuProps}
                  >
                    {publishers.map((publisher) => (
                      <MenuItem
                        key={publisher.publisherId}
                        value={publisher.publisherId}
                        // style={getStyles(publisher.publisherId, publisherName, theme)}
                      >
                        {publisher.publisherName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  fullWidth
                  autoComplete="description"
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
  
  export default CreateBookForm;
  