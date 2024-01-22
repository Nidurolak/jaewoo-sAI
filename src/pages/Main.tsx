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
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import uuid from 'react-uuid';
import { useRecoilState } from 'recoil';
import { WheelBool } from '../store/atom';
import 재우님 from '../assets/Icon/재우님.jpg'
import 펫디펜더 from '../assets/Icon/펫디펜더.jpg'

 
function Main() {
  const [wheelBoolstate, setwheelBoolstate] = useRecoilState(WheelBool)
  const [yPosition, setYPosition] = useState(0);

  //마비노기 공식 홈페이지의 그것과 비슷하게 해보고 싶었는데 뭔가 잘 안되네....
  //마비노기 식으로 할려면 표로 정리해볼 필요가 있겠다.
  const handleWheel = (e: React.WheelEvent) => {
    // e.deltaY 값은 마우스 휠의 스크롤 양을 나타냅니다.
    // 양수면 아래로 스크롤, 음수면 위로 스크롤
    console.log(wheelBoolstate)
    if (wheelBoolstate === "AI") {
      console.log('Mouse wheel scrolled:', e.deltaY);
      if (e.deltaY < 0) {
        setwheelBoolstate("None")
        setTimeout(() => { setwheelBoolstate("Main"); console.log("zzzz") }, 2000);
      }

      //버튼을 누르면 내려보낼 예정이지만 일단은 마우스 드래그로
      if (wheelBoolstate !== "AI") {
        console.log('Mouse wheel scrolled:', e.deltaY);
        if (e.deltaY > 0) {
          setwheelBoolstate("AI")
          setTimeout(() => { setwheelBoolstate("AI"); console.log("zzzz") }, 2000);
        }

      }
    }
  }

  const aniControls = useAnimation();
  useEffect(() => {
    if (wheelBoolstate === "AI" || wheelBoolstate === "None") {
      aniControls.start({
        y: wheelBoolstate === "AI" ? [-200, 0] : [0, -200],
        opacity: wheelBoolstate === "AI" ? [0, 0, 1] : [1, 1, 0],
        transition: { duration: 1.5 },
      });
    }
  }, [wheelBoolstate, aniControls]);


  const containerVariants = {
    hidden: { opacity: 0, y: 100},
    visible: { opacity: 1, y:0, transition: { staggerChildren: 1.5 } },
    
  };

  const childVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: [100, 100, 0], opacity: 1, transition: { duration: 2 } },
  };


  return (
    <AnimatePresence>
      <TotalContainer onWheel={handleWheel}>
        {wheelBoolstate === 'Main' ?
          <MainContainer
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          >
            <MainImage
            variants={childVariants}
            image={재우님}>

            </MainImage>
            <DownButton
            variants={childVariants}
            onClick={()=>setwheelBoolstate("AI")}>AI 펼치기</DownButton>
          </MainContainer>
          :
          <>
            <ListContainer animate={aniControls}>
              <AIButtonModal name="펫 디펜더" explain="" />
              <AIButtonModal name="주인바라기" explain="" />
              <AIButtonModal name="재우 오리지널" explain="" />
              <AIButtonModal name="볼트 서포터" explain="" />
              <AIButtonModal name="로드롤러" explain="" />
              <AIButtonModal name="전봇대" explain="" />
            </ListContainer>
            <ExplainModal />
            <SuccessModal />
          </>
        }
        {/**/}
      </TotalContainer>
    </AnimatePresence>
  );
}
export default Main

const DownButton = styled(motion.button)`
background-color: rgba(255, 255, 255, 0);
background-image: url(${Mainbutton3});
background: url(${Mainbutton3});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 220px; /* 변경된 부분 */
  height: 70px; /* 변경된 부분 */
  border: none;
  font-size: 17px;
  font-family: Mabinogi_Classic_TTF;
  cursor: pointer;
  &:active {
    filter: brightness(120%); /* 클릭 시 밝기 감소 효과 */
  }
`
const MainImage = styled(motion.div)<{ image: any }>`
background-color: rgba(255, 255, 255, 0);
background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 320px;
  height: 320px;
  border-radius: 160px;
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
background-color: rgba(100, 100, 100, 1);
`

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