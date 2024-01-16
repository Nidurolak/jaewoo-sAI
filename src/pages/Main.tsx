import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conPt, conWarper, eventWarper, seqPt, seqWarper, totalWarper } from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest, AITemplet } from '../utils/types';
import { AI_TOOL } from '../components/AITool';
import MainButton from '../assets/MainButton.svg'
import Mainbutton3 from '../assets/MainButton3.png' 
import SuccessModal from '../components/SuccessModal'
import AIButtonModal from '../components/AIButton';
import ExplainModal from '../components/ExplainModal';

function Main() { 

  return (
    <>
    <TestContainer>
      
      <AIButtonModal name="펫 디펜더" explain="" />
      <AIButtonModal name="주인바라기" explain="" />
      <AIButtonModal name="재우 오리지널" explain="" />
      <AIButtonModal name="볼트 서포터" explain="" />
      <AIButtonModal name="로드롤러" explain="" />
      <AIButtonModal name="전봇대" explain="" />

    </TestContainer><ExplainModal/><SuccessModal />
    {/**/}
  </>
  );
}
export default Main

const TestContainer = styled.div`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
margin: 0 auto;
gap: 10px;
white-space: pre;
background-color: rgba(131, 215, 246);
`