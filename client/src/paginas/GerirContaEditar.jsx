import React from 'react'
import Anuncios from '../componentes/Anuncios'
import Footer from '../componentes/Footer'
import { Link, useNavigate } from "react-router-dom";
import Copyright from '../componentes/Copyright'
import Navbar from '../componentes/Navbar'
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch,  } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import "../componentes/css/gerirContaEditar.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {format} from "timeago.js"

import { userRequest, publicRequest } from "../requestMetodos";

// ES6 Modules or TypeScript
import Swal from 'sweetalert2'


const GerirContaEditar = () => {

    
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [])

  const [pedidos, setPedidos] = useState([]);
  const [inputs, setInputs] = useState({});
  const [informacoesAtuaisUtilizador, setinformacoesAtuaisUtilizador] = useState([]);
  const navigate = useNavigate();
  const navegarParaHome = () => navigate('/');
  const utilizadorAtual = useSelector(estado => estado.utilizador.utilizadorAtual)

  const ID_utilizadorAtual = utilizadorAtual._id
  console.log(ID_utilizadorAtual)

  useEffect(() => {
    const getUtilizador = async ()=> {
      try{
        const res = await userRequest.get("/utilizador/buscar/" + ID_utilizadorAtual);
        setinformacoesAtuaisUtilizador(res.data);
        console.log(informacoesAtuaisUtilizador)
      } catch(err) {}
    };
    getUtilizador()
  }, [ID_utilizadorAtual]) // dependencias

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(inputs)
  };

  
  const handleClick = (e) => {
    e.preventDefault();

    let doc = userRequest.put(`/utilizador/${ID_utilizadorAtual}`, inputs);
    console.log(doc)
    Swal.fire({
      position: 'bottom-end',
      icon: 'success',
      type: 'success',
      title: 'Anotado!',
      text: 'Seus detalhes foram salvos com sucesso! Obrigado por nos manter sempre atualizados!',
      showConfirmButton: false,
      timer: 4000
    })
    
  };

  const handleDeletarConta = (e) => {
    e.preventDefault();
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Você está de partida? :(',
      text: "Lembre-se que deletar sua conta é uma ação permanente (um tempo bem longo), deseja continuar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonClass: "marginLeftRight",
      cancelButtonClass: "marginLeftRight",

      confirmButtonText: 'Sim, delete!',
      cancelButtonText: 'Não, cancele!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        
        swalWithBootstrapButtons.fire(
          'Esta feito!',
          'Sua conta e suas informações foram deletadas',
          'success'
        )
        let doc = userRequest.delete(`/utilizador/${ID_utilizadorAtual}`, inputs);
        console.log(doc)
        navegarParaHome();
        
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Uffa',
          'ótimo ter você ainda conosco :)',
          'error'
        )
      }
    })
    

    
  };
  


  return (
      <div>     {console.log(pedidos)}
              <Anuncios/>
              <Navbar/>
              <div class="d-flex justify-content-center containerPrincipalGerirConta">
                <div class="row">

                  <div class="col-sm-2">
                    <div class="d-flex containerNavegacaoGerirConta">

                        <div class="itemNavegacaoGerirConta mb-3">
                          Meus Detalhes
                        </div>
                                    <Link to={"/gerirConta/"}>
                      <div style={{borderLeft: "3px solid rgba(0, 0, 0, 0.4)" }} class="itemNavegacaoGerirConta mb-3">
                        Acompanhar Meus Pedidos
                      </div>
                      </Link> 


                    </div>
                  </div>
                  
                  <div class="ms-5 col-6 containerMeusDetalhesEditar">
                  <h1> Meus detalhes</h1>
                  <p>Edite as informações da sua conta por aqui!</p>
                  <hr class="linhaDivisoriaDetalhes"/>
                  <div class="d-flex flex-wrap align-content-center">
                    
                    <div class="CentralizarLabelInput">
                      <label class="labelInputGerirContaEditar">Nome</label>
                      <input name="nome" class="ms-2 inputMeusDetalhesEditar" onChange={handleChange} placeholder={informacoesAtuaisUtilizador.others?.nome}></input>
                    </div>

                    <div class="CentralizarLabelInput">
                      <label class="ms-2">Telefone</label>
                      <input name="telefone" class="ms-2 inputMeusDetalhesEditarTelefone" onChange={handleChange} placeholder={informacoesAtuaisUtilizador.others?.telefone}></input>
                    </div>   

                    <div class="CentralizarLabelInput">
                      <label class="labelInputGerirContaEditar" >E-mail</label>
                      <input name="email" id="inputEmailGerirConta" onChange={handleChange} class="ms-2 inputMeusDetalhesEditar" placeholder={informacoesAtuaisUtilizador.others?.email}></input>
                    </div>

                  </div>
                  <div class="d-flex containerBotoesGerirConta">
                    <button class="deletarContaButton" onClick={handleDeletarConta}>Deletar conta</button>
                  <button class="salvarAgoraButton" onClick={handleClick} >Salvar detalhes</button>
                  </div>
                  </div>
                  <div class="col-sm-2"/>


      
             
                </div>
              </div>
              <Footer/>
              <Copyright/>
    </div>
  )
}

export default GerirContaEditar