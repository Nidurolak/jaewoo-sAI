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
    switch(value.main){
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
    switch(value.main){
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
export function seqPt(value : SequenceType){
    const resString :string[] = [];
 
    for(let i = 0; i < value.tabNum; i++){
        resString.push("\t")
    }
    resString.push("<cmd name=")
    switch(value.main){
        case "wait": resString.push(`"${value.main}" min="${value.value0}" max="${value.value1}"/>` ); break;
        case "move_against": resString.push(`"${value.main}" distance="${value.value0}" run="${value.value1}" timeout="${value.value2}"/>`); break;
        case "chase": resString.push(`"${value.main}" chase_target="${value.value0}" timeout="${value.value1}" run="${value.value2}"/>` ); break;
        case "move_around": resString.push(`"${value.main}" clockwise="${value.value0}" timeout="${value.value1}" run="${value.value2}"/>` ); break;
        case "melee_attack": resString.push(`"${value.main}" timeout="${value.value0}"/>` ); break;
        case "stackmagic_attack": resString.push(`"${value.main}" stack_magic="${value.value0}" charge="${value.value1}" timeout="${value.value2}"/>` ); break;
        case "prepare_skill": resString.push(`"${value.main}" pet_skill="${value.value0}" try_cnt="${value.value1}" timeout="${value.value2}"/>` ); break;
        case "stack_skill": resString.push(`"${value.main}" stack_magic="${value.value0}" charge="${value.value1}"/>` ); break;
        case "process_skill": resString.push(`"${value.main}" target="${value.value0}" timeout="${value.value1}"/>` ); break;
        case "cancel_skill": resString.push(`"${value.main}"/>` ); break;
        case "skill_relax": resString.push(`"${value.main}" on="${value.value0}"/>` ); break;
        case "PetST_skill": resString.push(`"${value.main}" pet_st="${value.value0}" timeout="${value.value1}"/>` ); break;
        case "PetEQ_skill": resString.push(`"${value.main}" pet_eq="${value.value0}" timeout="${value.value1}"/>` ); break;
        default : break;
    }

    return resString.join("")
}

export function seqWarper(value : string[]){
    const resString :string[] = [];
 
    resString.push("\n\t\t<pattern>\n\t\t\t<param_decl/>\n\t\t\t<sequence>\n")
    for(let i = 0; i < value.length; i++){
            resString.push(value[i])
            resString.push("\n")
    }
    resString.push("\t\t\t</sequence>\n\t\t</pattern>\n")
    return resString.join("")
}

export function conPt(value : ConditionType){
    const resString :string[] = [];
 
    for(let i = 0; i < value.tabNum; i++){
        resString.push("\t")
    }
    resString.push("<condition name=")
    switch(value.main){
        case "target_state": resString.push(`"${value.main}" state="${value.value0}"/>` ); break;
        case "target_distance": resString.push(`"${value.main}" min_distance="${value.value0}" max_distance="${value.value1}"/>` ); break;
        case "skill_preparable": resString.push(`"${value.main}" pet_skill="${value.value0}"/>` ); break;
        case "ST_preparable": resString.push(`"${value.main}" pet_st="${value.value0}"/>` ); break;
        case "EQ_preparable": resString.push(`"${value.main}" pet_eq="${value.value0}"/>` ); break;
        case "master_damaged_life_greater": resString.push(`"${value.main}" life="${value.value0}"/>` ); break;
        default : break;
    }

    return resString.join("")
}

export function conWarper(value : string[]){
    const resString :string[] = [];
    
    if(value.length != 0){
        resString.push("\n\t\t<conditions>\n")
        for(let i = 0; i < value.length; i++){
                resString.push(value[i])
                resString.push("\n")
        }
        resString.push("\t\t</conditions>")
    }
    else resString.push("\n\t\t<conditions/>")
    return resString.join("")
}

export function eventWarper(value : EventTypes){
    const resString :string[] = [];
 
    resString.push(`\n\t<rule name="${value.name}">`)
    resString.push(conWarper(value.condition!))
    resString.push(seqWarper(value.sequence!))
    resString.push("\t\t<event name=")
    
    switch(value.main){
        case "master_targeted": resString.push(`"${value.main}" targeting_type="${value.value0}"/>` ); break;
        case "master_aimed": resString.push(`"${value.main}"/>` ); break;
        case "master_target_skill_prepare": resString.push(`"${value.main}"/>` ); break;
        case "master_target_magic_prepare": resString.push(`"${value.main}"/>` ); break;
        case "master_defence": resString.push(`"${value.main}" defence_enable_skill="${value.value0}"/>` ); break;
        case "master_attack": resString.push(`"${value.main}" master_skill="${value.value0}"/>` ); break;
        case "master_attacked": resString.push(`"${value.main}" master_skill="${value.value0}" down="${value.value1}"/>` ); break;
        case "master_skill_prepare": resString.push(`"${value.main}" event_skill="${value.value0}"/>` ); break;
        case "seek_target": resString.push(`"${value.main}"/>` ); break;
        case "now_targeting": resString.push(`"${value.main}"/>` ); break;
        case "attack": resString.push(`"${value.main}" pet_attackable_skill="${value.value0}" down="${value.value1}"/>` ); break;
        case "target_magic_prepare": resString.push(`"${value.main}"/>` ); break;
        case "aimed": resString.push(`"${value.main}"/>` ); break;
        case "target_skill_prepare": resString.push(`"${value.main}"/>` ); break;
        case "defence": resString.push(`"${value.main}" defence_enable_skill="${value.value0}"/>` ); break;
        case "attacked": resString.push(`"${value.main}" master_skill="${value.value0}" down="${value.value1}"/>` ); break;
        case "targeted": resString.push(`"${value.main}" targeting_type="${value.value0}"/>` ); break;
        default : break;
    }
    resString.push("\n\t</rule>")
    return resString.join("")
}
export function totalWarper(value : string[]){
    const resString :string[] = [];
 
    resString.push("<rules>")
    for(let i = 0 ; i < value.length; i++){
        resString.push(value[i])
    }
    resString.push("\n</rules>")
    return resString.join("")
}



export function sequenceMaker(value : StringTest){
    
}

//