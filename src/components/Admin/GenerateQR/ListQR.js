import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const data = [
  { id: 1, name: 'Item 1', description: 'Description 1', price: '$10' },
  { id: 2, name: 'Item 2', description: 'Description 2', price: '$20' },
  { id: 3, name: 'Item 3', description: 'Description 3', price: '$30' },
  { id: 4, name: 'Item 4', description: 'Description 4', price: '$40' },
];

const ListQR = () => {

  const [qrdata,setQrdata] = useState([]);
  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(()=>{
    if(id){
      // dispatch({type:GET_URL_DATA,payload:id});
      console.log("the id now:",id);
      axios.get(`/api/getAllQrData/${id}`).then((response) => {
        console.log("the response deducing qr data:",response.data.data);
        setQrdata(response.data.data)
        // dispatch({type:UNMASKED_URL_DATA,payload:response.data.data});
      });
    }
  },[])

  const handleRowClick = (uniqueId) => {
    navigate(`/viewQR/${uniqueId}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Table Number</TableCell>
            <TableCell>Url</TableCell>
            <TableCell>Unique ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {qrdata.map((item) => (
            <TableRow key={item.uniqueId} onClick={() => handleRowClick(item.uniqueId)}>
              <TableCell>{item.tableNumber}</TableCell>
              <TableCell>{item.maskedUrl}</TableCell>
              <TableCell>{item.uniqueId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListQR;
