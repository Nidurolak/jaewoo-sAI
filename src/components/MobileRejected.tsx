import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import 재우님 from '../assets/Icon/재우님.jpg'

function MobileRejected (){
    return(<Container>
        <MainImage image={재우님}></MainImage>
        <h2>모바일에선 접속하실 수 없습니다!</h2>
    </Container>)
}

export default MobileRejected

const MainImage = styled.div<{ image: any }>`
background-color: rgba(255, 255, 255, 0);
background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 220px;
  height: 220px;
  border-radius: 50%;
`
const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(111, 195, 226);
    width: 100vw;
    height: 100vh;
    gap: 40px;
    h2 {
  color: white;
  font-weight: 300;
  font-size: 25px;
  font-family: 'Mabinogi_Classic_TTF';
  }
 h3 {
  color: white;
  font-weight: 300;
  font-size: 25px;
  font-family: 'Mabinogi_Classic_TTF';
  }
`