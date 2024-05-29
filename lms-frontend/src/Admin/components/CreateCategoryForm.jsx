import {
    Button,
    Card,
    CardHeader,
    Grid,
    TextField,
    useTheme,
  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useParams, useNavigate } from "react-router-dom";
import { FaSave } from "react-icons/fa";
import { createCategory } from "../../services/CategoryService";

  
  const CreateCategoryForm = () => {

    const [categoryName, setCategoryName] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();
  
  
    const saveCategory = (event) => {
      event.preventDefault();
      let category = {
        categoryName: categoryName,
      };
      console.log(category)
        createCategory(category).then((response) => {
            console.log(response.data);
            navigate('/admin/categories');
        }).catch(error => {
            console.log(error);
        });
    };
  
    
    function pageTitle(){
        return id ? 'Update Category' : 'Add a Category'
      }
    return (
      <div className="p-5">
        <Card className="mt-2 bt=[#1b1b1b]">
          <CardHeader title={pageTitle()}></CardHeader>
          <form onSubmit={saveCategory}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="categoryName"
                  name="categoryName"
                  label="categoryName"
                  value={categoryName}
                  onChange={(event) => setCategoryName(event.target.value)}
                  fullWidth
                  autoComplete="categoryName"
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
  
  export default CreateCategoryForm;
  