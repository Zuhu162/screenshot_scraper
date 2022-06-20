import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import FormInput from "./FormInput";
import Selecter from "./Selecter";

function UserInput() {
  const [advanced, setAdvanced] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [amount, setAmount] = useState(1);
  const [timeInterval, setTimeInterval] = useState(1);
  const [fullpage, setFullpage] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [format, setFormat] = useState("");
  const [height, setHeight] = useState("");
  const [width, setWidth] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      email: email,
      site: website,
      amount: amount,
      timeInterval: timeInterval,
      fullpage: fullpage,
      format: format,
      width: width,
      height: height,
    };
    try {
      const res = await axios.post(
        "https://screenshot-scraper123.herokuapp.com/api/ss",
        userInfo
      );
      console.log(userInfo);
    } catch (err) {
      console.log(err);
    }
    setSubmitted(true);
  };

  const showAdvanced = () => {
    setAdvanced(!advanced);
  };

  //parse numbers

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "95vh",
      }}
    >
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              marginBottom: "10px",
              marginTop: "20px",
            }}
          >
            <p className="title" color="primary" variant="h4">
              | SCREENSHOT SCRAPER |
            </p>
          </Box>
          <FormInput
            error="Please enter a valid email address"
            setVal={setEmail}
            placeholder="Email"
            type="email"
          ></FormInput>
          <FormInput
            setVal={setWebsite}
            placeholder="https://example.com"
          ></FormInput>
          <FormInput
            error="Please enter a value between 1 and 60"
            setVal={setAmount}
            placeholder="No of Screenshots"
            pattern="([1-9]|[1-5][0-9]|60)"
          ></FormInput>
          <FormInput
            error="Please enter a value between 1 and 60"
            setVal={setTimeInterval}
            placeholder="Time Interval"
            pattern="([1-9]|[1-5][0-9]|60)"
          ></FormInput>
          <Typography
            onClick={showAdvanced}
            type="p"
            color="white"
            sx={{ cursor: "pointer", pt: "20px" }}
          >
            Advanced Settings
          </Typography>
          {advanced ? (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <FormControl>
                <FormControlLabel
                  label="Fullpage"
                  control={
                    <Checkbox
                      onChange={() => setFullpage(!fullpage)}
                      sx={{
                        color: "#fff",
                        "&.Mui-checked": {
                          color: "primary",
                        },
                      }}
                    />
                  }
                ></FormControlLabel>
              </FormControl>

              <Selecter setVal={setFormat}></Selecter>
              <FormInput
                label="Set Page Width"
                error="Please enter a value between 1 and 3840"
                setVal={setHeight}
                placeholder="Page Width"
                defaultValue={1920}
              ></FormInput>
              <FormInput
                label="Set Page Width"
                check={true}
                defaultValue={1080}
                checklabel="Image Format"
                error="Please enter a value between 1 and 2160"
                setVal={setWidth}
                placeholder="Page Height"
                type={true}
              ></FormInput>
            </Box>
          ) : null}

          <button onClick={console.log()} className="subButton" type="submit">
            Submit
          </button>
        </form>
      ) : (
        <form>
          <Typography variant="h5" sx={{ color: "white" }}>
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
