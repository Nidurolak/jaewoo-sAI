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

//TS2559: Type '{ children: never[]; }' has no properties in common with type 'IntrinsicAttributes'.
//위 에러 발생, 컴포넌트 전달에 있어 에러 발생으로 추측. GPT 등은 프롭스를 넘기라고 하지만 나는 고정위치에 모달창 생성을 고정시킴으로 해결볼 생각
//function SuccessModal({ children }: { children?: any }) {
function ExplainModal() {

  const [currentAIName, setCurrentAIName] = useRecoilState(CurrentAIName)
  const [modalBoolValue, setmodalBoolValue] = useRecoilState(ExplainModalBool)
  let Image;
  let Tag: string = ''
  let Explain: string = ''
  let FuncList: string[] = []
  switch (currentAIName) {
    case "펫 디펜더": Image = 펫디펜더; Tag = "주인의 위치에서 디펜스로 적의 공격을 흘림";
      FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동",];
      Explain = '주인에게 딱 붙어 디펜스로 경호를 하는 이 AI는 기동성과 방어력의 아름다운 균형을 이루고 있습니다. 주인을 노리는 적의 평타가 범위형이라면, 높은 확률로 펫의 디펜스가 경직을 흘려내어 주인은 전투의 흐름이 끊기지 않고 반격할 수 있습니다!'; break;
    case "로드롤러": Image = 로드롤러; Tag = "주인의 위치에서 윈드밀로 적의 공격을 반격";
      FuncList = ["윈드밀 반응 복귀", "자동 신속 발동",];
      Explain = '제자리에 굳건히 서서 온갖 귀찮은 것들을 쓸어버리는 화력전을 선호하신다면, 펫 디펜더 대신 이 AI가 더 매력적일 것입니다. 방어에 완전히 집중한 이 AI는 디펜스 대신 윈드밀을 사용하여 적의 범위형 평타를 완전히 반격합니다. 어쩌다 한 번 맞는 것 마저 싫다면, 로드롤러가 회전하게 두십시오!\n(윈드밀을 보유한 펫만 사용가능)'; break;
    case "메디이익": Image = 메디이익; Tag = "자동으로 힐링을 시전";
      FuncList = ["윈드밀 반응 복귀", "자동 신속 발동",];
      Explain = '전투에서 자주 맞곤 하는데 포션 마시기가 귀찮거나 하는 등의 이유로 생명력에 흠집이 난 상태를 자주 방치하신다면 글쎄요, 이 메디이익 AI가 꽤 쓸만하실 지도 모르겠습니다. 전투 중 주인의 생명력 상태를 확인해서 자율적으로 힐링을 시전하는 이 AI는 심각한 상처는 어찌할 수 없지만 간단한 생채기 정도는 무난하게 고쳐드립니다!'; break;
    case "볼트 서포터": Image = 볼트서포터; Tag = "파이어볼트로 공격을 보조";
      FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동",];
      Explain = '초보 마법사, 예컨데 궁극의 정령이 없는 유저나 자주 이동하는 궁수계열 유저들에겐, 적과의 거리를 꾸준하게 벌려주는 이 AI가 의외로 쓸만하다는 것에 놀라실 것입니다. 적을 다운을 시키는 파볼트를 무심하게 던져대는 이 AI는 거칠지만 충직하게 당신을 보조할 것입니다!'; break;
    case "블레이즈 서포터": Image = 블레이즈서포터; Tag = "디펜스를 시전하면 아이스 볼트를 장전하여 블레이즈 충전을 보조";
      FuncList = ["윈드밀 반응 복귀", "자동 신속 발동",];
      Explain = '블레이즈가 주류로 인정받은 적은 없었지만, 그 로망이 부정당한 적은 단 한순간도 없었습니다. 블레이즈 서포터는 그런 로망을 쫓는 자들을 위해 만들어진 AI로, 혼자서 최고화력의 블레이즈를 사용할 수 있게 다운게이지를 관리시켜줍니다.'; break;
    case "재우 오리지널": Image = 재우오리지널; Tag = "주인이 공격한 적 주변에서 시선을 끔";
      FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동",];
      Explain = '첫 번째 재우`s AI입니다. 이 AI의 패턴을 기반으로 수많은 재우`s AI가 만들어졌습니다. 감시에 특화되어 있으며, 주인이 공격한 적에게 달라붙어 주변 적의 어그로를 끌면서 동시에 주인이 공격당하면 반격하도록 제작되었습니다. ';
      break;
    case "전봇대": Image = 전봇대; Tag = "라이트닝 볼트를 장전하여 체인효과를 유도";
      FuncList = ["윈드밀 반응 복귀", "자동 원거리 견제", "자동 신속 발동",];
      Explain = '꽤나 실험적인 이 AI는 이젠 예능용 AI가 되었지만 한 때 알반 훈련소에서 현역으로 사용되었습니다. 주변 파티원의 라볼트 차지 수 만큼 차지 효과가 증대되는 효과를 이용한 이 AI는 약한 적을 빠르게 쓸어버릴 수 있습니다.'; break;
    case "주인바라기": Image = 주인바라기; Tag = "아무것도 하지 않고 주인만 따라다님";
      FuncList = [];
      Explain = '주인이 전부 해결할테니 소중한 펫은 그냥 자기 옆에서 하품이나 하고 있기를 원하시는 분들을 위한 AI입니다. 모든 상황에서 펫이 정말 "아무것도" 하지 않고 주인의 바짓가랑이만 붙든채 전투가 끝나길 기다립니다.'; break;
    case "폭스 헌터": Image = 컴뱃파트너; Tag = "주변 모든 것을 두들겨 팸";
      FuncList = ["자동 신속 발동",];
      Explain = '선공모드로 언제 서브 스킬을 수련하나요? 신속 1랭은 또 언제 찍습니까? 폭스 헌터와 지금 하십시오! 주변(약 10미터) 모든 적을 무차별 폭행하는 폭스 헌터와 함께라면 귀찮은 수련, 이제 굿 바이!\n(수련 외 목적으로 사용하였을 때 발생하는 모든 트롤 행위에 대해 제작자는 일절 책임지지 않습니다.)'; break;
    case "기르가쉬 헬퍼": Image = 오리지널Lite; Tag = "주변 모든 것을 두들겨 팸";
      FuncList = ["윈드밀 반응 복귀", "자동 신속 발동",];
      Explain = '신성 경험치를 파밍하려고 기르가쉬를 잡는데 이골이 나셨습니까? 기르가쉬 헬퍼를 통해 약간의 리프레쉬와 쾌적함을 즐겨보세요! 다른 AI와 달리 사용법을 익혀야하지만, 한 번 익히고 나면 혼자서도 기르가쉬를 아에 안 띄우고 잡아낼 수도 있습니다!\n(윈드밀을 보유한 펫만 사용가능)'; break;
    default: break;
  };


  let name: string = currentAIName
  const toolTipContents = useRef('')
  const [tooltipUp, settooltipUP] = useState(false)
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });



  const handleMouseEnter = (content: string, event: React.MouseEvent) => {
    const buttonRect = event.currentTarget.getBoundingClientRect();
    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;
    setModalPosition({ top: centerY + 20, left: centerX - 125 })
    console.log(tooltipUp)
    switch (content) {
      case '윈드밀 반응 복귀': toolTipContents.current = '주인의 윈드밀 장전에 반응하여 모든 행동을 정지, 주인 위치로 복귀합니다. 빠른 탑승이 가능해 맵 이동 시 끼어있는 펫을 꺼낼 때에도 유용합니다.'; break;
      case '자동 원거리 견제': toolTipContents.current = '펫, 주인을 노리는 원거리 공격에 반응하는 견제 패턴입니다. 즉시 모든 행동을 중지, 근접 공격으로 빠르게 견제합니다. 거리에 따라 실패할 수 있습니다.'; break;
      case '자동 파볼트 견제': toolTipContents.current = '펫, 주인을 노리는 원거리 공격에 반응하는 견제 패턴입니다. 준비된 파볼트 공격으로 빠르게 견제합니다. 거리에 따라 실패할 수 있습니다.'; break;
      case '자동 신속 발동': toolTipContents.current = '전투 중 신속 게이지가 가득 차면 가능한 즉시 신속의 날개를 발동시킵니다. 특성을 자주 까먹어도 이제 펫이 챙겨줍니다.'; break;
    }
    //setTimeout(() => {settooltipUP(true)}, 500)
    settooltipUP(true)
  };
  const handleMouseLeave = (content: string, event: React.MouseEvent) => {
    settooltipUP(false)
  }

  const CloseModal = () => {
    settooltipUP(false)
    setmodalBoolValue(false)
    setCurrentAIName('')
  }
  return (
    < >
      {(modalBoolValue) === true && (
        <Container onClick={CloseModal}>
          <BoxContainer>
            <AIImage image={Image} />
            <h1>{name} AI</h1>
            <WhiteLine/>
            <h2>{Tag}</h2>
            <FuncContainer >
              {FuncList.length > 0 && (<>
                {FuncList.map((item, index) => (
                  <FuncButton key={index + item} onMouseEnter={(e) => handleMouseEnter(item, e)} onMouseLeave={(e) => handleMouseLeave(item, e)}>
                    {item}
                  </FuncButton>))}</>)}

            </FuncContainer>
            <h3>{Explain}</h3>

          </BoxContainer>
          {tooltipUp === true && (
            <TooltipContainer
              onMouseEnter={() => settooltipUP(true)} onMouseLeave={() => settooltipUP(false)}
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1] }} exit={{ opacity: [0, 0, 1] }} transition={{ duration: 1, exit: 1 }} key={toolTipContents.current} style={{ top: modalPosition.top, left: modalPosition.left }} >
              <h3>{toolTipContents.current}</h3>
            </TooltipContainer>

          )}
        </Container>
      )}
    </>);
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

  h1 {
    font-weight: 100;
    margin-top: 10px;
    font-size: 30px;
    font-family: Mabinogi_Classic_TTF;
  }
  h2 {
    margin-top: 10px;
    font-size: inherit;
    font-family: inherit;
  }
 h3 {
 text-align: justify;
  font-weight: 100;
    font-size: 15px;
    font-family: inherit;
    white-space: pre-wrap;
  }
