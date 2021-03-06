import { useState, useEffect } from "react";
import styled from 'styled-components'
import {mobile} from "../responsivel"
import { login } from "../redux/apiChamadas";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../componentes/Navbar";
import Footer from "../componentes/Footer";

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import Copyright from "../componentes/Copyright";

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #f7f7f7;

  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width:821px) {
    height:50vh;
  }
  @media only screen and (max-width:440px) {
    min-height: 100vh;
    padding: 0px 15px 0px 15px;
  }

`;

const Wrapper = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 20px;
  align-content:center !important;

  height: 70vh;
  padding-bottom:100px;
  background-color: white;

  @media only screen and (max-width:821px) {
        margin-left:2%;

        width: 380px;
        padding-top:50px;
        padding-bottom:50px;
  };
  @media only screen and (max-width:580px) {
    flex: 1;
      margin-left:10%;
      width: 100%;
      height: 65vh;
      padding: 0px;
      margin: 0px;
  };
  
`;

const WrapperImagem = styled.div`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
  padding: 20px;
  background: 
  url("https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/foto%20registrar.jpg?alt=media&token=37cf21cc-faf1-468f-abde-d00ba179d51c") center;
  width: 400px;
  height: 70vh;
  align-content:center !important;
  padding-top:200px;
  padding-bottom:200px;
  background-color: white;
  @media only screen and (max-width:821px) {
    height:502px;
    width:300px;
    }
  @media only screen and (max-width:580px) {
      display: none;
    }


  
`;

const Titulo = styled.h1`
  font-size: 24px;
  font-weight: 300;
  ;
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
  padding-bottom: 30px;
  @media only screen and (max-width:580px) {
    justify-content: center;
    align-content: center;
    text-align: center;
    margin-top: 20px;
  };
`;

const Input = styled.input`
  flex: 1;
  width: 750px;
  min-width: 40%;
  margin: 15px 0px 15px 0px;
  padding: 10px;
  @media only screen and (max-width:580px), (max-width:821px) {
      width: 300px;
  };
  @media only screen and (max-width:580px) {
    align-self: center;
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
  margin-bottom: 10px;
  &:disabled{
    color: gray;
    cursor: not-allowed;
  }
  @media only screen and (max-width:580px), (max-width:821px) {
      width: 300px;
  };
  @media only screen and (max-width:580px){
      align-self: center;
  };
`;

const LinkElement = styled.span`
  margin: 5px 0px 25px 0px;
  font-size: 12px;


  cursor: pointer;
  @media only screen and (max-width:580px) {

    margin: 5px 25% 10px 25%;
  };
`;

const Error = styled.span`
  color: red;
`;

const ContainerInformacoes = styled.div`
  display: flex;
  padding-bottom: 1rem;
`;
const ContainerRegistrar = styled.div`
  display: flex;
  padding-bottom: 1rem;

  justify-content: center;
  @media only screen and (max-width:580px) {
    flex-direction: column ;

  };
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



const Login = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.utilizador); // loja.js
  const utilizadorAtual = useSelector(estado => estado.utilizador.utilizadorAtual)
  const errorLogin = useSelector(estado => estado.utilizador.error)
  const navigate = useNavigate();
  const navegarPara = () => navigate('/');

  useEffect(() => {

    if(errorLogin === true) {
      Swal.fire({
        icon: 'error',
        title: 'N??o temos informa????es sobre voc?? :(',
        text: 'Porfavor verifique se todas as suas informa????es est??o corretas!',
        confirmButtonColor: '#0B3C49',
        confirmButtonText: 'ok'
      })
    }

  }, [errorLogin]) // dependencias

  useEffect(() => {

    if(utilizadorAtual !== null) {
      navegarPara();
    }

  }, [utilizadorAtual]) // dependencias

  const gerirClique = (e) => {
    e.preventDefault();
    const autenticacao = login(dispatch, { email, password });
  }

    
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [])


 
  return (
    <div>
      <Navbar/>
      <Container>

        <Wrapper>
          <CenterDiv>
            <Titulo >S?? mais um passo para entrar <br/> no mundinho do seu beb??</Titulo>
          </CenterDiv>
          <Form>
          <Input
              placeholder="Endere??o de email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Senha"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <ContainerInformacoes>

            <LinkElement >Se esqueceu de sua palavra passe?</LinkElement>

            </ContainerInformacoes>
            <Button onClick={gerirClique} disabled={isFetching}>
              Entrar Agora
            </Button>
            <ContainerRegistrar>
            Ainda n??o faz parte desse mundo?                        <Link to="/registrar">
     
   <b><u style={{color:"#0000EE",paddingLeft:"5px"}}>  Junte-se agora!</u></b>  </Link> 
            </ContainerRegistrar>
          </Form>
        </Wrapper>
        <WrapperImagem>
       
        </WrapperImagem>
      </Container>
      <Footer/>
      <Copyright/>
      </div>
  )
}

export default Login
