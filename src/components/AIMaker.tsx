import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import { AIMakerExplainModalBool } from '../store/atom';

function AIMaker() {
  const [AIMakerexplainModalBool, setAIMakerexplainModalBool] = useRecoilState(AIMakerExplainModalBool);

  return (<>
    {AIMakerexplainModalBool == true &&
      <Container onClick={() => setAIMakerexplainModalBool(false)}>
        <RejectBox>
          <LeftBox>
            <EventDiv></EventDiv>
          </LeftBox>
          <MiddleBox></MiddleBox>
          <RightBox></RightBox>
        </RejectBox>
      </Container>}
  </>)
}
/*
          <h1>준비 중!</h1>
          <WhiteLine></WhiteLine>
          <h2>재우's AI에 사용되는 패턴을 기반으로 자신 만의 AI를 만들 수 있는 방법을 구상 중입니다. 기대해주세요!</h2>*/
export default AIMaker;

const EventDiv = styled.div`
align-items: center;
display: flex;
flex-direction: column;
justify-content: center;
width: 90%;
height: 70px;
`

const MiddleBox = styled.div`
align-items: center;
display: flex;
flex-direction: column;
justify-content: center;
width: 400px;
height: 300px;
background-color: chartreuse;
`

const LeftBox = styled.div`
align-items: center;
display: flex;
flex-direction: column;
justify-content: center;
width: 400px;
height: 300px;
background-color: gray;
`

const RightBox = styled.div`
align-items: center;
display: flex;
flex-direction: column;
justify-content: center;
width: 400px;
height: 300px;
background-color: skyblue;
`
const WhiteLine = styled.div`
  width: 200px;
  height: 3px;
  background-color: white;
  margin-bottom: 10px;
`

const RejectBox = styled.div`
align-items: center;
display: flex;
flex-direction: row;
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
  width: 80vw; /* 변경된 부분 */
  height: 80vh; /* 변경된 부분 */
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

const BoxContainer = styled.div`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
text-align: center;
width: 550px;
background-color: rgba(81, 165, 196);
line-height: 1.5;
border: 3px solid white;
padding: 25px;
  border-radius: 7px;
  span.yellow-text {
  font-size: 25px;
    color: rgba(255, 255, 0, 1);
    text-shadow: 1px 1px 0 black; /* 텍스트 주변에 검은색 테두리 효과 */
  }
`