`

const WhiteLine = styled.div`
  width: 200px;
  height: 3px;
  background-color: white;
  margin-bottom: 10px;
`

//애니메이션에 꽤 심한 문제, 마우스를 스치듯이 흘리면 툴팁이 계속 나옴
//<{isOn:boolean}>`
/*opacity: ${({ isOn }) => (isOn ? 1 : 0)};*/
//animation: ${({ isOn }) => (isOn ? css`${fadeIn} ease-in-out 0.2s forwards` : css`${fadeOut} ease-in-out 0.2s forwards`)};
const TooltipContainer = styled(motion.div)` 
position: fixed;
display: flex;
justify-content: center;
align-items: center;
padding: 10px;
background-color: rgba(0, 0, 0, 0.9);
color: white;
width: 250px; /* 상위 컨테이너의 50%로 설정 (내용물에 비례) */

`;

const FuncContainer = styled.div`
display: flex;
flex-direction: row ;
justify-content: center;
align-items: center;
text-align: center;
margin-top: 15px;
margin-bottom: 30px;
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
width: 550px;
background-color: rgba(81, 165, 196);
line-height: 1.5;
border: 3px solid white;
padding: 25px;
  border-radius: 7px;
  span.yellow-text {
  font-size: 25px;
    color: rgba(255, 255, 0, 1);
    text-shadow: 1px 1px 0 black; /* 텍스트 주변에 검은색 테두리 효과 */
  }
`