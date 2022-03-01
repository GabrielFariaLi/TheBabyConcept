import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { userRequest, publicRequest } from "../requestMetodos";
import { Link, useNavigate } from 'react-router-dom';
// ES6 Modules or TypeScript
import Swal from 'sweetalert2'
import emailjs from '@emailjs/browser';
import{ init } from '@emailjs/browser';
import { resetarCarrinho } from "../redux/apiChamadas";
init("user_NGjXAQoDprIcUxDTPBxbR");





const Sucesso = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location)
  const navigate = useNavigate();
  const navegarParaHome = () => navigate('/');


  const data_stripe = location.state.stripeData;
  const carrinho = location.state.produtos;
  const utilizadorAtual = useSelector((state) => state.utilizador.utilizadorAtual);
  const emailUtilizadorAtual = utilizadorAtual.email
  const [pedidoId, setPedidoId] = useState(null);
  console.log("carrinho ->" + carrinho + "data_stripe ->" + data_stripe + "utilizadorAtual ->" + utilizadorAtual)


 

  useEffect(() => {
    const criarPedido = async () => {
      try {
        const res = await userRequest.post("/pedido", {
          IdUtilizador: utilizadorAtual._id,
          produtos: carrinho.produtos.map((item) => ({
            IdProduto: item._id,
            quantidade: item.quantidade,
            tituloProduto: item.titulo,
            tamanho: item.variacoes.map( (item) => item.tamanho),
            cor: item.variacoes.map( (item) => item.cor),
            imgProduto: item.img[0],
          })),
          totalCompra: carrinho.total,
          endereco: data_stripe.billing_details.address,
        });
        setPedidoId(res.data._id);  

        resetarCarrinho(dispatch);
      } catch {}
    };
    data_stripe && criarPedido();
  }, [carrinho, data_stripe, utilizadorAtual]);

  useEffect(() => {

    if(pedidoId !== null){
      var templateParams = {
        nome: utilizadorAtual.nome,
        emailComprador: utilizadorAtual.email,
        idDaEncomenda: pedidoId,
    
    
      };
      emailjs.send('service_0w1dmzr', 'template_9vlqaz9', templateParams, 'user_NGjXAQoDprIcUxDTPBxbR')
      .then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
         navegarParaHome()
      }, function(error) {
         console.log('FAILED...', error);
      });
     
    Swal.fire({

      title: 'Parabéns! \n  Tudo foi um sucesso',
      html: `<p>O numero do seu pedido é o ${pedidoId}<br/>Garantimos a satisfação do seu maior amor</p>`,
      confirmButtonColor: '#0B3C49',
      icon: 'success',
      type: 'success'
    }
    )}
  }, [pedidoId]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {pedidoId
        ? `Estamos enviando seu recibo por E-mail. Anote seu numero do pedido:  ${pedidoId}`
        : `Sucesso!. Seu pedido está sendo processado...`}
        <Link to ="/">
      <button style={{ padding: 10, marginTop: 20 }}>Ir Para a Homepage</button>
      </Link>
    </div>
  );
};

export default Sucesso;