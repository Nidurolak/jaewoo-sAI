import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conditionParticle, conditionWarper, eventWarper, sequenceParticle, sequenceWarper, totalWarper} from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest } from '../utils/types';

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
      clipboardCopy(totalWarper([eventWarper({name : "와! 샌즈!", mainstring : "master_targeted", valueString0 : "alert",sequence : [sequenceParticle(StringTest1),sequenceParticle(StringTest1)], condition: [conditionParticle(StringTest2)]})]))
        .then(() => {
          setCopied(true);
          console.log(sequenceWarper([sequenceParticle(StringTest1),sequenceParticle(StringTest1)]))
          console.log(conditionWarper([conditionParticle(StringTest2)]))
          console.log(eventWarper({name : "asd", sequence : [sequenceParticle(StringTest1),sequenceParticle(StringTest1)], condition: [conditionParticle(StringTest2)]}))
        })
        .catch((error) => {
          console.error('클립보드 복사 오류:', error);
        });
    }
  
    return (
      <div style={{ whiteSpace: 'pre' }}>
        <button onClick={handleCopyToClipboard}>클립보드에 복사</button>
        {copied && <p>{totalWarper([eventWarper({name : "와! 샌즈!", mainstring : "master_targeted", valueString0 : "alert",sequence : [sequenceParticle(StringTest1),sequenceParticle(StringTest1)], condition: [conditionParticle(StringTest2)]})])}'가 클립보드에 복사되었습니다.</p>}
      </div>
    );
}
export default Main