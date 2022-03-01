import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Redirect,
} from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/login.jsx";
import TransacaoList from "./pages/transacaoList/TransacaoList";
import Transacao from "./pages/transacao/Transacao";
//import { useSelector } from "react-redux";

function App() {
  const utilizador = JSON.parse(localStorage.getItem("persist:root"))?.utilizador;
  const utilizadorAtual = utilizador && JSON.parse(utilizador).utilizadorAtual;
  const admin = utilizadorAtual?.isAdmin;
  return (
    <Router>
      <Switch>
        <Route path="/adminLogin">
          <Login />
        </Route>
        {admin && (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/adminHome">
                <Home />
              </Route>
              <Route path="/adminUsers">
                <UserList />
              </Route>
              <Route path="/adminUser/:userId">
                <User />
              </Route>
              <Route path="/adminNovoUser">
                <NewUser />
              </Route>
              <Route path="/adminProdutos">
                <ProductList />
              </Route>
              <Route path="/adminProduto/:productId">
                <Product />
              </Route>
              <Route path="/adminNovoProduto">
                <NewProduct />
              </Route>
              <Route path="/adminTransacoes">
                <TransacaoList />
              </Route>
              <Route path="/adminTransacao/:pedidoId">
                <Transacao />
              </Route>
              
            </div>
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;