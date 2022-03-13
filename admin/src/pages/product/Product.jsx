import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
//import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMetodos";
import { DeleteOutline,Edit } from "@material-ui/icons";
import Swal from 'sweetalert2'
import {marcas,
  triCategoriasRecemNascido,
  triCategoriasMeninaAndBebe,
  triCategoriasMeninoAndBebe,
  triCategoriasCerimoniasBebe,
  triCategoriasCerimoniasJunior,
  coresNovosProdutos,
  tamanhosNovosProdutos,
} from "../../dataSuporte"
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
  const [marca, setMarca] = useState([]);
  const [inputList, setInputList] = useState([{ cor: "", tamanho: "",quantidade: "" }]);

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

    console.log(principalCat)
  };

  

  const handlePrincipalCat = (e) => {
    //setPrincipalCat(e.target.value.split(","));
  };
  const handleSubCat = (e) => {
    setSubCat(e.target.value);
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

  const handleMarca = (e) => {
    setMarca(e.target.value);
  };
  console.log(inputs)
  console.log(marca)

  


  const handleClick = (e) => {
    e.preventDefault();
    if (file === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Não se esqueça de adicionar uma nova foto :)',
        confirmButtonColor: '#0B3C49',
        confirmButtonText: 'ok'
      })
    }
    else if(file !== null) {
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
          const valoresPrincipalCat = Object.values(principalCat)
          const produto = { ...inputs, img: downloadURL, categorias: valoresPrincipalCat, subcategorias: subCat, tricategorias: triCat, variacoes: inputList,};
          updateProduto(produtoId, produto, dispatch);
          console.log(produto)
          navegarPara();

        });
      }
    );
    } 
  };


  const gerirDelete = (id) => {
    const resultado = window.confirm('Tem certeza que deseja remover esta variacao?');
    if(resultado == true){
      let doc = userRequest.put(`/utilizador/${id}`, inputs);
    }
 
  };

  

  const atualizarVariacoes = (id_variacao) => {
      const tamanho = document.getElementById("ID_variacaoTamanhoAntigo").value;  
      const quantidade = document.getElementById("ID_variacaoQuantidadeAntigo").value;  
      const cor = document.getElementById("ID_variacaoCorAntigo").value;  
      const atualizarVariacaoGeral = async () => {
        try {
          const res = await userRequest.put(`/produto/atualizarVariacaoGeral/${id_variacao}/${quantidade}/${cor}/${tamanho}`);
          console.log(res.data) 
        } catch {}
      }
      atualizarVariacaoGeral();

  };
    // handle input change
    const handleInputChange = (e, index) => {

      const name = e.target.selectedOptions[0].getAttribute('name');
      const value = e.target.value;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
      console.log(inputList)
  
    };
    const handleInputChangeQuantidade = (e, index) => {
  
      const name = e.target.name;
      const value = e.target.value;
      const list = [...inputList];
      list[index][name] = value;
      setInputList(list);
      console.log(inputList)
  
    };

  // handle click event of the Remove button
  const handleRemoveClick = index => {

    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { cor: "", tamanho: "", quantidade:"" }]);
  };


  useEffect(() => {

    if (inputs.precoAntigo === undefined || inputs.precoAntigo === '' ) {
      setPrincipalCat((prev) => {
        return { ...prev, [2]:""};
      });
    }  else     if (inputs.precoAntigo !== undefined ){
      setPrincipalCat((prev) => {
        return { ...prev, [2]:"Saldo"};
      });
    } else if(inputs.precoAntigo === undefined && produto.precoAntigo !== undefined) {
      setPrincipalCat((prev) => {
        return { ...prev, [2]:"Saldo"};
      });
    }
  }, [inputs.precoAntigo]) // dependencias

  useEffect(() => {
    setPrincipalCat((prev) => {
      return { ...prev, [0]:produto.categorias[0]};
    });
    console.log("teste uau " + JSON.stringify(produto.categorias))
  }, [produto.categorias]) // dependencias

  useEffect(() => {

    const list = [...inputList];
    var timeoutArray = []
    produto.variacoes.forEach((variacaoItem,index) => {
        //list[index][variacaoItemElement[0]] = variacaoItemElement[1];
        const name = variacaoItem["cor"];
        console.log("teste uau oq rolou 2 -> " + name)

        timeoutArray.push({cor:variacaoItem["cor"], tamanho:variacaoItem["tamanho"],quantidade:variacaoItem["quantidade"]})
        


      console.log(inputList)
      console.log("timeoutarray " + JSON.stringify(timeoutArray))
    })

    setInputList(timeoutArray);

  }, [produto.variacoes]) // dependencias

  const handleNewIn = (e) => {
    const newIn = e.target.value
    console.log(newIn)
    if(newIn === "verdadeiro") {
    setPrincipalCat((prev) => {
      return { ...prev, [1]:'New in'};
    });

  } else if (newIn === "falso") {
    setPrincipalCat((prev) => {
      return { ...prev, [1]:''};
    });
  }

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
              <span className="productInfoKey">Em estoque</span>
              <span className="productInfoValue">{produto.emEstoque ? "Sim" : "Não"}</span>
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

            <label>Categoria Principal</label>
            <input 
            type="text" 
            placeholder={produto.categorias[0]}
            disabled
            onChange={handlePrincipalCat}
             />
            <label>Segunda Categoria</label>
            <select  onChange={handleSubCat} >  
              <option selected disabled>---</option>
              {produto.categorias[0] === "Menino"  &&
              <><option class="d-flex align-items-center "> Recém Nascido  </option><option class="d-flex align-items-center "> Bebé  </option><option class="d-flex align-items-center "> Criança  </option></>}
              {produto.categorias[0] === "Menina"  &&
              <><option class="d-flex align-items-center "> Recém Nascida  </option><option class="d-flex align-items-center "> Bebé  </option><option class="d-flex align-items-center "> Criança  </option></>}
              {produto.categorias[0] === "Cerimonias"  &&
              <><option class="d-flex align-items-center "> Recém Nascido  </option><option class="d-flex align-items-center "> Bebé  </option><option class="d-flex align-items-center "> Criança  </option></>}
            </select>
            <label>Terceira Categoria</label>
            <select  onChange={handleTriCat} >  
              <option selected disabled>---</option>

              {
              triCategoriasRecemNascido.map((node) => ( 
              produto.categorias[0] === "Menino"  && subCat ==="Recém Nascido" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }
              {
              triCategoriasMeninoAndBebe.map((node) => ( 
              produto.categorias[0] === "Menino"  && subCat ==="Bebé" &&
              <option class="d-flex align-items-center "> {node.desc}</option>
              ))}
              {triCategoriasMeninoAndBebe.map((node) => ( 
              produto.categorias[0] === "Menino"  && subCat ==="Criança" &&
              <option class="d-flex align-items-center ">{node.desc}</option>
              ))}


              {
              triCategoriasRecemNascido.map((node) => ( 
              produto.categorias[0] === "Menina"  && subCat ==="Recém Nascida" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }
              {
              triCategoriasMeninaAndBebe.map((node) => ( 
              produto.categorias[0] === "Menina"  && subCat ==="Bebé" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }
              {
              triCategoriasMeninaAndBebe.map((node) => ( 
              produto.categorias[0] === "Menina"  && subCat ==="Criança" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }




              {
              triCategoriasCerimoniasBebe.map((node) => ( 
              produto.categorias[0] === "Cerimonias"  && subCat ==="Cerimonia Bebé" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }
              {
              triCategoriasCerimoniasJunior.map((node) => ( 
              produto.categorias[0] === "Cerimonias"  && subCat ==="Cerimonia Junior" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }

            </select>
            <label>Gostaria de marcar esse produto como uma novidade, <b style={{color:"red"}}>New In</b>? <br/> </label>
          <select name="emNewIn" onChange={handleNewIn}>
            {produto.categorias[1] === "New in" ? 
              <><option value="falso">Não</option><option value="verdadeiro" selected>Sim</option></>
             :
              <><option value="falso" selected>Não</option>
              <option value="verdadeiro" >Sim</option></>
            }

          </select>


            <details>
            <summary>clique aqui para adicionar novas variações</summary>
              {
                inputList.map((x, i) => {
                  return (
                  <>

                    <div style={{backgroundColor:"#604D53"}  }class="containerVariacaoAntiga">


                    
                      <div class="itemVariacaoAntiga">
                        <label style={{}}>Cores</label>
                        <select  onChange={e => handleInputChange(e, i)}   >  
                      
                          <option selected disabled>{x.cor}</option>
                          {
                            coresNovosProdutos.map((node) => ( 
                    
                            <option name={node.name} class="d-flex align-items-center "> {node.desc}</option>))
                          }
                        </select>
                      </div>

                      <div class="itemVariacaoAntiga">
                        <label style={{}}>Tamanhos</label>
                        <select  onChange={e => handleInputChange(e, i)}   >  
                            <option selected disabled>{x.tamanho}</option>
                            {
                              tamanhosNovosProdutos.map((node) => ( 
                      
                              <option name={node.name} class="d-flex align-items-center "> {node.tamanho}</option>))
                            }
                            
                        </select>
                      </div>


                      <div class="itemVariacaoAntiga">
                        <label style={{fontSize:"14px"}}>Quantidade  </label>
                        <input
                          className="mr10"
                          type="number"
                          name="quantidade"
                          placeholder="Introduza a quantidade disponivel para essa variação!"
                          value={x.quantidade}
                          onChange={e => handleInputChangeQuantidade(e, i)} />
                      </div>

                      <div className="btn-box">
                        {inputList.length !== 1 && 
                          <button
                          className="buttonVariacoesRemover"
                          type="button"
                          onClick={() => handleRemoveClick(i)}>
                            Remover
                          </button>}
                        {inputList.length - 1 === i && 
                        <button 
                          className="buttonVariacoesAdicionar"
                          type="button" onClick={handleAddClick}>
                            Adicionar
                        </button>}
                      </div>
                  </div>
                </>
                );
              })
                    
              }
            </details>
                  <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>

          <label>Marca</label>
          <select name="marca" onChange={handleChange} >
            {marcas.map(item => ( 
              <>
              <option class="d-flex align-items-center ">  
                {item.desc}
              </option>
              </> ))
            }
            </select>
            <label>Gostaria de anunciar esse produto em uma promoção?</label>
            <details>
         

              <summary class="sumario"> Gostaria de anunciar esse produto em uma promoção?</summary>
                    <div className="addProductItem" >
                      <label>Preço  ( em € EUR )</label>
                      <input
                      style={{maxWidth:"200px"}}
                        name="precoAntigo"
                        type="number"
                        placeholder={produto.precoAntigo}
                        onChange={handleChange}
                      />
                    </div>
            </details>
            <label>Preco</label>
            <input 
            name="preco" 
            type="text" 
            placeholder={produto.preco}
            onChange={handleChange}
             />
            <label>Em Estoque</label>
            <select name="emEstoque" id="idEstoque" onChange={handleChange}>
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