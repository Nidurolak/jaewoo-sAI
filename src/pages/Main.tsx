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
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import { WheelBool, ExpWheelBool, CurrentAIName } from '../store/atom';
import 재우님 from '../assets/Icon/재우님.jpg'
import 펫디펜더 from '../assets/Icon/펫디펜더.jpg'
import { ChildProcess } from 'child_process';
import QNAComp from '../components/QNAComp';


function Main() {
  const [wheelBoolstate, setwheelBoolstate] = useRecoilState(WheelBool)
  const [currentAIName, setCurrentAIName] = useRecoilState(CurrentAIName)
  const [expWheelBoolstate, setexpWheelBoolState] = useRecoilState(ExpWheelBool)
  const [yPosition, setYPosition] = useState(0);


  const UpDownButton = ()=>{

  }

  //마비노기 공식 홈페이지의 그것과 비슷하게 해보고 싶었는데 뭔가 잘 안되네....
  //마비노기 식으로 할려면 표로 정리해볼 필요가 있겠다.
  const handleWheel = (e: React.WheelEvent) => {
    // e.deltaY 값은 마우스 휠의 스크롤 양을 나타냅니다.

    //Main, AI일 때는 단방향 이동이 가능하지만 EXP에는 기준이 따로 있어야한다.
    // 양수면 아래로 스크롤, 음수면 위로 스크롤
    console.log(wheelBoolstate)
    if (wheelBoolstate == "AI" && currentAIName == '') {
      console.log('Mouse wheel scrolled:', e.deltaY);
      if (e.deltaY < 0) {

        //원래는 메인인데 문제가 생긴거 같아. 다른 경우의 수를 삼항연산자에 넣어야해
        setwheelBoolstate("Main")
      }
    }
    else if (wheelBoolstate == "EXP") {
      if (e.deltaY < 0) {
        if (expWheelBoolstate === 0) {
          setwheelBoolstate("Main")
          console.log("메인으로")
        }
        else {
          setexpWheelBoolState(expWheelBoolstate - 1)
          console.log("위로")
        }
      }
      if(e.deltaY >0){
        setexpWheelBoolState(expWheelBoolstate + 1)
        console.log("아래로")
      }
      console.log(expWheelBoolstate)
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
      //if (wheelBoolstate === "AI" || wheelBoolstate === "None") {
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

  const containerVariants = {
    hidden: { opacity: 0, y: 100, transition: { duratiton: 2 } },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.8 } },
  };

  const childVariants = {
    hidden: { y: 0, opacity: 0 },
    visible: { y: [50, 10, 0], opacity: [0, 0.4, 1], transition: { duration: 0.8 } },
  };
  const childVariants0 = {
    hidden: { y: 0, opacity: 0, scale: 0 },
    visible: {
      rotate: [160, 0],
      scale: [0, 1],
      opacity: [0, 1, 1.4, 1],
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 12,
        duration: 2
      },
    },
  };

  /*
            initial={{y : -200, opacity : 0}}
            animate={{y : 0, opacity : 1 , transition : {duration: 1.5}}}
            exit={{y : -200, opacity : 0 , transition : {duration: 1.5}}} */

  return (
    <TotalContainer onWheel={handleWheel}>
      <WheelDiv image={UpIconBlue} initial={{ y: 0}} animate={{y: [0, -15, 0]}}
      transition={{duration: 2, ease: 'easeInOut', repeat: Infinity}}/>
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
              <MainButton onClick={() => setwheelBoolstate("AI")}>AI 보기</MainButton>
              <MainButton onClick={() => setwheelBoolstate("EXP")}>재우's AI란?</MainButton>
            </ButtonContainer>
          </MainContainer>
          //ai 페이지
          : wheelBoolstate === "AI" ? (
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
                <AIButtonModal name="기르시드 헬퍼"/>
                </ListBox>
              </ListContainer>
              <ExplainModal />
              <SuccessModal />
            </motion.div>)
            //제품설명 페이지
            : (<QNAComp key='EXPKeyHead'>


            </QNAComp>)
        }
        {/**/}
      </AnimatePresence>
      {wheelBoolstate === 'EXP' && expWheelBoolstate <= 1 && <WheelDiv image={DownIconBlue} initial={{ y: 0}} animate={{y: [0, 15, 0]}}
      transition={{duration: 2, ease: 'easeInOut', repeat: Infinity}}/>}
      
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
  ${({ image }) => (image == UpIconBlue ? 'top: 40px;' : 'bottom: 40px;')}
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
  font-family: Mabinogi_Classic_TTF;
  cursor: pointer;
  &:active {
    filter: brightness(120%); /* 클릭 시 밝기 감소 효과 */
  }
`
const MainImage = styled(motion.div) <{ image: any }>`
background-color: rgba(255, 255, 255, 0);
background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 320px;
  height: 320px;
  border-radius: 50%;
`

const MainContainer = styled(motion.div)`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
margin: 0 auto;
gap: 10px;
white-space: pre;
background-color: rgba(111, 195, 226);
 h2 {
  color: white;
  font-weight: 250;
  font-size: 55px;
  font-family: inherit;
  }
 h3 {
  color: white;
  font-weight: 250;
  font-size: 25px;
  font-family: inherit;
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

const ListContainer = styled(motion.div)`
display: flex;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
margin: 0 auto;
gap: 10px;
white-space: pre;
background-color: rgba(111, 195, 226);
`

const ListBox = styled(motion.div)`
display: grid;
grid-gap: 20px;
align-items: flex-start;
  grid-template-columns: repeat(2, 1fr);
justify-content: flex-start;
align-items: center;
width: 1250;
max-height: 100%;
white-space: pre;
`