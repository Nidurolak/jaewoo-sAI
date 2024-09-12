import React, { useState, ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom, CurrentAIPattern, ExplainModalBool } from '../../store/atom';
import XIconBlue from '../../assets/XIconBlue.png'
import UpIconBlue from '../../assets/UpIconBlue.png'
import PlusIconBlue from '../../assets/PlusIconBlue.png'
import DownIconBlue from '../../assets/DownIconBlue.png'
import Mainbutton3 from '../../assets/MainButton3.png'
import Mainbutton20070 from '../../assets/MainButton20070.png'
import PatternButton from './PatternButton';
import PartternChangeModal from './PatternChangeModal';
import { BackGUI } from '../../utils/types';
import { CheckCurrentChange, GetWidthAndHeight, HandleCopyToClipboardForCustom } from '../../hooks/AiMakerHook';
import _ from 'lodash';
import gen_button_confirm from '../../assets/Sound/gen_button_confirm.wav'
import uuid from 'react-uuid';
import AICopyButton from './AICopyButton';


function AICopyList() {
  const [partternValue, setPatternValue] = useRecoilState(AIPatternArrayAtom);
  const [currentPartternValue, setCurrentPatternValue] = useRecoilState(CurrentAIPattern);
  const [modalBoolValue, setmodalBoolValue] = useRecoilState(ExplainModalBool)
  const [eventArray, setEventArray] = useRecoilState(AIMakingEventArrayAtom);
  const [conditionArray, setConditionArray] = useRecoilState(AIMakingConditionArrayAtom);
  const [sequenceArray, setSequenceArray] = useRecoilState(AIMakingSequenceArrayAtom);
  const arraylength = useRef(0)

  const Confirmsound = useRef(new Audio(gen_button_confirm));
  const handleSoundPlay = () => {
    Confirmsound.current.currentTime = 0;
    Confirmsound.current.play();
  }


  let isChanged = CheckCurrentChange()


  const patternListAdd = () => {
    handleSoundPlay();
    arraylength.current = arraylength.current + 1
    //패턴의 기본 구조는{ key: "패턴명", list: { name: "이벤트명", event: [], condition: [], sequence: [] } }
    const AddVal = { key: `${arraylength.current}번 패턴`, list: { name: `0번 이벤트`, event: ['master_targeted', 'alert'], condition: [], sequence: [] } }
    setPatternValue((prevArray) => [...prevArray, AddVal]);
  }
  const patternListDelete = () => {
    handleSoundPlay();
    if (isChanged == true) {
      setmodalBoolValue(true)
    }
    else if (currentPartternValue.currentIndex < 0) {
      var DelVal = [...partternValue]
      DelVal.splice(partternValue.length - 1, 1)
      setPatternValue([]);
    }
  }

  const cancelPattern = () => {
    handleSoundPlay();
    var DelVal = _.cloneDeep(partternValue)
    setCurrentPatternValue({ currentIndex: -1, name: "" })
    setEventArray(partternValue[currentPartternValue.currentIndex].list.event);
    setConditionArray(partternValue[currentPartternValue.currentIndex].list.condition);
    setSequenceArray(partternValue[currentPartternValue.currentIndex].list.sequence);
  }

  const applyPattern = () => {
    handleSoundPlay();
    var DelVal = _.cloneDeep(partternValue)
    //var DelVal = [...partternValue]

    DelVal[currentPartternValue.currentIndex].key = currentPartternValue.name;
    DelVal[currentPartternValue.currentIndex].list.event = eventArray;
    DelVal[currentPartternValue.currentIndex].list.condition = conditionArray;
    DelVal[currentPartternValue.currentIndex].list.sequence = sequenceArray;


    setCurrentPatternValue({ currentIndex: -1, name: "" })
    setPatternValue(DelVal)
    setEventArray(['master_targeted', 'alert', '']);
    setConditionArray([]);
    setSequenceArray([]);

  }


  useEffect(() => {
    arraylength.current = partternValue.length;
  }, [])
  return (
    <ColummBox>
      <h2>재우's AI 패턴 복사하기</h2>
      <ListContainer>
        <ScrollBox>
          <AICopyButton name={"펫 디펜더"} />
          <AICopyButton name={"주인바라기"} />
          <AICopyButton name={"재우 오리지널"} />
          <AICopyButton name={"로드롤러"} />
          <AICopyButton name={"볼트 서포터"} />
          <AICopyButton name={"전봇대"} />
          <AICopyButton name={"메디이익"} />
          <AICopyButton name={"유도 미사일"} />
          <AICopyButton name={"폭스 헌터"} />
          <AICopyButton name={"기르가쉬 헬퍼"} />
        </ScrollBox>
      </ListContainer>
      <PartternChangeModal apply={applyPattern} cancle={cancelPattern} />
    </ColummBox>)
}

export default AICopyList;

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
  min-height: 540px;
  max-height: 95%;
display: flex;
flex-direction: column;

`

const ScrollBox = styled.div`
display: flex;
flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 540px;
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