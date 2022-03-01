import { ArrowUpward, ArrowDownward } from "@material-ui/icons";
import { useState,useEffect } from "react";
import styled from "styled-components"
import {sliderItems} from "../data"
import {mobile} from "../responsivel"
import "./css/slider.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from "react-router";

const delay = 10;


const Container = styled.div`
  // full screen slider
  width: 100%;
  height: 100vh;
  background-color: orange;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const ContainerArrows = styled.div`

display:block;
padding-bottom: 3rem;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: ${props=> props.direction ===  "bottom" && "20%" || "0" };
  bottom: ${props=> props.direction ===  "top" && "20%" || "0"  };
  right:auto;
  
  left:10px ; // ${props=> props.direction ===  "left" && "10px" }
  margin: auto;
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
`;


const Wrapper = styled.div`
  	height: 100%;
    display: block;
    transition: all 1.5s ease;
    transform: translateY(${props=>props.slideIndex * -100}vh);
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(
  rgba(255, 255, 255, 0.5),
  rgba(255, 255, 255, 0.5)
  ),
  url("${props=> props.bg }") center;
  background-repeat: no-repeat; 
background-size: cover; 

`;
const ImgContainer = styled.div`
  margin-top: 50px;
  flex: 1;
  height: 100%;

`;

const Image = styled.img`
 height: 80%;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  margin-left: 59px;
`;

const Title = styled.h1`

  font-size: 70px;

  @media only screen and (max-width:413px) {

    font-size: 40px;
  
  };


`;
const Description = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  @media only screen and (max-width:413px) {

font-size: 16px;

};
  letter-spacing: 3px;
`;
const Button = styled.button`
  padding: 15px 24px 15px 24px;
  font-size: 16px;
  background-color: #0B3C49;
  color: #F7F7F7;
  font-family: 'Poppins', sans-serif;
  border: 0;
  font-weight: bold;
  cursor: pointer;
`;




const Slider = () => {
    const [slideIndex, setSlideIndex] = useState(0);
    const [count, setCount] = useState(0);
    const location = useLocation();
    const handleClick =(direction)=>{
      if(direction==="top"){
        setSlideIndex(slideIndex > 0 ? slideIndex-1 : 2 )
      } else {
        setSlideIndex(slideIndex < 2 ? slideIndex+1 : 0 )
      }

    };
    var timer1


    useEffect(
      () => {
        
        let timer1 = setTimeout(() => setSlideIndex(Math.floor(Math.random() * 3) + 0), delay * 1000);
        let timer2 = setTimeout(() => setCount(count + 1), delay * 1000);
        
        // this will clear Timeout
        // when component unmount like in willComponentUnmount
        // and show will not change to true

      },
      // useEffect will run only one time with empty []
      // if you pass a value to array,
      // like this - [data]
      // than clearTimeout will run every time
      // this value changes (useEffect re-run)
      [count]
    );



  return (
    <><Container>
      {    }
      <ContainerArrows class="containerArrows">
      <Arrow class="top" direction="top" onClick={() => handleClick("top")}>
        <ArrowUpward />
      </Arrow>
 
      <Arrow direction="bottom" onClick={() => handleClick("bottom")}>
        <ArrowDownward />
      </Arrow>
      </ContainerArrows>
      <Wrapper slideIndex={slideIndex}>
        {sliderItems.map(item => (

          <Slide bg={item.img} key={item.id}>
            <InfoContainer>
              <Title className="tituloSlider">{item.title}</Title>
              <Description>{item.desc}</Description>
              <Button>Compre agora</Button>
            </InfoContainer>
            <ImgContainer>
           
            </ImgContainer>

          </Slide>
        ))}
      </Wrapper>

    </Container></>
  )
}

export default Slider
