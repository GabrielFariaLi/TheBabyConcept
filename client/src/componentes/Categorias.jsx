import styled from 'styled-components'
import { categorias } from '../data';
import CategoriaItem from '../componentes/CategoriaItem';
import {mobile} from "../responsivel"
import 'bootstrap/dist/css/bootstrap.min.css';
const Container = styled.div`

  padding-bottom: 100px;
  display: grid !important;
  /*
  grid-template-columns: 1fr 345px 25px 345px 25px 345px 1fr !important;
  grid-template-rows: 458px 40px 458px 3rem !important;
  grid-column-gap: 0px !important;
  grid-row-gap: 0px !important;*/
  grid-template-columns: repeat(3, 1fr) .25fr repeat(2, 1fr) .25fr repeat(3, 1fr) !important;
  grid-template-rows: repeat(2, 1fr) 40px repeat(2, 1fr) 3rem !important;
  grid-column-gap: 0px!important;
  grid-row-gap: 0px!important;
  @media only screen and (max-width:821px) {

    grid-template-columns: .40fr repeat(8, 1fr) .40fr !important;
    grid-template-rows: repeat(2, 1fr) 40px repeat(2, 1fr) 40px repeat(2, 1fr) 40px repeat(2, 1fr) 3rem !important;
    grid-column-gap: 0px !important;
    grid-row-gap: 0px !important;
    }


    background-color: #f7f7f7;

`;

const Titulo = styled.h1`

color: #000;
`;

const ContainerTitulo = styled.div`
background-color: #f7f7f7;
padding-top: 84px; 
padding-bottom:50px;

`;

const Categorias = () => {
  return (
    <>
    <ContainerTitulo className="d-flex justify-content-center ">
    <Titulo className="align-self-center">Compre por Categoria</Titulo>
    </ContainerTitulo>
    <Container class=" ">
      
      {categorias.map(item => (
        <CategoriaItem  item={item} key={item.id} />
      ))}
    
    </Container></>
  );
};

export default Categorias
