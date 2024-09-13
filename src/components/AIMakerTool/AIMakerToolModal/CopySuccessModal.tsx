import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from "recoil";
import { CurrentAIName, DownloadModalBool, DownloadModalCopyBool, SuccessModalSet } from '../../../store/atom';

//TS2559: Type '{ children: never[]; }' has no properties in common with type 'IntrinsicAttributes'.
//위 에러 발생, 컴포넌트 전달에 있어 에러 발생으로 추측. GPT 등은 프롭스를 넘기라고 하지만 나는 고정위치에 모달창 생성을 고정시킴으로 해결볼 생각
//function SuccessModal({ children }: { children?: any }) {


function CopySuccessModal() {

  const [downloadModalCopyBool, setdownloadModalCopyBool] = useRecoilState(DownloadModalCopyBool)


  const CloseModal = (e: React.MouseEvent<HTMLDivElement>) => {
    setdownloadModalCopyBool(false)
    e.stopPropagation();
  }
  return (<>{downloadModalCopyBool === true && (
    <Container onClick={CloseModal}>
      <BoxContainer>
        <h2>복사 성공!</h2>

        <span className='yellow-text'>직접 만든  AI</span>



      </BoxContainer>
    </Container>
  )}</>);
}

export default CopySuccessModal;

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

  h2 {font-size: inherit;font-family: 'Mabinogi_Classic_TTF';}
  h3 {font-weight: 300;font-size: 15px;font-family: 'Mabinogi_Classic_TTF';}
`
const BoxContainer = styled.div`
  display: flex;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 400px;
  height: 220px;
  background-color: rgb(81, 165, 196);
  border: 3px solid white;
  line-height: 1.5;
  border-radius: 7px;
  span.yellow-text {
  font-size: 25px;
    color: rgba(255, 255, 0, 1);
    text-shadow: 1px 1px 0 black; /* 텍스트 주변에 검은색 테두리 효과 */
  }
`