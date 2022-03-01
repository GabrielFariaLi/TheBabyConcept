import styled from "styled-components"
import {mobile} from "../responsivel"
import "./css/copyright.css"
const Container = styled.div`
  max-height: 40px;
  min-height: 40px;
  background-color: #9DB9CE;
  color: white;


  font-size: 14px;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  @media (max-width: 991px) {
    font-size: 12px;
  }

  @media only screen and (max-width:413px) {
    flex-direction:column;
    max-height: fit-content;
  min-height: fit-content;
  }


`;

const ItemCopyright = styled.div`
  display:flex;
  align-items: center;
  background-color: #9DB9CE;
  justify-content: center;

`;

const PrimeiraLinhaCopyRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media only screen and (max-width:413px) {
    padding-top:15px;
    padding-bottom:15px;
    flex-direction:column;

  }


`;

const ItemPrimeiraLinhaCopyRight = styled.a`
  margin-left: 0.5rem;
  margin-right: 0.5rem;

`; 


const Copyright = () => {
  return(<Container>
    



    <PrimeiraLinhaCopyRight>

    <ItemPrimeiraLinhaCopyRight type="button"  data-toggle="modal" data-target="#termosCondicoesModal">
      Termos e Condições
    </ItemPrimeiraLinhaCopyRight>
    -
    <ItemPrimeiraLinhaCopyRight type="button"  data-toggle="modal" data-target="#politicaPrivacidadeModal">
      Politica de Privacidade
    </ItemPrimeiraLinhaCopyRight>
    -
    <ItemPrimeiraLinhaCopyRight type="button"  data-toggle="modal" data-target="#politicaCookiesModal">
      Politica de Cookies
    </ItemPrimeiraLinhaCopyRight>

    </PrimeiraLinhaCopyRight>
    
    <ItemCopyright>
    © TheBabyConcept . Todos os direitos reservados.
    </ItemCopyright>


    <div class="modal fade" id="termosCondicoesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style={{color:"black"}}>Termos e Condições</h5>
            <button type="button" class="closeCopyright" data-dismiss="modal" aria-label="closeCopyright">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style={{color:"black"}}>
          <b>ASPETOS GERAIS</b><br/>A utilização do Site atribui automaticamente a condição de Utilizador e implica a aceitação, plena e sem reservas, de todas as disposições incluídas nos Termos e Condições, na versão vigente em cada momento em que acede ao Site. Se não aceitar integralmente qualquer uma das condições estabelecidas, não deverá aceder/utilizar o nosso Site. Ao consultar, utilizar ou descarregar o conteúdo do Site, está a comprometer-se a respeitar as condições estabelecidas neste documento.<br/>O Utilizador poderá utilizar o Site, sem necessidade de qualquer registo. No entanto, algumas das funcionalidades do Site poderão encontrar-se dependentes de registo.<br/><br/><b><br/><i></i>FUNCIONALIDADES DO SITE</b><br/><b><b><br/><i>Utilizador Registado</i></b></b><br/>De forma a aceder a mais funcionalidades, o Utilizador poderá registar-se no Site.<br/>O Utilizador deve preencher um formulário, no qual, para além de elementos opcionais, deverá indicar obrigatoriamente os seguintes dados:<br/>- Nome do utilizador;<br/>- Endereço de correio eletrónico;<br/>- Telemovel;<br/>- Palavra-chave.<br/><br/>Toda a informação prestada pelo Utilizador deverá ser correta e verdadeira. O Utilizador deve atualizar a informação facultada, sempre que esta sofra quaisquer alterações. O Utilizador responsabiliza-se exclusivamente por quaisquer declarações falsas, incompletas ou incorretas que preste e pelos prejuízos que estas possam provocar à empresa ou a terceiros, com a informação que faculte.<br/>Não seremos responsáveis por eventuais danos decorrentes do uso indevido ou negligente da palavra-chave definida pelo Utilizador para acesso à sua conta. O Utilizador deverá assegurar a confidencialidade da respetiva palavra-chave.<br/><br/><b><i>Funcionalidades da Conta</i></b><br/>O Utilizador Registado terá acesso a uma área pessoal, com os dados que tiver indicado no momento do registo.<br/>Através do registo, o Utilizador poderá aceder aos dados da sua conta e proceder à sua alteração ou eliminação definitiva. Pode consultar as suas encomendas com a empresa.<br/><br/><b><i>Catálogo de Produtos (Loja online)</i></b><br/>No Site encontram-se disponíveis os produtos comercializados pela The Baby Concept Shop com sede [sede aqui], com o NIF [nif aqui]. A informação sobre os produtos apresentada no Site destina-se apenas a fornecer um breve resumo informativo para melhor conveniência e informação do visitante.<br/>Tomamos todas as providências para garantir que as informações e os dados contidos no Site são precisos e atualizados, aquando da sua introdução no mesmo. No entanto, não é garantida a atualização ou correção destas informações. Não damos qualquer garantia, expressa ou implícita, quanto à exatidão ou integridade de qualquer informação (incluindo informação sobre bens e serviços) incluída no Site.<br/>Reservamos o direito de alterar, apagar ou mover qualquer informação no Site, a qualquer momento, sem aviso prévio.<br/><br/>Os Utilizadores aceitam e reconhecem expressamente que:<br/>- As fotografias apresentadas no Site têm caráter meramente ilustrativo, devendo os Utilizadores consultar informação detalhada sobre os produtos e as respetivas características/especificações;<br/>- O preço exposto é o preço recomendado, podendo, contudo, existir erros ortográficos aos quais não podemos garantir o fornecimento caso seja essa a situação;<br/>- Faremos todos os esforços razoáveis para incluir informação exata e atualizada sobre os produtos no Site. Não obstante, não o podemos garantir;<br/>- Não garantimos a existência em stock dos artigos incluídos no Site, nem tão pouco assumimos a responsabilidade por artigos descontinuados.

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btnFecharModal" data-dismiss="modal">Fechar</button>

          </div>
        </div>
      </div>
    </div>

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

    <div class="modal fade" id="politicaCookiesModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel" style={{color:"black"}}>Politica Cookies</h5>
            <button type="button" class="closeCopyright" data-dismiss="modal" aria-label="closeCopyright">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body" style={{color:"black"}}>
          <b>COMO UTILIZAMOS AS COOKIES</b><br/><br/>As cookies são utilizadas para melhorar o nosso serviço. Todos os cookies utilizados são essenciais para garantir as funcionalidades disponibilizadas<br/><br/><b>As cookies essenciais destinam-se a</b>:<br/>- lembrar o que adiciona ao carrinho<br/>- lembrar o seu progresso na encomenda<br/><br/><br/><br/><br/><b>

          EXEMPLOS DE UTILIZAÇÃO DAS COOKIES
          <br/>
          </b><br/>As cookies são utilizadas para melhorar o serviço que lhe é prestado, como por exemplo:<br/>- possibilitar a utilização de alguns serviços como o pagamento, que não seria possível sem as cookies;<br/>- permitir que um serviço reconheça o seu dispositivo para que não tenha de fornecer constantemente os mesmos dados;<br/>- reconhecer que já forneceu um nome de utilizador e palavra-passe quando ligado à área de cliente para que não tenha de o fazer sempre que consulta uma página;<br/><br/>Se não permitir que o sítio web utilize cookies, algumas páginas e funcionalidades não vão funcionar como esperado. Como exemplo, não poderá utilizar a lista de compras.<br/>Se deseja apagar as cookies que já se encontram no seu computador, consulte a secção de "Ajuda" do seu navegador de internet.<br/>Poderá ainda saber mais informações sobre cookies e como as gerir em&nbsp;<a href="http://www.aboutcookies.org/">http://www.aboutcookies.org</a> (Inglês) ou consulte a secção "Ajuda" do seu navegador de internet.


          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btnFecharModal" data-dismiss="modal">Fechar</button>

          </div>
        </div>
      </div>
    </div>
    </Container>)
};

export default Copyright;
