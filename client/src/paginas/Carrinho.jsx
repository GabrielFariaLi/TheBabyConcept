import styled from 'styled-components'
import React from 'react';
import Anuncios from '../componentes/Anuncios';
import Footer from '../componentes/Footer';
import Navbar from '../componentes/Navbar';
import { Add, Remove, Visibility } from '@material-ui/icons';
import {mobile} from "../responsivel"
import { useSelector } from 'react-redux';
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router";
import { adicionarProduto,atualizarProduto,excluirProduto } from "../redux/carrinhoRedux";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMetodos";
import axios from "axios";
import "../componentes/css/carrinho.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { Link } from "react-router-dom";
import Copyright from '../componentes/Copyright';

import {calculoFrete} from "../data"

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

calculoFrete.sort(function (a, b) {
  return a.pais - b.pais;
})


const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;

`;

const Titulo = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 413px), (max-width:821px) {
    padding: 20px 20px 20px 0px;
  }

`;

const TopButton = styled.button`
  font-family: 'Poppins', sans-serif !important;
  margin-left:90px;
  padding: 0px;
  font-weight: 600;

  border:0;
  cursor: pointer;
  border-bottom: 3px solid #0B3C49;
  padding-bottom: 1px;
  background-color: #f7f7f7;
  color: #141414;
  @media (max-width: 413px) , (max-width:821px) {
    margin-left:0px;
  }
`;

const TopTexts = styled.div`
${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 413px) , (max-width:821px) {

    flex-direction:column;

  }

`;

const Info = styled.div`
  flex: 3;
`;

const Produto = styled.div`
  display: flex;

  justify-content: space-between;
    @media (max-width: 413px)  {

    flex-direction:column;
    
  }
`;

const DetalheProduto = styled.div`

  margin-bottom:40px;
  margin-left:110px;
  flex: 2;
  display: flex;

  @media (max-width: 821px)  {
    margin-bottom: 0px;
    margin-left: 0px;


}

  @media (max-width: 413px)  {
    margin-bottom: 0px;
    margin-left: 0px;
    flex-direction:column;

}
`;

const Image = styled.img`
box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  border-radius: 4px;
  width: 200px;
`;

const Detalhes = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 413px) {
    padding: 20px 20px 20px 0px;
  }
`;

const NomeProduto = styled.span`
  font-size:24px;
`;

const IdProduto = styled.span`
  @media (max-width: 413px) {
    
    margin-bottom:5px;

  };
  `;

const CorProduto = styled.div`

  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${
    (props) => 
    props.color === 'Branco' && 'white' || 
    props.color === 'Amarelo' && 'yellow' || 
    props.color === 'Preto' && 'black' || 
    props.color === 'Vermelho' && 'red' || 
    props.color === 'Azul' && 'blue' || 
    props.color === 'Roxo' && 'purple' || 

    'pink'
  };


  @media (max-width: 413px) {

    margin-bottom:5px;

  };

`;

const TamanhoProduto = styled.span``;

const DetalhePreco = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom:30px;
  @media (max-width: 440px){
display: none;
  }
`;

const QuantidadeProdutoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const QuantidadeProduto = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const PrecoProduto = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Sumario = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SumarioTitulo = styled.h1`
  font-weight: 200;
  text-align: center;
`;

const SumarioItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SumarioItemTexto = styled.span``;

const SumarioItemPreco = styled.span``;

const Button = styled.button`
  width: 100%;
border-radius: 4px;
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: #0B3C49;
  color: white;
  font-weight: 600;
`;


const Carrinho = () => {

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [])


  const dispatch = useDispatch();
  const utilizadorAtual = useSelector(estado => estado.utilizador.utilizadorAtual)
  const carrinho = useSelector(estado => estado.carrinho); // referencia ao reducer do loja.js
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const [idsUnicos, setIDsUnicos] = useState();
  const [produtos, setProdutos] = useState([]);
  const [paisEscolhido, setPaisEscolhido] = useState("");
  const [vprecoTaxaEntrega, setPrecoTaxaEntrega] = useState([]);
  const [quantidadeNova, setQuantidadeNova] = useState();
  const produtosUnicosArrayInicial = [];
  const [produtosUnicos,setProdutosUnicos] = useState(produtosUnicosArrayInicial)
  

  const onToken = (token) => {
    setStripeToken(token);
  };

  
