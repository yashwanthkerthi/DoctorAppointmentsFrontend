import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Notification from "../../Components/Notification/Notification";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const postData = { firstName, lastName, email, password };
      const response = await axios.post("http://localhost:5000/api/signup", postData);
      console.log(response);
      if(response.data.api_status===200){
        Cookies.set("jwt_token",response.data.data.jwtToken)
        Cookies.set("name",response.data.data.first_name)
        setTimeout(() => {
          navigate("/")
        }, 2000);
        setNotify({message:response.data.message,type:"success",isOpen:true})
        setFirstName("")
        setLastName("")
        setEmail("")
        setPassword("")
      }
      else{
        setNotify({message:response.data.message,type:"error",isOpen:true})

      }
    } catch (error) {
      console.log("error occurred ", error);
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-around",
          textAlign: "center",
          marginTop: "25px",
        }}
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <h2>Register User</h2>
        <TextField
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
          id="Firstname"
          label="Firstname"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
          id="Lastname"
          label="Lastname"
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
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          id="Password"
          label="Password"
          variant="outlined"
        />

        <Link
          style={{
            textDecoration: "none",
            fontSize: "15px",
            color: "darkblue",
          }}
          to="/signin"
        >
          Already have an account / Signin account
        </Link>
        <Button type="submit" style={{ width: "120px" }} variant="contained">
          Register
        </Button>
        <Notification notify={notify} setNotify={setNotify} />
      </Box>
    </div>
  );
};

export default Signup;
