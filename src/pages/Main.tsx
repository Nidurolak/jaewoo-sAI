import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton20070 from '../assets/MainButton20070.webp'
import UpIconBlue from '../assets/UpIconBlue.webp'
import DownIconBlue from '../assets/DownIconBlue.webp'
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { WheelBool, ExpWheelBool, CurrentAIName, AIMakerExplainModalBool } from '../store/atom';
import 재우님 from '../assets/Icon/재우님.webp'
import QNAComp from '../components/QNAComp';
import AIList from '../components/AIList';
import AIMaker from '../components/AIMaker';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';


function Main() {
  const [wheelBoolstate, setwheelBoolstate] = useRecoilState(WheelBool)
  const [currentAIName, setCurrentAIName] = useRecoilState(CurrentAIName)
  const [expWheelBoolstate, setexpWheelBoolState] = useRecoilState(ExpWheelBool)
  const [AIMakerexplainModalBool, setAIMakerexplainModalBool] = useRecoilState(AIMakerExplainModalBool);


  //마비노기 공식 홈페이지의 그것과 비슷하게 해보고 싶었는데 뭔가 잘 안되네....



  useEffect(() => {
    if (getLocalStorage("Ver.2.0.0.IsFirst") == null) {
      setLocalStorage("Ver.2.0.0.IsFirst", "0")
    }
  }, []);


  //드래그 시 상하 감지 후 로직 발동, 하드 코딩한 수준이라 다른 프로젝트에서 구조를 참고할 순 있어도 쌩으로 쓰긴 힘들어보인다.
  const handleWheel = (e: React.WheelEvent) => {
    if (e.currentTarget !== e.target) {
      e.stopPropagation();
      return;
    }
    if (window.scrollY == 0) {
      if (wheelBoolstate == "AI" && currentAIName == '') {
        if (e.deltaY < 0) { setwheelBoolstate("Main") }
      }
      else if (wheelBoolstate == "EXP") {
        if (e.deltaY < 0) {
          if (expWheelBoolstate === 0) { setwheelBoolstate("Main") }
          else { setexpWheelBoolState(expWheelBoolstate - 1) }
        }
        if (e.deltaY > 0) {
          if (expWheelBoolstate < 1) {
            setexpWheelBoolState(expWheelBoolstate + 1)
          }
        }
      }
    }
  }
  return (
    <TotalContainer onWheel={handleWheel}>
      {wheelBoolstate !== 'Main' && <WheelDiv image={UpIconBlue} initial={{ y: 0 }} animate={{ y: [0, -15, 0] }}
        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }} onClick={() => handleWheel({ deltaY: -100 } as React.WheelEvent)} />}
      <AnimatePresence mode='wait'>
        {wheelBoolstate === 'Main' ?
          //메인 랜딩 페이지
          //프레이머 모션의 이니셜, 애니메이트, 엑시트, 키를 변수화하지 않고 전부 넣고 관리했음
          //가독성은 떨어질 수 있어도 문제가 생긴 부분을 빠르게 고칠 수 있다.
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
              <MainButton onClick={() => setAIMakerexplainModalBool(true)}>AI 만들기</MainButton>
              <MainButton onClick={() => setwheelBoolstate("EXP")}>재우's AI란?</MainButton>
              <MainButton onClick={() => setwheelBoolstate("AI")}>AI 보기</MainButton>
            </ButtonContainer>
          </MainContainer>
          //ai 페이지
          : wheelBoolstate === "AI" ? (<AIList key='ListKeyHead' />)
            //제품설명 페이지
            : (<QNAComp key='EXPKeyHead' />)
        }
      </AnimatePresence>
      {expWheelBoolstate < 1 && wheelBoolstate === 'EXP' && expWheelBoolstate <= 1 && <WheelDiv image={DownIconBlue} initial={{ y: 0 }} animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }} onClick={() => handleWheel({ deltaY: 100 } as React.WheelEvent)} />}
      <AIMaker></AIMaker>
    </TotalContainer>
  );
}
export default Main

const WheelDiv = styled(motion.div) <{ image: any }>`
  background-color: rgba(255, 255, 255, 0);
  background-image: ${({ image }) => `url(${image})`};
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 30px;
  height: 30px;
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
  &:hover{filter: brightness(110%);}
  &:active {filter: brightness(130%);}
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
  height: 100%;
  margin: 0 auto;
  gap: 10px;
  white-space: pre;
  background-color: rgba(111, 195, 226);
 h2 {color: white; font-weight: 250; font-size: 55px; font-family: 'Mabinogi_Classic_TTF';}
 h3 {color: white; font-weight: 250; font-size: 25px; font-family: 'Mabinogi_Classic_TTF';}
`

const TotalContainer = styled(motion.div)`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  min-height: 100vh;
  min-width: 100vw;
  background-color: rgb(111, 195, 226);
  padding-top: 20px;
  padding-bottom: 20px;
`
