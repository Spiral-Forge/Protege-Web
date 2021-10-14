import DateRangeIcon from "@mui/icons-material/DateRange";
import DescriptionIcon from "@mui/icons-material/Description";
import RoomIcon from "@mui/icons-material/Room";
import ScheduleIcon from "@mui/icons-material/Schedule";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import LinkIcon from "@mui/icons-material/Link";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
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
    link: "",
    description: "",
    imageURL: "",
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
          <Box sx={{ display: "flex", mt: 1.5, alignItems: "flex-end" }}>
            <DateRangeIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />

            <TextField
              onChange={HandleAddEventChange}
              variant="standard"
              type="date"
              name="date"
              label=""
              InputLabelProps={{
                shrink: false,
              }}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", mt: 1.5, alignItems: "flex-end" }}>
            <ScheduleIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              name="time"
              onChange={HandleAddEventChange}
              type="time"
              variant="standard"
              InputLabelProps={{
                shrink: false,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <RoomIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
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
              label="Event Link"
              variant="standard"
              name="link"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <DescriptionIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddEventChange}
              label="Description"
              variant="standard"
              name="description"
              fullWidth
            />
          </Box>
          <Box sx={{ display: "flex", mt: 1.5, alignItems: "center" }}>
            <CropOriginalIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              onChange={HandleAddEventChange}
              label="Image Link"
              variant="standard"
              name="imageURL"
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
