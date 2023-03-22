import React, { useState } from "react";
import styled from "styled-components";
import ArrowLeftOutlinedIcon from "@mui/icons-material/ArrowLeftOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { sliderItems } from "../data";
import { mobile } from "../responsive";

const Cotainaer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;

  overflow: hidden;
  ${mobile({ display: "none" })}
`;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transform: translateX(-${(props) => props.move}vw);
  width: max-content;
  transition: all 1.5s ease;
  padding: 20px;
  ${mobile({
    felxDirection: "column",
  })}
`;
const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  display: flex;
  background-color: #${(props) => props.bg};
  ${mobile({ flexDirection: "column" })}
`;
const InfoContainer = styled.div`
  flex: 1;
  height: 100%;
  width: max-content;
  ${mobile({
    width: "60%",
  })}
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  ${mobile({
    position: "absolute",
    top: "0px",
    right: 0,
  })}
`;
const Img = styled.img`
  height: 80%;
  ${mobile({
    maxHeight: "50%",
    maxWidth: "80px",
  })}
`;

const Title = styled.h1`
  font-size: 70px;
  margin-top: 30%;
  ${mobile({ fontSize: "30px", textAlign: "center" })}
`;
const Desc = styled.div`
  margin: 50px 0px;
  font-size: 20px;

  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({ fontSize: "10px", textAlign: "center" })}
`;
const Button = styled.button`
  height: 60px;
  width: 200px;
  font-size: 20px;
  background-color: transparent;
  font-weight: bold;
  ${mobile({ right: 0, left: 0, margin: "auto" })}
`;

const Arrow = styled.div`
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: #ececec;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  /* opacity: 0.5; */
  cursor: pointer;
  z-index: 2;
`;

const Slider = () => {
  const [move, setmove] = useState(0);

  const handleRightClick = () => {
    if (move === 200) {
      return;
    }
    setmove(move + 100);
  };

  const handleLeftClick = () => {
    if (move === 0) {
      return;
    }
    setmove(move - 100);
  };

  return (
    <Cotainaer>
      <Arrow direction="left" onClick={handleLeftClick}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper move={move}>
        {sliderItems.map((item) => (
          <Slide bg={item.bg} key={item.id}>
            <ImgContainer>
              <Img src={item.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{item.title}</Title>
              <Desc>{item.desc}</Desc>
              <Button>SHOW NOW</Button>
            </InfoContainer>
          </Slide>
        ))}
      </Wrapper>
      <Arrow direction="right" onClick={handleRightClick}>
        <ArrowRightOutlinedIcon />
      </Arrow>
    </Cotainaer>
  );
};

export default Slider;
