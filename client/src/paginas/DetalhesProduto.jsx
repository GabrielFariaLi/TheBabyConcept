import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components'
import Anuncios from '../componentes/Anuncios';
import Footer from '../componentes/Footer';
import Navbar from '../componentes/Navbar';
import Newsletter from '../componentes/Newsletter';
import {mobile} from "../responsivel";
import { useLocation,useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMetodos";
import { adicionarProduto } from "../redux/carrinhoRedux";
import { useDispatch } from "react-redux";
import "../componentes/css/detalhesProduto.css";
import ProdutosCarousel from '../componentes/ProdutosCarousel'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Copyright from '../componentes/Copyright';

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'

const Container = styled.div``;
const Wrapper = styled.div`
padding:0px 50px 50px 60px;
display: flex;
@media only screen and (max-width: 821px) {
  padding: 10px;
  flex-direction:column;
}
@media only screen and (max-width: 440px) {
  padding: 10px 0px 10px 0px;
  flex-direction:column;
}
`;

const ImgContainer = styled.div`

flex:1;
padding:50px;
@media only screen and (max-width: 440px) {
  padding: 10px 0px 10px 0px;
  flex-direction:column;
}
`;

const Imagem = styled.img`
box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
width: 100%;
height: 90vh;
object-fit: cover;

@media only screen and (max-width: 821px) {
  height:60vh;
}
`;

const InfoContainer = styled.div`
  flex:1;
  padding: 0px 50px;
  @media only screen and (max-width: 440px) {
    padding: 10px 0px 10px 0px;
    text-align: center;
  }
`;

const Titulo = styled.h1`
  font-family: 'Poppins', sans-serif;
  padding-top: 50px;
font-weight: Bold;
text-transform: capitalize;
`;

const Descricao = styled.p`
  margin: 20px 0px;
  min-width: 100%;
  max-height: 550px;  
`;

const Preco = styled.span`
display: flex;

align-items: center;
font-weight: 400;
font-size: 40px;
@media only screen and (max-width: 440px) {
  justify-content:center;
  text-align: center;
}
`;

const FiltroContainer = styled.div`
  width: 50%;
  flex-direction: column;

  margin: 12px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 440px) {
    width: 100%;

    justify-content:center;
    text-align: center;
}
`;

const Filtro = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  @media only screen and (max-width: 440px) {

  justify-content:center;
  text-align: center;
}
`;

const FiltroTitulo = styled.span`
  flex: 100% !important;
  font-size: 20px;
  font-weight: Bold;
  flex-wrap: wrap;
`;

const FiltroCor = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: ${(props) => 
    props.color === 'Branco' && 'white' || 
    props.color === 'Amarelo' && 'yellow' || 
    props.color === 'Preto' && 'black' || 
    props.color === 'Vermelho' && 'red' || 
    props.color === 'Azul' && 'blue' || 
    props.color === 'Roxo' && 'purple' || 

    'pink'
  };
  margin: 12px 5px 32px 0px;
  cursor: pointer;
  `;




const FiltroTamanho = styled.select`
  border: 2px solid black;
  color: black;
  min-width: 78px;
  margin-left: 0px;
  margin-top: 12px;
  margin-bottom: 55px;
  padding: 5px;
  @media only screen and (max-width: 440px) {
  margin-left: 20px;
  margin-right: 20px;
  justify-content:center;
  text-align: center;
}
`;

const FiltroTamanhoOption = styled.option`
  
  color: #141414 !important; 
  `;

const AdicionarContainer = styled.div`

  width: 50%;
  display: flex;
  gap: 1px;
  border-radius: 4px;
  align-items: center;
  justify-content: space-between;
  margin-top:30px;
  @media only screen and (max-width: 440px) {
  width: 100%;
  justify-content:center;
  text-align: center;
}
`;

const QuantidadeContainer = styled.div`
  display: flex;

  align-items: center;
  font-weight: 700;
  
  

`;

const Quantidade = styled.span`

border-radius: 4px;
  font-size: 24px;
  display: flex;
  font-family: 'Open Sans', sans-serif;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
border-radius: 4px;
  margin-left: 20%;
  justify-self: center;
  color: #f7f7f7;
  min-width: 315px;
  font-family: 'Poppins', sans-serif !important;
  padding: 15px;
  border: 1px solid grey;
  background-color: #0B3C49;
  cursor: pointer;
  font-weight: 500;
  &:hover{
      background-color: #9DB9CE;
  }
  @media only screen and (max-width: 440px) {
    margin-top: 20px;
  margin-left: 0px !important;
  justify-content:center;
  text-align: center;
}
`;
const H1 = styled.h1`

  font-family: 'Poppins', sans-serif !important;
  font-weight: Bold;
  padding-top: 3rem;
  margin-bottom: 0px;
  font-size: 32px;
`;

const TopButton = styled.button`
  font-family: 'Poppins', sans-serif !important;
  margin-left:109px;
  padding: 25px 0px 0px 0px;
  font-weight: 600;

  border:0;
  cursor: pointer;
  border-bottom: 3px solid #0B3C49;
  padding-bottom: 1px;
  background-color: #f7f7f7;
  color: #141414;
  @media (max-width: 413px) , (max-width:821px) {
    margin-left:10px;
  }

`;

const DetalhesProduto = () => {

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [])

  const location = useLocation();
  const id_produto_url = location.pathname.split("/")[2];
  const [produto, setProduto] = useState({});
  const [quantidade, setQuantidade] = useState(1);
  const [cor, setCor] = useState("");
  const [tamanho, setTamanho] = useState("");
  const dispatch = useDispatch();
  const [idVariacao_state, setidVariacao_state] = useState("");
  const [coresUnicas, setCoresUnicas] = useState();

  // voltar pagina
  let navigate = useNavigate();



  const valorUnico = (tag, arr) => arr.filter(img => img.tag === tag);
  const [tamanho_document_get, setTamanho_document_get] = useState("");

  useEffect(() => {
    setTamanho_document_get(document.getElementById("id_filtroTamanhoSelect").value)
  }, [cor]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/produto/buscar/" + id_produto_url);
        setProduto(res.data);
        //console.log(res.data)
      } catch {}
    };
    getProduct();
  }, [id_produto_url]);

  
  useEffect(() => {
    if(produto.variacoes){
    //console.log(produto.variacoes.forEach((element, index, array) => {console.log(element)}))
    var cores = []
    produto.variacoes.forEach(
      (element, index, array) => {
        cores.push(element.cor)
      })
    const coresUnicasFun = [...new Set(cores)]
    setCoresUnicas(coresUnicasFun)
    //console.log("produtoUnico -> " + coresUnicas)
  }
  }, [produto]);

  const gerirQuantidade = (tipo) => {
    if (tipo === "decrescer") {
      quantidade > 1 && setQuantidade(quantidade - 1);
    } else {
      setQuantidade(quantidade + 1);
    }
  };

  const gerarVariacaoEscolhida = () => {

    const tamanho_novo = document.getElementById("id_filtroTamanhoSelect").value;
    const variacoes_id = produto.variacoes.filter((item) => item.cor === cor && item.tamanho === tamanho_novo)
    //console.log(variacoes_id) 
    //console.log(variacoes_id[0]._id) //primeiro match com tamanho e cor


    const quantidadeNovaCompra = variacoes_id[0].quantidade - quantidade
    //console.log(variacoes_id[0].quantidade)
    const id_variacao_root = variacoes_id[0]._id
    const variacoes = [{
      "cor": cor,
      "tamanho": tamanho_novo,
      "quantidade_depois_compra":quantidadeNovaCompra,
      "quantidade_atual": variacoes_id[0].quantidade,
      "id_variacao": variacoes_id[0]._id,
      "quantidade_comprada": quantidade
    }]
    //if(variacoes_id[0].quantidade > 0){
    return variacoes
  //} else if ( variacoes_id[0].quantidade <= 0){
   

  //}
  }

  const gerarIdVar = () => {
    const tamanho_novo = document.getElementById("id_filtroTamanhoSelect").value;
    const variacoes_id = produto.variacoes.filter((item) => item.cor === cor && item.tamanho === tamanho_novo)
    return variacoes_id[0]._id
  }
  const gerarQuantidadeDepoisCompra = () => {
    const tamanho_novo = document.getElementById("id_filtroTamanhoSelect").value;
    const variacoes_id = produto.variacoes.filter((item) => item.cor === cor && item.tamanho === tamanho_novo)
    return variacoes_id[0].quantidade - quantidade
  }

  const gerirClique = () => {
    // atualizar CARRINHO
    const variacoes = gerarVariacaoEscolhida(cor,tamanho)
    const id_variacao_root = gerarIdVar()
    const quantidade_depois_da_compra = gerarQuantidadeDepoisCompra()
    if (quantidade_depois_da_compra < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Não temos essa quantidade disponivel em nosso Estoque, porfavor tente diminuir a quantidade!',
        confirmButtonColor: '#0B3C49',
        confirmButtonText: 'ok'
      })

    }else if (quantidade_depois_da_compra > 0) {
      dispatch(
        adicionarProduto({ ...produto, quantidade, variacoes, id_variacao_root: id_variacao_root   })
      );
    }
    
  };


  return (
    
    <Container style={{backgroundColor: "#f7f7f7"}}>
      <Navbar/>
      <Anuncios/>

            <TopButton onClick={() => navigate(-1)} >Continue comprando</TopButton>

      <Wrapper>
        <ImgContainer>
        <Imagem src={produto.img}/>
        </ImgContainer>
        <InfoContainer>
          <Titulo>{produto.titulo}</Titulo>
          <Preco>{produto.preco} <img class="ms-2" src="https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/euro%20botao.png?alt=media&token=28d8bbae-9e55-4ed8-a152-5247499ab63d"/></Preco>
          <Descricao>{produto.desc}</Descricao>

          <FiltroContainer>
            <Filtro>
              <FiltroTitulo>Cor</FiltroTitulo>
              {
              
              coresUnicas?.map((c,i) => (
               
                <><input type="checkbox" id="btnCorControl" />
                  <label class="px-0 py-0 btn" for="btnCorControl">
                      <FiltroCor 
                      id="IDCorBotaoDetalhesProdutos" 
                      //className={}  
                      color={c} 
                      key={c} 
                      onClick={() => setCor(c)}
                      style={{
                        content: cor === c ? "\\2713" : "",
                        border: cor === c ? "2px solid #000000" : ""
                    
                      }} />
               
                    </label></>
              ))}
            </Filtro>
            <Filtro>
              <FiltroTitulo>Tamanho</FiltroTitulo>
              <FiltroTamanho id="id_filtroTamanhoSelect" className="dropdownFiltroTamanhoDetalhesProdutos form-select form-select-lg" onChange={(e) => setTamanho(e.target.value)}>
                <option >Escolha o tamanho</option>
              
                {produto.variacoes?.map((node) => ( 
                    node.cor === cor && 
                    <FiltroTamanhoOption id="id_filtroTamanhoOption" key={node.tamanho}>{node.tamanho} </FiltroTamanhoOption>  
                ))}
              </FiltroTamanho>
            </Filtro>
            <Filtro>
              <FiltroTitulo>Quantidade disponivel</FiltroTitulo>
              <div style={{fontSize:"23px"}} >
                {
             
                produto.variacoes?.map((node) =>  
                    tamanho && node.cor === cor ? node.tamanho === tamanho && 
                    <p id="quantidadeDisponivelVariacaoP" key={node.quantidade}>{node.quantidade} </p>
                    :node.cor === cor && node.tamanho === tamanho_document_get &&
                    <p id="quantidadeDisponivelVariacaoP" key={node.quantidade}>{node.quantidade} </p>
                  
                  )}
              </div>
            </Filtro>
          </FiltroContainer>
          <AdicionarContainer className="AdicionarContainer">
            <QuantidadeContainer className="QuantidadeContainer">
              <Remove className='RemoverQuantidadeCarrinho' onClick={()=> gerirQuantidade("decrescer")}/>
              <Quantidade className='QuantidadeResponsivel'>{quantidade}</Quantidade>
              <Add className='AdicionarQuantidadeCarrinho' onClick={()=> gerirQuantidade("acrescentar")}/>
            </QuantidadeContainer>
            <Button className='botaoAdicionarCarrinhoDetalhesProdutos' onClick={gerirClique}>Adicionar ao carrinho!</Button>
          </AdicionarContainer>
        </InfoContainer>
        </Wrapper>
        <H1 className="text-center">Mais itens que podem ser do seu interesse!</H1>
        <ProdutosCarousel categoria={produto.categorias} filtros={{["categorias"]:`${produto.categorias}`}} />
      <Footer/>
      <Copyright/>
    </Container>
  )
}

export default DetalhesProduto
