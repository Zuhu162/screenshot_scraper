import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import FormInput from "./FormInput";

function UserInput() {
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [amount, setAmount] = useState(1);
  const [timeInterval, setTimeInterval] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      email: email,
      site: website,
      amount: amount,
      timeInterval: timeInterval,
    };
    try {
      const res = await axios.post("/", userInfo);
      console.log(userInfo);
    } catch (err) {
      console.log(err);
    }
    setSubmitted(true);
  };

  //parse numbers

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: "10px", marginTop: "20px" }}>
            <Typography color="primary" variant="h4">
              Screenshotter
            </Typography>
          </Box>
          <FormInput
            error="Please enter a valid email address"
            label="Email"
            setVal={setEmail}
            placeholder="Email"
            type="email"
          ></FormInput>
          <FormInput
            label="Website Address"
            setVal={setWebsite}
            placeholder="https://example.com"
          ></FormInput>
          <FormInput
            error="Please enter a value between 1 and 60"
            label="No of Screenshots"
            setVal={setAmount}
            placeholder="No of Screenshots"
            pattern="([1-9]|[1-5][0-9]|60)"
          ></FormInput>
          <FormInput
            error="Please enter a value between 1 and 60"
            label="Time Interval"
            setVal={setTimeInterval}
            placeholder="Time Interval"
            type="number"
            pattern="([1-9]|[1-5][0-9]|60)"
          ></FormInput>
          <button className="subButton" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <form>
          <Typography variant="h5">
            Thank you for submitting. <br></br> If you do not receive any
            emails, please check whether all the information has been input
            correctly
          </Typography>
        </form>
      )}
    </Box>
  );
}

export default UserInput;
