import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conParticle, conWarper, eventWarper, seqParticle, seqWarper, totalWarper } from '../hooks/AiMakerHook';
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
import { useSetRecoilState } from "recoil";
import gen_button_confirm from '../assets/Sound/gen_button_confirm.wav'
import gen_hover from '../assets/Sound/gen_hover.wav'

function AIButtonModal(value: AITemplet) {
  let Image;
  const Hoversound = useRef(new Audio(gen_hover))
  const Confirmsound = new Audio(gen_button_confirm);
  const handleSoundPlay = () => {
    console.log("asasas")
    Hoversound.current.currentTime = 0;
    Hoversound.current.play();
  }

  const FileDownload = () => {
    let content = '';
    switch (value.name) {
      case "펫 디펜더": content = totalWarper(AI_TOOL().Pet_Chaser_AI_PetDefender); break;
      case "로드롤러": content = 로드롤러; break;
      case "메디이익": content = 메디이익; break;
      case "볼트 서포터": content = 볼트서포터; break;
      case "블레이즈 서포터": content = 블레이즈서포터; break;
      case "재우 오리지널": content = 재우오리지널; break;
      case "전봇대": content = 전봇대; break;
      case "주인바라기": content = 주인바라기; break
      default: break;
  };
      const element = document.createElement("a");
      const file = new Blob([content], {type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'example.txt';
      document.body.appendChild(element);
}



  switch (value.name) {
    case "펫 디펜더": Image = 펫디펜더; break;
    case "로드롤러": Image = 로드롤러; break;
    case "메디이익": Image = 메디이익; break;
    case "볼트 서포터": Image = 볼트서포터; break;
    case "블레이즈 서포터": Image = 블레이즈서포터; break;
    case "재우 오리지널": Image = 재우오리지널; break;
    case "전봇대": Image = 전봇대; break;
    case "주인바라기": Image = 주인바라기; break;
    default: break;
  };
  let Name;
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
    clipboardCopy(
      totalWarper(AI_TOOL().Pet_Chaser_AI_Package))
      .then(() => {
        setCopied(true);
        console.log('asdasd')
      })
      .catch((error) => {
        console.error('클립보드 복사 오류:', error);
      });
  }

  return (<BoxContainer>
    <AIDetailContainer>
      <AIImage image={Image} />
      <DownButton onClick={handleCopyToClipboard}>{Name} AI</DownButton>
    </AIDetailContainer>
    <DownButton>클립보드 복사하기</DownButton>
    <DownButton>AI파일 다운받기</DownButton>
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
  &:active {
    filter: brightness(120%); /* 클릭 시 밝기 감소 효과 */
  }
`