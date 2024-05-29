import {
    Button,
    Card,
    CardHeader,
    Grid,
    TextField,
    useTheme,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { createAuthor, listAuthors } from "../../services/AuthorService";
  import { useParams, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";

  
  const CreateAuthorForm = () => {

    const [authorName, setAuthorName] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();
  
  
    const saveAuthor = (event) => {
      event.preventDefault();
      let author = {
        authorName: authorName,
      };
      console.log(author)
        createAuthor(author).then((response) => {
            console.log(response.data);
            navigate('/admin/authors');
        }).catch(error => {
            console.log(error);
        });
    };
  
    
    function pageTitle(){
        return id ? 'Update Author' : 'Add an Author'
      }
    return (
      <div className="p-5">
        <Card className="mt-2 bt=[#1b1b1b]">
          <CardHeader title={pageTitle()}></CardHeader>
          <form onSubmit={saveAuthor}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="authorName"
                  name="authorName"
                  label="authorName"
                  value={authorName}
                  onChange={(event) => setAuthorName(event.target.value)}
                  fullWidth
                  autoComplete="authorName"
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
                  {id ? "Update" : "Create"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
    );
  };
  
  export default CreateAuthorForm;
  