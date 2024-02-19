import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png' 
import { useRecoilState } from 'recoil';
import { AIMakerExplainModalBool } from '../store/atom';

function AIMaker (){
    const [AIMakerexplainModalBool, setAIMakerexplainModalBool] = useRecoilState(AIMakerExplainModalBool);

    return(<>
    {AIMakerexplainModalBool == true &&
    <Container onClick={()=> setAIMakerexplainModalBool(false)}>
        <RejectBox>
            <h1>준비 중!</h1>
            <WhiteLine></WhiteLine>
            <h2>재우's AI에 사용되는 패턴을 기반으로 자신 만의 AI를 만들 수 있는 방법을 구상 중입니다. 기대해주세요!</h2>
        </RejectBox>
    </Container>}
    </>)
}

export default AIMaker;

const WhiteLine = styled.div`
  width: 200px;
  height: 3px;
  background-color: white;
  margin-bottom: 10px;
`

const RejectBox = styled.div`
align-items: center;
display: flex;
flex-direction: column;
justify-content: center;
gap: 15px;
padding-left: 50px;
padding-right: 50px;
background-color: rgba(255, 255, 255, 0);
background-image: url(${Mainbutton800400});
background: url(${Mainbutton800400});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 600px; /* 변경된 부분 */
  height: 300px; /* 변경된 부분 */
  border: none;
  font-size: 17px;
  font-family: 'Mabinogi_Classic_TTF';
  cursor: pointer;
  &:hover{
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(130%);
  }
`
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

  h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 45px;font-family: 'Mabinogi_Classic_TTF';}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: 'Mabinogi_Classic_TTF';}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 15px; font-family: 'Mabinogi_Classic_TTF'; white-space: pre-wrap;}
`
