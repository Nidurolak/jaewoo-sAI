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
import { AnimatePresence, motion } from 'framer-motion';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import { WheelBool } from '../store/atom';

function Main() { 
  const [wheelBoolstate, setwheelBoolstate] = useRecoilState(WheelBool)
  const [yPosition, setYPosition] = useState(0);

  //마비노기 공식 홈페이지의 그것과 비슷하게 해보고 싶었는데 뭔가 잘 안되네....
  //마비노기 식으로 할려면 표로 정리해볼 필요가 있겠다.
  const handleWheel = (e: React.WheelEvent) => {
    // e.deltaY 값은 마우스 휠의 스크롤 양을 나타냅니다.
    // 양수면 아래로 스크롤, 음수면 위로 스크롤
    console.log(wheelBoolstate)
    if(wheelBoolstate === "AI"){
      console.log('Mouse wheel scrolled:', e.deltaY);
      if(e.deltaY < 0){
        setwheelBoolstate("None")
        setTimeout(() => {setwheelBoolstate("Main"); console.log("zzzz")}, 2000);
      }

    //버튼을 누르면 내려보낼 예정이지만 일단은 마우스 드래그로
    if(wheelBoolstate !== "AI"){
      console.log('Mouse wheel scrolled:', e.deltaY);
      if(e.deltaY > 0){
        setwheelBoolstate("AI")
        setTimeout(() => {setwheelBoolstate("AI"); console.log("zzzz")}, 2000);
      }

    }
  }
}
  

  return (
    <AnimatePresence>
    <TotalContainer onWheel={handleWheel}> 
    <ListContainer
          initial={{y: 0, opacity: 1}}
          animate={wheelBoolstate !== "AI" ? { y: [0, -100], opacity: [1,  1]} : { y: 0 , opacity:1}}
          transition={{ duration: 1 }}
          >
      <AIButtonModal name="펫 디펜더" explain="" />
      <AIButtonModal name="주인바라기" explain="" />
      <AIButtonModal name="재우 오리지널" explain="" />
      <AIButtonModal name="볼트 서포터" explain="" />
      <AIButtonModal name="로드롤러" explain="" />
      <AIButtonModal name="전봇대" explain="" />
    </ListContainer>
    <ExplainModal />
    <SuccessModal />
    {/**/}
  </TotalContainer>
    </AnimatePresence>
  );
}
export default Main

const TotalContainer = styled.div`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
overflow: hidden;
`

const ListContainer = styled(motion.div)`
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