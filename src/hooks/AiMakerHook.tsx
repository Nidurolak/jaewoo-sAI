import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import {ConditionType, EventTypes, SequenceType, StringTest} from "../utils/types";
import { useForm, Controller, EventType } from 'react-hook-form';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export function AIMaking(value : StringTest){
    const resString :string[] = [];

    for(let i = 0; i < value.tabNum; i++){
        resString.push("\t")
    }
    switch(value.mainString){
        case "FrontCase": resString.push("a"); break;
        case "MiddleCase": resString.push("b"); break;
        case "LastCase": resString.push("c"); break;
        default : break;
    }

    return resString.join("")
}

export function TestAIMaking(value : StringTest){
    const resString :string[] = [];

    for(let i = 0; i < value.tabNum; i++){
        resString.push("\t")
    }
    switch(value.mainString){
        case "FrontCase": resString.push("a"); break;
        case "MiddleCase": resString.push("b"); break;
        case "LastCase": resString.push("c"); break;
        default : break;
    }

    return resString.join("")
}


//AI 행동 시퀸스를 조립하는 부분, 여기서 필요한 건
//cmd name
//min, max
//distance, pet+st, clockwise
//stack_magic, charge
//run, timeout이다.
//cmd name은 공통적으로 들어가지만 뒤의 벨류들은 전부 선택이다. 블로그에 경우의 수를 적어두겠다.
export function sequenceParticle(value : SequenceType){
    const resString :string[] = [];
 
    for(let i = 0; i < value.tabNum; i++){
        resString.push("\t")
    }
    resString.push("<cmd name=")
    switch(value.mainstring){
        case "wait": resString.push(`"${value.mainstring}" min="${value.valueString0}" max="${value.valueString1}"/>` ); break;
        case "move_against": resString.push(`"${value.mainstring}" distance="${value.valueString0}" run="${value.valueString1}" timeout="${value.valueString2}"/>`); break;
        case "chase": resString.push(`"${value.mainstring}" chase_target="${value.valueString0}" radius="${value.valueString1}" run="${value.valueString2}"  timeout="${value.valueString3}"/>` ); break;
        case "move_around": resString.push(`"${value.mainstring}" clockwise="${value.valueString0}" timeout="${value.valueString1}" run="${value.valueString2}"/>` ); break;
        case "melee_attack": resString.push(`"${value.mainstring}" timeout="${value.valueString1}"/>` ); break;
        case "stackmagic_attack": resString.push(`"${value.mainstring}" stack_magic="${value.valueString0}" charge="${value.valueString1}" timeout="${value.valueString2}"/>` ); break;
        case "prepare_skill": resString.push(`"${value.mainstring}" pet_skill="${value.valueString0}" try_cnt="${value.valueString1}" timeout="${value.valueString2}"/>` ); break;
        case "stack_skill": resString.push(`"${value.mainstring}" stack_magic="${value.valueString0}" charge="${value.valueString1}"/>` ); break;
        case "process_skill": resString.push(`"${value.mainstring}" target="${value.valueString0}" timeout="${value.valueString1}"/>` ); break;
        case "cancel_skill": resString.push(`"${value.mainstring}"/>` ); break;
        case "skill_relax": resString.push(`"${value.mainstring}" on="${value.valueString0}"/>` ); break;
        case "PetST_skill": resString.push(`"${value.mainstring}" pet_st="${value.valueString0}" timeout="${value.valueString1}"/>` ); break;
        case "PetEQ_skill": resString.push(`"${value.mainstring}" pet_eq="${value.valueString0}" timeout="${value.valueString1}"/>` ); break;
        default : break;
    }

    return resString.join("")
}

export function sequenceWarper(value : string[]){
    const resString :string[] = [];
 
    resString.push("\n\t\t<pattern>\n\t\t\t<param_decl/>\n\t\t\t<sequence>\n")
    for(let i = 0; i < value.length; i++){
            resString.push(value[i])
            resString.push("\n")
    }
    resString.push("\t\t\t</sequence>\n\t\t</pattern>\n")
    return resString.join("")
}

