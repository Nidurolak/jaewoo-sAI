import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { ExplainModalBool, AIMakingConditionArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom, CurrentAIPattern } from '../../store/atom';
import XIconBlue from '../../assets/XIconBlue.png'
import UpIconBlue from '../../assets/UpIconBlue.png'
import PlusIconBlue from '../../assets/PlusIconBlue.png'
import DownIconBlue from '../../assets/DownIconBlue.png'
import Mainbutton3 from '../../assets/MainButton3.png'

import { BoxProps, ChangeFunc } from '../../utils/types';
import { CheckCurrentChange, CheckWhatChanged } from '../../hooks/AiMakerHook';
import Mainbutton800400 from '../../assets/MainButton800400.png'
import { isEqual } from 'lodash';


function PartternChangeModal(props: ChangeFunc) {
  //이중체크를 해야해. 부모 컴포넌트에서 이스체인지를, 여기서 모달 스테이트를 
  const [modalBoolValue, setmodalBoolValue] = useRecoilState(ExplainModalBool)

  //console.log(modalBoolValue)

  const CloseModal = () => {
    setmodalBoolValue(false)
  }

  const keyChanged = CheckWhatChanged("key")
  const eventChanged = CheckWhatChanged("event")
  const conditonChanged = CheckWhatChanged("condition")
  const sequenceChanged = CheckWhatChanged("sequence")

  //패턴 리스트값 받아서 문제있음 고쳐야해
  return (
    <>
      {(modalBoolValue) === true && (
        <Container>

          <QNABox2MiddleBox onClick={CloseModal}>
            <h1>변경사항이 감지되었습니다.</h1>
            <h2>정말 바꾸시겠습니까?</h2>
            {keyChanged ? <h2>-제목 변경됨</h2> : null}
            {eventChanged ? <h2>-상황 변경됨</h2> : null}
            {conditonChanged ? <h2>-조건 변경됨</h2> : null}
            {sequenceChanged ? <h2>-행동 변경됨</h2> : null}
            <RowBox>
              <ChangeButton onClick={props.apply}>변경하기</ChangeButton>
              <ChangeButton onClick={props.cancle}>취소하기</ChangeButton>

            </RowBox>
          </QNABox2MiddleBox>
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
background-color: rgba(0, 0, 0, 0.3);
z-index: 1000;
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
justify-content: flex-start;
flex-direction: column;
align-items: center;
width: 800px;
height: 400px;
background-image: url(${Mainbutton800400});
background: url(${Mainbutton800400});
background-position: center;
background-repeat: no-repeat;
padding-top: 40px;
gap: 7px;
  h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 45px;font-family: 'Mabinogi_Classic_TTF';}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: 'Mabinogi_Classic_TTF'; font-weight:500;}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 13px; font-family: 'Mabinogi_Classic_TTF'; white-space: pre-wrap;}

`
const RowBox = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: center;
width: 100%;
padding-top: 15px;
gap: 10px;
`
const ChangeButton = styled.button`
background-color: rgba(255, 255, 255, 0);
background-image: url(${Mainbutton3});
background: url(${Mainbutton3});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 120px;
  height: 30px;
  border: none;
  font-size: 17px;
  font-family: 'Mabinogi_Classic_TTF';
  cursor: pointer;
  &:hover{
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(120%); /* 클릭 시 밝기 감소 효과 */
  }
`