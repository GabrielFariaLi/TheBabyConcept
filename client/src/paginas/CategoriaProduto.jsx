
import styled from "styled-components"
import Anuncios from "../componentes/Anuncios";
import Footer from "../componentes/Footer";
import Navbar from "../componentes/Navbar";
import Newsletter from "../componentes/Newsletter";
import Produtos from "../componentes/Produtos";
import { Link } from 'react-router-dom';
import { MAX_TAMANHO_NEWBORN } from "../componentes/Constantes";
import {mobile} from "../responsivel"
import { useLocation } from "react-router";
import { useState, useEffect } from "react";

import {
  marcasFiltro,
  coresFiltro,
  tamanhoRecemNascidoFiltro,
  tamanhoBebeFiltro,
  tamanhoCriancaFiltro,
  categoriasRecemNascido,
  categoriasBebe,
  categoriaCrianca,
  categoriasFiltro,
  categoriaCerimoniaBebe,
  categoriaCerimoniaJunior,
  tricategoriaRecemNascida,
  tricategoriaRecemNascido,
  marcasSliders
} from "../data"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


import "../componentes/css/categoriaProduto.css";
import Copyright from "../componentes/Copyright";
import { NoEncryption } from "@material-ui/icons";



const Container = styled.div``;

const Titulo = styled.h1`
  
  justify-content:center;
  letter-spacing:2px;
  margin-left: auto;
  position:relative;
  left:50px;
  padding-top:25px;
  margin-bottom:0px;
  @media (max-width: 413px) {
    margin-left:50px;
    position:static !important

  
}
`;

const FiltroContainer = styled.div`
display:flex;
float: left;
flex:1;
transition-timing-function: ease;
justify-content:space-between;
max-width: 326px;
min-width: 326px;
max-height:50vh;
display: inline-block;

overflow-y: auto;
overflow-x: hidden;
`;

const Filtro = styled.div`
flex:1;
margin: 20px;
margin-left:109px;
transition-timing-function: ease;
display: flex;
flex-direction: column;
${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}

`;


const Organizar = styled.div`
margin: 20px;
display: flex;

${mobile({ width: "0px 20px", display: "flex", flexDirection: "column" })}
@media (max-width: 821px) {
  margin-left:45px;
  margin-right:45px;
}

`;

const FiltroTexto = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({ marginRight: "0px" })}
`;

const FiltroCategoria = styled.div`
  font-family: 'Poppins', sans-serif;
  padding-top: 1rem;
  padding-bottom: 1rem;
  width: 100%;
  min-height: 40px;

  ${mobile({ marginRight: "0px" })}
`;

const Select = styled.select`
  margin-left:auto;
  padding: 10px;
  font-family: 'Poppins', sans-serif;

  background-color: transparent;
  margin-right: 115px;
  color: rgba(0,0,0,0.5);

  max-width:140px;
  border: none;
  outline: none;
  box-shadow: inset 1px 0 0 6px #f7f7f7 !important;   

  @media (max-width: 821px) {
  margin-right:0px;
}

`;



const Option = styled.option`

