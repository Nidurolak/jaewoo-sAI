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

/*
    const conditonPreparableSkillOption = [
        { id: 1, label: '일반공격', value: 'basic' },
        { id: 2, label: '디펜스', value: 'defence' },
        { id: 3, label: '스매시', value: 'smash' },
        { id: 4, label: '카운터어택', value: 'counter' },
        { id: 5, label: '윈드밀', value: 'windmill' },
        { id: 6, label: '라이트닝볼트', value: 'lightningbolt' },
        { id: 7, label: '파이어볼트', value: 'icegbolt' },
        { id: 8, label: '아이스볼트', value: 'firebolt' },
        { id: 9, label: '힐링', value: 'firebolt' },
        { id: 10, label: '썬더', value: 'thunder' },
        { id: 11, label: '응급치료', value: 'firstaid' },
        { id: 12, label: '아이스매직실드', value: 'ice_magic_shield' },
        { id: 13, label: '파이어매직실드', value: 'fire_magic_shield' },
        { id: 14, label: '라이트닝매직실드', value: 'lightning_magic_shield' },
        { id: 15, label: '내츄럴매직실드', value: 'natural_magic_shield' },
    ]

    const conditonOption = [
        { id: 1, label: '상대의 상태가', value: 'target_state' },
        { id: 2, label: '상대와의 거리가', value: 'target_distance' },
        { id: 3, label: '스킬을 현재 사용할 수 있을 때', value: 'skill_preparable' },
        { id: 4, label: '특기를 현재 사용할 수 있을 때', value: 'ST_prepareable' },
        { id: 5, label: '핀즈비즈를 사용할 수 있을 때', value: 'EQ_prepareable' },
        { id: 6, label: '주인의 소모된 생명력이', value: 'master_damaged_life_greater' },
    ];
    const STOption = [
        { id: 1, label: '폭주의 시간', value: 'PetSTDamageUp' },
        { id: 2, label: '얼음의 대지', value: 'PetSTHolding' },
        { id: 3, label: '신속의 날개', value: 'PetSTMoveSpeedUp' },
        { id: 4, label: '푸른 방패', value: 'PetSTManaShield' },
        { id: 5, label: '치유의 빛', value: 'PetSTHealingEnhance' },
        { id: 6, label: '유대의 끈', value: 'PetSTGainMissionEXP' },
    ];
    const EQOption = [
        { id: 1, label: '플로랄 실드', value: 'FloralShield' },
        { id: 2, label: '힐링 버블', value: 'HealingBubble' },
        { id: 3, label: '피니 펀치', value: 'FynnyPunch' },
        { id: 4, label: '윈드 러시', value: 'WindRush' },
        { id: 5, label: '풀링 필드', value: 'PullingField' },
        { id: 6, label: '푸싱 필드', value: 'PushingField' },
    ];
    */

//이벤트 메이커랑 아주 비슷하게 만들어야 할거야.
function ConSeqWraper({ width, optionValue, value, sortOrder, indexNum, isCondition, onChange }: WraperBoxProps) {

    const [conditionList, setConditionList] = useRecoilState(AIMakingConditionArrayAtom)
    const [sequenceLsit, setSequenceList] = useRecoilState(AIMakingSequenceArrayAtom)

    var indexNumThis = indexNum != undefined ? indexNum : 0

    const [conFirstRadio, setConfirstRadio] = useState<string[]>(conditionList[indexNumThis][0] ? [conditionList[indexNumThis][0]] : []);
    const [conSecondRadio, setConSecondRadio] = useState<string[]>(conditionList[indexNumThis][1] ? [conditionList[indexNumThis][1]] : []);
    const [conThirdRadio, setConThirdRadio] = useState<string[]>(conditionList[indexNumThis][2] ? [conditionList[indexNumThis][2]] : []);


    //console.log(conFirstRadio)
    //console.log(conSecondRadio)
    //console.log(conThirdRadio)
    //useMemo 추가하고 관련값 끼워넣기
    //useMemo는 문제가 있었어. 연산 아끼려다 갱신이 안돼
    //이젠 라디오 문제가 발생 중이야. 벨류값이 바뀌긴 하는데 쟤들이 눈치껏 나오고 들어가질 않아
    useEffect(() => {
        console.log("수정발동")
        console.log(conditionList[indexNumThis])
        switch (conditionList[indexNumThis][0]) {
            //[width, optionValue, sortOrder, h3 전열 , h3 후열] 순으로 배열 생성
            //여기서 케이스 만들고 아래 리턴에서 조립해야해
            case 'target_state': setConfirstRadio(["0", "target_state", "1", "=", "인 경우"]); setConSecondRadio([]); break;//
            case 'target_distance': setConfirstRadio(["0", "target_distance", "1", "=", "이상"]); setConSecondRadio(["0", "target_distance", "2", "", "이하"]); break;
            case 'skill_preparable': setConfirstRadio(["0", "skill_preparable", "1", "=", ""]); setConSecondRadio([]); break;
            case 'ST_preparable': setConfirstRadio(["0", "ST_preparable", "1", "=", ""]); setConSecondRadio([]); break;
            case 'EQ_preparable': setConfirstRadio(["0", "EQ_preparable", "1", "=", ""]); setConSecondRadio([]); break;
            case 'master_damaged_life_greater': setConfirstRadio(["0", "master_damaged_life_greater", "1", "=", "이상"]); setConSecondRadio([]); break;
        }

    }, [conditionList])

    //널 자리에 채워야해 시퀸스
    return (<RowBox>
        {isCondition
            ? <SelectButton optionValue={'condition'} width={0} sortOrder={0} value={conditionList[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
            : <SelectButton optionValue={'sequence'} width={0} sortOrder={0} value={sequenceLsit[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>}

        {isCondition
            ? conFirstRadio.length > 0
                ? <BoxTextWraper>
                    {conFirstRadio[3] != '' ? <h3>{conFirstRadio[3]}</h3> : null}
                    <SelectButton width={parseInt(conFirstRadio[0])} optionValue={conFirstRadio[1]} sortOrder={parseInt(conFirstRadio[2])} value={conditionList[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                    {conFirstRadio[4] != '' ? <h3>{conFirstRadio[4]}</h3> : null}
                </BoxTextWraper>
                : null
            : null}

        {isCondition
            ? conSecondRadio.length > 0
                ? <BoxTextWraper>
                    {conSecondRadio[3] != '' ? <h3>{conSecondRadio[3]}</h3> : null}
                    <SelectButton width={parseInt(conSecondRadio[0])} optionValue={conSecondRadio[1]} sortOrder={parseInt(conSecondRadio[2])} value={conditionList[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                    {conSecondRadio[4] != '' ? <h3>{conSecondRadio[4]}</h3> : null}
                </BoxTextWraper>
                : null
            : null}

        {isCondition
            ? conThirdRadio.length > 0
                ? <BoxTextWraper>
                    {conThirdRadio[3] != '' ? <h3>{conThirdRadio[3]}</h3> : null}
                    3{conThirdRadio[1]}<SelectButton width={parseInt(conThirdRadio[0])} optionValue={conThirdRadio[1]} sortOrder={parseInt(conThirdRadio[2])} value={conditionList[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                    {conThirdRadio[4] != '' ? <h3>{conThirdRadio[4]}</h3> : null}
                </BoxTextWraper>
                : null
            : null}

        {indexNumThis < conditionList.length - 1
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