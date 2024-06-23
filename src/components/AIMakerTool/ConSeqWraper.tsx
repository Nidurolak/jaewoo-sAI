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

    const [currentConditionList, setCurrentConditionList] = useState(conditionList[indexNumThis])
    const [firstRadio, setFirstRadio] = useState<string[]>([""]);
    const [secondRadio, setSecondRadio] = useState<string[]>([""]);
    const [thirdRadio, setThirdRadio] = useState<string[]>([""]);

    //useMemo 추가하고 관련값 끼워넣기
    useMemo(() => {
        switch (currentConditionList[1]) {
            //[width, optionValue, sortOrder, h3 전열 , h3 후열] 순으로 배열 생성
            //여기서 케이스 만들고 아래 리턴에서 조립해야해
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

    }, [currentConditionList])

    return (<RowBox>
        {isCondition
            ? <SelectButton optionValue={''} width={100} sortOrder={0} value={currentConditionList} onChange={onChange}></SelectButton>
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