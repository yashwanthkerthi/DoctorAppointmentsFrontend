import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import Notification from "../../Components/Notification/Notification";
import Cookies from "js-cookie";

import React, { useState } from "react";
import Navbar from "../../Navbar/Navbar";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const headers = {
    "Authorization":`Bearer ${Cookies.get("jwt_token")}`,
    'Content-Type': 'application/json',
  }

  const submitAppointmentForm = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        firstName,
        lastName,
        email,
        address,
        date,
        time,
        phoneNumber,
      };
      const response = await axios.post("http://localhost:5000/api/appointment", formData,{headers});
      if(response.data.api_status===200){
        setNotify({message:response.data.message,type:"success",isOpen:true})
        setOpenModal(false)
        setFirstName("")
        setLastName("")
        setDate("")
        setPhoneNumber("")
        setAddress("")
        setEmail("")
        setTime("")
      }
      else{
        setNotify({message:response.data.message,type:"error",isOpen:true})
      }
      // console.log("response",response);
    } catch (error) {
      setNotify({message:"Enter Valid Details",type:"error",isOpen:true})
      console.log("error", error);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{
            position: "fixed",
            fontWeight: "bold",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          onClick={handleOpen}
        >
          Click here to book your appointment
        </Button>
      </div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <h1>Enter the Appointment Details</h1>
            <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
          </div>
          <form onSubmit={submitAppointmentForm}>
            <TextField
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              id="First name"
              label="First name"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              id="Last name"
              label="Last name"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="Email"
              label="Email"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              id="Phone number"
              label="Phone number"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              id="Address"
              label="Address"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setDate(e.target.value)}
              value={date}
              id="date"
              type="date"
              variant="outlined"
            />
            <TextField
              onChange={(e) => setTime(e.target.value)}
              value={time}
              id="time"
              type="time"
              variant="outlined"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "15px",
              }}
            >
              <Button variant="contained" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default Dashboard;
