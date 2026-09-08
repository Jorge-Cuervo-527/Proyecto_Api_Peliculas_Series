import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Genero from './pages/Genero';
import Director from './pages/Director';
import Productora from './pages/Productora'; 
import Tipo from './pages/Tipo';
import Media from './pages/Media'; 

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      {}
      
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h1 className="text-center">Panel de Administración de Películas</h1>} />
          <Route path="/generos" element={<Genero />} />
          <Route path="/directores" element={<Director />} />
          <Route path="/productoras" element={<Productora />} />
          <Route path="/tipos" element={<Tipo />} />
          <Route path="/media" element={<Media />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;