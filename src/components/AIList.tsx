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
import { CurrentAIName, ExplainModalBool, DownloadModalCopyBool } from '../store/atom';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import uuid from "react-uuid";
import AIButtonModal from './AIButton';
import ExplainModal from './ExplainModal';
import SuccessModal from './SuccessModal';


function AIList (){

    return (
        <motion.div
          key='ListKey'
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
        </motion.div>)
}

export default AIList;


const ListContainer = styled(motion.div)`
display: flex;
justify-content: center;
align-items: center;
max-width: 100vw;
width: 100%;
height: 100vh;
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