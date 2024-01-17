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
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import gen_button_confirm from '../assets/Sound/gen_button_confirm.wav'
import gen_hover from '../assets/Sound/gen_hover.wav'
import { CurrentAIName, ExplainModalBool, DownloadModalCopyBool } from '../store/atom';

//TS2559: Type '{ children: never[]; }' has no properties in common with type 'IntrinsicAttributes'.
//위 에러 발생, 컴포넌트 전달에 있어 에러 발생으로 추측. GPT 등은 프롭스를 넘기라고 하지만 나는 고정위치에 모달창 생성을 고정시킴으로 해결볼 생각
//function SuccessModal({ children }: { children?: any }) {
function ExplainModal() {

  const [currentAIName, setCurrentAIName] = useRecoilState(CurrentAIName)
  const [modalBoolValue, setmodalBoolValue] = useRecoilState(ExplainModalBool)
  let Image;
  let Tag:string = ''
  let Explain:string = ''
  let Func:string = ''
  let FuncList:string[]= []
  switch (currentAIName) {
    case "펫 디펜더": Image = 펫디펜더; Tag = "수동적이고 방어적인 AI"; FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동", ]; Func = '윈드밀 반응 복귀, 자동 원거리 견제, 자동 신속 발동 가능';
    Explain = ''; break;
    case "로드롤러": Image = 로드롤러; Tag = "매우 수동적이고 매우 방어적인 AI"; FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동", ];Func = '윈드밀 반응 복귀, 자동 원거리 견제, 자동 신속 발동 가능';
    Explain = ''; break;
    case "메디이익": Image = 메디이익; Tag = "능동적이고 보조적인 AI"; FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동", ];Func = '윈드밀 반응 복귀, 자동 원거리 견제, 자동 신속 발동 가능';
    Explain = ''; break;
    case "볼트 서포터": Image = 볼트서포터; Tag = "능동적이고 공격적인 AI"; FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동", ];Func = '윈드밀 반응 복귀, 자동 원거리 견제, 자동 신속 발동 가능';
    Explain = ''; break;
    case "블레이즈 서포터": Image = 블레이즈서포터; Tag = "능동적이고 보조적인 AI"; FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동", ];Func = '윈드밀 반응 복귀, 자동 원거리 견제, 자동 신속 발동 가능';
    Explain = ''; break;
    case "재우 오리지널": Image = 재우오리지널; Tag = "능동적이고 방어적인 AI"; FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동", ];Func = '윈드밀 반응 복귀, 자동 원거리 견제, 자동 신속 발동 가능';
    Explain = '첫 번째 재우`s AI입니다. 이 AI의 패턴을 기반으로 수많은 재우`s AI가 만들어졌습니다. 감시에 특화되어 있으며, 주인이 공격한 적에게 달라붙어 주변 적의 어그로를 끌면서 동시에 주인이 공격당하면 반격하도록 제작되었습니다. '; break;
    case "전봇대": Image = 전봇대; Tag = "수동적이고 보조적인 AI"; FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동", ];Func = '윈드밀 반응 복귀, 자동 원거리 견제, 자동 신속 발동 가능';
    Explain = ''; break;
    case "주인바라기": Image = 주인바라기; Tag = "매우 수동적이고 매우 보조적인 AI"; FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동", ];Func = ' ';
    Explain = ''; break;
    default: break;
  };


  let name:string = currentAIName
  const toolTipContents = useRef('')
  const [tooltipUp, settooltipUP] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (content: string, event: React.MouseEvent) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    setModalPosition({ top: centerY + 20, left:centerX - 125})
    switch(content){
      case '윈드밀 반응 복귀': toolTipContents.current = '주인의 윈드밀 장전에 반응하여 모든 행동을 정지, 주인 위치로 복귀합니다. 빠른 탑승이 가능해 맵 이동 시 끼어있는 펫을 꺼낼 때에도 유용합니다.'; break;
      case '자동 원거리 견제': toolTipContents.current = '펫, 주인을 노리는 원거리 공격에 반응하는 견제 패턴입니다. 즉시 모든 행동을 중지, 근접 공격으로 빠르게 견제합니다. 거리에 따라 실패할 수 있습니다.'; break;
      case '자동 신속 발동': toolTipContents.current = '전투 중 신속 게이지가 가득 차면 가능한 즉시 신속의 날개를 발동시킵니다. 특성을 자주 까먹어도 이제 펫이 챙겨줍니다.'; break;
    }
    setTimeout(() => {
    settooltipUP(true)}, 500)
  };
  const handleMouseLeave = (content: string, event: React.MouseEvent) =>{
    settooltipUP(false)
  }

  const CloseModal = () =>{
    settooltipUP(false)
    setmodalBoolValue(false)
  }
    return (<>{(modalBoolValue) === true &&(
      <Container onClick={CloseModal}>
        <BoxContainer>
        <AIImage image={Image}/>
          <h2>{name}</h2>
          <h2>{Tag}</h2>
          <FuncContainer >
            {FuncList.length > 0 && (<>
            {FuncList.map((item, index) => (
            <FuncButton key = {index} onMouseEnter={(e) => handleMouseEnter(item, e)} onMouseLeave={(e)=>handleMouseLeave(item, e)}>
              {item}
            </FuncButton>))}</>)}

          </FuncContainer>
          <h3>{Explain}</h3>
          
        </BoxContainer>
        {tooltipUp === true &&(
          <TooltipContainer isOn = {tooltipUp} onMouseEnter={()=>settooltipUP(true)} style={{top: modalPosition.top, left: modalPosition.left }} onMouseLeave={()=>settooltipUP(false)} >
            <h3>{toolTipContents.current}</h3>
          </TooltipContainer>
        )}
          </Container>
    )}</>);
} 

