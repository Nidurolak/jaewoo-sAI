import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import {SequenceType, StringTest} from "../utils/types";
import { useForm, Controller } from 'react-hook-form';
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
 
    resString.push("\t\t<pattern>\n\t\t\t<param_decl/>\n\t\t\t<sequence>\n")
    for(let i = 0; i < value.length; i++){
            resString.push(value[i])
            resString.push("\n")
    }
    resString.push("\t\t\t</sequence>\n\t\t</pattern>")
    return resString.join("")
}


export function sequenceMaker(value : StringTest){
    
}

//