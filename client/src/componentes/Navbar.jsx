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
                  <label class="labelParaMobile" for="floatingSearch">Pesquise aqui...</label>
        
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
                            <h6 class="tituloMegaMenu">Rec??m Nascida</h6>
                            <p class="infoTituloMegaMenu">( 0 Meses at?? 12 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="http://153.92.221.32/produtos/Menina?Rec??m Nascida">Tudo</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Cal??as %26 Cal????es">Cal??as & Cal????es</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Blusas %26 Bodys">Blusas & Bodys</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Fatos %26 BabyGrow">Fatos & BabyGrow</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Mantas %26 Sacos">Mantas & Sacos</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Cal??ado">Cal??ado</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Gorros %26 Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Interiores">Interiores</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Acess??rios">Acess??rios</a></li>

                            </ul>
                          </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Beb?? Menina</h6>
                            <p class="infoTituloMegaMenu">( 3 Meses at?? 36 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menina?Beb???">Tudo</a></li>
                              <li><a href="/produtos/Menina?Beb???Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menina?Beb???Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menina?Beb???Saias %26 Cal????es">Saias & Cal????es</a></li>
                              <li><a href="/produtos/Menina?Beb???Camisas %26 T-shirts">Camisas & T-shirts</a></li>
                              <li><a href="/produtos/Menina?Beb???Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menina?Beb???Blus??es">Blus??es</a></li>
                              <li><a href="/produtos/Menina?Beb???Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menina?Beb???Gorros %26 Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menina?Beb???Acess??rios">Acess??rios</a></li>


                            </ul>
                        </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Menina</h6>
                            <p class="infoTituloMegaMenu">( 4 Anos at?? 16 Anos )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menina?Crian??a?">Tudo</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Saias %26 Cal????es">Saias & Cal????es</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Camisas %26 T-shirts">Camisas & T-shirts</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Blus??es">Blus??es</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Acess??rios">Acess??rios</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Gorros %26 Toucas">Gorros & Toucas</a></li>

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
                            <h6 class="tituloMegaMenu">Rec??m Nascido</h6>
                            <p class="infoTituloMegaMenu">( 0 Meses at?? 12 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menino?Rec??m Nascido?">Tudo</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Cal??as & Cal????es">Cal??as & Cal????es</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Casacos & Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Blusas & Bodys">Blusas & Bodys</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Fatos & BabyGrow">Fatos & BabyGrow</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Mantas & Sacos">Mantas & Sacos</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Cal??ado">Cal??ado</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Gorros & Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Interiores">Interiores</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Acess??rios">Acess??rios</a></li>

                            </ul>
                          </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Beb?? Menino</h6>
                            <p class="infoTituloMegaMenu">( 3 Meses at?? 36 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menino?Beb???">Tudo</a></li>
                              <li><a href="/produtos/Menino?Beb???Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menino?Beb???Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menino?Beb???Saias & Cal????es">Saias & Cal????es</a></li>
                              <li><a href="/produtos/Menino?Beb???Camisas & T-shirts">Camisas & T-shirts</a></li>
                              <li><a href="/produtos/Menino?Beb???Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menino?Beb???Blus??es">Blus??es</a></li>
                              <li><a href="/produtos/Menino?Beb???Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menino?Beb???Acess??rios">Acess??rios</a></li>
                              <li><a href="/produtos/Menino?Beb???Gorros %26 Toucas">Gorros & Toucas</a></li>

                            </ul>
                        </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Menino</h6>
                            <p class="infoTituloMegaMenu">( 4 Anos at?? 16 Anos )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menino?Crian??a?">Tudo</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Cal??as %26 Cal????es">Cal??as & Cal????es</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Camisas %26 Polos">Camisas & Polos</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menino?Crian??a?T-shirt">T-shirt</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Blus??es">Blus??es</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Gorros %26 Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Acess??rios">Acess??rios</a></li>

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
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???">Tudo</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Camisas %26 Blusas">Camisas & Blusas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Cal????es %26 Tapa-Fraldas">Cal????es & Tapa-Fraldas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Fofos">Fofos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Casacos">Casacos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Toucas">Toucas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Cal??ado">Cal??ado</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Acess??rios">Acess??rios</a></li>

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
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Cal??as %26 Cal????es">Cal??as & Cal????es</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Camisas %26 Blusas">Camisas & Blusas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Macac??o">Macac??o</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Casacos %26 Blazers">Casacos & Blazers</a></li> 
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Cal??ado">Cal??ado</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Acess??rios">Acess??rios</a></li>

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
      <div class="navegadorTotalMobile">

        <nav class="d-flex justify-content-center navbar navbar-expand-lg navbar-dark bg-primary" id="segundaLinhaNavBar">
          <Link class="ms-2 logoTipografia2" to="/">
              <Typography
              
                id="Marca_BabyConcept_NavBar_MOBILE"
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'flex', sm: 'none' } }}
              >
                THE BABY CONCEPT
              </Typography>
          </Link>

          <div class="PrimeiraLinhaItem " style={{display:"flex", marginLeft:"auto"}} >
            
            <div class="ms-2 mt-0.25 dropdown ">
              <button  class="btn btn-secondary" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                <i style={{color:"#f7f7f7",fontSize:"26px"}} class="far fa-user fa-2x"></i>
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

              
                <div  class="iconMobileNavBar ms-0 mt-1 me-4 justify-self-center iconCarrinhoNavbar">
                  <Badge badgeContent={carrinho_quantidade} color="primary">
                  <Link to="/carrinho">
                    <ShoppingCartOutlined style={{ fontSize: "2.0em",color:"#f7f7f7" }} />
                    </Link>
                  </Badge>
                </div>
              

            </div>

          <div style={{marginLeft:"auto"}} class="container-flex ">
            
            
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
                            <h6 class="tituloMegaMenu">Rec??m Nascida</h6>
                            <p class="infoTituloMegaMenu">( 0 Meses at?? 12 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="http://153.92.221.32/produtos/Menina?Rec??m Nascida">Tudo</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Cal??as %26 Cal????es">Cal??as & Cal????es</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Blusas %26 Bodys">Blusas & Bodys</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Fatos %26 BabyGrow">Fatos & BabyGrow</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Mantas %26 Sacos">Mantas & Sacos</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Cal??ado">Cal??ado</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Gorros %26 Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Interiores">Interiores</a></li>
                              <li><a href="/produtos/Menina?Rec??m Nascida?Acess??rios">Acess??rios</a></li>

                            </ul>
                          </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Beb?? Menina</h6>
                            <p class="infoTituloMegaMenu">( 3 Meses at?? 36 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menina?Beb???">Tudo</a></li>
                              <li><a href="/produtos/Menina?Beb???Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menina?Beb???Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menina?Beb???Saias %26 Cal????es">Saias & Cal????es</a></li>
                              <li><a href="/produtos/Menina?Beb???Camisas %26 T-shirts">Camisas & T-shirts</a></li>
                              <li><a href="/produtos/Menina?Beb???Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menina?Beb???Blus??es">Blus??es</a></li>
                              <li><a href="/produtos/Menina?Beb???Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menina?Beb???Gorros %26 Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menina?Beb???Acess??rios">Acess??rios</a></li>


                            </ul>
                        </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Menina</h6>
                            <p class="infoTituloMegaMenu">( 4 Anos at?? 16 Anos )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menina?Crian??a?">Tudo</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Saias %26 Cal????es">Saias & Cal????es</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Camisas %26 T-shirts">Camisas & T-shirts</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Blus??es">Blus??es</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Acess??rios">Acess??rios</a></li>
                              <li><a href="/produtos/Menina?Crian??a?Gorros %26 Toucas">Gorros & Toucas</a></li>

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
                            <h6 class="tituloMegaMenu">Rec??m Nascido</h6>
                            <p class="infoTituloMegaMenu">( 0 Meses at?? 12 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menino?Rec??m Nascido?">Tudo</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Cal??as & Cal????es">Cal??as & Cal????es</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Casacos & Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Blusas & Bodys">Blusas & Bodys</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Fatos & BabyGrow">Fatos & BabyGrow</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Mantas & Sacos">Mantas & Sacos</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Cal??ado">Cal??ado</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Gorros & Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Interiores">Interiores</a></li>
                              <li><a href="/produtos/Menino?Rec??m Nascido?Acess??rios">Acess??rios</a></li>

                            </ul>
                          </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Beb?? Menino</h6>
                            <p class="infoTituloMegaMenu">( 3 Meses at?? 36 Meses )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menino?Beb???">Tudo</a></li>
                              <li><a href="/produtos/Menino?Beb???Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menino?Beb???Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Menino?Beb???Saias & Cal????es">Saias & Cal????es</a></li>
                              <li><a href="/produtos/Menino?Beb???Camisas & T-shirts">Camisas & T-shirts</a></li>
                              <li><a href="/produtos/Menino?Beb???Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menino?Beb???Blus??es">Blus??es</a></li>
                              <li><a href="/produtos/Menino?Beb???Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menino?Beb???Acess??rios">Acess??rios</a></li>
                              <li><a href="/produtos/Menino?Beb???Gorros %26 Toucas">Gorros & Toucas</a></li>

                            </ul>
                        </div>

                        </div>

                        <div class="col-lg-3 col-6">
                        <div class="col-megamenu">
                            <h6 class="tituloMegaMenu">Menino</h6>
                            <p class="infoTituloMegaMenu">( 4 Anos at?? 16 Anos )</p>
                            <ul class="list-unstyled">
                              <li><a href="/produtos/Menino?Crian??a?">Tudo</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Cal??as %26 Cal????es">Cal??as & Cal????es</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Camisas %26 Polos">Camisas & Polos</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Casacos %26 Camisolas">Casacos & Camisolas</a></li>
                              <li><a href="/produtos/Menino?Crian??a?T-shirt">T-shirt</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Blus??es">Blus??es</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Sapatos">Sapatos</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Gorros %26 Toucas">Gorros & Toucas</a></li>
                              <li><a href="/produtos/Menino?Crian??a?Acess??rios">Acess??rios</a></li>

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
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???">Tudo</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Conjuntos">Conjuntos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Vestidos">Vestidos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Camisas %26 Blusas">Camisas & Blusas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Cal????es %26 Tapa-Fraldas">Cal????es & Tapa-Fraldas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Fofos">Fofos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Casacos">Casacos</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Toucas">Toucas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Cal??ado">Cal??ado</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Beb???Acess??rios">Acess??rios</a></li>

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
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Cal??as %26 Cal????es">Cal??as & Cal????es</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Camisas %26 Blusas">Camisas & Blusas</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Macac??o">Macac??o</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Casacos %26 Blazers">Casacos & Blazers</a></li> 
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Cal??ado">Cal??ado</a></li>
                              <li><a href="/produtos/Cerimonias?Cerimonia Junior?Acess??rios">Acess??rios</a></li>

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


    
        </nav>
        <div class="containerPesquisaMobile d-flex">
          <div class="form-floating"  style={{width:"100%",position:"relative"}}  id="Barra_Pesquisa_NavBar">
            
            <input type="text" class="form-control" id="floatingSearch" placeholder="Pesquisar..." onChange={gerirBarraPesquisa}/>
    
            <label class="labelParaMobile" for="floatingSearch">Pesquise aqui...</label>
            <i onClick={refreshPage} style={{position:"absolute",right:15,top:20,bottom:0,color:"#9DB9CE"}} class="fas fa-search"></i>
          </div>

         

        </div>
      </div>
      </>
    );
  
}
export default Navbar;