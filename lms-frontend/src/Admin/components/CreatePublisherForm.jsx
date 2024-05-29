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
    import { createPublisher } from "../../services/PublisherService";

  
  const CreatePublisherForm = () => {

    const [publisherName, setPublisherName] = useState("");

    const { id } = useParams();
    const navigate = useNavigate();
  
  
    const savePublisher = (event) => {
      event.preventDefault();
      let publisher = {
        publisherName: publisherName,
      };
      console.log(publisher)
        createPublisher(publisher).then((response) => {
            console.log(response.data);
            navigate('/admin/publishers');
        }).catch(error => {
            console.log(error);
        });
    };
  
    
    function pageTitle(){
        return id ? 'Update Publisher' : 'Add a Publisher'
      }
    return (
      <div className="p-5">
        <Card className="mt-2 bt=[#1b1b1b]">
          <CardHeader title={pageTitle()}></CardHeader>
          <form onSubmit={savePublisher}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  id="publisherName"
                  name="publisherName"
                  label="publisherName"
                  value={publisherName}
                  onChange={(event) => setPublisherName(event.target.value)}
                  fullWidth
                  autoComplete="publisherName"
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
  
  export default CreatePublisherForm;
  