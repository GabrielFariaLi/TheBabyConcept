import { useState,useEffect } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProduto } from "../../redux/apiChamadas";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'
import {marcas,
  triCategoriasRecemNascido,
  triCategoriasMeninaAndBebe,
  triCategoriasMeninoAndBebe,
  triCategoriasCerimoniasBebe,
  triCategoriasCerimoniasJunior,
  coresNovosProdutos,
  tamanhosNovosProdutos} from "../../dataSuporte"





export default function NewProduct() {

  const [inputs, setInputs] = useState({});
  const [inputList, setInputList] = useState([{ cor: "", tamanho: "",quantidade: "" }]);
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(null);
  const [principalCat, setPrincipalCat] = useState([]);
  const [principalCatArray, setPrincipalCatArray] = useState();
  const [subCat, setSubCat] = useState([]);
  const [triCat, setTriCat] = useState([]);
  const [marca, setMarca] = useState([]);
  const [cores, setCores] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const navegarPara = () => history.push('/adminProdutos');


  const variacoes = [{}];


  useEffect(() => {
    console.log("teste inicial -> " +  JSON.stringify(principalCat))
  }, []) // dependencias

  useEffect(() => {

    if (inputs.precoAntigo === undefined || inputs.precoAntigo === '' ) {
      setPrincipalCat((prev) => {
        return { ...prev, [2]:""};
      });
    }  else     if (inputs.precoAntigo !== undefined ){
      setPrincipalCat((prev) => {
        return { ...prev, [2]:"Saldo"};
      });
    }
  }, [inputs.precoAntigo]) // dependencias
  const setFiles = (e) => {

    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
  }

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(principalCat)
  };
  const handlePrincipalCat = (e) => {
    setPrincipalCat((prev) => {
      return { ...prev, [0]:e.target.value};
    });
  };
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
  const handleSubCat = (e) => {
    setSubCat(e.target.value);
    console.log("PRINCIPAL CAT -> " + principalCat)
  
    console.log("VALORES PRINCIPAL CAT -> " + Object.values(principalCat))
    console.log(("PRINCIPAL CAT ARRAY -> " +  principalCatArray))
    

  };
  const handleTriCat = (e) => {
    setTriCat(e.target.value);
  };
  
  const handleMarca = (e) => {
    setMarca(e.target.value);
  };


  console.log(inputs)
  console.log(inputList)
  console.log(principalCat)
  console.log(subCat)
  console.log(triCat)
  console.log(principalCat)
  console.log(marca)
  console.log(cores)


  const handleClick = (e) => {
    e.preventDefault();
    if (file === null) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'N??o se esque??a de adicionar uma nova foto :)',
        confirmButtonColor: '#0B3C49',
        confirmButtonText: 'ok'
      })
    }
    else if(file !== null) {
 
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
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
        console.log("Upload est?? " + progress + "% concluido");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload foi pausado");
            break;
          case "running":
            console.log("Upload est?? sendo processado");
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
          const produto = { ...inputs, img: downloadURL, categorias: valoresPrincipalCat, subcategorias: subCat, tricategorias: triCat, variacoes:inputList, marca:marca };
          addProduto(produto, dispatch);
          navegarPara();
          console.log(produto)
        });
      }
    );
    }
  };



  // handle input change
  const handleInputChange = (e, index) => {

    const name = e.target.selectedOptions[0].getAttribute('name')
    const value = e.target.value
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(inputList)

  };
  const handleInputChangeQuantidade = (e, index) => {

    const name = e.target.name
    const value = e.target.value
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


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Novo Produto</h1>
      <form className="addProductForm">

        <div className="addProductItem">
          <label>Titulo</label>
          <input
            name="titulo"
            type="text"
            placeholder="Insira aqui um titulo chamativo para o seu produto!"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Descri????o</label>
          <input
            name="desc"
            type="text"
            placeholder="E agora uma descri????o cativante :)"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Imagem</label>
          <input
            type="file"
            id="file"
            multiple
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>

        <div className="addProductItem">
          <label>Qual a principal categoria desse produto? </label>
          <select  onChange={handlePrincipalCat}   >  
              <option selected disabled>---</option>
                <option  class="d-flex align-items-center "> Menino  </option>
                <option  class="d-flex align-items-center "> Menina  </option>
                <option  class="d-flex align-items-center "> Cerimonias  </option>
                <option  class="d-flex align-items-center "> Puericultura  </option>
              
          </select>
        </div>
        <div className="addProductItem">
          <label>Qual a segunda categoria desse produto?</label>
          <select  onChange={handleSubCat} >  
              <option selected disabled>---</option>
              {principalCat[0] === "Menino"  &&
              <><option class="d-flex align-items-center "> Rec??m Nascido  </option><option class="d-flex align-items-center "> Beb??  </option><option class="d-flex align-items-center "> Crian??a  </option></>}
              {principalCat[0] === "Menina" &&
              <><option class="d-flex align-items-center "> Rec??m Nascida  </option><option class="d-flex align-items-center "> Beb??  </option><option class="d-flex align-items-center "> Crian??a  </option></>}
              {principalCat[0] === "Cerimonias" &&
              <><option class="d-flex align-items-center "> Cerimonia Beb?? </option><option class="d-flex align-items-center "> Cerimonia Junior  </option> </>}

          </select>
        </div>
        <div className="addProductItem">
          <label>Qual a terceira categoria desse produto?</label>

          <select  onChange={handleTriCat} >  
              <option selected disabled>---</option>


              {
              triCategoriasRecemNascido.map((node) => ( 
              principalCat[0] === "Menino"  && subCat ==="Rec??m Nascido" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }
              {
              triCategoriasMeninoAndBebe.map((node) => ( 
              principalCat[0] === "Menino"  && subCat ==="Beb??" &&
              <option class="d-flex align-items-center "> {node.desc}</option>
              ))}
              {triCategoriasMeninoAndBebe.map((node) => ( 
              principalCat[0] === "Menino"  && subCat ==="Crian??a" &&
              <option class="d-flex align-items-center ">{node.desc}</option>
              ))}


              {
              triCategoriasRecemNascido.map((node) => ( 
              principalCat[0] === "Menina"  && subCat ==="Rec??m Nascida" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }
              {
              triCategoriasMeninaAndBebe.map((node) => ( 
              principalCat[0] === "Menina"  && subCat ==="Beb??" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }
              {
              triCategoriasMeninaAndBebe.map((node) => ( 
              principalCat[0] === "Menina"  && subCat ==="Crian??a" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }




              {
              triCategoriasCerimoniasBebe.map((node) => ( 
              principalCat[0] === "Cerimonias"  && subCat ==="Cerimonia Beb??" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }
              {
              triCategoriasCerimoniasJunior.map((node) => ( 
              principalCat[0] === "Cerimonias"  && subCat ==="Cerimonia Junior" &&
              <option class="d-flex align-items-center "> {node.desc}</option>))
              }

          </select>
        </div>

        <div className="addProductItem">
          <label>Gostaria de marcar esse produto como uma novidade, <b style={{color:"red"}}>New In</b>? <br/> sempre poder?? alterar na ??rea de editar </label>
          <select name="emNewIn" onChange={handleNewIn}>
            <option value="falso">N??o</option>
            <option value="verdadeiro">Sim</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Quais s??o as varia????es desse produto?</label>
            <p class="instrucoes" >Porfavor informe a cor, o tamanho dispon??vel para <b>essa espec??fica cor</b> e a quantidade <b>dessa combina????o</b> dispon??vel!</p>
          {inputList.map((x, i) => {
          return (
       
                <>

                <label style={{fontSize:"14px"}}>Cor </label>
                <select  onChange={e => handleInputChange(e, i)}   >  
                
                    <option selected disabled>---</option>
                    {
                      coresNovosProdutos.map((node) => ( 
              
                      <option name={node.name} class="d-flex align-items-center "> {node.desc}</option>))
                    }
                    
                </select>


                <label style={{fontSize:"14px"}}>Tamanho </label>
                <select  onChange={e => handleInputChange(e, i)}   >  
                    <option selected disabled>---</option>
                    {
                      tamanhosNovosProdutos.map((node) => ( 
                        
                      <option name={node.name} class="d-flex align-items-center "> {node.tamanho}</option>))
                    }
                    
                </select>
                <label style={{fontSize:"14px"}}>Quantidade  </label>
                <input
                className="mr10"
                type="number"
                name="quantidade"
                placeholder="Introduza a quantidade disponivel para essa varia????o!"
                value={x.quantidade}
                onChange={e => handleInputChangeQuantidade(e, i)} />

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
              </>
     

        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
      </div>

        <div className="addProductItem">
          <label>Marca</label>
          <select onChange={handleMarca} >
            {marcas.map(item => ( <>
              <option class="d-flex align-items-center ">  
                {item.desc}
              </option></> ))
            }
          </select>
        </div>
        <div className="addProductItem">
        <details>
         

            <summary class="sumario" > Gostaria de anunciar esse produto em uma promo????o?</summary>
                  <div className="addProductItem" >
                    <label>Pre??o  ( em ??? EUR )</label>
                    <input
                    style={{maxWidth:"200px"}}
                      name="precoAntigo"
                      type="number"
                      placeholder="Pre??o antes da promo????o"
                      onChange={handleChange}
                    />
                 </div>
        </details>   
        
        </div>
        

        <div className="addProductItem" >
                    <label>Pre??o <b>atual</b> ( em ??? EUR )</label>
                    <input
                      name="preco"
                      type="number"
                      placeholder="100"
                      onChange={handleChange}
                    />
        </div>
        <div className="addProductItem">
          <label>Em estoque?</label>
          <select name="emEstoque" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <button onClick={handleClick} className="addProductButton">
          Criar
        </button>
      </form>
    </div>
  );
}