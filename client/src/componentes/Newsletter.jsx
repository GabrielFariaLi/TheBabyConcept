import styled from 'styled-components'
import { Send } from "@material-ui/icons"
import {mobile} from "../responsivel"

const Container = styled.div`
height: 60vh;
background-color: #f7f7f7;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column ;
`;
const Titulo = styled.h1`
font-size: 70px;
margin-bottom: 20px;
@media (max-width: 413px) {
  font-size: 40px;
}
`;
const Descricao = styled.div`
font-size: 24px;
font-weight: 300px;
margin-bottom: 20px;

@media (max-width: 413px) {
  text-align:center;
  font-size: 19px;
  padding-left:50px;
  padding-right:50px;
}
`;
const InputContainer = styled.div`
border-radius: 4px;
width: 100%;
height: 40px;
background-color: white;
display: flex;
justify-content: space-between;
border: 1px solid lightgray;
@media (max-width: 413px) {
  width:80%;
}
`;
const Input = styled.input`

border: none;
flex: 8;
padding-left: 20px;
`;
const Button = styled.button`

  border-radius: 0px 4px 4px 0px;
flex: 1;
border: none;
background-color: #9DB9CE;
color: white;

`;
const DivAosNewsleeter = styled.div`


display: flex;
align-items: center;
justify-content: center;
flex-direction: column ;

`;

const Newsletter = () => {
  return (
    <Container>
      <DivAosNewsleeter  data-aos="flip-up" data-aos-once="true" data-aos-duration="1000">
      <Titulo>Newsletter</Titulo>
      <Descricao> Nunca perca uma oferta da BabyConcept! Seu bebé vai adorar!</Descricao>
      <InputContainer>
        <Input placeholder="Seu e-mail"/>
          <Button>
            <Send/>
          </Button>
      </InputContainer> 
      </DivAosNewsleeter>
    </Container>
  );
};

export default Newsletter
