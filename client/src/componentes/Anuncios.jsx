import styled from "styled-components"
import {mobile} from "../responsivel"
const Container = styled.div`
  max-height: 48px;
  min-height: 48px;
  background-color: #0B3C49;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  @media (max-width: 991px) {
    font-size: 12px;
  }

  @media only screen and (max-width:413px) {

  font-size: 10px;

};

`;

const Anuncios = () => {
  return (
    <Container>
      Oferta imperdivel!!!! uma coleção INTEIRA por apenas €50 FRETE GRATIS!
    </Container>
  )
}

export default Anuncios