const gerirDeletarProduto = (data) => {
  // atualizar CARRINHO


    dispatch(excluirProduto(data))
  
  
};
const checarPaisEscolhido = () => {
  if(!paisEscolhido) {
    Swal.fire({
      icon: 'warning',
      title: 'Oops... falta uma coisinha',
      confirmButtonColor: '#0B3C49',
      text: 'Primeiro escolha um páis para o calculo de frete :)',
      confirmButtonText: 'ok'
    })
  }
}
  const checarCadastro = () => {
    if(!utilizadorAtual){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        confirmButtonColor: '#0B3C49',
        html: 'É preciso estar <b>autenticado</b> para finalizar uma compra!',
        confirmButtonText: '<a href="/login" style="">Entre em sua conta!</a>',
        showCloseButton: true,
        footer: '<a href="/registrar" style="color:#0000EE!important">Crie aqui uma conta!</a>'
      })


    } 
  };

  const atualizarEstoque = () => {

    carrinho.produtos.forEach((carrinhoProdutosUnicos) => {
      const atualizarQuantidade = async () => {
        try {
          const res = await userRequest.put(`/produto/atualizarVariacao/${carrinhoProdutosUnicos.variacoes[0].id_variacao}/${carrinhoProdutosUnicos.variacoes[0].quantidade_depois_compra}`);
          console.log(res.data) 
        } catch {}
      }
      atualizarQuantidade();
    })
  };



  const gerirPais = (e) => {
    setPaisEscolhido(e.target.value);

    console.log(paisEscolhido)

  };


  useEffect(() => {

    const gerirPreco = (e) => {
      setPrecoTaxaEntrega(document.getElementById("precoTaxaEntrega")?.innerHTML)
      console.log(vprecoTaxaEntrega)
    };
    gerirPreco();
  }, [paisEscolhido]); 
  


  useEffect(() => {

    const fazerPedido = async () => {
      try {
        const res = await userRequest.post("/checkout/pagamento", {
          tokenId: stripeToken.id,
          amount: (+carrinho.total + +vprecoTaxaEntrega) * 100,
        });
        console.log(res.data) 
        navigate("/sucesso", {
          replace: true,
          state: {
            stripeData: res.data,
            produtos: carrinho,
          },
        })

        atualizarEstoque();
      } catch {}
    };
    stripeToken && carrinho.total >= 1 && fazerPedido();

  }, [stripeToken, carrinho.total, navigate]); 


  
  return (
    <Container style={{backgroundColor: "#f7f7f7"}}>
      <Navbar/>
      <Anuncios/>
      <Wrapper>
        <Titulo>SEU CARRINHO</Titulo>
        <Top>
          <Link to ="/">
            <TopButton>Continue comprando</TopButton>
          </Link>
          <TopTexts> 

            <TopText style={{visibility:"hidden"}}>Carrinho de compra(2)</TopText>
            <TopText style={{visibility:"hidden"}}>Sua Lista de Desejo(2)</TopText>

          </TopTexts>

          <TopButton style={{visibility:"hidden"}}type="filled"></TopButton>
      
        </Top>
        <Bottom>
          <Info>
          {carrinho.produtos.map((produto) => (                                   
           
              <Produto>
                <DetalheProduto>
                  <Image src={produto.img} />
                  <Detalhes>
                    <NomeProduto>
                      <b>Produto:</b> {produto.titulo}
                    </NomeProduto>
                    <IdProduto>
                      <b>ID:</b> {produto._id}
                    </IdProduto>
                    <b>Cor <b class="quantidadeCompraMobile" > Qnt: {produto.quantidade} <b class="precoCompraMobile" > $ {produto.preco * produto.quantidade}</b></b></b>
                    <span><CorProduto color={produto.variacoes[0].cor} > </CorProduto></span>
                    <TamanhoProduto>
                      <b>Tamanho:</b> {produto.variacoes[0].tamanho}
                    </TamanhoProduto>
                  </Detalhes>
                </DetalheProduto>
                <DetalhePreco>
                  <QuantidadeProdutoContainer>
                    Qnt: 
                    <QuantidadeProduto>{produto.quantidade}</QuantidadeProduto>

                  </QuantidadeProdutoContainer>
                  <PrecoProduto>
                    $ {produto.preco * produto.quantidade}
                  </PrecoProduto>
                </DetalhePreco>
              </Produto>
            ))}
            <Hr />
          </Info>
          <Sumario>
          <SumarioTitulo>Resumo do Pedido</SumarioTitulo>
            <SumarioItem>
              <SumarioItemTexto>Subtotal</SumarioItemTexto>
              <SumarioItemPreco>$ {carrinho.total}</SumarioItemPreco>
            </SumarioItem>
            <SumarioItem>
              <SumarioItemTexto>Selecione o seu país</SumarioItemTexto>
              <select  onChange={gerirPais} style={{borderRadius:"4px"}}   id="selectPaisTaxaEntrega">  
              <option selected disabled>---</option>
              {calculoFrete.map(item => ( 

                <>
                <option  data-preco={item.opcoes.preco}  class="d-flex align-items-center ">  
                
                {item.pais}
     

                </option>

                </> 

                ))
              }

              


              </select>
            </SumarioItem>
            <SumarioItem>
              <SumarioItemTexto>Custo de entrega</SumarioItemTexto>
              {calculoFrete.map(item => ( 

       
              item.pais === paisEscolhido &&
              <SumarioItemPreco id="precoTaxaEntrega">{item.opcoes.preco}</SumarioItemPreco>


              ))
              }
         
            </SumarioItem>

            <SumarioItem type="total">
              <SumarioItemTexto>Total</SumarioItemTexto>
              <SumarioItemPreco>$ {(+carrinho.total + +vprecoTaxaEntrega)}</SumarioItemPreco>
            </SumarioItem>

            {utilizadorAtual && paisEscolhido !== "" ? <div >
            <StripeCheckout
              className="StripeCheckoutModalCarrinho"
              name="TheBabyConcept Shop"
              image="https://i.ibb.co/3Th6xP2/Logo-sozinha-png.png"
              billingAddress
              shippingAddress
              description={`O valor total das compras foi de $${(+carrinho.total + +vprecoTaxaEntrega)}`}
              amount={(+carrinho.total + +vprecoTaxaEntrega) * 100} // 100 pq o stripe trabalha com centavos, ou seja 100 seria 1,00 etc 
              token={onToken}
              stripeKey={KEY}
            > {console.log(paisEscolhido)}
              <Button style={{fontSize:"16px"}}  >Prosseguir com a compra</Button> 
            </StripeCheckout>
            </div>
            : utilizadorAtual === null ? <Button onClick={checarCadastro} style={{fontSize:"16px"}}>Prosseguir com a compra</Button>
            : <Button onClick={checarPaisEscolhido} style={{fontSize:"16px"}} >Prosseguir com a compra</Button> }
          
          </Sumario>
        </Bottom>
      </Wrapper>

      <Footer/>
      <Copyright/>
      
    </Container>
  )
}

export default Carrinho
