import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conParticle, conWarper, eventWarper, seqParticle, seqWarper, totalWarper } from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest, AITemplet } from '../utils/types';
import { AI_TOOL } from '../components/AITool';
import MainButton from '../assets/MainButton.svg'
import Mainbutton3 from '../assets/MainButton3.png' 
import AIButtonModal from '../components/AIButton';

function Main() { 
  const [copied, setCopied] = useState(false);
  let StringTest1: SequenceType = {
    tabNum: 4,
    case: "sequence",
    main: "wait",
    value0: "0",
    value1: "0"
  }
  let StringTest2: ConditionType = {
    tabNum: 4,
    case: "condition",
    main: "ST_preparable",
    value0: "PetSTDamageUp",
    value1: "0"
  }


  const handleCopyToClipboard = () => {
    clipboardCopy(
      totalWarper(
        [eventWarper({ name: "와! 샌즈!", main: "master_targeted", value0: "alert", sequence: [seqParticle(StringTest1), seqParticle(StringTest1)], condition: [conParticle(StringTest2)] }), eventWarper({ name: "와! 샌즈!", main: "master_targeted", value0: "alert", sequence: [seqParticle(StringTest1), seqParticle(StringTest1)], condition: [conParticle(StringTest2)] })]))
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('클립보드 복사 오류:', error);
      });
  }
  const handleCopyToClipboardTest = () => {
    clipboardCopy(
      totalWarper([
        AI_TOOL().Pet_MasterActive_StWind,
        AI_TOOL().Pet_Master_Chase,
        AI_TOOL().Pet_MasterTargeted_AtK_Defence,
        AI_TOOL().Pet_MasterTargeted_Alert_Defence,
        AI_TOOL().Pet_DefenceAttacked_Revenge,
        AI_TOOL().Pet_MasterAttacked_Stand_Revenge,
        AI_TOOL().Pet_MasterAttacked_Down_Revenge,
        AI_TOOL().Pet_AfterAtKDown_Defence,
        AI_TOOL().Pet_AfterAtKStand_Defence,
        AI_TOOL().Pet_Main_Defence,
        AI_TOOL().Pet_Main_Defence1,
        AI_TOOL().Pet_AttackedDown_Defence,
        AI_TOOL().Pet_PetTargeted_Missile,
        AI_TOOL().Pet_MasterTargeted_Missile,
      ])
    )
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error('클립보드 복사 오류:', error);
      });
  }

  return (
    <TestContainer>
      <AIButtonModal name="펫 디펜더" explain="" />
      <AIButtonModal name="주인바라기" explain="" />
      <AIButtonModal name="재우 오리지널" explain="" />
      <AIButtonModal name="볼트 서포터" explain="" />

      {copied && <p>{ }클립보드에 복사되었습니다.</p>}

    </TestContainer>
  );
}
export default Main

const TestContainer = styled.div`
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
const TestButton = styled.button`
background-color: rgba(255, 255, 255, 0);
background-image: url(${Mainbutton3});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgba(255, 255, 255, 1);
  width: 100%;
  height: 100%;
  max-width: 150px; /* 변경된 부분 */
  max-height: 50px; /* 변경된 부분 */
  border: none;
  font-size: 13px;
  font-family: Mabinogi_Classic_TTF;
  &:active {
    filter: brightness(90%); /* 클릭 시 밝기 감소 효과 */
  }
`