import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Typography, TextField, Button, Card, CardMedia  } from '@mui/material';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  codeBar:{
    margin:'30px',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
  },
  scanCode:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
   width:'95%',
   height:'300px',
  //  border:'1px solid black',
   marginTop:'15px',
  //  backgroundImage: `url(${qrCodeImage})`,
   backgroundSize: 'cover',
   backgroundPosition: 'center',
  },

  tableNo:{
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    marginTop:'30px'
  },
  card: {
    maxWidth: 300,
  },
  media: {
    height: 200,
  },

}));

const ImageCard = ({imageUrl}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        component="img"
        src={imageUrl}
        alt="Base64 Image"
      />
    </Card>
  );
};

const ViewQR = () => {
  const classes = useStyles();
  const [uniqueData,setUniqueData] = useState({});

  const {id} = useParams();

  useEffect(()=>{
    if(id){
      axios.get(`/api/getQrData/${id}`).then((response) => {
        console.log("the response deducing unique qr data:",response.data.data);
        setUniqueData(response.data.data);
      });
    }
  },[])

  const handleScan = (data) => {
    if (data) {
      // Handle scanned QR code data
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  return (
    <div  className={classes.codeBar}>
      <Typography variant="h6" align="center" gutterBottom>
        Scan QR Code to order
      </Typography>
      <div  className={classes.scanCode} style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
      <ImageCard imageUrl ={uniqueData.qrCodeImage}/>
      </div>
      <div className={classes.tableNo}>
      <Typography variant="h6" align="center" gutterBottom>
       Table No.{uniqueData.tableNumber}
      </Typography>
      </div>
        
      
      {/* <Button variant="contained" color="primary" fullWidth>
        Submit
      </Button> */}
    </div>
  );
};

export default ViewQR;
