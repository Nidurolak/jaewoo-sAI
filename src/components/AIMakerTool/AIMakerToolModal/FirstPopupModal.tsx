import { styled } from 'styled-components';
import React, { useEffect, useRef } from 'react';
import { getLocalStorage, setLocalStorage } from '../../../utils/localStorage';
import XIconBlue from '../../../assets/XIconBlue.webp'
import UpIconBlue from '../../../assets/UpIconBlue.webp'
import PlusIconBlue from '../../../assets/PlusIconBlue.webp'
import Explain0 from '../../../assets/Explain0.webp'
import Explain1 from '../../../assets/Explain1.webp'
import Explain2 from '../../../assets/Explain2.webp'
import DownIconBlue from '../../../assets/DownIconBlue.webp'
import Mainbutton20070 from '../../../assets/MainButton20070.webp'
import { useRecoilState, useRecoilValue } from 'recoil';
import { FirstModalBool, LocalData } from '../../../store/atom';
function FirstPopupModal() {
  const [firstModal, setFirstModal] = useRecoilState(FirstModalBool)
  const containerRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const boxEnter = useRef(false);
  const localData = useRecoilValue(LocalData)

  const handleWheel = (e: React.WheelEvent) => {

    if (boxRef.current && boxEnter.current == true) {
      boxRef.current.scrollLeft += e.deltaY
    }

    else if (containerRef.current && boxEnter.current == false) {
      containerRef.current.scrollLeft += e.deltaY
    }
  };

  const closeModal = (justClose: boolean) => {
    if (justClose) {
      setFirstModal(false)
    }
    else {
      setFirstModal(false)
      setLocalStorage(localData, "1")
    }
  }

  const storedData = getLocalStorage(localData)

  return (<>{storedData === "0" && firstModal &&
    <Container>
      <BoxContainer ref={containerRef} onWheel={handleWheel} >
        <TextBox>
          <h1>재우's AI 편집기에 오신 것을 환영합니다!</h1>
          <h2>재우's AI 편집기는 마비노기 내의 AI 편집기를 모방하여 만들어졌습니다.</h2>
          <h2>본 편집기는 로컬 환경에서만 저장되는 펫 AI의 단점을 극복하여, PC방 같은 외부 플레이 환경에서도 쉽고 빠르게 AI를 적용할 수 있도록 도움을 줄 것입니다.</h2>
          <h2></h2>
          <h2>기존 인게임 편집기의 기능 대부분을 포함하고 있으며 곧바로 적용할 수 있도록 코드 복사 기능 또한 제공하고 있습니다.</h2>
        </TextBox>
        <ExplainBoxContainer ref={boxRef} onMouseEnter={() => { boxEnter.current = true }} onMouseLeave={() => { boxEnter.current = false }}>
          <ExplainBox>
            <ExplainImage image={Explain0} />
            <h1>간편한 목록 관리</h1>
            <h2>패턴이 꼬이지 않도록 원하는 패턴을 위 또는 아래로 순서를 바꿀 수 있습니다. 또한 비슷한 패턴을 만들기 위해 해당 패턴을 복사할 수도 있으며 필요없는 패턴 역시 간단하게 버튼 하나로 삭제할 수 있습니다.</h2>
          </ExplainBox>
          <ExplainBox>
            <ExplainImage image={Explain1} />
            <h1>개선된 AI 편집기 제공</h1>
            <h2>재우's AI 편집기는 인게임 AI 편집기와 동일하게 상황-조건-행동 순으로 구성되었지만 한 눈으로 볼 수 있어 더욱 편리하게 편집할 수 있습니다.</h2>
          </ExplainBox>
          <ExplainBox>
            <ExplainImage image={Explain2} />
            <h1>재우's 패턴 복사하기</h1>
            <h2>재우's AI를 사용하는데 불편함이 있으셨나요? 재우's AI의 모든 패턴을 정확히 복사해온 다음 사용자의 취향대로 고칠 수 있습니다!</h2>
          </ExplainBox>

        </ExplainBoxContainer>
        <RowBox>
          <CloseButton onClick={() => closeModal(true)}>닫기</CloseButton>
          <CloseButton onClick={() => closeModal(false)}>더 이상 표시하지 않기</CloseButton>
        </RowBox>
      </BoxContainer>

    </Container>}</>);
}

export default FirstPopupModal

const RowBox = styled.div`
align-items: flex-start;
display: flex;
flex-direction: row;
justify-content: center;
gap: 10px; 
width: 800px;
max-width: 100%;
flex-wrap: wrap;
margin-top: 15px;
`

const CloseButton = styled.button`
background-color: rgba(255, 255, 255, 0);
background-image: url(${Mainbutton20070});
background: url(${Mainbutton20070});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 180px;
  height: 50px;
  border: none;
  font-size: 17px;
  font-family: 'Mabinogi_Classic_TTF';
  cursor: pointer;
  &:hover{
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(120%); /* 클릭 시 밝기 감소 효과 */
  }
`

const ExplainImage = styled.div<{ image: any }>`
background-color: rgba(81, 165, 196,1);
background-image: ${({ image }) => `url(${image})`};
background-repeat: no-repeat;
background-size: cover;
background-position: center;
  width: 280px;
  height: 150px;
`

const ExplainBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  min-width: 450px;
  max-width: 450px;
  padding-top: 10px;
  min-height: 400px;
  max-height: 400px;
  background-color: rgb(111, 195, 226);
  border-radius: 9px;
`

const ExplainBoxContainer = styled.div`
display: flex;
flex-direction: row; 
justify-content: flex-start;
align-items: center;
overflow-x: scroll;
  overflow-y: hidden;
  overscroll-behavior: contain;
  scroll-behavior: smooth;
  height: 200px; 
  width: 100%;
  max-width: 1200px;
  min-height: 500px;
  gap: 15px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;

  
  &::-webkit-scrollbar {
    height: 11px; /* 가로 스크롤바를 위한 높이 */
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(25, 76, 138);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(111, 195, 226);
  }


`

const Container = styled.div`
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
    gap: 10px;
    cursor: default;
    background-color: rgba(60, 60, 60, 1);
    z-index: 1000;
    word-wrap: break-word;
& > * {
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
  font-family: 'Mabinogi_Classic_TTF';}

  h1 {word-spacing: 1px;word-break:keep-all; text-align: center; font-weight: 100;font-size: 37px;font-family: inherit;}
  h2 {word-spacing: 1px;word-break:keep-all; text-align: left; font-weight: 100; font-size: 17px; font-family: inherit; padding: 7px;}
  h3 {word-spacing: 1px;word-break:keep-all; text-align: justify; font-weight: 100; font-size: 15px; font-family: inherit; white-space: pre-wrap;}



`


const TextBox = styled.div`
display: flex;
flex-direction: column; 
justify-content: flex-start;
`

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 80vw;
  max-width: 1400px;
  height: fit-content;
  background-color: rgb(81, 165, 196);
  border: 3px solid white;
  line-height: 1.5;
  border-radius: 7px;
  padding-bottom: 10px;


  @media (max-width: 1600px) {
    grid-template-columns: 1fr;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 95vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {width: 11px;}
    &::-webkit-scrollbar-track {background: none;}
    &::-webkit-scrollbar-thumb {background: rgb(25, 76, 138);border-radius: 3px;}
    &::-webkit-scrollbar-thumb:hover {background: rgb(111, 195, 226);}
  
  }

`
const QNABox2Container = styled.div`
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
width: 1460px;
height: 70vh;
background-color: gray;
padding-top: 40px;
`