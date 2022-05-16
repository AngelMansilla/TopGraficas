import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ShowGrafica from './components/ShowGrafica';
import ShowComentario from './components/ShowComentario';
import ShowNoticia from './components/ShowNoticia';
import ShowOferta from './components/ShowOferta';
import ShowUser from './components/ShowUser';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ShowGrafica />}></Route>
          {/* <Route path="/crear" element={<CreateGrafica />}></Route>
          <Route path="/editar/:id" element={<EditGrafica />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
