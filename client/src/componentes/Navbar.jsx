import React from "react";
import { Search, ShoppingCartOutlined,Person, Favorite } from '@material-ui/icons';
import Typography from '@mui/material/Typography';
import { useSelector, useDispatch,  } from "react-redux";
import { useState } from 'react';
import styled from "styled-components"
import { Link, useNavigate } from 'react-router-dom';
import { logout, resetarCarrinho } from '../redux/apiChamadas';

import "./css/navbar.css"
import { Badge } from '@material-ui/core';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

const PrimeiraLinha = styled.div`

`;
const PrimeiraLinhaItem = styled.div`

font-size: 18px;
align-self: center;

`;




const Navbar = () => {
  const [showBasic, setShowBasic] = useState(false);
  const [stringPesquisa, setStringPesquisa] = useState("");
  const navigate = useNavigate();
  const navegarPara = () => navigate('/');
  const navegarParaPesquisa = () => navigate(`/produtos/Pesquisa#${stringPesquisa}`);
  const navegarParaMarca = () => navigate(`/produtos/Pesquisa#${stringPesquisa}`);
  const carrinho = useSelector(estado => estado.carrinho) // referencia ao reducer do loja.js
  const carrinho_quantidade = useSelector(estado => estado.carrinho.quantidade);
  const utilizadorAtual = useSelector(estado => estado.utilizador.utilizadorAtual)


  //LOGOUT
  const dispatch = useDispatch();

  const gerirLogout = () => {
    logout(dispatch)
    resetarCarrinho(dispatch)
    navegarPara()

  };
  const gerirBarraPesquisa = (e) => {
    setStringPesquisa(e.target.value)
    console.log(stringPesquisa)

  };

  const refreshPage = () => {
    navegarParaPesquisa();
    window.location.reload();
  };


  const reloadPage = () => {

    window.location.reload();
  };

  console.log(carrinho)

  const gerirClique = (e) => {
   
  
  };
    return (

      <>
      <div class="navegadorTotal">
        <div class="PrimeiraLinha">
            <div className=" PrimeiraLinhaItem" id="Marca_BabyConcept_NavBar">
              <div class="d-flex logoGeralNavbarDesktop">
              <Link class="logoTipografia" to="/">
              <Typography
              
        
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                THE BABY CONCEPT
              </Typography>

              </Link>
              <Link  to="/">
              <img class="ms-2 align-self-center logoIconBabyConceptNavbar"src="https://i.ibb.co/3Th6xP2/Logo-sozinha-png.png"/>
              </Link>
              </div>
            </div>
      
            <div class="PrimeiraLinhaItem " >
            
              <div class="input-group" id="teste">
                <div class="form-floating"  id="Barra_Pesquisa_NavBar">
       
                  <input type="text" class="form-control" id="floatingSearch" placeholder="Pesquisar..." onChange={gerirBarraPesquisa}/>
                  <label class="labelParaDesktop" for="floatingSearch">Encontre os melhores produtos para o seu bebe...</label>
                  <label class="labelParaMobile" for="floatingSearch">Melhores produtos p/ o seu bebe...</label>
        
                </div>
             
                <button onClick={refreshPage}  type="button" id="botao_navbar_buscar" class="btn">
                  <i class="fas fa-search"></i>
                </button>
         
              </div>
            </div>
            <div class="PrimeiraLinhaItem " style={{display:"flex"}} >
            
            <div class="ms-0 mt-0.25 dropdown">
              <button class="btn btn-secondary " type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="far fa-user fa-2x"></i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {utilizadorAtual == null && (
                <>
                <li>
                  <Link to="/registrar">
                    <a class="dropdown-item" >Criar Conta</a>
                  </Link>
                </li>
                <li>
                  <Link to="/login">
                    <a class="dropdown-item" >Login</a>
                  </Link>
                </li>

                </>
              )}
              {utilizadorAtual != null && (
                <>
              
                <li>
                <Link to="/gerirContaEditar">
                    <a class="dropdown-item" >Gerir Conta</a>
                </Link>
                </li>
                <li><hr class="dropdown-divider"/></li>
                <Link to="/gerirConta">
                    <a class="dropdown-item" >Acompanhar meus Pedidos</a>
                </Link>
                <li><hr class="dropdown-divider"/></li>
                <li>
                  <a class="dropdown-item"style={{cursor:"pointer"}}  onClick={() => gerirLogout()}>Logout</a>
                </li>
                </>
              )}
              </ul>
            </div>

              
                <div class="ms-0 mt-1 justify-self-center iconCarrinhoNavbar">
                  <Badge badgeContent={carrinho_quantidade} color="primary">
                  <Link to="/carrinho">
                    <ShoppingCartOutlined style={{ fontSize: "2.4em" }} />
                    </Link>
                  </Badge>
                </div>
              

            </div>

          
        </div>
        <nav class="d-flex justify-content-center navbar navbar-expand-lg navbar-dark bg-primary" id="segundaLinhaNavBar">
          <div class="container-flex">
          
            <button class="navbar-toggler"  id="containerHamburgerMenu" type="button" data-bs-toggle="collapse" data-bs-target="#main_nav" onClick={gerirClique}>
              <span class="navbar-toggler-icon" ></span>
            </button>

            <div class="collapse navbar-collapse segundaLinhaItem" id="main_nav">
                <ul class="navbar-nav ">
                  <li class="nav-item active ">
                    <a class="nav-link" href="/produtos/New in">New in </a>
                  </li>                
                  <li class="nav-item dropdown has-megamenu ">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      Meninas
                    </a>
                    <div class="dropdown-menu megamenu" role="menu">
                      <div class="row g-3">
                        <div class="col-lg-3 col-6">
                          <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Recém Nascida</h6>
                            <p class="infoTituloMegaMenu">( 0 Meses até 12 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menina?Recém Nascida">Tudo</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Calças %26 Calções">Calças & Calções</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Blusas %26 Bodys">Blusas & Bodys</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Fatos %26 BabyGrow">Fatos & BabyGrow</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Mantas %26 Sacos">Mantas & Sacos</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Calçado">Calçado</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Gorros %26 Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Interiores">Interiores</a></li>
                              <li><a href="/produtos/Menina?Recém Nascida?Acessórios">Acessórios</a></li>

                            </ul>
                          </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Bebé Menina</h6>
                            <p class="infoTituloMegaMenu">( 3 Meses até 36 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menina?Bebé?">Tudo</a></li>
                              <li><a href="/produtos/Menina?Bebé?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menina?Bebé?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menina?Bebé?Saias %26 Calções">Saias & Calções</a></li>
                              <li><a href="/produtos/Menina?Bebé?Camisas %26 T-shirts">Camisas & T-shirts</a></li>
                              <li><a href="/produtos/Menina?Bebé?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menina?Bebé?Blusões">Blusões</a></li>
                              <li><a href="/produtos/Menina?Bebé?Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menina?Bebé?Gorros %26 Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menina?Bebé?Acessórios">Acessórios</a></li>


                            </ul>
                        </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Menina</h6>
                            <p class="infoTituloMegaMenu">( 4 Anos até 16 Anos )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menina?Criança?">Tudo</a></li>
                              <li><a href="/produtos/Menina?Criança?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menina?Criança?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menina?Criança?Saias %26 Calções">Saias & Calções</a></li>
                              <li><a href="/produtos/Menina?Criança?Camisas %26 T-shirts">Camisas & T-shirts</a></li>
                              <li><a href="/produtos/Menina?Criança?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menina?Criança?Blusões">Blusões</a></li>
                              <li><a href="/produtos/Menina?Criança?Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menina?Criança?Acessórios">Acessórios</a></li>
                              <li><a href="/produtos/Menina?Criança?Gorros %26 Toucas">Gorros & Toucas</a></li>

                            </ul>
                        </div>

                        </div>
                        <div class="col-lg-3 col-6 imagemNavBarMegaMenuMenina">
                          <div class="col-megamenu">
              
                            <h6 class="tituloMegaMenu"></h6>
                            <ul class="list-unstyled">



                            </ul>
            
                          </div>

                        </div>

                      </div>

                    </div>

                  </li>
                  <li class="nav-item dropdown has-megamenu">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      Meninos
                    </a>
                    <div class="dropdown-menu megamenu" role="menu">
                      <div class="row g-3">
                        <div class="col-lg-3 col-6">
                          <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Recém Nascido</h6>
                            <p class="infoTituloMegaMenu">( 0 Meses até 12 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menino?Recém Nascido?">Tudo</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Calças & Calções">Calças & Calções</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Casacos & Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Blusas & Bodys">Blusas & Bodys</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Fatos & BabyGrow">Fatos & BabyGrow</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Mantas & Sacos">Mantas & Sacos</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Calçado">Calçado</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Gorros & Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Interiores">Interiores</a></li>
                              <li><a href="/produtos/Menino?Recém Nascido?Acessórios">Acessórios</a></li>

                            </ul>
                          </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Bebé Menino</h6>
                            <p class="infoTituloMegaMenu">( 3 Meses até 36 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menino?Bebé?">Tudo</a></li>
                              <li><a href="/produtos/Menino?Bebé?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menino?Bebé?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menino?Bebé?Saias & Calções">Saias & Calções</a></li>
                              <li><a href="/produtos/Menino?Bebé?Camisas & T-shirts">Camisas & T-shirts</a></li>
                              <li><a href="/produtos/Menino?Bebé?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menino?Bebé?Blusões">Blusões</a></li>
                              <li><a href="/produtos/Menino?Bebé?Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menino?Bebé?Acessórios">Acessórios</a></li>
                              <li><a href="/produtos/Menino?Bebé?Gorros %26 Toucas">Gorros & Toucas</a></li>

                            </ul>
                        </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Menino</h6>
                            <p class="infoTituloMegaMenu">( 4 Anos até 16 Anos )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menino?Criança?">Tudo</a></li>
                              <li><a href="/produtos/Menino?Criança?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menino?Criança?Calças %26 Calções">Calças & Calções</a></li>
                              <li><a href="/produtos/Menino?Criança?Camisas %26 Polos">Camisas & Polos</a></li>
                              <li><a href="/produtos/Menino?Criança?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menino?Criança?T-shirt">T-shirt</a></li>
                              <li><a href="/produtos/Menino?Criança?Blusões">Blusões</a></li>
                              <li><a href="/produtos/Menino?Criança?Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menino?Criança?Gorros %26 Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menino?Criança?Acessórios">Acessórios</a></li>

                            </ul>
                        </div>

                        </div>
                        <div class="col-lg-3 col-6 imagemNavBarMegaMenuMenino">
                          <div class="col-megamenu">
                            <h6 class="tituloMegaMenu"></h6>
                            <ul class="list-unstyled">

                            </ul>
                          </div>

                        </div>

                      </div>

                    </div>

                  </li>
                  <li class="nav-item dropdown has-megamenu">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      Cerimonias
                    </a>
                    <div class="dropdown-menu megamenu" role="menu">
                      <div class="row g-3">
                        <div class="col-lg-3 col-6">
                          <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Cerimonia Bebe</h6>
                            
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?">Tudo</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?Camisas %26 Blusas">Camisas & Blusas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?Calções %26 Tapa-Fraldas">Calções & Tapa-Fraldas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?Fofos">Fofos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?Casacos">Casacos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?Toucas">Toucas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?Calçado">Calçado</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Bebé?Acessórios">Acessórios</a></li>

                            </ul>
                          </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Cerimonia Junior</h6>
                            
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?">Tudo</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Calças %26 Calções">Calças & Calções</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Camisas %26 Blusas">Camisas & Blusas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Macacão">Macacão</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Casacos %26 Blazers">Casacos & Blazers</a></li> 
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Calçado">Calçado</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Acessórios">Acessórios</a></li>

                            </ul>
                        </div>

                        </div>
                        <div class="col-lg-3 col-6">
                          </div>
                        <div class="col-lg-3 col-6 imagemNavBarMegaMenuCerimonias">
                        <div class="col-megamenu">

                        </div>

                        </div>

                      </div>

                    </div>

                  </li>
                  <li class="nav-item dropdown has-megamenu">
                    <a
                      class="nav-link dropdown-toggle"
                      href="#"
                      data-bs-toggle="dropdown"
                    >
                      Marcas
                    </a>
                    <div class="dropdown-menu megamenu" role="menu">
                      <div class="row g-3">
                        <div class="col-lg-3 col-6">
                          <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Marcas parceiras da BabyConcept</h6>
                            
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Marcas#undefined#Paz Rodrigues"  onClick={refreshPage}>Paz Rodrigues</a></li>
                              <li><a href="/produtos/Marcas#undefined#Pangasa" onClick={refreshPage}>Pangasa</a></li>
                              <li><a href="/produtos/Marcas#undefined#Foque"  onClick={refreshPage}>Foque</a></li>
                              <li><a href="/produtos/Marcas#undefined#Tous Baby"  onClick={refreshPage}>Tous Baby</a></li>
                              <li><a href="/produtos/Marcas#undefined#Dr.Kids"  onClick={refreshPage}>Dr.Kids</a></li>
                              <li><a href="/produtos/Marcas#undefined#Cambrass" onClick={refreshPage}>Cambrass</a></li>

                            </ul>
                          </div>

                        </div>
                        <div class="col-lg-3 col-6">
                    </div>
                    <div class="col-lg-3 col-6">
                    </div>
                    <div class="col-lg-3 col-6 imagemNavBarMegaMenuMarcas">
                    </div>


                      </div>

                    </div>


                  </li>
                  
                  <li class="nav-item">
                    <a class="nav-link" href="/produtos/Puericultura"> Puericultura </a>
                  </li>



                  <li class="nav-item">
                    <a class="nav-link" id="saldosNavLink" href="/produtos/Saldo"> Saldos </a>
                  </li>

                </ul>

              </div>

  

          </div> 
          <Link class="logoTipografia2" to="/">
              <Typography
              
                id="Marca_BabyConcept_NavBar_MOBILE"
                variant="h5"
                noWrap
                component="div"
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                THE BABY CONCEPT
              </Typography>
              </Link>


    
        </nav>
      </div>
      </>
    );
  
}
export default Navbar;