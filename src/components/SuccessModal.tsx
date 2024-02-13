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
import { CurrentAIName, DownloadModalBool, DownloadModalCopyBool } from '../store/atom';
 
//TS2559: Type '{ children: never[]; }' has no properties in common with type 'IntrinsicAttributes'.
//위 에러 발생, 컴포넌트 전달에 있어 에러 발생으로 추측. GPT 등은 프롭스를 넘기라고 하지만 나는 고정위치에 모달창 생성을 고정시킴으로 해결볼 생각
//function SuccessModal({ children }: { children?: any }) {


function SuccessModal() {

  const [modalBoolValue, setmodalBoolValue] = useRecoilState(DownloadModalBool)
  const [downloadModalCopyBool, setdownloadModalCopyBool] = useRecoilState(DownloadModalCopyBool)
  const [currentAIName, setCurrentAIName] = useRecoilState(CurrentAIName);

  const CloseModal = () =>{
    setmodalBoolValue(false)
    setdownloadModalCopyBool(false)
  }
    return (<>{(modalBoolValue || downloadModalCopyBool) === true &&(
      <Container onClick={CloseModal}>
        <BoxContainer>
        {downloadModalCopyBool === false ?<h2>다운로드 성공!</h2> : <h2>복사 성공!</h2> }
          
          <span className='yellow-text'>{currentAIName} AI</span>
          {downloadModalCopyBool === false ?<h3>파일을 다운받은 경로를 찾은 다음,<br/>내 문서 - 마비노기 - 동물캐릭터 AI 폴더로 옮기신 다음 파일 양식을 xml으로 고치십시오.</h3> : <h3>인게임에서 새 AI - 소스 보기 탭에서 붙여넣기를 하십시오.<br/></h3> }
          
          
        </BoxContainer>
          </Container>
    )}</>);
} 

export default SuccessModal;
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
background-color: rgba(100, 100, 100, 0.6);
& > * {
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
  font-family: 'Mabinogi_Classic_TTF';}

  h2 {
    font-size: inherit;
    font-family: 'Mabinogi_Classic_TTF';
  }
 h3 {
  font-weight: 300;
    font-size: 15px;
    font-family: 'Mabinogi_Classic_TTF';
  }
`
const BoxContainer = styled.div`
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
text-align: center;
width: 400px;
height: 220px;
background-color: rgba(81, 165, 196);
border: 3px solid white;
line-height: 1.5;
  border-radius: 7px;
  span.yellow-text {
  font-size: 25px;
    color: rgba(255, 255, 0, 1);
    text-shadow: 1px 1px 0 black; /* 텍스트 주변에 검은색 테두리 효과 */
  }
`