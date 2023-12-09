import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conditionParticle, conditionWarper, eventWarper, sequenceParticle, sequenceWarper, totalWarper} from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest } from '../utils/types';
import { Pet_Missile } from '../components/AISequenceTool';

function Main (){
    const [copied, setCopied] = useState(false);
    let StringTest1 : SequenceType = {
      tabNum : 4,
      case : "sequence",
      mainstring: "wait",
      valueString0 : "0",
      valueString1 : "0"}
      let StringTest2 : ConditionType = {
        tabNum : 4,
        case : "condition",
        mainstring: "ST_preparable",
        valueString0 : "PetSTDamageUp",
        valueString1 : "0"}
    
  
    const handleCopyToClipboard = ( ) => {
      clipboardCopy(
        totalWarper(
          [eventWarper({name : "와! 샌즈!", mainstring : "master_targeted", valueString0 : "alert",sequence : [sequenceParticle(StringTest1),sequenceParticle(StringTest1)], condition: [conditionParticle(StringTest2)]}), eventWarper({name : "와! 샌즈!", mainstring : "master_targeted", valueString0 : "alert",sequence : [sequenceParticle(StringTest1),sequenceParticle(StringTest1)], condition: [conditionParticle(StringTest2)]})]))
        .then(() => {
          setCopied(true);})
        .catch((error) => {
          console.error('클립보드 복사 오류:', error);
        });
    }
    const handleCopyToClipboardTest = ( ) => {
      clipboardCopy(
        totalWarper(
          [Pet_Missile()]))
        .then(() => {
          setCopied(true);})
        .catch((error) => {
          console.error('클립보드 복사 오류:', error);
        });
    }
  
    return (
      <TestButtonContainer>

        <button onClick={handleCopyToClipboard}>클립보드에 복사</button>
        <button onClick={handleCopyToClipboardTest}>펫 디펜더 클립보드에 복사</button>
        {copied && <p>{totalWarper([eventWarper({name : "와! 샌즈!", mainstring : "master_targeted", valueString0 : "alert",sequence : [sequenceParticle(StringTest1),sequenceParticle(StringTest1)], condition: [conditionParticle(StringTest2)]})])}'가 클립보드에 복사되었습니다.</p>}

      </TestButtonContainer>
    );
}
export default Main

const TestButtonContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
height: 100vh;
margin: 0 auto;
gap: 10px;
white-space: pre;
background-color: ivory;
`