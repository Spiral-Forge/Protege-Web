import React from "react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { Box } from "@mui/system";
import LinkIcon from "@mui/icons-material/Link";
import AndroidIcon from "@mui/icons-material/Android";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import { db } from "../../firebase";
const AddResource = ({
  addResourceDialog: open,
  setAddResourceDialog: setOpen,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const [addResourceData, setAddResourceData] = useState({
    title: "",
    link: "",
    category: "",
  });
  const handleSubmit = () => {
    console.log(addResourceData);
    db.collection(addResourceData.category)
      .add({
        Title: addResourceData.title,
        Link: addResourceData.link,
      })
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
      handleClose();
  };
  const handleAddResourceChange = (e) => {
    const { name, value } = e.target;
    setAddResourceData({ ...addResourceData, [name]: value });
  };
  return (
    <>
      <Dialog fullWidth maxWidth={"xs"} open={open} onClose={handleClose}>
        <DialogTitle>Add Resource</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Add Resources</DialogContentText> */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextFieldsIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={handleAddResourceChange}
              label="Title"
              variant="standard"
              name="title"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LinkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={handleAddResourceChange}
              label="Link"
              variant="standard"
              name="link"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 4 }}>
            <AndroidIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <FormControl fullWidth>
              <InputLabel id="resource-category">Resource Category</InputLabel>
              <Select
                labelId="resource-category"
                value={addResourceData.category}
                label="Resource Category"
                onChange={handleAddResourceChange}
                name="category"
              >
                <MenuItem value={"Development"}>Development</MenuItem>
                <MenuItem value={"Scholarship"}>Scholarship</MenuItem>
                <MenuItem value={"College"}>College</MenuItem>
                <MenuItem value={"ML"}>Machine Learning</MenuItem>
                <MenuItem value={"OpenSource"}>Open-Source</MenuItem>
                <MenuItem value={"CompCoding"}>Competitive Coding</MenuItem>
                <MenuItem value={"BlogsArticles"}>Blogs and Articles</MenuItem>
                <MenuItem value={"Misc"}>Miscellaneous</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddResource;
