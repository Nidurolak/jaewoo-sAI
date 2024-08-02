import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { ExplainModalBool, AIMakingConditionArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom, CurrentAIPattern } from '../../store/atom';
import XIconBlue from '../../assets/XIconBlue.png'
import UpIconBlue from '../../assets/UpIconBlue.png'
import PlusIconBlue from '../../assets/PlusIconBlue.png'
import DownIconBlue from '../../assets/DownIconBlue.png'
import { BoxProps } from '../../utils/types';
import { CheckCurrentChange } from '../../hooks/AiMakerHook';

function PartternChangeModal() {
  //이중체크를 해야해. 부모 컴포넌트에서 이스체인지를, 여기서 모달 스테이트를 
  const [modalBoolValue, setmodalBoolValue] = useRecoilState(ExplainModalBool)

  console.log(modalBoolValue)

  const CloseModal = () => {
    setmodalBoolValue(false)
  }

  //패턴 리스트값 받아서 문제있음 고쳐야해
  return (
    <>
      {(modalBoolValue) === true && (
        <Container onClick={CloseModal}>

          <QNABox2MiddleBox></QNABox2MiddleBox>
        </Container>)}

    </>
  )
}

export default PartternChangeModal;



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
background-color: rgba(255, 255, 255, 1);
& > * {
  color: rgba(255, 255, 255, 1);
  font-size: 23px;
  font-family: 'Mabinogi_Classic_TTF';}

  h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 30px;font-family: inherit;}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: inherit;}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 15px; font-family: inherit; white-space: pre-wrap;}
`
const QNABox2MiddleBox = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
align-items: flex-start;
width: 100%;
height: 100%;
background-color: wheat;
padding-top: 40px;
`