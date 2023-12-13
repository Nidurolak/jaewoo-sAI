import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conParticle, conWarper, eventWarper, seqParticle, seqWarper, totalWarper} from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest, EventTypes } from '../utils/types';

/*
export interface SequenceType {
    tabNum : number;
    case : string;
    main?: string;
    value0? : string;
    value1? : string;
    value2? : string;
    value3? : string;
}
export interface ConditionType {
    tabNum : number;
    case : string;
    main?: string;
    value0? : string;
    value1? : string;

    
export interface EventTypes {
    name?: string;
    main?: string;
    condition? : string[];
    sequence? : string[];
    value0? : string;
    value1? : string;
    value2? : string;
}
}*/
export function AI_TOOL(){
    let seq_cancel: SequenceType = {tabNum: 4, case: "sequence", main: "cancel_skill"};
    let seq_meleeATK: SequenceType = {tabNum: 4, case: "sequence", main: "melee_attack",value0: "10000"};
    let seq_chase_Master_Run: SequenceType = {tabNum: 4, case: "sequence", main: "chase", value0: "master", value1: "0", value2: "true"};
    let seq_chase_Master_Walk: SequenceType = {tabNum: 4, case: "sequence", main: "chase", value0: "master", value1: "0", value2: "false"};
    let seq_wait_Long: SequenceType = {tabNum: 4, case: "sequence", main: "wait", value0: "10000", value1: "10000", };
    let seq_wait_Short: SequenceType = {tabNum: 4, case: "sequence", main: "wait", value0: "2000", value1: "2000", };
    let seq_defence_Ready: SequenceType ={tabNum: 4, case: "sequence", main: "prepare_skill", value0: "defence", value1: "0", value2: "10000"}
    let seq_defence_Chase: SequenceType ={tabNum: 4, case: "sequence", main: "wait", value0: "10000", value1: "10000", }

    //let condition_default: ConditionType = {tabNum: 3, case: "condition", main:"", value0:"", value1:"",}
    let con_enemy_Hit_Blow: ConditionType = {tabNum: 3, case: "condition", main:"target_state", value0:"blowaway"}
    let con_enemy_Hit_Shoved: ConditionType = {tabNum: 3, case: "condition", main:"target_state", value0:"shoved"}
    let con_enemy_Hit_Hit: ConditionType = {tabNum: 3, case: "condition", main:"target_state", value0:"hit"}

    function refeat(value : {refeatValue : SequenceType[], refeatNum: number}){
        const resString :string[] = [];
        for(let i = 0; i < value.refeatNum; i++){
            for(let x = 0; x < value.refeatValue.length; x++){
                resString.push(seqParticle(value.refeatValue[x]))
                resString.push("\n")
            }
        }
        return resString.join("");
    }

    let Pet_Missile: string = eventWarper({name: "자동 펫 미사일", main: "master_aimed", condition: [], sequence: [seqParticle(seq_cancel), seqParticle(seq_meleeATK)]});
    let Pet_Master_Chase: string = eventWarper({
        name: "주인 접근 트리거 - 윈드밀",main: "master_skill_prepare", value0: "windmill",
        condition: [],
        sequence: [seqParticle(seq_cancel), seqParticle(seq_chase_Master_Run), refeat({refeatValue: [seq_wait_Long], refeatNum: 3}), seqParticle(seq_wait_Long)]})
    let Pet_Main_Defence: string = eventWarper({
        name:"메인 디펜스",main:"master_attack", value0: "all",
        condition: [conParticle(con_enemy_Hit_Blow),conParticle(con_enemy_Hit_Hit),conParticle(con_enemy_Hit_Shoved)],
        sequence: [seqParticle(seq_chase_Master_Run),seqParticle(seq_defence_Ready),seqParticle(seq_chase_Master_Walk),seqParticle(seq_wait_Short),seqParticle(seq_chase_Master_Walk),seqParticle(seq_wait_Short),seqParticle(seq_chase_Master_Walk),seqParticle(seq_wait_Short),seqParticle(seq_chase_Master_Walk),seqParticle(seq_wait_Short),seqParticle(seq_chase_Master_Walk),seqParticle(seq_wait_Short),seqParticle(seq_chase_Master_Walk),seqParticle(seq_wait_Short),seqParticle(seq_chase_Master_Walk),seqParticle(seq_wait_Short)]})
    let Pet_MasterAttked_Revenge: string = eventWarper({
        name:"주인피격시 - 복수",main:"master_attacked", value0: "all", value1:"true",
        condition: [],
        sequence: []})
    //let Pet_Missile: string = eventWarper({name:"",main:"",condition: [], sequence: []})
    //let Pet_Missile: string = eventWarper({name:"",main:"",condition: [], sequence: []})
    //let Pet_Missile: string = eventWarper({name:"",main:"",condition: [], sequence: []})
    //let Pet_Missile: string = eventWarper({name:"",main:"",condition: [], sequence: []})
    //let Pet_Missile: string = eventWarper({name:"",main:"",condition: [], sequence: []})
    //let Pet_Missile: string = eventWarper({name:"",main:"",condition: [], sequence: []})
    return{Pet_Missile, Pet_Master_Chase, Pet_Main_Defence, Pet_MasterAttked_Revenge}   
}
/*

    return returnValue;
}
*/