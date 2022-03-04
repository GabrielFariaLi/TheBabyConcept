import React from 'react'
import styled from "styled-components"
import {marcasSliders} from "../data"
import {mobile} from "../responsivel"
import "./css/marcasSlider.css"

import 'bootstrap/dist/css/bootstrap.min.css';
import {$, bxSlider} from 'jquery';
import { findDOMNode } from 'react-dom'



const MarcasSlider = () => {

  

  return (
    <section class="client">
    <div class="container">
      <div class="row">
  
        <div class="section-title text-center">
          <h1> Marcas que confiam no nosso trabalho : </h1>
        </div>
  
        <div  class="carousel-client">
        {marcasSliders.map(item => (
          <div data-aos="fade-left" data-aos-once="true" class="slide"><img src={item.img} alt={item.desc}/></div>

          ))}
        </div>
      </div>
    </div>
  </section>
  )
}

export default MarcasSlider
