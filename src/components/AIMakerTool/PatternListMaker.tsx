import React, { useState, ChangeEvent, useEffect, useMemo, useRef } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './AIMakerButton/RadioButton';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom, CurrentAIPattern, DownloadModalCopyBool, ExplainModalBool } from '../../store/atom';
import XIconBlue from '../../assets/XIconBlue.webp'
import UpIconBlue from '../../assets/UpIconBlue.webp'
import PlusIconBlue from '../../assets/PlusIconBlue.webp'
import DownIconBlue from '../../assets/DownIconBlue.webp'
import Mainbutton3 from '../../assets/MainButton3.webp'
import Mainbutton20070 from '../../assets/MainButton20070.webp'
import PatternButton from './AIMakerButton/PatternButton';
import PartternChangeModal from './AIMakerToolModal/PatternChangeModal';
import { BackGUI } from '../../utils/types';
import { ApplyPattern, CheckCurrentChange, GetWidthAndHeight, HandleCopyToClipboardForCustom } from '../../hooks/AiMakerHook';
import _ from 'lodash';
import gen_button_confirm from '../../assets/Sound/gen_button_confirm.wav'
import uuid from 'react-uuid';


function PatternListMaker() {
  const [partternValue, setPatternValue] = useRecoilState(AIPatternArrayAtom);
  const [currentPartternValue, setCurrentPatternValue] = useRecoilState(CurrentAIPattern);
  const [modalBoolValue, setmodalBoolValue] = useRecoilState(ExplainModalBool)
  const [eventArray, setEventArray] = useRecoilState(AIMakingEventArrayAtom);
  const [conditionArray, setConditionArray] = useRecoilState(AIMakingConditionArrayAtom);
  const [sequenceArray, setSequenceArray] = useRecoilState(AIMakingSequenceArrayAtom);
  const [downloadModalCopyBool, setdownloadModalCopyBool] = useRecoilState(DownloadModalCopyBool)

  const arraylength = useRef(0)

  const Confirmsound = useRef(new Audio(gen_button_confirm));
  const handleSoundPlay = () => {
    Confirmsound.current.currentTime = 0;
    Confirmsound.current.play();
  }

  const CopyClick = () => {
    HandleCopyToClipboardForCustom(partternValue, setdownloadModalCopyBool)
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
      <h2>패턴 목록</h2>
      <ListContainer>
        <ScrollBox>
          {partternValue.map((Option, index) => (<PatternButton key={Option.key + ((index + 1) * (index + 1))} indexNum={index} optionValue={Option.key != "" ? Option.key : "-이름없는 패턴"}></PatternButton>))}
        </ScrollBox>
        {currentPartternValue.currentIndex > -1 ?
          <RowBox>
            <ConditionButton backgroundImage={Mainbutton3} type='small' onClick={isChanged ? () => setmodalBoolValue(true) : cancelPattern}>적용</ConditionButton>
            <ConditionButton backgroundImage={Mainbutton3} type='small' onClick={() => setmodalBoolValue(true)} disabled={isChanged == false} >취소</ConditionButton>
          </RowBox> :
          <RowBox>
            <ConditionButton backgroundImage={Mainbutton3} type='small' onClick={patternListAdd}>추가</ConditionButton>
            <ConditionButton backgroundImage={Mainbutton3} type='small' onClick={patternListDelete} disabled={partternValue.length < 1}>초기화</ConditionButton>
          </RowBox>}
        <BottomButtonBox>
          <ConditionButton backgroundImage={Mainbutton20070} type='xlarge' onClick={CopyClick} disabled={isChanged}>코드로 복사하기</ConditionButton>
        </BottomButtonBox>
      </ListContainer>
      <PartternChangeModal apply={applyPattern} cancle={cancelPattern} />
    </ColummBox>)
}

export default PatternListMaker;

const BottomButtonBox = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
  padding-top: 10px;
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

const ConditionButton = styled.button<BackGUI>`
  background-color: rgba(255, 255, 255, 0);
  background-image: ${({ backgroundImage }) => `url(${backgroundImage})`};
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: ${(props) => GetWidthAndHeight(props).width};
  height: ${(props) => GetWidthAndHeight(props).height};
  border: none;
  font-size: 17px;
  font-family: 'Mabinogi_Classic_TTF';
  cursor: pointer;
  &:hover{filter: brightness(110%);}
  &:active {filter: brightness(120%);}
  ${({ disabled }) =>
    disabled &&
    `
      filter: grayscale(100%);
      cursor: not-allowed;
      opacity: 0.6;
      pointer-events: none;
  `}
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
  min-height: 540px;
  max-height: 95%;
  display: flex;
  flex-direction: column;
  @media (max-width: 1400px),(max-height: 700px) {
    min-height: 440px;
  }
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

  @media (max-width: 1400px) {
    max-height: 300px;
  }
  &::-webkit-scrollbar {width: 11px;}
  &::-webkit-scrollbar-track {background: none;}
  &::-webkit-scrollbar-thumb {background: rgb(25, 76, 138);border-radius: 3px;}
  &::-webkit-scrollbar-thumb:hover {background: rgb(111, 195, 226);}

`