export function conditionParticle(value : ConditionType){
    const resString :string[] = [];
 
    for(let i = 0; i < value.tabNum; i++){
        resString.push("\t")
    }
    resString.push("<condition name=")
    switch(value.mainstring){
        case "target_state": resString.push(`"${value.mainstring}" state="${value.valueString0}"/>` ); break;
        case "target_distance": resString.push(`"${value.mainstring}" min_distance="${value.valueString0}" max_distance="${value.valueString1}"/>` ); break;
        case "skill_preparable": resString.push(`"${value.mainstring}" pet_skill="${value.valueString0}"/>` ); break;
        case "ST_preparable": resString.push(`"${value.mainstring}" pet_st="${value.valueString0}"/>` ); break;
        case "EQ_preparable": resString.push(`"${value.mainstring}" pet_eq="${value.valueString0}"/>` ); break;
        case "master_damaged_life_greater": resString.push(`"${value.mainstring}" life="${value.valueString0}"/>` ); break;
        default : break;
    }

    return resString.join("")
}

export function conditionWarper(value : string[]){
    const resString :string[] = [];
 
    resString.push("\n\t\t<conditions>\n")
    for(let i = 0; i < value.length; i++){
            resString.push(value[i])
            resString.push("\n")
    }
    resString.push("\t\t</conditions>")
    return resString.join("")
}

export function eventWarper(value : EventTypes){
    const resString :string[] = [];
 
    resString.push(`\n\t<rule name="${value.name}">`)
    resString.push(conditionWarper(value.condition!))
    resString.push(sequenceWarper(value.sequence!))
    resString.push("\t\t<event name=")
    
    switch(value.mainstring){
        case "master_targeted": resString.push(`"${value.mainstring}" targeting_type="${value.valueString0}"/>` ); break;
        case "master_aimed": resString.push(`"${value.mainstring}"/>` ); break;
        case "master_target_skill_prepare": resString.push(`"${value.mainstring}"/>` ); break;
        case "master_target_magic_prepare": resString.push(`"${value.mainstring}"/>` ); break;
        case "master_defence": resString.push(`"${value.mainstring}" defence_enable_skill="${value.valueString0}"/>` ); break;
        case "master_attacked": resString.push(`"${value.mainstring}" master_skill="${value.valueString0}"/> down="${value.valueString1}"/>` ); break;
        case "master_skill_prepare": resString.push(`"${value.mainstring}" event_skill="${value.valueString0}"/>` ); break;
        case "seek_target": resString.push(`"${value.mainstring}"/>` ); break;
        case "now_targeting": resString.push(`"${value.mainstring}"/>` ); break;
        case "attack": resString.push(`"${value.mainstring}" pet_attackable_skill="${value.valueString0}" down="${value.valueString1}"/>` ); break;
        case "target_magic_prepare": resString.push(`"${value.mainstring}"/>` ); break;
        case "aimed": resString.push(`"${value.mainstring}"/>` ); break;
        case "target_skill_prepare": resString.push(`"${value.mainstring}"/>` ); break;
        case "defence": resString.push(`"${value.mainstring}" defence_enable_skill="${value.valueString0}"/>` ); break;
        case "attacked": resString.push(`"${value.mainstring}" master_skill="${value.valueString0}" down="${value.valueString1}"/>` ); break;        case "attack": resString.push(`"${value.mainstring}" life="${value.valueString0}"/>` ); break;
        default : break;
    }
    resString.push("\n\t</rule>")
    return resString.join("")
}
export function totalWarper(value : string[]){
    const resString :string[] = [];
 
    resString.push("<rules>\n")
    for(let i = 0 ; i < value.length; i++){
        resString.push(value[i])
    }
    resString.push("\n</rules>")
    return resString.join("")
}



export function sequenceMaker(value : StringTest){
    
}

//