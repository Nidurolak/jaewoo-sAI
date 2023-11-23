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
    switch(value.mainString){
        case "FrontCase": resString.push("a"); break;
        case "MiddleCase": resString.push("b"); break;
        case "LastCase": resString.push("c"); break;
        default : break;
    }

    return resString.join("")
}
export function sequenceMaker(value : StringTest){
    
}

//