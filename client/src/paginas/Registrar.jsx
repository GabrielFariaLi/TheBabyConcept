import styled from 'styled-components'
import {mobile} from "../responsivel"
import { useState,useEffect } from "react";
import { registrarUtilizador } from '../redux/apiChamadas';
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import Copyright from '../componentes/Copyright'
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f7f7f7;
  background-size: cover;

  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width:821px) {
    height:65vh;
  }
  @media only screen and (max-width:440px) {
    height:100vh;
    padding: 0px 15px 0px 15px;
  }

`;

const Wrapper = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 20px;
  height: 80vh;
  background-color: white;
  
  @media only screen and (max-width:821px) {
        margin-left:2%;

        width: 380px;
        padding-top:50px;
        padding-bottom:50px;
  };
  @media only screen and (max-width:580px) {
    flex: 1;
    height: 85vh;
      margin-left:10%;
      width: 100%;
      padding: 0px;
      margin: 0px;
  };
`;
const LinkElement = styled.a`
  margin-top: 20px !important;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const CenterDiv = styled.div`

      //center;
  display:flex;
  justify-content: center;

  @media only screen and (max-width:580px) {
    background: 

    url("https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/foto%20registrar.jpg?alt=media&token=37cf21cc-faf1-468f-abde-d00ba179d51c") top;
    object-fit: cover;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  };
`;
const Titulo = styled.h1`
  font-size: 24px;
  font-weight: 300;
  padding-top: 50px;
 padding-bottom: 50px;

 @media only screen and (max-width:580px) {
  color: #f7f7f7;
  padding: 50px 15px 50px 15px;
  };
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  @media only screen and (max-width:580px) {
    justify-content: center;
    align-content: center;
    margin-top: 20px;
  };
`;

const Input = styled.input`
  width: 750px;
  flex: 1;

  min-width: 40%;
  margin: 20px 10px 10px 0px;
  padding: 10px;
  @media only screen and (max-width:580px), (max-width:821px) {
      width: 300px;
  };
  @media only screen and (max-width:580px) {
    align-self: center;
  };
`;

const Acordo = styled.span`
 margin: 5px 0px 25px 0px;
  font-size: 12px;
  margin: 10px 0px 35px 0px;

  color: rgba(0,0,0,0.7);
  @media only screen and (max-width:580px) {
    text-align: center;
    padding: 0px 10px 0px 10px;
  };
`;

const Button = styled.button`
  border-radius: 4px;
  width: 750px;
  border: none;
  padding: 15px 20px;
  background-color: #0B3C49;
  color: white;
  cursor: pointer;
  @media only screen and (max-width:580px), (max-width:821px) {
      width: 300px;
  };
  @media only screen and (max-width:580px){
      align-self: center;
  };
`;

const ContainerCentralizado = styled.div`

  display:flex;
  justify-content:center;
`;

const ContainerRegistrar = styled.div`
  display: flex;
  padding-bottom: 1rem;
  margin-bottom: 500px;
  justify-content: center;
  @media only screen and (max-width:580px) {
    flex-direction: column;
    align-content: center;
    justify-content: center;
  };
`;
const WrapperImagem = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 20px;
  background: 

  url("https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/foto%20registrar.jpg?alt=media&token=37cf21cc-faf1-468f-abde-d00ba179d51c") right;
  width: 400px;
  height: 80vh;
  align-content:center !important;
  padding-top:200px;
  padding-bottom:200px;
  background-color: white;
  @media only screen and (max-width:821px) {
    height:664px;
    width:300px;
    }
  @media only screen and (max-width:580px) {
      display:none;
    }

  
`;



