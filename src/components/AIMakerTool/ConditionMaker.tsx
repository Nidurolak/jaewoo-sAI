import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import exp from 'constants';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom } from '../../store/atom';
import ConSeqWraper from './ConSeqWraper';

function ConditionMaker() {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [conditionSelectedValue, setConditionSelectedValue] = useRecoilState(AIMakingConditionArrayAtom);


    //구분값은 하단의 wraper 클래스에서 담당할 것. 여기는 단순한 포장 컴포넌트가 될 것임
    //스위치 따라 값 바꿔야하는거 아냐?
    const handleSelectChange = (value: string[]) => {
        //setSelectedValue(value);
        var val = [...conditionSelectedValue]

        console.log(conditionSelectedValue[parseInt(value[3])] + "이 바뀌기 전의 값, " + value + "가 넘어옴 배열값, " + value[1] + "의 값이 라디오값으로 넘어옴, " + value[0] + "이 소트오더로 넘어옴")

        setConditionSelectedValue((prevArray) => {
            var val = [...prevArray];
            //컨디션 값이 바뀌었다면 초기화된 후열 값을 바꿔야한다.
            if (value[2] == 'condition') {
                console.log("adsasd")
            }
            //val[parseInt(value[3])] = [...val[parseInt(value[0])]];
            //val[parseInt(value[3])][parseInt(value[0])] = value[1];
            val[parseInt(value[3])] = [...val[parseInt(value[3])]];
            val[parseInt(value[3])][parseInt(value[0])] = value[1]
            console.log(val[parseInt(value[3])][parseInt(value[0])])
            return val
        })
        //인덱스넘 넘어옴, 이걸로 조립해야함
    };

    const conListAdd = () => {
        const AddVal = ["target_state", "walk"]
        setConditionSelectedValue((prevArray) => [...prevArray, AddVal]);
        console.log(conditionSelectedValue)
    }
    const conListDelete = (indexToRemove: number) => {
        var DelVal = [...conditionSelectedValue]
        DelVal.splice(conditionSelectedValue.length - 1, 1)
        setConditionSelectedValue(DelVal);
        console.log(DelVal)
    }

    useEffect(() => {
        console.log(conditionSelectedValue)
    }, [conditionSelectedValue])

    return (<>
        {/*소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션)*/}
        {conditionSelectedValue.map((option, index) => (
            <ConSeqWraper key={index + "con"} width={0} optionValue={''} value={conditionSelectedValue[index]} sortOrder={0} indexNum={index} isCondition={true} onChange={handleSelectChange} ></ConSeqWraper>))}
        <RowBox>
            <TestButton onClick={conListAdd}>추가</TestButton>
            <TestButton onClick={() => conListDelete(conditionSelectedValue.length - 1)} disabled={conditionSelectedValue.length < 1}>삭제</TestButton>
        </RowBox></>)
}

export default ConditionMaker

const TestButton = styled.button`
    width: 150px;
    height: 30px;
    background-color: lavender;
    margin-bottom: 10px;
`
const TestBox = styled.div`
    width: 100px;
    height: 40px;
    background-color: gray;
    margin-bottom: 10px;
`

const RowBox = styled.div`
align-items: flex-end;
display: flex;
flex-direction: row;
justify-content: flex-start;
width: 100%;
gap: 10px;
`
