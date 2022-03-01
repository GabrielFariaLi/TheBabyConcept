import { useState, useEffect } from "react";
import styled from 'styled-components'
import { produtosPopulares } from '../data';
import ProdutoItem from './ProdutoItem';
import {mobile} from "../responsivel";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";

import "./css/produtos.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const Container = styled.div`

  display: flex !important;
  flex-wrap: wrap;
  justify-content: ${(props) => 
   props.paginaAtual ===  'produtos' ? 'flex-start' : 'center' 
  };
  margin-left: ${(props) => 
   props.paginaAtual ===  '' ? '0%' : '8%' 
  };
  margin-right: ${(props) => 
   props.paginaAtual ===  '' | props.paginaAtual === 'produtos'   ? '0%' : '8%' 
  };

  padding-right: ${(props) => 
   props.paginaAtual ===  ''   ? '6%' : '10%' 
  };
  padding-left: ${(props) => 
   props.paginaAtual ===  '' ? '6%' : props.paginaAtual === 'produtos'   ? '0%' : '8%' 
  };

  background-color: ${(props) => 
    props.paginaAtual === 'produtos' ? '#f7f7f7' : '#F8E9F0' 
  };

padding-bottom: 80px;

    @media only screen and (max-width:1780px) {

      margin-left: 5%;
      margin-right: 5%;
      padding-left: 0px;
      padding-right: 0px;
    }
@media only screen and (max-width:1560px) {

  margin-left: ${(props) => 
   props.paginaAtual ===  '' ? '8%' : '5%' 
  };
  margin-right: ${(props) => 
   props.paginaAtual ===  ''  ? '8%' : '5%' 
  };

}
@media only screen and (max-width:1440px) {

margin-left: ${(props) => 
 props.paginaAtual ===  '' ? '10%' : '5%' 
};
margin-right: ${(props) => 
 props.paginaAtual ===  ''  ? '10%' : '5%' 
};

}
  @media only screen and (max-width:1280px) {

      margin-left: 0px;
      margin-right: 0px;
      padding-left: 0px;
      padding-right: 0px;
    }
    @media only screen and (max-width:580px) {
      flex-direction: column;
      margin-left: 0px;
      margin-right: 0px;
      padding-left: 0px;
      padding-right: 0px;
    }


