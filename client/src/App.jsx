
import Carrinho from "./paginas/Carrinho";
import "./App.css";
import CategoriaProduto from "./paginas/CategoriaProduto";
import DetalhesProduto from "./paginas/DetalhesProduto";
import Home from "./paginas/Home";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import GerirConta from "./paginas/GerirConta"
import Sucesso from "./paginas/Sucesso";
import RotaPrivada from "./paginas/rotasPrivadas/rotaPrivada";
import { useSelector } from "react-redux";
import "aos/dist/aos.css";
import AOS from 'aos';



import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import GerirContaEditar from "./paginas/GerirContaEditar";
import { useEffect } from "react";



const App = () => {
  const user = useSelector(state=> state.utilizador.utilizadorAtual)

  useEffect(() => {
    AOS.init({
      duration : 2000
    });
  }, []);
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/produtos/:categoria' element={<CategoriaProduto/>}/>
        <Route path='/detalhesProduto/:id' element={<DetalhesProduto/>}/>
        <Route path='/carrinho' element={<Carrinho/>}/>
        <Route path='/sucesso' element={<Sucesso/>}/>
        {/* Comment here <Route path='/login' element={<RotaPrivada/>}> */}
           <Route path='/login' element={<Login/>}/>
        {/* Comment here </Route> */}
        {/* Comment here <Route path='/registrar' element={<RotaPrivada/>}> */}
           <Route path='/registrar' element={<Registrar/>}/>
        {/* Comment here </Route> */}
        <Route path='/gerirConta' element={<GerirConta/>}/>
        <Route path='/gerirContaEditar' element={<GerirContaEditar/>}/>

      </Routes>
    </Router>
  );
};

export default App;