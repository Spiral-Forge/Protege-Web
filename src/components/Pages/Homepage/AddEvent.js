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
import { db } from "../../../firebase";
const AddEvent = ({ addEventDialog: open, setAddEventDialog: setOpen }) => {
  const HandleClose = () => {
    setOpen(false);
  };
  const [addEventData, setAddEventData] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    description: "",
    pic: "",
    approved: false,
  });
  const HandleSubmit = () => {
    console.log(addEventData);
    db.collection("Events")
      .add(addEventData)
      .then(() => {
        console.log("done");
      })
      .catch((err) => {
        console.log(err);
      });
    HandleClose();
  };
  const HandleAddEventChange = (e) => {
    const { name, value } = e.target;
    setAddEventData({ ...addEventData, [name]: value });
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
        <DialogTitle className="dialog-title">Add Event</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <TextFieldsIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddEventChange}
              label="Title"
              variant="standard"
              name="title"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LinkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddEventChange}
              label="Date"
              variant="standard"
              name="date"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LinkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddEventChange}
              label="Time"
              variant="standard"
              name="time"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LinkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddEventChange}
              label="Venue"
              variant="standard"
              name="venue"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LinkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddEventChange}
              label="Description"
              variant="standard"
              name="description"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LinkIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddEventChange}
              label="Venue"
              variant="standard"
              name="venue"
              fullWidth
            />
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

export default AddEvent;
