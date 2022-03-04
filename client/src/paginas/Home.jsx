import React from 'react'
import Anuncios from '../componentes/Anuncios'
import Copyright from '../componentes/Copyright'
import Categorias from '../componentes/Categorias'
import Footer from '../componentes/Footer'
import Navbar from '../componentes/Navbar'
import Newsletter from '../componentes/Newsletter'
import Produtos from '../componentes/Produtos'
import MarcasSlider from '../componentes/MarcasSlider'
import Slider from '../componentes/Slider'
import {mobile} from "../responsivel"
import { useState,useEffect } from "react";
import BannerChamativo from '../componentes/BannerChamativo'
import ProdutosCarousel from '../componentes/ProdutosCarousel'
import axios from "axios"
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.min.css';


const H1 = styled.h1`
background-color: #F8E9F0;

font-family: gintoNordLight;
padding-top: 70px;
margin-bottom: 0px;
`;


const Home = () => {

  
  useEffect(() => {
    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
  }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [])


  return (

    <div>
        <Anuncios/>
        <Navbar/>
        <Slider/> 
 

        <Categorias />
        <H1 className="text-center">Saldos incriveis para você</H1>
        <Produtos categoria={"Saldo"} filtros={{["categorias"]:"Saldo"}} />
        <MarcasSlider data-aos="zoom-in-right" data-aos-once="true"/>
        <BannerChamativo/>
        <H1 className="text-center">Confira os mais novos produtos!</H1>
        <ProdutosCarousel categoria={"New in"} filtros={{["categorias"]:"New in"}} />
        <Newsletter/>
        <Footer/>
        <Copyright/>

    </div>
  );
};

export default Home
