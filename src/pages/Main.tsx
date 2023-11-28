import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, sequenceParticle } from '../hooks/AiMakerHook';
import { SequenceType, StringTest } from '../utils/types';

function Main (){
    const [copied, setCopied] = useState(false);
    let StringTest1 : SequenceType = {
      tabNum : 4,
      case : "sequence",
      mainstring: "wait",
      valueString0 : "0",
      valueString1 : "0"}
  
    const handleCopyToClipboard = ( ) => {
      clipboardCopy(sequenceParticle(StringTest1))
        .then(() => {
          setCopied(true);
          console.log(sequenceParticle(StringTest1))
        })
        .catch((error) => {
          console.error('클립보드 복사 오류:', error);
        });
    }
  
    return (
      <div style={{ whiteSpace: 'pre' }}>
        <button onClick={handleCopyToClipboard}>클립보드에 복사</button>
        {copied && <p>'{sequenceParticle(StringTest1)}'가 클립보드에 복사되었습니다.</p>}
      </div>
    );
}
export default Main