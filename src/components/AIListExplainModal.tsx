import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conPt, conWarper, eventWarper, seqPt, seqWarper, totalWarper } from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest, AITemplet } from '../utils/types';
import { AI_TOOL } from './AITool';
import MainButton from '../assets/MainButton.svg'
import Mainbutton3 from '../assets/MainButton3.png'
import 로드롤러 from '../assets/Icon/로드롤러.jpg'
import 메디이익 from '../assets/Icon/메디이익.jpg'
import 볼트서포터 from '../assets/Icon/볼트서포터.jpg'
import 블레이즈서포터 from '../assets/Icon/블레이즈서포터.jpg'
import 오리지널Lite from '../assets/Icon/오리지널Lite.jpg'
import 재우오리지널 from '../assets/Icon/재우오리지널.jpg'
import 전봇대 from '../assets/Icon/전봇대.jpg'
import 펫디펜더 from '../assets/Icon/펫디펜더.jpg'
import 주인바라기 from '../assets/Icon/주인바라기.jpg'
import 컴뱃파트너 from '../assets/Icon/컴뱃파트너.jpg'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import gen_button_confirm from '../assets/Sound/gen_button_confirm.wav'
import gen_hover from '../assets/Sound/gen_hover.wav'
import { CurrentAIName, ExplainModalBool, DownloadModalCopyBool, AIListExplainModalBool } from '../store/atom';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import uuid from "react-uuid";

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