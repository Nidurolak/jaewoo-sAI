import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking } from '../hooks/AiMakerHook';
import { StringTest } from '../utils/types';

function Main (){
    const [copied, setCopied] = useState(false);
  
    const handleCopyToClipboard = ( ) => {
      let StringTest1 = {
        tabNum : 21,
        mainString : "MiddleCase"}
      clipboardCopy('asdf')
        .then(() => {
          setCopied(true);
          console.log("as\td\n\tf")
          console.log(copied)
          console.log(AIMaking(StringTest1))
        })
        .catch((error) => {
          console.error('클립보드 복사 오류:', error);
        });
    }
  
    return (
      <div>
        <button onClick={handleCopyToClipboard}>클립보드에 복사</button>
        {copied && <p>'asdf'가 클립보드에 복사되었습니다.</p>}
      </div>
    );
}
export default Main