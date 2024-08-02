import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom, CurrentAIPattern, ExplainModalBool } from '../../store/atom';
import XIconBlue from '../../assets/XIconBlue.png'
import UpIconBlue from '../../assets/UpIconBlue.png'
import PlusIconBlue from '../../assets/PlusIconBlue.png'
import DownIconBlue from '../../assets/DownIconBlue.png'
import Mainbutton3 from '../../assets/MainButton3.png'
import PatternButton from './PatternButton';
import PartternChangeModal from './PatternChangeModal';
import { BackGUI } from '../../utils/types';
import { CheckCurrentChange } from '../../hooks/AiMakerHook';


function PatternListMaker() {
  const [partternValue, setPatternValue] = useRecoilState(AIPatternArrayAtom);
  const [currentPartternValue, setCurrentPatternValue] = useRecoilState(CurrentAIPattern);
  const [modalBoolValue, setmodalBoolValue] = useRecoilState(ExplainModalBool)

  let isChanged = CheckCurrentChange()

  const patternListAdd = () => {
    //패턴의 기본 구조는{ key: "패턴명", list: { name: "이벤트명", event: [], condition: [], sequence: [] } }
    const AddVal = { key: `${partternValue.length + 1}번 패턴`, list: { name: `0번 이벤트`, event: [], condition: [], sequence: [] } }
    setPatternValue((prevArray) => [...prevArray, AddVal]);
    console.log(partternValue)
  }
  const patternListDelete = () => {
    if (isChanged == true) {
      setmodalBoolValue(true)
    }
    else if (currentPartternValue.currentIndex < 0) {
      var DelVal = [...partternValue]
      DelVal.splice(partternValue.length - 1, 1)
      setPatternValue([]);
      console.log(DelVal)
    }
  }

  const cancelPattern = () => {

  }

  return (
    <ColummBox>
      <h2>패턴 목록</h2>
      <ListContainer>
        <ScrollBox>
          {partternValue.map((Option, index) => (<PatternButton key={Option.key + index} indexNum={index} optionValue={Option.key != "" ? Option.key : "-이름없는 패턴"}></PatternButton>))}
        </ScrollBox>
        {isChanged ?
          <RowBox>
            <ConditionButton type='small' onClick={patternListAdd}>적용</ConditionButton>
            <ConditionButton type='small' onClick={patternListDelete} disabled={partternValue.length < 1}>취소</ConditionButton>
          </RowBox> :
          <RowBox>
            <ConditionButton type='small' onClick={patternListAdd}>추가</ConditionButton>
            <ConditionButton type='small' onClick={patternListDelete} disabled={partternValue.length < 1}>초기화</ConditionButton>
          </RowBox>}
      </ListContainer>
      <PartternChangeModal />

    </ColummBox>)
}

export default PatternListMaker;

const RowBox = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: center;
width: 100%;
padding-top: 15px;
gap: 10px;
`

const ConditionButton = styled.button<BackGUI>`
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
const ColummBox = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start; 
justify-content: flex-start;
gap: 10px; 
width: 380px;
margin-top: 10px;

h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 45px;font-family: 'Mabinogi_Classic_TTF';}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: 'Mabinogi_Classic_TTF'; font-weight:500;}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 13px; font-family: 'Mabinogi_Classic_TTF'; white-space: pre-wrap;}

`

const ListContainer = styled.div`
    background-color: rgb(81, 165, 196);
    padding: 10px;
    border-radius: 7px;
    border: 2px solid rgb(25, 76, 138);
  width: 100%;
  max-width: 400px;
display: flex;
flex-direction: column;

`

const ScrollBox = styled.div`
display: flex;
flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 200px;
  max-height: 100%;
  overflow-y: scroll;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 11px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(25, 76, 138);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(111, 195, 226);
  }

`