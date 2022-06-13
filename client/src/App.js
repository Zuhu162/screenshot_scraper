import logo from "./logo.svg";
import "./App.css";
import UserInput from "./components/userInput";
import { Box, Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Container>
        <UserInput></UserInput>
      </Container>
    </div>
  );
}

export default App;
