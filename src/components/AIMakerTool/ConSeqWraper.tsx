import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom, AIMakingSequenceArrayAtom } from '../../store/atom';

interface WraperBoxProps {
    value: string[];
    width: number;
    sortOrder: number;
    optionValue: string;
    indexNum?: number;
    isCondition?: boolean;
    onChange: (value: string[]) => void;
}

//이벤트 메이커랑 아주 비슷하게 만들어야 할거야.
function ConSeqWraper({ width, optionValue, value, sortOrder, indexNum, isCondition, onChange }: WraperBoxProps) {

    const [conditionLsit, setConditionList] = useRecoilState(AIMakingConditionArrayAtom)
    const [sequenceLsit, setSequenceList] = useRecoilState(AIMakingSequenceArrayAtom)

    var indexNumThis = indexNum != undefined ? indexNum : 0

    //useMemo 추가하고 관련값 끼워넣기
    useMemo(() => {
        console.log(eventSelectedValue)
        console.log(firstRadio)
        console.log(secondRadio)
        console.log(thirdRadio)
        switch (eventSelectedValue[0]) {
            case 'master': setFirstRadio(["0", "master", "1", "", ""]); break;
            case 'pet': setFirstRadio(["0", "pet", "1", "", ""]); break;
        }
        switch (eventSelectedValue[1]) {
            //[width, optionValue, sortOrder, h3 전열 , h3 후열] 순으로 배열 생성
            case 'master_targeted': setSecondRadio(["0", "master_targeted", "2", "적에게", ""]); setThirdRadio([]); break;
            case 'targeted': setSecondRadio(["0", "targeted", "2", "적에게", ""]); setThirdRadio([]); break;
            case 'master_attacked': setSecondRadio(["0", "master_attacked", "2", "", "(으)로 적에게"]); setThirdRadio(["0", "master_attacked", "3", "그리고", ""]); break;
            case 'attacked': setSecondRadio(["0", "attacked", "2", "적에게"]); setThirdRadio(["0", "attacked", "3", "그리고"]); break;
            case 'master_defence': setSecondRadio(["0", "master_defence", "2"]); setThirdRadio([]); break;
            case 'defence': setSecondRadio(["0", "defence", "2"]); setThirdRadio([]); break;
            case 'attack': setSecondRadio(["0", "attack", "2", "", "을 사용해"]); setThirdRadio(["0", "attack", "3", "그리고", ""]); break;
            case 'master_attack': setSecondRadio(["0", "master_attack", "2", "", "을 사용해"]); setThirdRadio([]); break;
            case 'master_skill_prepare': setSecondRadio(["0", "master_skill_prepare", "2", "", ""]); setThirdRadio([]); break;
            case 'master_target_magic_prepare': setSecondRadio([]); setThirdRadio([]); break;
            case 'target_magic_prepare': setSecondRadio([]); setThirdRadio([]); break;
            case 'master_target_skill_prepare': setSecondRadio([]); setThirdRadio([]); break;
            case 'target_skill_prepare': setSecondRadio([]); setThirdRadio([]); break;
            case 'aimed': setSecondRadio([]); setThirdRadio([]); break;
            case 'master_aimed': setSecondRadio([]); setThirdRadio([]); break;
            case 'seek_target': setSecondRadio([]); setThirdRadio([]); break;
            case 'now_targeting': setSecondRadio([]); setThirdRadio([]); break;
        }

    }, [eventSelectedValue])

    return (<RowBox>
        {isCondition
            ? <SelectButton optionValue={''} width={100} sortOrder={0} value={conditionLsit[indexNumThis]} onChange={onChange}></SelectButton>
            : null}

    </RowBox>)
}

export default ConSeqWraper;

const RowBox = styled.div`
align-items: flex-start;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 10px; 
width: 100%;
flex-wrap: wrap;
`

const BoxTextWraper = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 3px;
h3 {
    white-space: nowrap;
} 
`