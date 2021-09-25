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
  const HandleClose = () => {
    setOpen(false);
  };
  const [addResourceData, setAddResourceData] = useState({
    title: "",
    link: "",
    category: "",
  });
  const HandleSubmit = () => {
    console.log(addResourceData);
    db.collection(addResourceData.category)
      .add({
        Title: addResourceData.title,
        Link: addResourceData.link,
        Upvotes: 0,
        Downvotes: 0,
      })
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
    HandleClose();
  };
  const HandleAddResourceChange = (e) => {
    const { name, value } = e.target;
    setAddResourceData({ ...addResourceData, [name]: value });
  };
  return (
    <>
      <Dialog
        fullWidth
        maxWidth={"xs"}
        open={open}
        onClose={HandleClose}
        sx={{ p: 2 }}
      >
        <DialogTitle className='dialog-title'>Add Resource</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>Add Resources</DialogContentText> */}
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextFieldsIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddResourceChange}
              label="Title"
              variant="standard"
              name="title"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LinkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddResourceChange}
              label="Link"
              variant="standard"
              name="link"
              fullWidth
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
                onChange={HandleAddResourceChange}
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
          <Button onClick={HandleClose}>Cancel</Button>
          <Button onClick={HandleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddResource;
