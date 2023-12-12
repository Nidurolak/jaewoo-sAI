import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conditionParticle, conditionWarper, eventWarper, sequenceParticle, sequenceWarper, totalWarper} from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest, EventTypes } from '../utils/types';

/*
export interface SequenceType {
    tabNum : number;
    case : string;
    mainstring?: string;
    valueString0? : string;
    valueString1? : string;
    valueString2? : string;
    valueString3? : string;
}
export interface ConditionType {
    tabNum : number;
    case : string;
    mainstring?: string;
    valueString0? : string;
    valueString1? : string;

    
export interface EventTypes {
    name?: string;
    mainstring?: string;
    condition? : string[];
    sequence? : string[];
    valueString0? : string;
    valueString1? : string;
    valueString2? : string;
}
}*/
export function AI_TOOL(){
    let sequence_cancel: SequenceType = {tabNum: 4, case: "sequence", mainstring: "cancel_skill"};
    let sequence_meleeATK: SequenceType = {tabNum: 4, case: "sequence", mainstring: "melee_attack",valueString0: "10000"};
    let sequence_chase_Master_Run: SequenceType = {tabNum: 4, case: "sequence", mainstring: "chase", valueString0: "master", valueString1: "0", valueString2: "true"};
    let sequence_chase_Master_Walk: SequenceType = {tabNum: 4, case: "sequence", mainstring: "chase", valueString0: "master", valueString1: "0", valueString2: "false"};
    let sequence_wait_Long: SequenceType = {tabNum: 4, case: "sequence", mainstring: "wait", valueString0: "10000", valueString1: "10000", };
    let sequence_wait_Short: SequenceType = {tabNum: 4, case: "sequence", mainstring: "wait", valueString0: "2000", valueString1: "2000", };
    let sequence_defence_Ready: SequenceType ={tabNum: 4, case: "sequence", mainstring: "prepare_skill", valueString0: "defence", valueString1: "0", valueString2: "10000"}
    let sequence_defence_Chase: SequenceType ={tabNum: 4, case: "sequence", mainstring: "wait", valueString0: "10000", valueString1: "10000", }

    let Pet_Missile: string = eventWarper({name: "자동 펫 미사일", mainstring: "master_aimed", condition: [], sequence: [sequenceParticle(sequence_cancel), sequenceParticle(sequence_meleeATK)]
    });
    return{Pet_Missile, sequence_cancel}   
}
/*
export function Pet_Missile() {
    let sequence_cancel: SequenceType = {
        tabNum: 4,
        case: "sequence",
        mainstring: "cancel_skill"
    };

    let sequence_meleeATK: SequenceType = {
        tabNum: 4,
        case: "sequence",
        mainstring: "melee_attack",
        valueString0: "10000"
    };

    const returnValue: string = eventWarper({
        name: "자동 펫 미사일",
        mainstring: "master_aimed",
        condition: [],
        sequence: [sequenceParticle(sequence_cancel), sequenceParticle(sequence_meleeATK)]
    });


    return returnValue;
}
export function Pet_Master_Chase() {
    let sequence_cancel: SequenceType = {
        tabNum: 4,
        case: "sequence",
        mainstring: "cancel_skill"
    };

    let sequence_meleeATK: SequenceType = {
        tabNum: 4,
        case: "sequence",
        mainstring: "chase",
        valueString0: "master",
        valueString1: "0",
        valueString2: "true"
    };
    let sequence_chase_Master: SequenceType = {
        tabNum: 4,
        case: "sequence",
        mainstring: "wait",
        valueString0: "10000",
        valueString1: "10000",
    };

    const returnValue: string = eventWarper({
        name: "주인 접근 트리거 - 윈드밀",
        mainstring: "master_skill_prepare",
        condition: [],
        sequence: [sequenceParticle(sequence_cancel), sequenceParticle(sequence_meleeATK), sequenceParticle(sequence_chase_Master), sequenceParticle(sequence_chase_Master), sequenceParticle(sequence_chase_Master)]
    });


    return returnValue;
}
*/