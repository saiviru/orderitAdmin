import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Copyright from "../../Common/Copyright";
import MiniDrawer from "../Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { Container, TextField, Button, Grid, Typography } from "@mui/material";
import { SET_QRCODE } from "../../redux/qrcodes/ActionTypes";
import PropTypes from "prop-types";

import { connect, useSelector } from "react-redux";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));

const QRgenerate = ({ setQRcode }) => {
  const [inputValue, setInputValue] = useState("");
  const [maskedUrl, setMaskedUrl] = useState("");
  const [submitted, setSubmitted] = useState("");
  const classes = useStyles();

  const user = useSelector((state) => state.user.user);
  let qrcode = useSelector((state) => state.qr.qrCodes);
  if (qrcode.length > 0) {
    // Render loading state or other UI while waiting for the value to be available
    console.log("qr code:", qrcode);
    qrcode = qrcode[qrcode.length - 1];
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    setQRcode(inputValue, user.rId);
    console.log("Form submitted with value:", inputValue, user.rId);
    // Reset the input value
    setInputValue("");
    setSubmitted(true);
  };

  useEffect(() => {
    // if (qrcode) {
    //   setMaskedUrl(qrcode.result[0].qrCodeImage);
    // }
  }, [submitted]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    setSubmitted(false);
  };

  return (
    <div>
      <CssBaseline />
      <MiniDrawer headerTitle="Generate QR code" />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container
          maxWidth="lg"
          className={classes.container}
          style={{ marginTop: "26px" }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12}>
                <TextField
                  label="Table No."
                  variant="outlined"
                  value={inputValue}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Generate
                </Button>
              </Grid>
            </Grid>
          </form>
          {submitted && (
            <Grid>
              <img src={qrcode.qrCodeImage} alt="QR Code" />
              <Typography variant="h6" component="h6">
                For Table: {qrcode.tableNumber}
              </Typography>
            </Grid>
          )}
        </Container>
      </main>
    </div>
  );
};

QRgenerate.propTypes = {
  setQRcode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setQRcode: (id, rid) =>
      dispatch({ type: SET_QRCODE, payload: { id, rid } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QRgenerate);
