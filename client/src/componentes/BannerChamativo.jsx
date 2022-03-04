import React from 'react'

import "./css/bannerChamativo.css"


import 'bootstrap/dist/css/bootstrap.min.css';

const BannerChamativo = () => {
  return (
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="image-element col-xl-6 ms-0">
       
                    <img class="imagemBannerChamativo" src="https://firebasestorage.googleapis.com/v0/b/baby-concept20.appspot.com/o/Banner.jpg?alt=media&token=fbe7b9e4-da07-4755-8ce8-f8e9502ea601" alt="" title=""/>
    
            </div>
            <div  class="containerInfoBannerChamativo text-element col-xl-6 ">
            <div data-aos="zoom-in-down" data-aos-once="true" class="info_div">
                
                
                <h1 class="mbr-section-title mbr-fonts-style pb-4 px-5 mbr-white display-1">
                    Titulo do<br/>
                    <span class="brown">Banner</span>
                </h1>
                <div class="paragraphs-wrapper pb-4 px-5">
                    <p class="mbr-text mbr-fonts-style mbr-lighter first-paragraph display-7">
                    Subtitulo com informações relevantes que devem estar <br/> em destaque desde a primeira vista
                    Subtitulo com informações relevantes que devem estar em destaque desde a primeira vista      Subtitulo com informações relevantes que devem estar <br/> em destaque desde a primeira vista      Subtitulo com informações relevantes que devem estar  em destaque desde a primeira vista
                    </p>

                </div>
                <div class="ms-5 mbr-section-btn"><a style={{backgroundColor: "#0B3C49",borderRadius:"4px"}}class="botaoBannerConhecaMais btn btn-lg btn-secondary display-4" href="https://mobirise.com">Conheça Mais</a></div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default BannerChamativo
