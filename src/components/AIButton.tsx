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
import { CurrentAIName, DownloadModalBool, DownloadModalCopyBool, ExplainModalBool } from '../store/atom';

function AIButtonModal(value: AITemplet) {
  let Image;
  const [currentAIName, setCurrentAIName] = useRecoilState(CurrentAIName);
  const [downloadModalCopyBool, setdownloadModalCopyBool] = useRecoilState(DownloadModalCopyBool)
  const [explainModalBool, setexplainModalBool] = useRecoilState(ExplainModalBool)
  const [modalBoolValue, setmodalBoolValue] = useRecoilState(DownloadModalBool)
  const Hoversound = useRef(new Audio(gen_hover))
  const Confirmsound = useRef(new Audio(gen_button_confirm));
  const handleSoundPlay = () => {
    Confirmsound.current.currentTime = 0;
    Confirmsound.current.play();
  }

  const ExplainModalUp = () =>{
    setexplainModalBool(true)
    setCurrentAIName(value.name as string)

  }

  let Name;
  let content = '';
  switch (value.name) {
    case "펫 디펜더":
      content = totalWarper(AI_TOOL().Pet_Defender_AI_Package);
      Image = 펫디펜더; Name = value.name; break;
    case "로드롤러":
      content = totalWarper(AI_TOOL().Pet_RoadRoller_AI);
       Image = 로드롤러; Name = value.name; break;
    case "메디이익": 
    content = 메디이익; 
    Image = 메디이익; Name = value.name; break;
    case "볼트 서포터": 
    content = totalWarper(AI_TOOL().Pet_BoltSupport_AI); 
    Image = 볼트서포터; Name = value.name; break;
    case "블레이즈 서포터": 
    content = 블레이즈서포터; 
    Image = 블레이즈서포터; Name = value.name; break;
    case "재우 오리지널": 
    content = totalWarper(AI_TOOL().Pet_Original_AI); 
    Image = 재우오리지널; Name = value.name; break;
    case "전봇대": 
    content = totalWarper(AI_TOOL().Pet_Battery_AI);  
    Image = 전봇대; Name = value.name; break;
    case "주인바라기": 
    content = totalWarper(AI_TOOL().Pet_Chaser_AI_Package); 
    Image = 주인바라기; Name = value.name; break
    default: break;
};

  const FileDownload = () => {
    handleSoundPlay();
    setCurrentAIName(value.name as string)
    setmodalBoolValue(true)
      const element = document.createElement("a");
      const file = new Blob([content], {type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = value.name as string;
      document.body.appendChild(element);
      element.click();
}

  switch (value.name) {
    case "펫 디펜더": Name = value.name; break;
    case "로드롤러": Name = value.name; break;
    case "메디이익": Name = value.name; break;
    case "볼트 서포터": Name = value.name; break;
    case "블레이즈 서포터": Name = value.name; break;
    case "재우 오리지널": Name = value.name; break;
    case "전봇대": Name = value.name; break;
    case "주인바라기": Name = value.name; break;
    default: break;
  };
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    handleSoundPlay();
    setCurrentAIName(value.name as string)
    setdownloadModalCopyBool(true)
    clipboardCopy(content)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('클립보드 복사 오류:', error);
      });
  }

  return (<BoxContainer>
    <AIDetailContainer onClick={ExplainModalUp}>
      <AIImage image={Image} />
      <DownButton>{Name} AI</DownButton>
    </AIDetailContainer>
    <DownButton onClick={handleCopyToClipboard}>클립보드 복사하기</DownButton>
    <DownButton onClick={FileDownload}>AI파일 다운받기</DownButton>
  </BoxContainer>)
}

export default AIButtonModal;

const BoxContainer = styled.div`
display: flex;
flex-direction: row; 
justify-content: flex-start;
align-items: center;
gap: 10px;
padding-left: 10px;
padding-right: 10px;
width: 600px;
height: 120px;
background-color: rgba(81, 165, 196);
  border-radius: 7px;
`

const AIDetailContainer = styled.div`
background-color: rgba(255, 255, 255, 0);
display: flex;
flex-direction: row; 
justify-content: flex-start;
align-items: center;
gap: 0px;
width: 300px;
border: none;
`

const AIImage = styled.div<{ image: any }>`
background-color: rgba(255, 255, 255, 0);
background-image: ${({ image }) => `url(${image})`};
  background-repeat: no-repeat;
  background-size: cover;
  margin-left:10px;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 70px;
  height: 70px;
  border-radius: 3px;
`
const DownButton = styled.button`
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