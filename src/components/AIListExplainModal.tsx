import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { AIListExplainModalBool } from '../store/atom';

function AIListExplainModal() {
    const [AIListexplainModalBool, setAIListexplainModalBool] = useRecoilState(AIListExplainModalBool);

    return (
        <>
        {AIListexplainModalBool === true && 
            <Container onClick={()=> setAIListexplainModalBool(false)}>
                <QNABox2Container>
                    <h1>재우스 AI를 사용하는 방법</h1>
                    <QNABox2MiddleBox></QNABox2MiddleBox>
                </QNABox2Container>
            </Container>
        }
        </>
    )
}

export default AIListExplainModal;

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
background-color: rgba(100, 100, 100, 0.6);
& > * {
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
  font-family: 'Mabinogi_Classic_TTF';}

  h1 {
    font-weight: 100;
    margin-top: 10px;
    font-size: 30px;
    font-family: 'Mabinogi_Classic_TTF';
  }
  h2 {
    margin-top: 10px;
    font-size: inherit;
    font-family: 'Mabinogi_Classic_TTF';
  }
 h3 {
 text-align: justify;
  font-weight: 100;
    font-size: 15px;
    font-family: 'Mabinogi_Classic_TTF';
    white-space: pre-wrap;
  }
`

const QNABox2MiddleBox = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
align-items: flex-start;
width: 100%;
height: 100%;
background-color: wheat;
padding-top: 40px;
`

const QNABox2Container = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
width: 1460px;
height: 70vh;
background-color: gray;
padding-top: 40px;
`