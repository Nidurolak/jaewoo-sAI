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
export function Pet_Missile() {
    let sequence0: SequenceType = {
        tabNum: 4,
        case: "sequence",
        mainstring: "cancel_skill"
    };

    let sequence1: SequenceType = {
        tabNum: 4,
        case: "sequence",
        mainstring: "melee_attack",
        valueString0: "10000"
    };

    const returnValue: string = eventWarper({
        name: "자동 펫 미사일",
        mainstring: "master_aimed",
        condition: [],
        sequence: [sequenceParticle(sequence0), sequenceParticle(sequence1)]
    });


    return returnValue;
}