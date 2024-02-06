import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Mainbutton20070 from '../assets/MainButton20070.png'

import uuid from "react-uuid";
import AIButtonModal from './AIButton';
import ExplainModal from './ExplainModal';
import SuccessModal from './SuccessModal';
import AIListExplainModal from './AIListExplainModal';
import ButtonComp from './ButtonComp';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { AIListExplainModalBool } from '../store/atom';


function AIList (value : any){
    const [AIListexplainModalBool, setAIListexplainModalBool] = useRecoilState(AIListExplainModalBool);


    return (
        <AIContainer key={value.key}
          initial={{ y: -200, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 1.5 } }}
          exit={{ y: -200, opacity: 0, transition: { duration: 1.5 } }}
          transition={{ duration: 1.5 }}>
          <ListContainer>
            <ListBox>
            <AIButtonModal name="펫 디펜더"/>
            <AIButtonModal name="주인바라기"/>
            <AIButtonModal name="재우 오리지널"/>
            <AIButtonModal name="로드롤러"/>
            <AIButtonModal name="볼트 서포터"/>
            <AIButtonModal name="전봇대"/>
            <AIButtonModal name="메디이익"/>
            <AIButtonModal name="블레이즈 서포터"/>
            <AIButtonModal name="폭스 헌터"/>
            <AIButtonModal name="기르가쉬 헬퍼"/>
            </ListBox>
          </ListContainer>
          <ExplainModal />
          <SuccessModal />
          {/*<EXPButton onClick={()=> setAIListexplainModalBool(true)}>처음이신가요?</EXPButton> */}
          <AIListExplainModal />
        </AIContainer>)
}

export default AIList;

const AIContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    height: 90vh;
`

const ListContainer = styled(motion.div)`
display: flex;
justify-content: center;
align-items: center;
max-width: 100vw;
width: 100%;
height: 100%;
margin: 0 auto;
gap: 10px;
white-space: pre;
background-color: rgba(0,0,0,0);
`

const ListBox = styled(motion.div)`
display: grid;
grid-gap: 20px;
align-items: flex-start;
  grid-template-columns: repeat(2, 1fr);
justify-content: flex-start;
align-items: center;
width: 100%;
max-width: 1250px;
max-height: 100%;
white-space: pre;
`