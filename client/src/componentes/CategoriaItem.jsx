import React from 'react'
import  "./css/categoriaItem.css";
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import {mobile} from "../responsivel"
import 'bootstrap/dist/css/bootstrap.min.css';
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'bootstrap/dist/js/bootstrap.min.js';
import { useEffect } from 'react';




const Container = styled.div`
position: relative;
box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
max-height: 458px;
/*
grid-area: ${props=> props.categoria ===  "Meninos" && "1 / 2 / 2 / 3" };
grid-area: ${props=> props.categoria ===  "Meninas" && "1 / 4 / 2 / 5" };
grid-area: ${props=> props.categoria ===  "Cerimonias" && "1 / 6 / 2 / 7" };

grid-area: ${props=> props.categoria ===  "New in" && "3 / 2 / 4 / 7"};
*/
grid-area: ${props=> props.categoria ===  "Menino" && "1 / 2 / 3 / 4" };
grid-area: ${props=> props.categoria ===  "Menina" && "1 / 5 / 3 / 7" };
grid-area: ${props=> props.categoria ===  "Cerimonias" && "1 / 8 / 3 / 10" };

grid-area: ${props=> props.categoria ===  "New in" && "4 / 2 / 6 / 10"};

@media only screen and (max-width:821px) {
  grid-area: ${props=> props.categoria ===  "Menino" && "1 / 2 / 3 / 10" };
  grid-area: ${props=> props.categoria ===  "Menina" && "4 / 2 / 6 / 10" };
  grid-area: ${props=> props.categoria ===  "Cerimonias" && "7 / 2 / 9 / 10" };

  grid-area: ${props=> props.categoria ===  "New in" && "10 / 2 / 12 / 10"};
}




 
`;

const Image = styled.img`
 width: 100%;
 height: 100%;

 object-fit: cover;
 object-position: ${(props) => 
  props.cat === "New in"   ? '0px -100px' : '' 
  };
 @media only screen and (max-width:821px) {

  object-position: ${(props) => 
   props.cat ===  'Menina' | props.cat === 'Menino' | props.cat === "Cerimonias"   ? '0px -100px' : '' 
  };
 }
 @media only screen and (max-width:440px) {

object-position: ${(props) => 
 props.cat ===  'Menina' | props.cat === 'Menino' | props.cat === "New in"  | props.cat === "Cerimonias"   ? '0px 0px'
 : ''

};
}
`;

const Title = styled.h1`

  color: white;
  margin-bottom: 20px;
  text-transform: uppercase;
  font-size: 36px;
  font-family: gintoNordHairline;

`;

const Info = styled.div`
position: absolute;
bottom: 5%;

z-index: 99;
left: 0;
right: 0;
text-justify: center;
text-align: center;
`;

const Button = styled.button`
  border-radius: 4px !important;
  padding: 15px 40px 15px 40px;
  border-radius: 2px;
  cursor: pointer;
  font-weight: 600;
`;


const CategoriaItem = ({item}) => {

  useEffect(() => {

  },[])
  return (
    <Container data-aos="zoom-in" data-aos-once="true"  className="containerCategoriaItem" categoria={item.categoria} >
      <Link to={`/produtos/${item.categoria}`}>
        {}

        <LazyLoadImage className="imageCategoriaItem" cat={item.categoria} src={item.img}/>

        <Info>
          <Title>
            {item.title}
          </Title>
          <Button className="btn btn-outline-light">
            Compre agora
          </Button>
        </Info>
      </Link>

      </Container>
  );
};

export default CategoriaItem