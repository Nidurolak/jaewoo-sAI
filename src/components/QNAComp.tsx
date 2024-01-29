import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import gen_button_confirm from '../assets/Sound/gen_button_confirm.wav'
import gen_hover from '../assets/Sound/gen_hover.wav'
import { CurrentAIName, DownloadModalBool, DownloadModalCopyBool, ExpWheelBool, WheelBool } from '../store/atom';
import { motion } from 'framer-motion';
 

function QNAComp(value: any){

    const [wheelBoolstate, setwheelBoolstate] = useRecoilState(WheelBool)
    const [expWheelBoolstate, setexpWheelBoolState] = useRecoilState(ExpWheelBool)

    let componentToRender;

    const QNAVariant = {
      init : {y: -200, opacity: 0},
      visible : {y: 0, opacity: 1, transition: { duration: 1.5 }},
      exit: {y: -200, opacity: 0, transition: { duration: 1.5 }}
    }

    switch(expWheelBoolstate){
        case 0:
          componentToRender =
          <motion.div variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey0'>0 번째 컴포넌트</motion.div>;
          break;
        case 1:
          componentToRender =
         <motion.div variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey1'>첫 번째 컴포넌트</motion.div>;
          break;
        case 2:
          componentToRender = 
          <motion.div variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey2'>두 번째 컴포넌트</motion.div>;
          break;
        case 3:
          componentToRender = 
          <motion.div variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey3'>세 번째 컴포넌트</motion.div>;
          break;
        default:
          componentToRender = 
          <motion.div variants={QNAVariant} initial='init' animate='visible' exit='exit' key='EXPKey4'>잘못된 숫자</motion.div>;
    }

    return(<QNAContainer key='EXPKey'>{componentToRender}</QNAContainer>)
}

export default QNAComp

const QNAContainer = styled(motion.div)`
display: flex;
align-items: center;
flex-direction: column;
align-items: center;
  font-size: 17px;
`