import { styled } from 'styled-components';
import React from 'react';

function FirstPopupModal() {




    return (<Container>

    </Container>);
}

export default FirstPopupModal

const Container = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    gap: 10px;
    cursor: default;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
& > * {
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
  font-family: 'Mabinogi_Classic_TTF';}

  h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 30px;font-family: inherit;}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: inherit;}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 15px; font-family: inherit; white-space: pre-wrap;}
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 400px;
  height: 220px;
  background-color: rgb(81, 165, 196);
  border: 3px solid white;
  line-height: 1.5;
  border-radius: 7px;
  span.yellow-text {
  font-size: 25px;
    color: rgba(255, 255, 0, 1);
    text-shadow: 1px 1px 0 black; /* 텍스트 주변에 검은색 테두리 효과 */
  }
`