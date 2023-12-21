import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conParticle, conWarper, eventWarper, seqParticle, seqWarper, totalWarper } from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest } from '../utils/types';
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
import 주인바라기 from '../assets/Icon/주인바라기.jpg'

function AIButtonModal() {
    let Image = 로드롤러;
    return (<BoxContainer>
        <AIImage image={Image}/>
        <DownButton>다운받기</DownButton>
        <DownButton>블레이즈 서포터 다운받기</DownButton>
        </BoxContainer>)
}

export default AIButtonModal;

const BoxContainer = styled.div`
display: flex;
flex-direction: row; 
justify-content: flex-start;
align-items: center;
gap: 10px;
width: 500px;
height: 120px;
background-color: rgba(81, 165, 196);
  border-radius: 7px;
`

const AIImage = styled.div<{image:any}>`
background-color: rgba(255, 255, 255, 0);
background-image: ${({image}) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: cover;
  margin-left:10px;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 100px;
  height: 100px;
  border-radius: 3px;
`
const DownButton = styled.button`
background-color: rgba(255, 255, 255, 0);
background-image: url(${Mainbutton3});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100%;
  max-width: 150px; /* 변경된 부분 */
  max-height: 50px; /* 변경된 부분 */
  border: none;
  font-size: 13px;
  font-family: Mabinogi_Classic_TTF;
  &:active {
    filter: brightness(90%); /* 클릭 시 밝기 감소 효과 */
  }
`