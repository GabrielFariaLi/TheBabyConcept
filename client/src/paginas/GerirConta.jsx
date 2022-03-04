import React from 'react'
import Anuncios from '../componentes/Anuncios'
import Footer from '../componentes/Footer'
import { Link } from "react-router-dom";
import Copyright from '../componentes/Copyright'
import Navbar from '../componentes/Navbar'
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch,  } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import "../componentes/css/gerirConta.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import {format} from "timeago.js"

import { userRequest, publicRequest } from "../requestMetodos";




const GerirConta = () => {

  
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [])

  const [pedidos, setPedidos] = useState([]);

  const utilizadorAtual = useSelector(estado => estado.utilizador.utilizadorAtual)

  const ID_utilizadorAtual = utilizadorAtual._id
  console.log(ID_utilizadorAtual)

  useEffect(() => {
    const getPedidosPorID = async ()=> {
      if(!window.location.hash) {
        window.location = window.location + '#loaded';
        window.location.reload();
      }
      try{
        const res = await userRequest.get("/pedido/buscar/" + ID_utilizadorAtual);
        setPedidos(res.data);
        console.log(pedidos)
      } catch(err) {}
    };
    getPedidosPorID()
  }, [ID_utilizadorAtual]) // dependencias

  

  return (
    <div>     {console.log(pedidos)}
              <Anuncios/>
              <Navbar/>
              <div  class="d-flex justify-content-center containerPrincipalGerirConta">
                <div class="row">
       
                  <div class="col-sm-2 containerNavegacaoAcompanharPedidos">
                    <div class="d-flex containerNavegacaoGerirConta">
                    <Link to={"/gerirContaEditar/"}>
                        <div style={{borderLeft: "3px solid rgba(0, 0, 0, 0.4)" }}class="itemNavegacaoGerirConta mb-3">
                          Meus Detalhes
                        </div>
                    </Link>
                      <div class="itemNavegacaoGerirConta mb-3">
                        Acompanhar Meus Pedidos
                      </div>


                    </div>
                  </div>
                  <div class="col-sm-1 espacamentoAcompanharPedidos"/>
                  <div class="col-6" data-aos="zoom-in-down" data-aos-once="true" id="tabelaAcompanharPedidos">
                    <table class="tg">
                      <thead>
                        <tr>
         
                          <th class="tg">Código da encomenda</th>
                          <th class="tg">Data da encomenda</th>
                          <th class="tg">Valor pago</th>
                          <th class="tg">Estado da encomenda</th>
                        </tr>
                      </thead>
                      <tbody>
                      {pedidos.map((produto) => ( 
                          <>
                        <tr>

                       
                          <td class="tg tg2">{produto._id}</td>
                          <td class="tg tg2">{format(produto.createdAt)}</td>
                          <td class="tg tg2">{produto.totalCompra}</td>
                          <td class="tg tg2">{produto.estado}</td>
                 
                
                        </tr>
                        </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div class="col-2"/>
                </div>
              </div>
              <Footer/>
              <Copyright/>
    </div>
  )
}

export default GerirConta
