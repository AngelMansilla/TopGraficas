import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ShowGrafica from './components/ShowGrafica';
import CreateGrafica from './components/CreateGrafica';
import EditGrafica from './components/EditGrafica';

import ShowComentario from './components/ShowComentario';
import CreateComentario from './components/CreateComentario';
import EditComentario from './components/EditComentario';

import ShowNoticia from './components/ShowNoticia';
import CreateNoticia from './components/CreateNoticia';
import EditNoticia from './components/EditNoticia';

import ShowOferta from './components/ShowOferta';
import CreateOferta from './components/CreateOferta';
import EditOferta from './components/EditOferta';

import ShowUser from './components/ShowUser';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/graficas" element={<ShowGrafica />}></Route>
          <Route path="/graficas/publicar" element={<CreateGrafica />}></Route>
          <Route path="/graficas/editar/:id" element={<EditGrafica />}></Route>

          <Route path="/comentarios" element={<ShowComentario />}></Route>
          <Route path="/comentarios/publicar" element={<CreateComentario />}></Route>
          <Route path="/comentarios/editar/:id" element={<EditComentario />}></Route>

          <Route path="/noticias" element={<ShowNoticia />}></Route>
          <Route path="/noticias/publicar" element={<CreateNoticia />}></Route>
          <Route path="/noticias/editar/:id" element={<EditNoticia />}></Route>

          <Route path="/" element={<ShowOferta />}></Route>
          <Route path="/ofertas/publicar" element={<CreateOferta />}></Route>
          <Route path="/ofertas/editar/:id" element={<EditOferta />}></Route>

          <Route path="/usuarios" element={<ShowUser />}></Route>
          <Route path="/usuarios/publicar" element={<CreateUser />}></Route>
          <Route path="/usuarios/editar/:id" element={<EditUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