export default ExplainModal;



const AIImage = styled.div<{ image: any }>`
background-color: rgba(255, 255, 255, 0);
background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 130px;
  height: 130px;
  border-radius: 3px;
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
background-color: rgba(100, 100, 100, 0.6);
& > * {
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
  font-family: Mabinogi_Classic_TTF;}

  h2 {
    font-size: inherit;
    font-family: inherit;
  }
 h3 {
  font-weight: 250;
    font-size: 15px;
    font-family: inherit;
  }
`

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;
const fadeOut = keyframes`
  0% {opacity: 1;}
  100% {opacity: 0;}
`;

const TooltipContainer = styled.div<{isOn:boolean}>`
position: fixed;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
background-color: rgba(0, 0, 0, 0.9);
color: white;
  width: 250px; /* 상위 컨테이너의 50%로 설정 (내용물에 비례) */
  opacity: ${({ isOn }) => (isOn ? 1 : 0)};
  animation: ${({ isOn }) => (isOn ? css`${fadeIn} ease-in-out 0.2s` : css`${fadeOut} ease-in-out 0.2s`)};
`;

const FuncContainer = styled.div`
display: flex;
flex-direction: row ;
justify-content: center;
align-items: center;
text-align: center;
margin-top: 10px;
margin-bottom: 10px;
gap: 10px;
`
const FuncButton = styled.div`
background-color: rgba(255, 255, 255, 0);
display: flex;
justify-content: center;
align-items: center;
text-align: center;
background-image: url(${Mainbutton3});
background: url(${Mainbutton3});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 140px; /* 변경된 부분 */
  height: 40px; /* 변경된 부분 */
  border: none;
  font-size: 17px;
  &:hover{
    filter: brightness(120%);
  }
`

const BoxContainer = styled.div`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
text-align: center;
width: 650px;
background-color: rgba(81, 165, 196);
line-height: 1.5;
padding: 15px;
  border-radius: 7px;
  span.yellow-text {
  font-size: 25px;
    color: rgba(255, 255, 0, 1);
    text-shadow: 1px 1px 0 black; /* 텍스트 주변에 검은색 테두리 효과 */
  }
`