const Registrar = () => {

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [])


  const [inputs, setInputs] = useState({});
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const navegarParaHome = () => navigate('/');
  const navegarParaLogin = () => navigate('/login');
  const utilizadorAtual = useSelector(estado => estado.utilizador.utilizadorAtual)
  const emailExistente = useSelector(estado => estado.utilizador.emailExistente)

  useEffect(() => {



  }, [utilizadorAtual]) // dependencias

  const gerirMudança = (e) => {
    setInputs((prev) => {
      return {...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs)
  };

  const confirmarInputs = (e) => {
    e.preventDefault();
    if(!inputs.nome) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Não se esqueça de preencher seu nome completo :)',
        confirmButtonColor: '#0B3C49',
        confirmButtonText: 'ok'
      })
    }    else if(!inputs.email) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Não se esqueça de preencher seu E-mail :)',
        confirmButtonColor: '#0B3C49',
        confirmButtonText: 'ok'
      })
    }
    else if(!inputs.telefone) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Não se esqueça de preencher seu Telemóvel :)',
        confirmButtonColor: '#0B3C49',
        confirmButtonText: 'ok'
      })
    } else if(confirmacaoSenha != inputs.password){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Parece que você digitou duas senhas diferentes!',
        confirmButtonColor: '#0B3C49',
        confirmButtonText: 'ok'
      })
    }
    else if (confirmacaoSenha === inputs.password && inputs.nome && inputs.email && inputs.telefone){
      registrarUtilizador(dispatch, inputs)
      if(emailExistente === true) {
        Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          confirmButtonColor: '#0B3C49',
          text: 'Parece que alguem já se cadastrou com esse E-mail, porfavor utilize outro',
          confirmButtonText: 'ok',
          footer: '<a href="/registrar">Acha que já tem cadastro?</a>'
        })
      } else {
        Swal.fire(
          'Tudo feito!',
          'Registrado com sucesso,seja bem vindo a esse conceito!',
          'success'
        )
        navegarParaLogin()

      }


    }
 
    console.log(confirmacaoSenha)
    console.log(inputs)
    console.log(inputs.password)
  };
  
  return (
    <div>
    <Navbar/>
    <Container>
      <Wrapper>
        <CenterDiv>
        <Titulo>Crie sua conta</Titulo>
        </CenterDiv>
        <Form>
          <Input 
            type="text"
            name="nome"
            placeholder="Nome Completo"
            onChange={gerirMudança}
          />
          <Input 
  
            type="text"
            name="email"
            placeholder="email"
            onChange={gerirMudança}
            />
            <Input 

            type="text"
            name="telefone"
            placeholder="telefone"
            onChange={gerirMudança}
            />  
          <Input 
            name="password"
            type="password"
            placeholder="senha"
            onChange={gerirMudança}
          />
          <Input 
            name="password_confirm"
            type="password"
            placeholder="confimar sua senha"
            onChange={(e) => setConfirmacaoSenha(e.target.value)}
            />
            <ContainerCentralizado>
            <Acordo>
              Ao criar uma conta, você consente com o processamento de dados pessoais de acordo com a nossa <b type="button"  data-toggle="modal" data-target="#politicaPrivacidadeModal">POLITICA DE PRIVACIDADE</b>
            </Acordo>
            <div class="modal fade" id="politicaPrivacidadeModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" style={{color:"black"}}>Política de Privacidade</h5>
                    <button type="button" class="closeCopyright" data-dismiss="modal" aria-label="closeCopyright">
                      <span aria-hidden="true" class ="botaoX">x</span>
                    </button>
                  </div>
                  <div class="modal-body" style={{color:"black"}}>
                  <b>ASPETOS GERAIS</b><br/>Respeitamos a sua privacidade e agradecemos a confiança que deposita em nós. Nesta Política de Privacidade explicamos quem somos, para que finalidades podemos usar os seus dados, como os tratamos, com quem os partilhamos, durante quanto tempo os conservamos, bem como as formas de entrar em contacto connosco e de exercer os seus direitos.
                  Os seus dados serão tratados por The Baby Concept Shop, NIF [nif aqui], com sede em [sede aqui], doravante "nós". Esta sociedade é a responsável pelo tratamento de dados pessoais no cumprimento do Regulamento Geral sobre a Proteção de Dados.
                  Para as questões relacionadas com o tratamento dos seus dados pessoais deverá contactar-nos através do seguinte email: thebabyconcept20.database@gmail.com
                  
                  <br/>
                  <b>Porque precisamos da sua informação?</b>Nós trataremos os seus dados pessoais com as finalidades de gestão de clientes e marketing.
                  A informação que nos disponibiliza destina-se apenas a prestar-lhe um serviço mais adequado às suas características e necessidades. Como tal, e para efeitos de entrega de encomendas e contatos do Apoio ao Cliente, desde já informamos que os seus dados de contacto e morada serão transmitidos às empresas transportadoras e a prestadores de serviços subcontratadas para a realização dos serviços contratados pelos seus clientes.
                  Trataremos os seus dados para lhe enviar informações sobre produtos e serviços.
                  Este tratamento de dados será realizado apenas com o seu consentimento, prestado no momento de registo. Caso consinta, receberá comunicações de marketing através de e-mail e SMS.
                  <br/><br/>

                  O consentimento para o tratamento de dados pessoais para efeitos de marketing direto pode ser revogado em qualquer altura.
                  Os seus dados serão conservados até que pretenda a sua eliminação.

                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btnFecharModal" data-dismiss="modal">Fechar</button>

                  </div>
                </div>
              </div>
            </div>
            </ContainerCentralizado>
          <Button onClick={confirmarInputs}>Criar conta</Button>

        </Form>
        <ContainerRegistrar style={{paddingTop:"1rem"}}>
        <div style={{alignSelf:"center",textAlign:"center"}}>
          Já faz parte desse conceito? 
          <div style={{alignSelf:"center",textAlign:"center"}}>
          <Link to="/login"><b><u style={{color:"#0000EE",paddingLeft:"5px"}}>  Entre por aqui! </u></b>  </Link> 
          </div>
          </div>
        </ContainerRegistrar>
        
      </Wrapper>
      <WrapperImagem>
       
       </WrapperImagem>
    </Container>
    <Footer/>
    <Copyright/>
    </div>
  )
}

export default Registrar
