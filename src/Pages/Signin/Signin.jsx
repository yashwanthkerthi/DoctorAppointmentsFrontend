import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useNavigate,Link } from "react-router-dom";


const Signin = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const postData = { email, password };
      const response = await axios.post("http://localhost:5000/", postData);
    } catch (error) {
      console.log("error occurred ", error);
    }
  };

  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}} >
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
          backgroundColor:"white"
        }}
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <h2>Signin User</h2>
        <TextField
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />

        <Link
          style={{
            textDecoration: "none",
            fontSize: "15px",
            color: "darkblue",
          }}
          to="/signup"
        >
          Already have an account / Signup account
        </Link>
        <Button type="submit" style={{ width: "120px" }} variant="contained">
          Register
        </Button>
      </Box>
    </div>
  );
};

export default Signin;
