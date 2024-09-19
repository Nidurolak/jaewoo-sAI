import React from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { AIMakerExplainModalBool, CurrentAIPattern } from '../store/atom';
import PatternEditer from './AIMakerTool/PatternEditer';
import PatternListMaker from './AIMakerTool/PatternListMaker';
import AIListExplainModal from './AIListExplainModal';
import AICopyList from './AIMakerTool/AICopyList';
import CopySuccessModal from './AIMakerTool/AIMakerToolModal/CopySuccessModal';
import FirstPopupModal from './AIMakerTool/AIMakerToolModal/FirstPopupModal';

function AIMaker() {
  const [AIMakerexplainModalBool, setAIMakerexplainModalBool] = useRecoilState(AIMakerExplainModalBool);
  const patternIndex = useRecoilValue(CurrentAIPattern)
  const handleCloseModal = (e: React.MouseEvent) => {
    if (e.currentTarget !== e.target) {
      e.stopPropagation();
      return;
    }
    if (patternIndex.currentIndex < 0) {
      setAIMakerexplainModalBool(false);
    }
  };
  const handleChildClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };


  return (<>
    {AIMakerexplainModalBool == true &&
      <Container onClick={handleCloseModal}>
        <TotalBox onClick={handleChildClick}>
          <LeftBox>
            <PatternListMaker />

          </LeftBox>
          <MiddleBox>
            <PatternEditer />
            {patternIndex.currentIndex == -1 ? <Cover><h1>패턴을 선택해야 합니다.</h1></Cover> : null}
          </MiddleBox>
          <RightBox>
            <AICopyList></AICopyList>
          </RightBox>
        </TotalBox>
        <AIListExplainModal />
        <CopySuccessModal />
        <FirstPopupModal />
      </Container>}
  </>)
}
/*
          <h1>준비 중!</h1>
          <WhiteLine></WhiteLine>
          <h2>재우's AI에 사용되는 패턴을 기반으로 자신 만의 AI를 만들 수 있는 방법을 구상 중입니다. 기대해주세요!</h2>*/
export default AIMaker;

const Cover = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  border-radius: 7px;
  flex-direction: column; 
  justify-content: center;
  align-items: center;
  cursor: default;
  background-color: rgba(0, 0, 0, 0.7);
`;

const LeftBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 400px;
  height: 900px;
  max-height: 95%;
`

const MiddleBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 800px;
  height: 900px;
  max-height: 95%;
`

const RightBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  max-width: 400px;
  height: 900px;
  max-height: 95%;
`

const TotalBox = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 15px;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: rgba(255, 255, 255, 0);
  background-image: url(${Mainbutton800400});
  background: url(${Mainbutton800400});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: fit-content;
  height: 90vh; 
  min-width: 1200px;
  min-height: 800px;
  border: none;
  font-size: 17px;
  font-family: 'Mabinogi_Classic_TTF';
  @media (max-width: 1400px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding: 20px;
    min-width: 900px;
    min-height: 400px;
    height: 90%;
    overflow-y: scroll;
    &::-webkit-scrollbar {width: 11px;}
    &::-webkit-scrollbar-track {background: none;}
    &::-webkit-scrollbar-thumb {background: rgb(25, 76, 138);border-radius: 3px;}
    &::-webkit-scrollbar-thumb:hover {background: rgb(111, 195, 226);}
  }
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
  font-family: 'Mabinogi_Classic_TTF';}

  h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 45px;font-family: 'Mabinogi_Classic_TTF';}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: 'Mabinogi_Classic_TTF';}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 15px; font-family: 'Mabinogi_Classic_TTF'; white-space: pre-wrap;}
`