import {BrowserRouter, Route, Routes} from 'react-router-dom'
import TaskList from './components/taskList.js';
import TaskForm from "./components/taskForm.js";
import Navbar from "./components/navbar.js";
import { Container } from "@mui/material";


function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container>
        <Routes>
          <Route path='/' element={<TaskList/>} />
          <Route path='/new' element={<TaskForm/>} />
          <Route path='/edit/:id' element={<TaskForm/>} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
