import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  CreditCard,
  Pinterest,
  AccessAlarm,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import {mobile} from "../responsivel"

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';


const Container = styled.div`
  display: flex;
  justify-content:center;
  text-justify:center;
  background-color: #0B3C49;
  color: #f7f7f7;
  @media only screen and (max-width:821px) {
      flex-direction:column;
  };
  

`;

const Esquerda = styled.div`

  flex: 1;
  justify-content:center;
  display: flex;
  flex-direction: column;

  padding: 50px;
  padding-left:110px;

  @media only screen and (max-width:821px) {

    padding-left:50px
  }


`;

const Logo = styled.h1`
width: fit-content !important;
 font-family: 'Poppins', sans-serif;
 justify-self:center;
 font-size: 20px;
 font-weight: Bold;
 text-justify:center;
`;

const Descricao = styled.p`
  margin: 20px 0px;
  font-size:16px !important;
  font-family: 'Poppins', sans-serif;
`;

const SocialContainer = styled.div`

  display: flex;
  
`;

const SocialIcon = styled.div`

  width: 40px;
  height: 40px;
  border-radius: 50%;
  border-style: solid ;
  border-width: 0.5px;
  color: white;
  background-color: #${(props) => props.color};
  &:hover {
    background-color: #${(props) => props.colorHover};
  }
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const CreditCardDiv = styled.div`

  width: 40px;
  height: 40px;

  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const CentroEsquerda = styled.div`

  flex: 1;
  padding: 50px;
  padding-right: 20px;
  @media only screen and (max-width:821px) {
    padding-top:20px;

  };

`;

const  ListContainerFlex = styled.div`
  display:flex;
`;
const CentroDireita = styled.div`
  flex: 1;

  padding: 50px;
  padding-left: 20px;
  padding-right: 20px;
  
  @media only screen and (max-width:821px) {
    padding-top:20px;
    padding-left: 50px;
  };


`;


const Titulo = styled.h3`
  font-size:20px;
  width: fit-content !important;
  margin-right: 0px;
  font-weight: Bold;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  flex-direction:column;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 80%;
  margin-bottom: 10px;
  margin-left: 1px;
`;

const Direita = styled.div`
flex: 1;
   @media only screen and (max-width:821px) {
    padding-top:20px;
    padding-left:50px;
  };
  padding: 50px;
  padding-left:0px;


`;

const ContactoItem = styled.div`
  margin-bottom: 20px;

  display: flex;
  align-items: center;

`;

const Pagamento = styled.img`
    width: 50%;
`;
const Footer = () => {
  return (
    <Container>
      <Esquerda>
        <Logo>TheBabyConcept.           <img src="https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/Logo%20sozinha%20png.png?alt=media&token=d6b2c1e2-6be0-4762-9c56-2e1e83611383" alt="" style={{    width: "40px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer"}} /></Logo>
        <Descricao>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tem
        </Descricao>
        <Titulo>Formas de pagamento</Titulo>
        <SocialContainer>
          <CreditCardDiv type="button"  data-toggle="modal" data-target="#formasDePagamentoModal">
            <img src="https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/visa.png?alt=media&token=f9d2e0fc-5ff4-489a-a229-615bdace9082"
            style={{    width: "40px",
            height: "40px",
         
            cursor: "pointer"}} />
          </CreditCardDiv>
          <CreditCardDiv type="button"  data-toggle="modal" data-target="#formasDePagamentoModal">
          <img src="https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/master-card.png?alt=media&token=01e9c640-31c4-4048-93de-c96350316799" style={{    width: "40px",
          height: "40px",
        
          cursor: "pointer"}} 
          />
          </CreditCardDiv>
          <CreditCardDiv type="button"  data-toggle="modal" data-target="#formasDePagamentoModal">
          <img src="https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/Multibanco.svg?alt=media&token=5538362f-b0be-44e9-aaab-ceb6711a6d54" style={{    width: "40px",
          height: "40px",

          cursor: "pointer"}} />
          </CreditCardDiv>
        </SocialContainer>

      </Esquerda>


      <div class="modal fade" id="formasDePagamentoModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style={{color:"black"}}>Formas de Pagamento</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style={{color:"black"}}>
          <b>Quais as formas de Pagamento disponíveis?</b><br/><br/>Temos vários métodos de pagamento disponíveis:<br/>Visa<br/>- Visa Electron<br/>- MasterCard<br/>- Maestro<br/>- Multibanco<br/>- MBWAY<br/>
          
          <br/><br/><b>

          O pagamento com o meu cartão de crédito foi recusado, o que fazer?
          <br/>
          </b><br/>Se o seu Cartão de Crédito tiver sido recusado, poderá ser por uma série de razões:<br/><br/>- Dactilografou incorrectamente o seu número.;<br/>- Digitou incorrectamente a data de expiração ou o código de segurança (CVV);<br/>- O nome e o endereço não correspondem ao endereço que o seu banco tem em arquivo para si.<br/>- O seu banco recusou o pagamento por razões de segurança.<br/>Não há fundos suficientes na sua conta para cobrir o pagamento.<br/>
          
          <br/>Por favor contacte o seu fornecedor de cartão de crédito ou banco para informações mais detalhadas sobre o motivo pelo qual o seu pagamento foi recusado. Convidamo-lo a contactar-nos depois, caso o banco não seja capaz de lhe fornecer uma resposta suficiente.


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

          </div>
        </div>
      </div>
      </div>

      <CentroEsquerda>
        <Titulo>Links utéis</Titulo>
        <ListContainerFlex>
        <List>
          <ListItem><a href="/">Home</a></ListItem>
          <ListItem><a href="/carrinho">Carrinho</a></ListItem>
          <ListItem><a href="/gerirContaEditar/">Minha Conta</a></ListItem>
          <ListItem><a href="/gerirConta">Acompanhar meus Pedidos</a></ListItem>



        </List>
        <List>
        <ListItem><a href="/produtos/New in">New in</a></ListItem>
          <ListItem><a href="/">Marcas</a></ListItem>
          <ListItem><a href="/produtos/Saldo">Saldos</a></ListItem>
          <ListItem><a href="/produtos/Menina">Meninas</a></ListItem>
          <ListItem><a href="/produtos/Menino">Meninos</a></ListItem>
        </List>
        </ListContainerFlex>
      </CentroEsquerda>
      <CentroDireita>
        <Titulo>Contacte-nós</Titulo>
          <List>

            <ContactoItem>
              <MailOutline style={{marginRight:"10px"}}/>thebabyconcept20.database@gmail.com
            </ContactoItem>

            <ContactoItem>
              <Phone style={{marginRight:"10px"}}/>[telefone aqui]
            </ContactoItem>

            <ContactoItem>
              <AccessAlarm style={{marginRight:"10px"}}/>[8:30 - 9:00 seg a sexta]
            </ContactoItem>

          </List>
      </CentroDireita>

      <Direita>
        <Titulo>Nossas Redes Sociais</Titulo>
        <SocialContainer>
          <SocialIcon color="0B3C49 " colorHover="3b5998">
            <Facebook/>
          </SocialIcon>
          <SocialIcon color="0B3C49" colorHover="E4405F">
            <Instagram/>
          </SocialIcon>

        </SocialContainer>
      </Direita>
    </Container>
  )
}

export default Footer
