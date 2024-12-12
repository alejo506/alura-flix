import './App.css'
import Home from './pages/Home/Home'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import PageBase from './pages/PageBase'
import AddVideo from './pages/AddVideo/AddVideo'

function AppRoutes() {

  return (
    <>
      {/* Contenedor que permite la navegación de rutas basada en el historial de navegación del navegador. */}
      <BrowserRouter>
        <Routes>
          {/* Ruta principal */}
          <Route path="/" element={<PageBase />}>
            {/* Ruta de inicio (Home) */}
            <Route index element={<Home />} />
            {/* Ruta para agregar video */}
            <Route path='/add' element={<AddVideo />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default AppRoutes;
