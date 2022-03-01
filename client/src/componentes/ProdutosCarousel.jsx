import { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  AddShoppingCartOutlined,
  ArrowForwardOutlined,
  ArrowBackOutlined
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./css/produtosCarousel.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js' ;

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
  z-index:1000;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const ImagemProduto = styled.img`
`;


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const ProdutosCarousel = ({categoria, filtros, organizar}) => {

  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const carousel = useRef(null);

  const axiosInstancia = axios.create({baseURL: process.env.REACT_APP_API_URL})

  useEffect(() => {
    const getProdutos = async ()=> {
      try{
        const res = await axiosInstancia.get(
          categoria
            ? `http://localhost:5000/api/produto?categoria=${categoria}`
            : `http://localhost:5000/api/produto`
        );
        setProdutos(res.data);
        //console.log(res)
      } catch(err) {}
    };
    getProdutos()
  }, [categoria]) // dependencias

  useEffect(() => {
    //console.log(' categoria-> ' + categoria + ' produtos-> ' + produtos + ' filtros-> ' + filtros)
    categoria && 
      setProdutosFiltrados(
        // vasculhamos todos os produtos e todos os elemntos do array "filtros" para acharmos um match entre eles, se houver, iremos exibir o produto.
        produtos.filter((item) => 
          Object.entries(filtros).every(([key,value]) =>
          item[key].includes(value)
          )
        )
      );
  }, [categoria, filtros, produtos]) // dependencias

  const handleLeftClick = (e) => {
    e.preventDefault();
    carousel.current.scrollLeft -= carousel.current.offsetWidth;
  };

  const handleRightClick = (e) => {
    e.preventDefault();
  
    carousel.current.scrollLeft += carousel.current.offsetWidth;
  };

  if (!produtos || !produtos.length) return null;
  //{console.log(produtosFiltrados)}
  return (  
    
  <div data-aos="fade-right"

  data-aos-easing="ease-in-sine" className="container mt-5" id="containerProdutosCarousel">

  <div className="carousel" data-interval='8000' ref={carousel}>
    {
    categoria 
    ? produtosFiltrados.map((item) => {
    
      return (
        <StyledLink to={`/detalhesProduto/${item._id}`} style={{ textDecoration: 'none' }}>
        <div className="item" id="itemProdutosCarousel" key={item._id}>
          <div className="image" id="imagemProdutoCarousel">
            <img class="imagemProduto" src={item.img} alt={item.titulo} />
            <Info className="infoProdutoCarousel">
              <Icon>
                <ShoppingCartOutlined/>
              </Icon>
              <Icon>
                <Link to={`/detalhesProduto/${item._id}`}>
                <SearchOutlined/>
                </Link>
              </Icon>

            </Info>
          </div>
          <div className="info">
          <div className="name"><div class="align-self-center">{item.titulo}</div></div>
            {item.precoAntigo ? 
              <div class="d-flex justify-content-start align-content-center">
                <p class="precoAntigo">
                  EUR€ {item.precoAntigo  } 
                </p>
                <p class="desconto">
                  - {((item.precoAntigo - item.preco) / item.precoAntigo * 100).toFixed(0) }%
                </p>
              </div>
              :
              <div class="espacamentoSemSaldo"></div>}
              <p class="precoAtual">
                EUR€ {(item.preco)} 
              </p>
              <div class="d-flex justify-content-start divBotoesProdutoItem">
                <button class="botaoComprarProduto">Compre agora</button> 
                <button class="botaoComprarProduto2 ms-5"><AddShoppingCartOutlined/></button>
              </div>
          </div>
        </div>
        </StyledLink>
      );
    })
  : produtos.map((item) => {
    
    return (
      <StyledLink to={`/detalhesProduto/${item._id}`} style={{ textDecoration: 'none' }}>
      <div className="item" id="itemProdutosCarousel" key={item._id}>
        <div className="image" id="imagemProdutoCarousel">
          <img class="imagemProduto" src={item.img} alt={item.titulo} />
          <Info className="infoProdutoCarousel">
            <Icon>
              <ShoppingCartOutlined/>
            </Icon>
            <Icon>
              <Link to={`/detalhesProduto/${item._id}`}>
              <SearchOutlined/>
              </Link>
            </Icon>
    
          </Info>
        </div>
        <div className="info">
        <div className="name"><div class="align-self-center">{item.titulo}</div></div>
            {item.precoAntigo ? 
              <div class="d-flex justify-content-start align-content-center">
                <p class="precoAntigo">
                  EUR€ {item.precoAntigo  } 
                </p>
                <p class="desconto">
                  - {((item.precoAntigo - item.preco) / item.precoAntigo * 100).toFixed(0) }%
                </p>
              </div>
              :
              <div class="espacamentoSemSaldo"></div>}
              <p class="precoAtual">
                EUR€ {(item.preco)} 
              </p>
              <div class="d-flex justify-content-start divBotoesProdutoItem">
                <button class="botaoComprarProduto">Compre agora</button> 
                <button class="botaoComprarProduto2 ms-5"><AddShoppingCartOutlined/></button>
              </div>
          </div>
      </div>
      </StyledLink>
    );
  }) }


  </div>
  <div className="buttons mb-5">
    <button class="me-2 buttonLeft" onClick={handleLeftClick}>
      <div class="backgroundArrow">
        <ArrowBackOutlined/>   
      </div>
    </button>
    <button  class="ms-2 buttonRight" onClick={handleRightClick}>
      <div class="backgroundArrow">
        <ArrowForwardOutlined/>    
      </div>
    </button>
  </div>
  <br/>
  <div class="carousel-indicators ">
    <button type="button" data-bs-target="#containerProdutosCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#containerProdutosCarousel" data-bs-slide-to="1" aria-label="Slide 2" onClick={handleRightClick}></button>
    <button type="button" data-bs-target="#containerProdutosCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
</div>
  );
};

export default ProdutosCarousel;
