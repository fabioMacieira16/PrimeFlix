import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Filmes from './pages/Filmes'
import Headers from './components/Header'
import Error from './components/Erro';
import Favoritos from './components/Favoritos'

function RouteApp() {
    return (
        <BrowserRouter>
            <Headers />
            <Routes>
                <Route path='/' element={ <Home />} />
                <Route path='/filme/:id' element={ <Filmes />} />
                <Route path='/Favoritos' element={ <Favoritos />} />

                <Route path='*' element={ <Error />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteApp;