import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Register from './components/Register';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Courses from './components/Courses';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
     <Header/>

     <Routes>
        <Route path='/' element={<Register/>}/>
        <Route path='/courses' element={<Courses/>}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
