import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingSequenceArrayAtom } from '../../store/atom';

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

    const [listValue, setListValue] = useRecoilState(isCondition ? AIMakingConditionArrayAtom : AIMakingSequenceArrayAtom)

    var indexNumThis = indexNum != undefined ? indexNum : 0
    console.log(indexNumThis)

    const [conFirstRadio, setConfirstRadio] = useState<string[]>(isCondition ? listValue[indexNumThis][0] ? [listValue[indexNumThis][0]] : [] : listValue[indexNumThis][0] ? [listValue[indexNumThis][0]] : []);
    const [conSecondRadio, setConSecondRadio] = useState<string[]>(isCondition ? listValue[indexNumThis][1] ? [listValue[indexNumThis][1]] : [] : listValue[indexNumThis][1] ? [listValue[indexNumThis][1]] : []);
    const [conThirdRadio, setConThirdRadio] = useState<string[]>(isCondition ? listValue[indexNumThis][2] ? [listValue[indexNumThis][2]] : [] : listValue[indexNumThis][2] ? [listValue[indexNumThis][2]] : []);
    const [conFourthRadio, setConFourthRadio] = useState<string[]>(isCondition ? listValue[indexNumThis][2] ? [listValue[indexNumThis][3]] : [] : listValue[indexNumThis][3] ? [listValue[indexNumThis][3]] : []);

    useEffect(() => {
        console.log("수정발동")
        console.log(listValue[indexNumThis])
        switch (listValue[indexNumThis][0]) {
            //[width, optionValue, sortOrder, h3 전열 , h3 후열] 순으로 배열 생성
            case 'target_state': setConfirstRadio(["0", "target_state", "1", "= ", "인 경우"]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;//
            case 'target_distance': setConfirstRadio(["0", "target_distance", "1", "= ", "이상"]); setConSecondRadio(["0", "target_distance", "2", "", "이하"]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'skill_preparable': setConfirstRadio(["0", "skill_preparable", "1", "= ", ""]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'ST_preparable': setConfirstRadio(["0", "ST_preparable", "1", "= ", ""]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'EQ_preparable': setConfirstRadio(["0", "EQ_preparable", "1", "= ", ""]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'master_damaged_life_greater': setConfirstRadio(["0", "master_damaged_life_greater", "1", "=", "이상"]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;

            case 'wait': setConfirstRadio(["0", "wait", "1", "=", "이상"]); setConSecondRadio(["0", "wait", "2", "", "미만"]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'move_against': setConfirstRadio(["0", "move_against", "1", "=", "가 될 때 까지"]); setConSecondRadio(["0", "move_against", "2", "", "로 도망"]); setConThirdRadio(["0", "move_against", "3", "제한 시간 :", ""]); setConFourthRadio([]); break;
            case 'chase': setConfirstRadio(["0", "chase", "1", "=", "을"]); setConSecondRadio(["0", "chase", "2", "", "추적함,"]); setConThirdRadio(["0", "chase", "3", "제한 시간 :", ""]); setConFourthRadio([]); break;
            case 'move_around': setConfirstRadio(["0", "move_around", "1", "=", "이상"]); setConSecondRadio(["0", "move_around", "2", "", "방향으로"]); setConThirdRadio(["0", "move_around", "3", "", ""]); setConFourthRadio(["0", "move_around", "4", "제한 시간 :", ""]); break;
            case 'melee_attack': setConfirstRadio(["0", "melee_attack", "1", "=", "이상"]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'stackmagic_attack': setConfirstRadio(["0", "stackmagic_attack", "1", "=", "를"]); setConSecondRadio(["0", "stackmagic_attack", "3", "", "차지 후 공격"]); setConThirdRadio(["0", "stackmagic_attack", "2", "제한 시간 :", ""]); setConFourthRadio([]); break;
            case 'prepare_skill': setConfirstRadio(["0", "prepare_skill", "1", "=", "을(를)"]); setConSecondRadio(["0", "prepare_skill", "2", "", "까지 재시도"]); setConThirdRadio(["0", "prepare_skill", "3", "제한 시간 :", ""]); setConFourthRadio([]); break;
            case 'stack_skill': setConfirstRadio(["0", "stack_skill", "1", "=", "을(를)"]); setConSecondRadio(["0", "stack_skill", "2", "", "차지"]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'process_skill': setConfirstRadio(["0", "process_skill", "1", "=", "이상"]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'cancel_skill': setConfirstRadio([]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'skill_relax': setConfirstRadio(["0", "skill_relax", "1", "=", "을(를)"]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'PetST_skill': setConfirstRadio(["0", "PetST_skill", "1", "=", "이상"]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;
            case 'PetEQ_skill': setConfirstRadio(["0", "PetEQ_skill", "1", "=", "이상"]); setConSecondRadio([]); setConThirdRadio([]); setConFourthRadio([]); break;
        }

    }, [listValue])

    //널 자리에 채워야해 시퀸스
    return (<RowBox>
        {isCondition
            ? <SelectButton optionValue={'condition'} width={0} sortOrder={0} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
            : <SelectButton optionValue={'sequence'} width={0} sortOrder={0} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>}

        {/*State 통합으로 컨디션인지 체크는 여기서 무의미*/conFirstRadio.length > 1
            ? <BoxTextWraper>
                {conFirstRadio[3] != '' ? <h3>{conFirstRadio[3]}</h3> : null}
                <SelectButton width={parseInt(conFirstRadio[0])} optionValue={conFirstRadio[1]} sortOrder={parseInt(conFirstRadio[2])} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                {conFirstRadio[4] != '' ? <h3>{conFirstRadio[4]}</h3> : null}
            </BoxTextWraper>
            : null}


        {conSecondRadio.length > 1
            ? <BoxTextWraper>
                {conSecondRadio[3] != '' ? <h3>{conSecondRadio[3]}</h3> : null}
                <SelectButton width={parseInt(conSecondRadio[0])} optionValue={conSecondRadio[1]} sortOrder={parseInt(conSecondRadio[2])} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                {conSecondRadio[4] != '' ? <h3>{conSecondRadio[4]}</h3> : null}
            </BoxTextWraper>
            : null}

        {conThirdRadio.length > 1
            ? <BoxTextWraper>
                {conThirdRadio[3] != '' ? <h3>{conThirdRadio[3]}</h3> : null}
                <SelectButton width={parseInt(conThirdRadio[0])} optionValue={conThirdRadio[1]} sortOrder={parseInt(conThirdRadio[2])} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                {conThirdRadio[4] != '' ? <h3>{conThirdRadio[4]}</h3> : null}
            </BoxTextWraper>
            : null}


        {conFourthRadio.length > 1
            ? <BoxTextWraper>
                {conFourthRadio[3] != '' ? <h3>{conFourthRadio[3]}</h3> : null}
                <SelectButton width={parseInt(conFourthRadio[0])} optionValue={conFourthRadio[1]} sortOrder={parseInt(conFourthRadio[2])} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                {conFourthRadio[4] != '' ? <h3>{conFourthRadio[4]}</h3> : null}
            </BoxTextWraper>
            : null}
        {indexNumThis < listValue.length - 1
            ? <h4>그리고</h4>
            : null}
    </RowBox>)
}
//인덱스 길이 체크해서 그리고 글자 넣기
export default ConSeqWraper;

const RowBox = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 10px; 
width: 100%;
flex-wrap: wrap;
text-align: center;
h4 {color: white; font-weight: 250; font-size: 17px; font-family: 'Mabinogi_Classic_TTF';}

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