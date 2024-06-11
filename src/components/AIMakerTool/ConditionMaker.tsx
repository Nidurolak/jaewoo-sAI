import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import exp from 'constants';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom } from '../../store/atom';

function ConditionMaker() {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [conditionSelectedValue, setConditionSelectedValue] = useRecoilState(AIMakingConditionArrayAtom);


    //여기서 구분하는 값을 추가할 것
    const handleSelectChange = (value: string[[]]) => {
        //setSelectedValue(value);
        console.log(conditionSelectedValue + "이 바뀌기 전의 값, " + value + "가 넘어옴 배열값, " + value[1] + "의 값이 라디오값으로 넘어옴, " + value[0] + "이 소트오더로 넘어옴")
        /*switch (x) {
            case 0: newValue[0] = value[1]; break;
            case 1: newValue[1] = value[1]; break;
            case 2: newValue[2] = value[1]; break;
            case 3: newValue[3] = value[1]; break;
        }*/



    };

    useEffect(() => {
        console.log(eventSelectedValue)
    }, [eventSelectedValue])

    return (
        <RowBox>
            {/*소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션)*/}
            {/*주인/펫 체크 버튼, 1순위 버튼*/}

        </RowBox>)
}

export default ConditionMaker

const RowBox = styled.div`
align-items: flex-end;
display: flex;
flex-direction: row;
justify-content: flex-start;
width: 100%;
gap: 10px;
`
