import { Link, useLocation } from "react-router-dom";
import "./product.css";
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

export default function Product() {
  const location = useLocation();
  const produtoId = location.pathname.split("/")[2];
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
  const [tamanhos, setTamanhos] = useState([]);
  const [cores, setCores] = useState([]);

  const produto = useSelector((state) =>
    state.produto.produtos.find((produto) => produto._id === produtoId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("pedido/rendaMensal?pid=" + produtoId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [produtoId, MONTHS]);


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
    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload está " + progress + "% concluido");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload foi pausado");
            break;
          case "running":
            console.log("Upload está sendo processado");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const produto = { ...inputs, img: downloadURL, categorias: principalCat, subcategorias: subCat, tricategorias: triCat, tamanho: tamanhos, cor: cores };
          updateProduto(produtoId, produto, dispatch);
          console.log(produto)
          navegarPara();
        });
      }
    );
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Produto</h1>
        <Link to="/adminNovoProduto">
          <button className="productAddButton">Criar</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={produto.img} alt="" className="productInfoImg" />
            <span className="productName">{produto.titulo}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{produto._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{produto.emEstoque}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Nome do Produto</label>
            <input 
            name="titulo" 
            type="text" 
            placeholder={produto.titulo}
            onChange={handleChange} />
            <label>Descrição do Produto</label>
            <input 
            name="desc" 
            type="text" 
            placeholder={produto.desc}
            onChange={handleChange} />
            <label>Preco</label>
            <input 
            name="preco" 
            type="text" 
            placeholder={produto.preco}
            onChange={handleChange}
             />
            <label>Categoria Principal</label>
            <input 
            type="text" 
            placeholder={produto.categorias}
            onChange={handlePrincipalCat}
             />
            <label>Segunda Categoria</label>
            <input 
            type="text" 
            placeholder={produto.subcategorias}
            onChange={handleSubCat}
             />
            <label>Terceira Categoria</label>
            <input 
            type="text" 
            placeholder={produto.tricategorias}
            onChange={handleTriCat}
             />
            <label>Tamanhos</label>
            <input 
            type="text" 
            placeholder={produto.tamanho}
            onChange={handleTam}
             />
            <label>Cores</label>
            <input 
            type="text" 
            placeholder={produto.cor}
            onChange={handleCor}
             />
            <label>Em Estoque</label>
            <select name="emEstoque" id="idEstoque">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={produto.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input 
              type="file" 
              id="file" 
              style={{ display: "none" }} 
              onChange={(e) => setFile(e.target.files[0])}
               />
            </div>
            <button onClick={handleClick} className="productButton">Atualizar</button>
          </div>
        </form>
      </div>
    </div>
  );
}