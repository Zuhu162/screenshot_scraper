import logo from "./logo.svg";
import "./App.css";
import UserInput from "./components/userInput";
import { Box, Container } from "@mui/material";
import LinkIcons from "./components/LinkIcons";

function App() {
  return (
    <div className="App">
      <Container>
        <LinkIcons></LinkIcons>
        <UserInput></UserInput>
      </Container>
    </div>
  );
}

export default App;
