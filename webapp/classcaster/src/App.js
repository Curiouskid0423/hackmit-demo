import logo from './logo.svg';
import { Button, ButtonGroup } from "@chakra-ui/react"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Log in page
        </p>
        <Button colorScheme="blue">Button</Button>
      </header>
    </div>
  );
}

export default App;