`;

const Produtos = ({categoria, subcategoria, tricategoria, pesquisa, marca, filtros, filtrosVariaveis, organizar}) => {
  const location = useLocation();
  const paginaAtual = location.pathname.split("/")[1];


  console.log(paginaAtual)
  console.log(subcategoria)
  console.log(tricategoria)
  console.log(categoria, filtros, organizar);
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);

  const axiosInstancia = axios.create({baseURL: process.env.REACT_APP_API_URL})

  useEffect(() => {
    const getProdutos = async ()=> {
      try{
        const res = await axiosInstancia.get(
          paginaAtual === "" 
          ?`http://localhost:5000/api/produto`
          :
          marca !== "undefined" 
          ? `http://localhost:5000/api/produto?marca=${marca}`
          :
          pesquisa !== "undefined" 
          ? `http://localhost:5000/api/produto?pesquisaString=${pesquisa}`
          :
          tricategoria !== "undefined"  
          ? `http://localhost:5000/api/produto?categoria=${categoria}&subcategoria=${subcategoria}&tricategoria=${tricategoria}`
          : 
          subcategoria !== "undefined" 
          ? `http://localhost:5000/api/produto?categoria=${categoria}&subcategoria=${subcategoria}`
          : 
          categoria === "Marcas" 
          ? `http://localhost:5000/api/produto`
          :  
          categoria !== "undefined" 
          ? `http://localhost:5000/api/produto?categoria=${categoria}`
          : `http://localhost:5000/api/produto`

        );

        setProdutos(res.data);
        //console.log(res)
      } catch(err) {}
    };
    getProdutos()
  
  }, [categoria]) // dependencias


  const [produtosSlice, setProdutosSlice] = useState(produtos.slice(0, 90));
  const [pageCount, setpageCount] = useState(0);
  const produtosPorPagina = 9;
  const produtosVisitados = pageCount * produtosPorPagina;



  useEffect(() => {
    //console.log(' categoria-> ' + categoria + ' produtos-> ' + JSON.stringify(produtos) + ' filtros-> ' + JSON.stringify(filtros))
    const cor = "";
    paginaAtual === "" &&
    categoria && 
    setProdutosFiltrados(
      produtos.filter((item) => 
        Object.entries(filtros).every(([key,value],i) =>
          //Here the value is an array 'variacoes' so to check colors use filter to get all the elements of 'variacoes' array;
          //Also assuming that the color you are passing will be available here as item[key]

          item[key].includes(value)
         
        )
      )
    )
    
    paginaAtual === "produtos" &&
    categoria && 
    setProdutosFiltrados(
      produtos.filter((item) => 
        Object.entries(filtros).every(([key,value],i) =>{
          //Here the value is an array 'variacoes' so to check colors use filter to get all the elements of 'variacoes' array;
          //Also assuming that the color you are passing will be available here as item[key]
          if(filtros.marcas ){
            return item[key].includes(value)
          } else if (filtros?.variacoes[0]?.tamanho && filtros?.variacoes[0]?.cor) {

            var allSizes = item[key].map(i=>i.tamanho)
            var allColors = item[key].map(i=>i.cor)
            var allTeste = Object.entries(item[key].map(i=>i))
            var allTesteValue =Object.entries(value[0])
            const entries = Object.entries(item[key])
          

            const matches = item[key].some(current => 

              value.some(combination => 
                Object.entries(combination).every(([keyCombination, valueCombination]) => 
                  current[keyCombination] === valueCombination
                )
              )
       
            );
            
            console.log(matches);
            return matches
  
          }
          else if(filtros?.variacoes[0]?.cor ){
          console.log("isso me retorna oq? (estou NO IF DAS CORES) -> " + filtros?.variacoes[0]?.cor)
          var allColors = item[key].map(i=>i.cor)

          return value.some((val)=>allColors.includes(val.cor))

        } else if (filtros?.variacoes[0]?.tamanho ){

          var allSizes = item[key].map(i=>i.tamanho)

          return value.some((val)=>allSizes.includes(val.tamanho))

        } else {
          return item[key].includes(value)
        }
          return
         }
        )
      )
    )

  }, [categoria, filtros, produtos]) // dependencias

  

  useEffect(() => {
    console.log("teste organizar -> " + organizar)
    console.log(JSON.stringify(produtosFiltrados))
    if (organizar === "recente") {
      setProdutosFiltrados((prev) =>
      [...prev].sort((a, b) => a.timestamps - b.timestamps)
    );
    } else if (organizar === "cresc") {
      setProdutosFiltrados((prev) =>
        [...prev].sort((a, b) => a.preco - b.preco)
      );
    } else {
      setProdutosFiltrados((prev) =>
        [...prev].sort((a, b) => b.preco - a.preco)
      );
    }
  }, [organizar]); // dependencias


  const pageCountMath = Math.ceil(produtos.length / produtosPorPagina);

  const changePage = ({ selected }) => {
    setpageCount(selected);
    window.scrollTo(0, 0)
  };

return (
  console.log(paginaAtual),
  <><Container className="containerPrincipalProdutos" paginaAtual={paginaAtual}>
    {paginaAtual === ""
      ? categoria
        ? produtosFiltrados.slice(0, 9).map((item) => <ProdutoItem item={item} key={item.id} />)
        : produtos
          .slice(0, 9)
          .map((item) => <ProdutoItem className="mt-2" item={item} key={item.id} />)
      : paginaAtual === "produtos"
        ? categoria
          ? produtosFiltrados.slice(produtosVisitados, produtosVisitados + produtosPorPagina).map((item) => <ProdutoItem className="mt-2" id="categoriaProdutoItem" item={item} key={item.id} />)
          : produtos
            .slice(produtosVisitados, produtosVisitados + produtosPorPagina)
            .map((item) => <><ProdutoItem className="mt-2 " id="categoriaProdutoItem" item={item} key={item.id} /></>
            )
        : <h1>contacte o dev</h1>}

  </Container>
  {paginaAtual === "produtos"
  ?  <ReactPaginate
  previousLabel={"Anterior"}
  nextLabel={"Próximo"}
  pageCount={pageCountMath}
  onPageChange={changePage}
  containerClassName={"pagination justify-content-center"}
  pageClassName={"page-item"}
  pageLinkClassName={"page-link"}
  previousClassName={"page-item"}
  previousLinkClassName={"page-link"}
  nextClassName={"page-item"}
  nextLinkClassName={"page-link"}
  breakClassName={"page-item"}
  disabledClassName={"disabledPageItem"}

  activeClassName={"paginaAtivaPaginate"} />
  : console.log(paginaAtual)
    }
 </>
);
};

export default Produtos
