import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conPt, conWarper, eventWarper, seqPt, seqWarper, totalWarper } from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest, AITemplet } from '../utils/types';
import { AI_TOOL } from '../components/AITool';
import Mainbutton3 from '../assets/MainButton3.png'
import Mainbutton20070 from '../assets/MainButton20070.png'
import UpIcon from '../assets/UpIcon.png'
import UpIconBlue from '../assets/UpIconBlue.png'
import DownIcon from '../assets/DownIcon.png'
import DownIconBlue from '../assets/DownIconBlue.png'
import SuccessModal from '../components/SuccessModal'
import AIButtonModal from '../components/AIButton';
import ExplainModal from '../components/ExplainModal';
import MobileRejected from '../components/MobileRejected';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import { WheelBool, ExpWheelBool, CurrentAIName, AIMakerExplainModalBool } from '../store/atom';
import 재우님 from '../assets/Icon/재우님.jpg'
import 펫디펜더 from '../assets/Icon/펫디펜더.jpg'
import { ChildProcess } from 'child_process';
import { isMobile } from 'react-device-detect';
import QNAComp from '../components/QNAComp';
import AIList from '../components/AIList';
import AIListExplainModal from '../components/AIListExplainModal';
import AIMaker from '../components/AIMaker';


function Main() {
  const [wheelBoolstate, setwheelBoolstate] = useRecoilState(WheelBool)
  const [currentAIName, setCurrentAIName] = useRecoilState(CurrentAIName)
  const [expWheelBoolstate, setexpWheelBoolState] = useRecoilState(ExpWheelBool)
  const [AIMakerexplainModalBool, setAIMakerexplainModalBool] = useRecoilState(AIMakerExplainModalBool);


  //마비노기 공식 홈페이지의 그것과 비슷하게 해보고 싶었는데 뭔가 잘 안되네....
  //마비노기 식으로 할려면 표로 정리해볼 필요가 있겠다.
  const handleWheel = (e: React.WheelEvent) => {
    // e.deltaY 값은 마우스 휠의 스크롤 양을 나타냅니다.

    //Main, AI일 때는 단방향 이동이 가능하지만 EXP에는 기준이 따로 있어야한다.
    // 양수면 아래로 스크롤, 음수면 위로 스크롤
    console.log(wheelBoolstate)
    if (wheelBoolstate == "AI" && currentAIName == '') {
      if (e.deltaY < 0) {setwheelBoolstate("Main")}
    }
    else if (wheelBoolstate == "EXP") {
      if (e.deltaY < 0) {
        if (expWheelBoolstate === 0) {setwheelBoolstate("Main")}
        else {setexpWheelBoolState(expWheelBoolstate - 1)}
      }
      if(e.deltaY >0){
        if(expWheelBoolstate < 1){
          setexpWheelBoolState(expWheelBoolstate + 1)
        }
      }
    }
  }

  const aniControls = useAnimation();
  useEffect(() => {
    if (wheelBoolstate === "Main" || wheelBoolstate === "None") {
      aniControls.start({
        y: wheelBoolstate === "Main" ? [-200, 0] : [0, -200],
        opacity: wheelBoolstate === "Main" ? [0, 0, 1] : [1, 1, 0],
        transition: { duration: 1.5 },
      });
    }
    if (wheelBoolstate === "AI") {
      aniControls.start({
        y: wheelBoolstate === "AI" ? [-200, 0] : [0, -200],
        opacity: wheelBoolstate === "AI" ? [0, 0, 1] : [1, 1, 0],
        transition: { duration: 1.5 },
      });
    }
  }, [wheelBoolstate, aniControls]);

  useEffect(() => {
    console.log(wheelBoolstate)
  }, [wheelBoolstate])

  return (
    <TotalContainer onWheel={handleWheel}>
      {wheelBoolstate !== 'Main' && <WheelDiv image={UpIconBlue} initial={{ y: 0}} animate={{y: [0, -15, 0]}}
      transition={{duration: 2, ease: 'easeInOut', repeat: Infinity}} onClick={() => handleWheel({ deltaY: -100 } as React.WheelEvent)}/>}
      <AnimatePresence mode='wait'>
        {wheelBoolstate === 'Main' ?
          <MainContainer>
            <MainImage image={재우님}
              initial={{ y: 0, rotate: 160, opacity: 0, scale: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10, duration: 1.5, delayChildren: 2.5, staggerChildren: 5 } }}
              exit={{ y: -200, opacity: 0, transition: { duration: 0.8 } }}
              key='MainKey' />
            <motion.h2
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: [0, 0, 1], transition: { duration: 2.0 } }}
              exit={{ y: -200, opacity: 0, transition: { duration: 0.8 } }}>마비노기 재우's AI 다운로더</motion.h2>
            <motion.h3
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: [0, 0, 0, 1], transition: { duration: 2.1 } }}
              exit={{ y: -200, opacity: 0, transition: { duration: 0.8 } }}>똑똑한 주인을 위한 똑똑한 펫 AI</motion.h3>
            <ButtonContainer
              initial={{ y: 200, opacity: 0 }}
              animate={{ y: 0, opacity: [0, 0, 0, 0, 1], transition: { duration: 2.2 } }}
              exit={{ y: -200, opacity: 0, transition: { duration: 0.8 } }}>
              <MainButton  onClick={()=> setAIMakerexplainModalBool(true)}>AI 만들기</MainButton>
              <MainButton onClick={() => setwheelBoolstate("EXP")}>재우's AI란?</MainButton>
              <MainButton onClick={() => setwheelBoolstate("AI")}>AI 보기</MainButton>
            </ButtonContainer>
          </MainContainer>
          //ai 페이지
          : wheelBoolstate === "AI" ? (
          <AIList key='ListKeyHead' />)
          //제품설명 페이지
          : (<QNAComp key='EXPKeyHead' />)
        }
        {/**/}
      </AnimatePresence>
      {expWheelBoolstate < 1 && wheelBoolstate === 'EXP' && expWheelBoolstate <= 1 && <WheelDiv image={DownIconBlue} initial={{ y: 0}} animate={{y: [0, 15, 0]}}
      transition={{duration: 2, ease: 'easeInOut', repeat: Infinity}} onClick={() => handleWheel({ deltaY: 100 } as React.WheelEvent)}/>}
      <AIMaker></AIMaker>
    </TotalContainer>
  );
}
export default Main

