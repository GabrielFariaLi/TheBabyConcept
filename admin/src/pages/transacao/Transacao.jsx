import { Link, useLocation } from "react-router-dom";
import "./transacao.css";
import Chart from "../../components/chart/Chart";
//import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMetodos";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProduto } from "../../redux/apiChamadas";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Transacao() {
  const location = useLocation();
  const transacaoId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const history = useHistory();
  const navegarPara = () => history.push('/adminProdutos');
  

  // UPDATE INPUTS
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [principalCat, setPrincipalCat] = useState([]);
  const [subCat, setSubCat] = useState([]);
  const [triCat, setTriCat] = useState([]);
  const [estado,setEstado] = useState({});
  const [tamanhos, setTamanhos] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [cores, setCores] = useState([]);
  const [cidadeEndereco,setCidadeEndereco] = useState("");
  const [paisEndereco,setPaisEndereco] = useState("");
  const [linha1Endereco,setLinha1Endereco] = useState("");
  const [linha2Endereco,setLinha2Endereco] = useState("");
  const [codigoPostalEndereco,setCodigoPostalEndereco] = useState("");


  useEffect(() => {
    const getPedidosPorID = async ()=> {
      try{
        const res = await userRequest.get("/pedido/buscarPedidoId/" + transacaoId);
        setPedido(res.data);
        console.log(pedido)
      } catch(err) {}
    };
    getPedidosPorID()
  }, [transacaoId]) // dependencias
  useEffect(() => {
    if(typeof pedido.endereco === "object") {

      setCidadeEndereco(pedido.endereco[Object.keys(pedido.endereco)[0]])
      setPaisEndereco(pedido.endereco[Object.keys(pedido.endereco)[1]])
      setLinha1Endereco(pedido.endereco[Object.keys(pedido.endereco)[2]])
      setLinha2Endereco(pedido.endereco[Object.keys(pedido.endereco)[3]])
      setCodigoPostalEndereco(pedido.endereco[Object.keys(pedido.endereco)[4]])
      
      console.log("teste incrivel mesmo-> " +  pedido.endereco[Object.keys(pedido.endereco)[1]] ) //returns 'someVal'
  }
  else {

  }
  }, [typeof pedido.endereco === "object"]) // dependencias



  // UPDATE

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handlePrincipalCat = (e) => {
    setPrincipalCat(e.target.value.split(","));
  };
  const handleSubCat = (e) => {
    setSubCat(e.target.value.split(","));
  };
  const handleTriCat = (e) => {
    setTriCat(e.target.value.split(","));
  };
  
  const handleTam = (e) => {
    setTamanhos(e.target.value.split(","));
  };
  const handleCor = (e) => {
    setCores(e.target.value.split(","));
  };

  console.log(inputs)


  const handleClick = (e) => {
    e.preventDefault();
    console.log(estado)
    let doc = userRequest.put(`pedido/atualizarEstado/${transacaoId}`, estado);
    window.location.reload();
    
  };

  const gerirEstado = (e) => {

  
    setEstado((prev) => {
      return {[e.target.name]: e.target.value };
    });
    console.log(estado)
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Transação</h1>

      </div>
      <div className="productTop">
        <div className="productTopRight">
          <img src="https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/transaction-money-svgrepo-com.svg?alt=media&token=b1bd2047-0a56-497a-9465-6590d01b4e8c" alt="" className="productInfoImg" />
         
          <div className="totalCompraDiv">
            <label>ID da compra</label>
            <b >{pedido._id}</b> 
          </div>
          <div className="totalCompraDiv">
            <label> Total da compra</label>
            <b style={{fontSize:"30px"}}>{pedido.totalCompra}€</b> 
          </div>

          <div className="totalCompraDiv">
            <label> Info Comprador</label>
            <Link to={`/adminUser/${pedido.IdUtilizador}`}>
            <button style={{padding:"7px 15px 7px 15px"}}>Acessar</button> 
            </Link>
          </div>
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">

            <label style={{textAlign:"center "}}>Estado dessa encomenda</label>
            <b>{pedido.estado}</b>
            
          </div>

          <div className="atualizarEstadoTransacao">
          <select onChange={gerirEstado}  name="estado" id="idEstadoTransacao">
            <option >Pendente </option>
            <option >A caminho</option>
            <option >Entregue </option>
          </select>

          <button onClick={handleClick} className="productButton">Atualizar</button>
          </div>

          <div className="enderecoContainerTransacao">
                <label style={{marginLeft:"1rem"}}>Endereço para entrega:</label>
                <b style={{marginLeft:"1rem"}}>
                {paisEndereco !== "" && paisEndereco} , 
                {cidadeEndereco !== "" && cidadeEndereco} - {'\u00A0'}
                  {linha1Endereco !== "" && linha1Endereco}
                  {linha2Endereco !== "" && linha2Endereco } | <br/>
                  {codigoPostalEndereco !== "" && codigoPostalEndereco} 
                </b>

          </div>

        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
        {console.log("transacao atual ->" + JSON.stringify(pedido))}

        {pedido.produtos?.map((produto) => 
          <div className="productFormLeft">

      
            <>
            <label>Id do Produto</label><p
                name="titulo"
                style={{marginBottom:"1rem"}}
                type="text"
                onChange={handleChange} >{produto.IdProduto}</p>
            
            
            
            
            <label>Nome do Produto</label><p
                name="titulo"
                style={{marginBottom:"1rem"}}
                type="text"
                onChange={handleChange} >{produto.tituloProduto}</p><label>Imagem do Produto</label>
                <img src={produto.imgProduto[0]} alt="" className="productUploadImg" style={{marginBottom:"1rem"}} />
                {console.log(JSON.stringify(produto))}
                <label>Cor</label><p
                name="titulo"
                type="text"
                style={{marginBottom:"1rem"}}
                onChange={handleChange} >{produto.cor[0]}</p>
                <label>Tamanho</label><p
                name="titulo"
                style={{marginBottom:"1rem"}}
                type="text"
                onChange={handleChange} >{produto.tamanho[0]}</p>
               </>

          </div>
            )}
        </form>
      </div>
    </div>
  );
}