`;

const CategoriaProduto = () => {

  const location = useLocation();
  const categoria_url = location.pathname.split("/")[2];
  const subcategoria_url = location.search.split('?')[1];
  const tricategoria_url = location.search.split('?')[2];
  const pesquisaString = location.hash.split('#')[1];
  const marca_url= location.hash.split('#')[2];
  const [corSelect, setCorSelect] = useState("");
  const [tamanhoSelect, setTamanhoSelect] = useState("");
  const categoria_decode = decodeURIComponent(categoria_url)
  const subcategoria_decode = decodeURIComponent(subcategoria_url)
  const tricategoria_decode = decodeURI(tricategoria_url)
  const pesquisaString_decode = decodeURI(pesquisaString)
  const marca_url_decode = decodeURI(marca_url)
  
  console.log(categoria_decode)
  console.log(pesquisaString_decode)
  console.log(decodeURIComponent(subcategoria_decode))

  console.log(decodeURIComponent(tricategoria_decode))

  const [organizar,setOrganizacao] = useState("Recente");
  const [filtros,setFiltros] = useState({});

  useEffect(() => {

    if(corSelect && tamanhoSelect) {
      setFiltros( {
        ...filtros,
        ["variacoes"]:[{
          ["cor"]:corSelect,
          ["tamanho"]:tamanhoSelect
        }],
      })
    } else if (corSelect) {
      setFiltros( {
        ...filtros,
        ["variacoes"]:[{
          ["cor"]:corSelect
        }],
      })
    } else if (tamanhoSelect) {
      setFiltros( {
        ...filtros,
        
  
        ["variacoes"]:[{
          ["tamanho"]:tamanhoSelect
        }],
        
      })
    }

  }, [corSelect, tamanhoSelect]) // dependencias

  const gerirFiltros = (evento) =>{

    const valor = evento.target.value;
    console.log(evento.target.name + evento.target.value)

     if (evento.target.name === "cor" ) {
      const cor = evento.target.name;
      setCorSelect(valor);

      
    } else if (evento.target.name === "tamanho" ){
      const tamanho = evento.target.name;
      setTamanhoSelect(valor);

    }
    else {
    setFiltros({
      ...filtros,
      [evento.target.name]:valor,
    });
  }
   
  };

  const reloadPage = () => {
    setTimeout(() => { window.location.reload()}, 500);

  };



  return (
    <Container style={{backgroundColor: "#f7f7f7"}}>
      <Navbar/>
      <Anuncios/>

      <Organizar>
        <button  id="botaoFiltroCategoriaContainer" class="btn btn-primary" type="button" data-toggle="collapse"  data-target="#filtroCategoriaContainer" aria-expanded="false" aria-controls="collapseMenina"><i class="fas fa-filter"></i></button>
        <Select onChange={(evento) => setOrganizacao(evento.target.value)}>
          <Option value="recente">Mais Recente</Option>
          <Option value="cresc">Preço (Forma Crescente)</Option>
          <Option value="decresc">Preço (Forma Decrescente)</Option>
        </Select>
      </Organizar>

      <FiltroContainer>
        <Filtro id="filtroCategoriaContainer">
        <FiltroCategoria >
            <button class="pt-0 dropdownPorCategorias dropdownMarcas dropdown-toggle " type="button" data-toggle="collapse"  aria-expanded="false" >
            <input id="collapsible" class="toggle" type="checkbox"/> 
            Categorias
            </button>
            <button class="dropdownMarginTop dropdownPorCategorias-Childs linkDireto " type="button" data-toggle="collapse" aria-expanded="false" >
              <input id="collapsible" class="toggle" type="checkbox"/> 
              <a href="/produtos/New in">
              New in
              </a>
              </button>
              <button class=" dropdownPorCategorias-Childs linkDireto " type="button" data-toggle="collapse" aria-expanded="false" >
              <input id="collapsible" class="toggle" type="checkbox"/> 
              <a href="/produtos/Saldo">
              Saldos
              </a>
              </button>
            <div class=" " id="collapseCategoria">
              <button class="dropdownPorCategorias-Childs dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseMenina" aria-expanded="false" aria-controls="collapseMenina">
              <input id="collapsible" class="toggle" type="checkbox"/> 
              Menina
              </button>
              <div class="collapse" id="collapseMenina">
                <button class="dropdownPorCategorias-SecondChild dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseRecemNascidoCategoria" aria-expanded="false" aria-controls="collapseRecemNascidoCategoria">
                  Recém Nascido
                </button>
                <div class="collapse dropdownPorCategorias-ThirdChild" id="collapseRecemNascidoCategoria">
                <input id="collapsible" class="toggle" type="checkbox"/> 
                  {tricategoriaRecemNascida.map(item => ( 
                    <>
                    <div class="d-flex align-items-center ">  
                      <a href={item.link}>
                      <p>{item.desc}</p>
                      </a>
                    </div>
                    </> ))
                  }
                </div>
              </div>
              <div class="collapse" id="collapseMenina">
                <button class="dropdownPorCategorias-SecondChild dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseBebeCategoria" aria-expanded="false" aria-controls="collapseBebeCategoria">
                  Bebé
                </button>
                <div class="collapse dropdownPorCategorias-ThirdChild" id="collapseBebeCategoria">
                  {categoriasBebe.map(item => ( <>
                    <div class="d-flex align-items-center ">  
                    <a href={item.femininoLink}>
                    <p>{item.feminino}</p>
                    </a>
                    </div></> ))
                  }
                </div>
              </div>
              <div class="collapse" id="collapseMenina">
                <button class="dropdownPorCategorias-SecondChild dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseCriancaCategoria" aria-expanded="false" aria-controls="collapseCriancaCategoria">
                  Criança
                </button>
                <div class="collapse dropdownPorCategorias-ThirdChild" id="collapseCriancaCategoria">
                  {categoriaCrianca.map(item => ( <>
                    <div class="d-flex align-items-center ">  
                    <a href={item.femininoLink}>
                    <p>{item.feminino}</p>
                    </a>
                    </div></> ))
                  }
                </div>
              </div>
            </div>
            <div class="" id="collapseCategoria">
              <button class="dropdownPorCategorias-Childs dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseMenino" aria-expanded="false" aria-controls="collapseMenino">
              Menino
              </button>
              <div class="collapse" id="collapseMenino">
                <button class="dropdownPorCategorias-SecondChild dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseRecemNascidoCategoria2" aria-expanded="false" aria-controls="collapseRecemNascidoCategoria2">
                  Recém Nascido
                </button>
                <div class="collapse dropdownPorCategorias-ThirdChild" id="collapseRecemNascidoCategoria2">
                  {tricategoriaRecemNascido.map(item => ( <>
                    <div class="d-flex align-items-center ">  
                    <a href={item.link}>
                    <p>{item.desc}</p>
                    </a>
                    </div></> ))
                    
                  }
                </div>
              </div>
              <div class="collapse" id="collapseMenino">
                <button class="dropdownPorCategorias-SecondChild dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseBebeCategoria2" aria-expanded="false" aria-controls="collapseBebeCategoria2">
                  Bebé
                </button>
                <div class="collapse dropdownPorCategorias-ThirdChild" id="collapseBebeCategoria2">
                  {categoriasBebe.map(item => ( <>
                    <div class="d-flex align-items-center ">  
                    <a href={item.masculinoLink}>
                    <p>{item.masculino}</p> 
                    </a>
                    </div></> ))
           
                  }
                </div>
              </div>
              <div class="collapse" id="collapseMenino">
                <button class="dropdownPorCategorias-SecondChild dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseCriancaCategoria2" aria-expanded="false" aria-controls="collapseCriancaCategoria2">
                  Criança
                </button>
                <div class="collapse dropdownPorCategorias-ThirdChild" id="collapseCriancaCategoria2">
                  {categoriaCrianca.map(item => ( <>
                    <div class="d-flex align-items-center ">  
                    <a href={item.masculinoLink}>
                    <p>{item.masculino}</p>
                    </a>
                    </div></> ))
                  }
                </div>
              </div>
            </div>
            <div class="" id="collapseCategoria">
              <button class="dropdownPorCategorias-Childs dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseCerimonias" aria-expanded="false" aria-controls="collapseCerimonias">
              Cerimonias 
              </button>
              <div class="collapse" id="collapseCerimonias">
                <button class="dropdownPorCategorias-SecondChild dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseCerimoniasBebeCategoria" aria-expanded="false" aria-controls="collapseCerimoniasBebeCategoria">
                  Cerimonias Bebe
                </button>
                <div class="collapse dropdownPorCategorias-ThirdChild" id="collapseCerimoniasBebeCategoria">
                  {categoriaCerimoniaBebe.map(item => ( <>
                    <div class="d-flex align-items-center ">  
                    <a href={item.link}>
                    <p>{item.desc}</p>
                    </a>
                    </div></> ))
                  }
                </div>
              </div>
              <div class="collapse" id="collapseCerimonias">
                <button class="dropdownPorCategorias-SecondChild dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseCerimoniasJuniorCategoria" aria-expanded="false" aria-controls="collapseCerimoniasJuniorCategoria">
                  Cerimonias Junior
                </button>
                <div class="collapse dropdownPorCategorias-ThirdChild" id="collapseCerimoniasJuniorCategoria">
                  {categoriaCerimoniaJunior.map(item => ( <>
                    <div class="d-flex align-items-center ">  
                    <a href={item.link}>
                    <p>{item.desc}</p>
                    </a>
                    </div></> ))
                  }
                </div>
              </div>

            </div>
            <div class="" id="collapseCategoria">
              <button class="dropdownPorCategorias-Childs dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseMarcas" aria-expanded="false" aria-controls="collapseMarcas">
              Marcas 
              </button>
              <div class="collapse" id="collapseMarcas">
                <div class="dropdownPorCategorias-ThirdChild" id="collapseCerimoniasBebeCategoria">
                  {marcasSliders.map(item => ( <>
                    <div class="d-flex align-items-center ">  
                    <a  href={item.link} onClick={reloadPage}>
                    <p>{item.desc}</p>
                    </a>
                    </div></> ))
                  }
                </div>
              </div>


            </div>
            <button class=" dropdownPorCategorias-Childs linkDireto " type="button" data-toggle="collapse" aria-expanded="false" >
              <input id="collapsible" class="toggle" type="checkbox"/> 
              <a href="/produtos/Saldo">
              Puericultura
              </a>
              </button>
          </FiltroCategoria>

          <FiltroCategoria>
            <button class="dropdownPorCategorias dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseCor" aria-expanded="false" aria-controls="collapseCor">
              Cor
            </button>
            <div class="collapse dropdownMarginTop dropdownPorCategorias-Childs" id="collapseCor" >
            {coresFiltro.map(item => ( <><div class="d-flex align-items-center "> <input class="form-check-input" type="radio" value={item.desc} onChange={gerirFiltros} name="cor"/>
            <label class=" ms-2 form-check-label" for="flexRadioDefault1">
              {item.desc}
            </label></div></> ))}
            </div>
          </FiltroCategoria>
          <FiltroCategoria>
            <button class="dropdownPorCategorias dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseTamanho" aria-expanded="false" aria-controls="collapseTamanho">
              Tamanho
            </button>
            <div class="collapse dropdownMarginTop dropdownPorCategorias-Childs" id="collapseTamanho">
              {
                <button class="dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseRecemNascido" aria-expanded="false" aria-controls="collapseRecemNascido">
                Recém Nascido
              </button>}
              <div class="collapse dropdownPorCategorias-SecondChild tamanhoFiltroScrollable" id="collapseRecemNascido">     
              {tamanhoRecemNascidoFiltro.map(item => ( <><div class="d-flex align-items-center"><input class="form-check-input" type="radio" value={item.tamanho} onChange={gerirFiltros} name="tamanho"/>
            <label class="ms-2 form-check-label" for="flexRadioDefault1">

              {item.tamanhoBonitinho} Meses
            </label></div></> ))}
              </div>
              {
              <button class="dropdownMarcas dropdown-toggle" type="button" data-toggle="collapse" data-target="#collapseBebe" aria-expanded="false" aria-controls="collapseBebe">
                Bebé
              </button>}
              <div class="collapse dropdownPorCategorias-SecondChild tamanhoFiltroScrollable" id="collapseBebe">     
              {tamanhoBebeFiltro.map(item => ( <><div class="d-flex align-items-center"><input class="form-check-input" type="radio" value={item.tamanho} onChange={gerirFiltros} name="tamanho"/>
  <label class="ms-2 form-check-label" for="flexRadioDefault1">
    {item.tamanhoBonitinho} Meses
  </label></div></> ))}
              </div>
              {
              <button class="dropdownMarcas dropdown-toggle mb-2" type="button" data-toggle="collapse" data-target="#collapseCrianca" aria-expanded="false" aria-controls="collapseCrianca">
              <input id="collapsible" class="toggle" type="checkbox"/> 
                Criança 
              </button>}
              <div class="collapse dropdownPorCategorias-SecondChild tamanhoFiltroScrollable" id="collapseCrianca">     
              {tamanhoCriancaFiltro.map(item => ( <><div class="d-flex align-items-center "><input class="form-check-input" type="radio" value={item.tamanho} onChange={gerirFiltros} name="tamanho"/>
  <label class="ms-2 form-check-label" for="flexRadioDefault1">
    {item.tamanhoBonitinho} Anos
  </label></div></> ))}
              </div>
            </div>
          </FiltroCategoria>
         
        </Filtro>

      </FiltroContainer>
      <Titulo> {categoria_url === "New%20in" ? "New in" : categoria_url} </Titulo>
      { console.log(JSON.stringify(filtros) + "teste filtros")}
      <Produtos style={{paddingLeft: "0px"}}  categoria={categoria_decode} pesquisa={pesquisaString_decode} marca={marca_url_decode}
      subcategoria={subcategoria_decode} tricategoria={tricategoria_decode} filtros={filtros} organizar={organizar}/>



      <Footer/>
      <Copyright/>
    </Container>
  )
}

export default CategoriaProduto