const WheelDiv = styled(motion.div)<{ image: any }>`
background-color: rgba(255, 255, 255, 0);
background-image: ${({ image }) => `url(${image})`};
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 30px; /* 변경된 부분 */
  height: 30px; /* 변경된 부분 */
  border: none;
  position: absolute;
  cursor: pointer;
  ${({ image }) => (image == UpIconBlue ? 'top: 40px;' : 'bottom: 40px;')}
  &:hover{filter: brightness(120%);}
  `

const ButtonContainer = styled(motion.div)`
display: flex;
flex-direction: row; 
justify-content: center;
align-items: center;
gap: 40px;
margin-top: 50px;
`

const MainButton = styled(motion.button)`
background-color: rgba(255, 255, 255, 0);
background-image: url(${Mainbutton20070});
background: url(${Mainbutton20070});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 200px; /* 변경된 부분 */
  height: 70px; /* 변경된 부분 */
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
const MainImage = styled(motion.div) <{ image: any }>`
background-color: rgba(255, 255, 255, 0);
background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 330px;
  height: 330px;
  border-radius: 50%;
  border: 5px solid rgb(25, 76, 138);
`

const MainContainer = styled(motion.div)`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
max-width: 100vw;
max-height: 100vh;
margin: 0 auto;
gap: 10px;
white-space: pre;
background-color: rgba(111, 195, 226);
 h2 {
  color: white;
  font-weight: 250;
  font-size: 55px;
  font-family: 'Mabinogi_Classic_TTF';
  }
 h3 {
  color: white;
  font-weight: 250;
  font-size: 25px;
  font-family: 'Mabinogi_Classic_TTF';
  }
`

const TotalContainer = styled(motion.div)`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
background-color: rgba(111, 195, 226);
padding-top: 20px;
padding-bottom: 20px;
`
