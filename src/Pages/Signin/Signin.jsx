import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useNavigate,Link } from "react-router-dom";
import Cookies from "js-cookie";
import Notification from "../../Components/Notification/Notification";


const Signin = () => {

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
      const postData = { email, password };
      const response = await axios.post("http://localhost:5000/api/signin", postData);
      console.log(response);
      if(response.data.api_status===200){
        console.log("token",response.data.data.jwtToken);
        Cookies.set("jwt_token",response.data.data.jwtToken)
        Cookies.set("name",response.data.data.first_name)
        setTimeout(() => {
          navigate("/")
        }, 2000);          
        setNotify({message:response.data.message,type:"success",isOpen:true})
      }
      else{
        setNotify({message:response.data.message,type:"error",isOpen:true})
      }
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
          type="password"
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
          Signin
        </Button>
      </Box>
      <Notification notify={notify} setNotify={setNotify} />
    </div>
  );
};

export default Signin;
