//import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from './Home';
import Alumnos from './Alumnos';
import Cursos from './Cursos';
import Profesores from './Profesores';


function App() {
  return (
    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    */
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/Alumnos" element={<Alumnos/>}></Route>
        <Route path="/Cursos" element={<Cursos/>}></Route>
        <Route path="/Profesores" element={<Profesores/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
