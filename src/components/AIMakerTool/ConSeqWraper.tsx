import React, { useState, ChangeEvent, useEffect } from 'react';
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

    //라디오 버튼에서 핸들 체인지를 지속하게 시킬까? 아님 부모단인 여기서 하는 것이 맞을까?
    //라이도 버튼 단에서 코드 수정을 해야할탠데 그러면 이벤트메이커가 꼬일 수 있음
    //일단 여기 것을 바꾸자.
    //04-06-15 아니야 메이커 단에서 핸들체인지를 진행해야해. 이 코드는 쓰지 않을거야
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var val: string[] = [];
        val[0] = sortOrder.toString();
        val[1] = e.target.value;
        val[2] = optionValue;
        val[3] = indexNumThis.toString();

        //컨디션인지 시퀀스인지 따져서 적용시킬 리코일값이 필요해

        console.log(val + "값이 라디오버튼에서 넘어감")
        onChange(val);
        console.log(e.target.value)
        //console.log(customValue)
    };

    const getOptionBool = (value: string[]): boolean => {
        if (value[0] == value[1]) {
            return true
        }
        else {
            return false;
        }
    }


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