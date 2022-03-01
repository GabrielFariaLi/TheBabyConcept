import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  AddShoppingCartOutlined
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "./css/produtoItem.css";


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





const Image = styled.img`
  height: 75%;
  z-index: 2;
`;


const StyledLink = styled(Link)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;


const ProdutoItem = ({item}) => {
  return (
    <div data-aos="zoom-out" className="container mt-5" id="containerProdutosCarousel">

      <div className="carousel" style={{ justifyContent: "center"}} >

      <div className="item" id="itemProdutosCarousel" key={item._id}>
        <div className="image" id="imagemProdutoCarousel">
          <StyledLink to={`/detalhesProduto/${item._id}`} style={{ textDecoration: 'none' }}>
            <img class="imagemProduto" src={item.img} alt={item.titulo} />
          </StyledLink>
          <Info className="infoProdutoCarousel">
            <Icon>
            <StyledLink to={`/detalhesProduto/${item._id}`} style={{ textDecoration: 'none' }}>
              <ShoppingCartOutlined/>
              </StyledLink>
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
              <StyledLink to={`/detalhesProduto/${item._id}`} >
              <div class="d-flex justify-content-start divBotoesProdutoItem">
        
                <button class="botaoComprarProduto">Compre agora</button> 
              
                <button class="botaoComprarProduto2 ms-5"><AddShoppingCartOutlined/></button>
  
              </div>
              </StyledLink>
          </div>
      </div>

      </div>
      </div>
    
  )
}

export default ProdutoItem
