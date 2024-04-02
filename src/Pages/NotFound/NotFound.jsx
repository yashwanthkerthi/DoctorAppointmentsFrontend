import * as React from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Navbar from '../../Navbar/Navbar';

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 1100,
  height: 400,
  padding: theme.spacing(2),
  margin:20,
  ...theme.typography.body2,
  textAlign: 'center',
}));

export default function NotFound() {
  return (
    <>
    <Navbar/>
    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}} >
       <DemoPaper elevation={24} style={{fontWeight:"800",marginTop:"50px",fontSize:"25px",display:"flex",alignItems:"center",justifyContent:"center",color:"GrayText"}} square={false}>The Page you are looking is not Found</DemoPaper>
    </div>
    </>
    
  );
}