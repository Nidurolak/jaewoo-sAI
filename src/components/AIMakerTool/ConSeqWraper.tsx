import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom } from '../../store/atom';

interface WraperBoxProps {
    value: string[];
    width: number;
    sortOrder: number;
    optionValue: string;
    indexNum?: number;
    onChange: (value: string[]) => void;
}

//이벤트 메이커랑 아주 비슷하게 만들어야 할거야.
function ConSeqWraper({ width, optionValue, value, sortOrder, indexNum, onChange }: WraperBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var val: string[] = [];
        val[0] = sortOrder.toString();
        val[1] = e.target.value;
        val[2] = optionValue;
        if (indexNum != undefined) {
            val[3] = indexNum.toString();
        }

        console.log(val + "값이 라디오버튼에서 넘어감")
        onChange(val);
        console.log(e.target.value)
        //console.log(customValue)
    };


    return (<>

    </>)
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