import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conPt, conWarper, eventWarper, seqPt, seqWarper, totalWarper } from '../hooks/AiMakerHook';
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
export function AI_TOOL() {
    let seq_cancel: SequenceType = { tabNum: 4, case: "sequence", main: "cancel_skill" };
    let seq_Ready_StWind: SequenceType = { tabNum: 4, case: "sequence", main: "PetST_skill", value0: "PetSTMoveSpeedUp", value1: "0" };
    let seq_meleeATK: SequenceType = { tabNum: 4, case: "sequence", main: "melee_attack", value0: "10000" };
    let seq_meleeATKShort: SequenceType = { tabNum: 4, case: "sequence", main: "melee_attack", value0: "1000" };
    let seq_chase_Master_Run: SequenceType = { tabNum: 4, case: "sequence", main: "chase", value0: "master", value1: "0", value2: "true" };
    let seq_chase_Master_Walk: SequenceType = { tabNum: 4, case: "sequence", main: "chase", value0: "master", value1: "0", value2: "false" };
    let seq_wait_Long: SequenceType = { tabNum: 4, case: "sequence", main: "wait", value0: "10000", value1: "10000", };
    let seq_wait_Middle: SequenceType = { tabNum: 4, case: "sequence", main: "wait", value0: "4000", value1: "4000", };
    let seq_wait_Short: SequenceType = { tabNum: 4, case: "sequence", main: "wait", value0: "2000", value1: "2000", };
    let seq_defence_Ready: SequenceType = { tabNum: 4, case: "sequence", main: "prepare_skill", value0: "defence", value1: "0", value2: "10000" }


    //let condition_default: ConditionType = {tabNum: 3, case: "condition", main:"", value0:"", value1:"",}
    let con_enemy_Hit_Blow: ConditionType = { tabNum: 3, case: "condition", main: "target_state", value0: "blowaway" }
    let con_enemy_Hit_Shoved: ConditionType = { tabNum: 3, case: "condition", main: "target_state", value0: "shoved" }
    let con_enemy_Hit_Hit: ConditionType = { tabNum: 3, case: "condition", main: "target_state", value0: "hit" }
    let con_enemy_State_Stop: ConditionType = { tabNum: 3, case: "condition", main: "target_state", value0: "stop" }
    let con_pet_Ready_ST: ConditionType = { tabNum: 3, case: "condition", main: "ST_preparable", value0: "PetSTMoveSpeedUp" }


    function refeat(value: { refeatValue: SequenceType[], refeatNum: number }) {
        const resString: string[] = [];
        for (let i = 0; i < value.refeatNum; i++) {
            for (let x = 0; x < value.refeatValue.length; x++) {
                resString.push(seqPt(value.refeatValue[x]))
                resString.push("\n")
            }
        }
        return resString.join("");
    }

    let Pet_MasterActive_StWind: string = eventWarper({
        name: "자동 신속 사용", main: "master_skill_prepare", value0: "all",
        condition: [conPt(con_pet_Ready_ST)],
        sequence: [seqPt(seq_cancel), seqPt(seq_Ready_StWind)]
    });
    let Pet_SeekTarget_StWind: string = eventWarper({
        name: "자동 신속 사용0", main: "now_targeting",
        condition: [conPt(con_pet_Ready_ST)],
        sequence: [seqPt(seq_cancel), seqPt(seq_Ready_StWind)]
    });
    let Pet_Targeted_StWind: string = eventWarper({
        name: "자동 신속 사용1", main: "now_targeting", value0:"alert",
        condition: [conPt(con_pet_Ready_ST)],
        sequence: [seqPt(seq_cancel), seqPt(seq_Ready_StWind)]
    });
    let Pet_MasterTargeted_Missile: string = eventWarper({
        name: "자동 펫 미사일 - 주인", main: "master_aimed",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    });
    let Pet_PetTargeted_Missile: string = eventWarper({
        name: "자동 펫 미사일 - 펫", main: "aimed",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    });
    let Pet_Master_Chase: string = eventWarper({
        name: "주인 접근 트리거 - 윈드밀", main: "master_skill_prepare", value0: "windmill",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_chase_Master_Run), refeat({ refeatValue: [seq_wait_Long], refeatNum: 4 })]
    })
    let Pet_MasterAttacked_Stand_Revenge: string = eventWarper({
        name: "주인 피격시 - 복수1", main: "master_attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    })
    let Pet_MasterAttacked_Down_Revenge: string = eventWarper({
        name: "주인 피격시 - 복수2", main: "master_attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    })
    /*
    =========================펫 디펜더용 패턴====================================
    */
    let Pet_Main_Defence: string = eventWarper({
        name: "메인 디펜스", main: "master_attack", value0: "all",
        condition: [conPt(con_enemy_Hit_Blow), conPt(con_enemy_Hit_Hit), conPt(con_enemy_Hit_Shoved)],
        sequence: [seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 5 }), seqPt(seq_cancel)]
    })
    let Pet_Main_Defence1: string = eventWarper({
        name: "메인 디펜스1", main: "master_skill_prepare", value0: "all",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Run), seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 5 }), seqPt(seq_cancel)]
    })
    let Pet_DefenceAttacked_Revenge: string = eventWarper({
        name: "디펜스 피격시 - 복수", main: "defence", value0: "all",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    })
    let Pet_AttackedDown_Defence: string = eventWarper({
        name: "피격다운시 - 디펜스", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Run), seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    })
    let Pet_MasterTargeted_Alert_Defence: string = eventWarper({
        name: "주인 가인식시 - 디펜스", main: "master_targeted", value0: "alert",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Walk), seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    })
    let Pet_MasterTargeted_AtK_Defence: string = eventWarper({
        name: "주인 인식시 - 디펜스", main: "master_targeted", value0: "attack",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Walk), seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    })
    let Pet_AfterAtKStand_Defence: string = eventWarper({
        name: "주인 지키기 - 평타 후 디펜스", main: "attack", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    })
    let Pet_AfterAtKDown_Defence: string = eventWarper({
        name: "주인 지키기 - 평타 후 디펜스", main: "attack", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    })
    let Pet_Defender_AI_Package: string[] = [
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Targeted_StWind,
        Pet_Master_Chase,
        Pet_MasterTargeted_AtK_Defence,
        Pet_MasterTargeted_Alert_Defence,
        Pet_DefenceAttacked_Revenge,
        Pet_MasterAttacked_Stand_Revenge,
        Pet_MasterAttacked_Down_Revenge,
        Pet_AfterAtKDown_Defence,
        Pet_AfterAtKStand_Defence,
        Pet_Main_Defence,
        Pet_Main_Defence1,
        Pet_AttackedDown_Defence,
        Pet_PetTargeted_Missile,
        Pet_MasterTargeted_Missile,
    ]
    /*
    =========================주인바라기용 패턴====================================
    */
    let Pet_MasterTargeted_Alert_DoNothing: string = eventWarper({
        name: "주인 가인식시 - 주인추적", main: "master_targeted", value0: "alert",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_MasterTargeted_AtK_DoNothing: string = eventWarper({
        name: "주인 인식시 - 주인추적", main: "master_targeted", value0: "attack",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_AttackedDown_DoNothing: string = eventWarper({
        name: "피격다운시 - 주인추적", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_AttackedStand_DoNothing: string = eventWarper({
        name: "피격노다운시 - 주인추적", main: "attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_MasterAttacked_Stand_DoNothing: string = eventWarper({
        name: "주인 피격다운시 - 주인추적", main: "master_attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_MasterAttacked_Down_DoNothing: string = eventWarper({
        name: "주인 피격노다운시 - 주인추적", main: "master_attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_MasterAttack_Down_DoNothing: string = eventWarper({
        name: "주인 공격시 - 주인추적", main: "master_attack", value0: "all",
        condition: [conPt(con_enemy_Hit_Blow), conPt(con_enemy_Hit_Hit), conPt(con_enemy_Hit_Shoved)],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_MasterReady_DoNothing: string = eventWarper({
        name: "주인 스킬 준비 - 주인추적", main: "master_skill_prepare", value0: "all",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_Targeting_DoNothing: string = eventWarper({
        name: "펫 인식함 - 주인추적", main: "seek_target",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_Targeted_DoNothing: string = eventWarper({
        name: "펫 인식중 - 주인추적", main: "now_targeting",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_Attack_DoNothing: string = eventWarper({
        name: "펫 추가타넣지않기1 - 주인추적", main: "attack", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_AttackDown_DoNothing: string = eventWarper({
        name: "펫 추가타넣지않기2 - 주인추적", main: "attack", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    })
    let Pet_Chaser_AI_Package: string[] = [
        Pet_MasterActive_StWind,
        Pet_MasterTargeted_Alert_DoNothing,
        Pet_MasterTargeted_AtK_DoNothing,
        Pet_AttackedDown_DoNothing,
        Pet_AttackedStand_DoNothing,
        Pet_MasterAttacked_Down_DoNothing,
        Pet_MasterAttacked_Stand_DoNothing,
        Pet_MasterAttack_Down_DoNothing,
        Pet_MasterReady_DoNothing,
        Pet_Targeting_DoNothing,
        Pet_Targeted_DoNothing,
        Pet_Attack_DoNothing,
        Pet_AttackDown_DoNothing,]
    /*
    =========================오리지널용 패턴====================================
    */
    let seq_chase_Enemy_Run_Short: SequenceType = { tabNum: 4, case: "sequence", main: "chase", value0: "enemy", value1: "0", value2: "true"};
    let seq_chase_Enemy_Run_Long: SequenceType = { tabNum: 4, case: "sequence", main: "chase", value0: "enemy", value1: "5000", value2: "true"};
    let seq_chase_Enemy_Circle: SequenceType = { tabNum: 4, case: "sequence", main: "move_around", value0: "true", value1: "100", value2: "false", value3: "4000"};
    let Pet_Magic_Protect_Master: string = eventWarper({
        name: "주인-적 마법 준비 - 방해하기", main: "master_target_magic_prepare",
        condition:[conPt(con_enemy_State_Stop)],
        sequence:[seqPt(seq_cancel), seqPt(seq_meleeATK)]
    })
    let Pet_Magic_Protect: string = eventWarper({
        name: "적 마법 준비 - 방해하기", main: "target_magic_prepare",
        condition:[],
        sequence:[seqPt(seq_cancel), seqPt(seq_meleeATK)]

    })
    let Pet_AttackedStand_Revenge: string = eventWarper({
        name: "피격노다운시 - 반격", main: "attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK),]
    })
    let Pet_AttackedDown_Revenge: string = eventWarper({
        name: "피격다운시 - 반격", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK),]
    })
    let Pet_Attack_WithMaster: string = eventWarper({
        name: "주인방어시 - 협공", main: "master_defence", value0:"all",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK),]
    })
    let Pet_DonotTroll_MasterAttack: string = eventWarper({
        name : "주인 공격시 방해 안하기", main: "master_attack", value0: "all",
        condition: [seqPt(seq_cancel), seqPt(seq_chase_Enemy_Run_Long), seqPt(seq_chase_Enemy_Circle)],
        sequence: []
    })
    let Pet_DonotTroll_Attack: string = eventWarper({
        name : "펫 공격시 방해 안하기", main: "attack", value0: "all", value1:"true",
        condition: [seqPt(seq_cancel), seqPt(seq_chase_Enemy_Run_Long), seqPt(seq_chase_Enemy_Circle)],
        sequence: []
    })

    let Pet_Original_AI: string[] = [
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Targeted_StWind,
        Pet_Master_Chase,
        Pet_MasterAttacked_Stand_Revenge,
        Pet_MasterAttacked_Down_Revenge,
        Pet_Magic_Protect_Master,
        Pet_MasterTargeted_Missile,
        Pet_PetTargeted_Missile,
        Pet_AttackedStand_Revenge,
        Pet_AttackedDown_Revenge,
        Pet_Attack_WithMaster,
        Pet_DonotTroll_MasterAttack,
        Pet_DonotTroll_Attack,
        Pet_Magic_Protect
    ]

    /*
    =========================로드롤러용 패턴====================================
    */
    let seq_ReadyWindMill: SequenceType = {tabNum:4, case:"sequence", main: "prepare_skill", value0: "windmill", value1: "0", value2: "0"}
    let seq_SkillUse_ToEnemyGround: SequenceType = {tabNum:4, case:"sequence", main: "process_skill", value0: "pos_toward_target", value1:"10000"}
    let seq_SkillUse_ToEnenmyDirectLong: SequenceType = {tabNum:4, case: "sequence", main: "process_skill", value0: "enemy", value1:"10000"}
    let seq_SkillUse_ToEnenmyDirectMiddle: SequenceType = {tabNum:4, case: "sequence", main: "process_skill", value0: "enemy", value1:"5000"}
    let seq_SkillUse_ToEnenmyDirectInfinite: SequenceType = {tabNum:4, case: "sequence", main: "process_skill", value0: "enemy", value1:"0"}
    
    let Pet_ReadyToWindmill_MasterReady: string = eventWarper({
        name: "윈드밀 준비 - 주인 스킬 준비", main: "master_skill_prepare", value0: "all",
        condition:[],
        sequence:[seqPt(seq_chase_Master_Run),refeat({refeatValue: [seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 5})]
    })
    let Pet_ReadyToWindmill_MasterATK: string = eventWarper({
        name: "윈드밀 준비 - 주인 모든 공격", main: "master_skill_prepare", value0: "all",
        condition:[],
        sequence:[seqPt(seq_chase_Master_Run),refeat({refeatValue: [seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 5})]
    })
    let Pet_UseWindmill_MasterATKed: string = eventWarper({
        name:"윈드밀 사용 - 주인 피격 노다운", main:"master_attacked", value0:"all", value1:"false",
        condition:[],
        sequence: [seqPt(seq_SkillUse_ToEnenmyDirectInfinite), seqPt(seq_cancel)]
    })
    let Pet_UseWindmill_MasterATKedDown: string = eventWarper({
        name:"윈드밀 사용 - 주인 피격 다운", main:"master_attacked", value0:"all", value1:"true",
        condition:[],
        sequence: [seqPt(seq_SkillUse_ToEnenmyDirectMiddle), refeat({refeatValue: [seq_chase_Master_Run, seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 3})]
    })
    let Pet_UseWindmill_EnemyReady: string = eventWarper({
        name:"윈드밀 사용 - 적 준비", main:"target_skill_prepare",
        condition:[],
        sequence: [seqPt(seq_SkillUse_ToEnemyGround), seqPt(seq_SkillUse_ToEnenmyDirectLong)]
    })
    let Pet_UseWindmill_MasterEnemyReady: string = eventWarper({
        name:"윈드밀 사용 - 주인 적 준비", main:"master_target_skill_prepare",
        condition:[],
        sequence: [seqPt(seq_SkillUse_ToEnemyGround), seqPt(seq_SkillUse_ToEnenmyDirectLong)]
    })
    let Pet_UseWindmill_ATKed: string = eventWarper({
        name:"윈드밀 사용 - 피격 다운", main:"attacked", value0:"all", value1:"true",
        condition:[],
        sequence: [seqPt(seq_SkillUse_ToEnenmyDirectLong)]
    })
    let Pet_UseWindmill_ATK: string = eventWarper({
        name:"윈드밀 사용 - 공격 성공", main:"attack", value0:"all", value1:"true",
        condition:[],
        sequence: [refeat({refeatValue: [seq_chase_Master_Run, seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 4})]
    })
    let Pet_ReadyToWindmill_Targeted: string = eventWarper({
        name:"윈드밀 준비 - 펫 인식당함", main:"targeted", value0:"alert",
        condition:[],
        sequence: [refeat({refeatValue: [seq_chase_Master_Run, seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 4})]
    })
    let Pet_ReadyToWindmill_MasterTargeted: string = eventWarper({
        name:"윈드밀 준비 - 주인 인식당함", main:"master_targeted", value0:"alert",
        condition:[],
        sequence: [refeat({refeatValue: [seq_chase_Master_Run, seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 4})]
    })
    let Pet_UseWindmill_NowTargeting: string = eventWarper({
        name:"윈드밀 사용 - 인식 중", main:"process_skill", value0:"pos_toward_target", value1:"5000",
        condition:[],
        sequence: [seqPt(seq_SkillUse_ToEnenmyDirectMiddle)]
    })

    //총 17개 패턴
    let Pet_RoadRoller_AI: string[] =[
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Targeted_StWind,
        Pet_Master_Chase,
        Pet_ReadyToWindmill_MasterReady,
        Pet_ReadyToWindmill_MasterATK,
        Pet_UseWindmill_EnemyReady,
        Pet_UseWindmill_MasterATKed,
        Pet_UseWindmill_MasterATKedDown,
        Pet_UseWindmill_MasterEnemyReady,
        Pet_UseWindmill_ATKed,
        Pet_UseWindmill_ATK,
        Pet_ReadyToWindmill_Targeted,
        Pet_ReadyToWindmill_MasterTargeted,
    ]
    /*
    =========================볼트 서포터용 패턴====================================
    */
    let seq_ReadyFirebolt: SequenceType = {tabNum:4, case:"sequence", main: "stack_skill", value0: "firebolt", value1: "1"}
    let seq_SkillUse_Firebolt: SequenceType = {tabNum:4, case:"sequence", main: "stackmagic_attack", value0:"firebolt", value1:"1", value2:"5000"}
    let seq_RunawayShort: SequenceType = {tabNum:4, case:"sequence", main:"move_against", value0:"700", value1:"true", value2:"3000"}

    let Pet_ReadyFirebolt_MasterATK: string = eventWarper({
        name:"파볼트 사용 - 주인 공격", main:"master_attack", value0:"all",
        condition:[],
        sequence: [seqPt(seq_ReadyFirebolt), seqPt(seq_SkillUse_Firebolt)]
    })
    let Pet_ReadyFirebolt_ATK: string = eventWarper({
        name:"파볼트 사용 - 공격", main:"attack", value0:"all", value1:"true",
        condition:[],
        sequence: [refeat({refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8})]
    })
    let Pet_ReadyFirebolt_ATKed: string = eventWarper({
        name:"파볼트 사용 - 피격", main:"attacked", value0:"all", value1:"false",
        condition:[],
        sequence: [seqPt(seq_RunawayShort),refeat({refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8})]
    })

    let Pet_ReadyFirebolt_ATKedDown: string = eventWarper({
        name:"파볼트 사용 - 피격 다운", main:"attacked", value0:"all", value1:"true",
        condition:[],
        sequence: [seqPt(seq_RunawayShort),refeat({refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8})]
    })
    let Pet_ReadyFirebolt_MasterATKedDown: string = eventWarper({
        name:"파볼트 사용 - 주인 피격 다운", main:"master_attacked", value0:"all", value1:"false",
        condition:[],
        sequence: [refeat({refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8})]
    })
    let Pet_ReadyFirebolt_MasterATKed: string = eventWarper({
        name:"파볼트 사용 - 주인 피격", main:"master_attacked", value0:"all", value1:"true",
        condition:[],
        sequence: [refeat({refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8})]
    })
    let Pet_ReadyFirebolt_MasterReady: string = eventWarper({
        name:"파볼트 준비- 주인 준비", main:"master_skill_prepare", value0:"all",
        condition:[],
        sequence: [refeat({refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8})]
    })

    let Pet_ReadyFirebolt_MasterAimed: string = eventWarper({
        name:"파볼트 준비- 주인 조준", main:"master_aimed",
        condition:[],
        sequence: [refeat({refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8})]
    })
    let Pet_ReadyFirebolt_MastermagicAimed: string = eventWarper({
        name:"파볼트 준비- 주인 마법 조준", main:"master_target_magic_prepare",
        condition:[],
        sequence: [refeat({refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8})]
    })

    let Pet_BoltSupport_AI: string[] = [
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Targeted_StWind,
        Pet_Master_Chase,
        Pet_ReadyFirebolt_MasterATK,
        Pet_ReadyFirebolt_ATK,
        Pet_ReadyFirebolt_ATKed,
        Pet_ReadyFirebolt_ATKedDown,
        Pet_ReadyFirebolt_MasterATKedDown,
        Pet_ReadyFirebolt_MasterATKed,
        Pet_ReadyFirebolt_MasterReady,
        Pet_ReadyFirebolt_MasterAimed,
        Pet_ReadyFirebolt_MastermagicAimed,
    ]
    /*
    =========================축전지용 패턴====================================
    */
    //let seq_: string = SequenceType = {tabNum:4, case:"sequence", main: "", value0: "", value1: ""}
    //let Pet_: string = eventWarper({name:"",main:"",condition: [], sequence: []})
    let seq_ReadyElecbolt: SequenceType = {tabNum:4, case:"sequence", main: "prepare_skill", value0: "lightningbolt", value1: "0", value2:"0"}
    let seq_ReadyElecbolt0: SequenceType = {tabNum:4, case:"sequence", main: "stack_skill", value0: "lightningbolt", value1: "1"}
    let seq_ReadyElecbolt1: SequenceType = {tabNum:4, case:"sequence", main: "stack_skill", value0: "lightningbolt", value1: "2"}
    let seq_ReadyElecbolt2: SequenceType = {tabNum:4, case:"sequence", main: "stack_skill", value0: "lightningbolt", value1: "3"}
    let seq_UseElecbolt: SequenceType = {tabNum:4, case:"sequence", main: "stackmagic_attack", value0: "lightningbolt", value1: "1", value2:"0"}
    
    let Pet_ReadyElecBolt_MasterReady: string = eventWarper({
        name:"라볼트 준비 - 주인 준비", main:"master_skill_prepare", value0:"all",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt0),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt1),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt2),seqPt(seq_wait_Middle),seqPt(seq_chase_Enemy_Run_Long),seqPt(seq_wait_Middle),]
    })
    
    let Pet_ReadyElecBolt_MasterATK: string = eventWarper({
        name:"라볼트 준비 - 주인 공격", main:"master_skill_prepare", value0:"all",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt0),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt1),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt2),seqPt(seq_wait_Middle),seqPt(seq_chase_Enemy_Run_Long),seqPt(seq_wait_Middle),]
    })

    let Pet_UseElecbolt_MasterATKedDown: string = eventWarper({
        name:"라볼트 사용 - 주인 피격 다운", main:"master_attacked", value0:"all", value1:"false",
        condition:[],
        sequence: [seqPt(seq_UseElecbolt)]
    })
    let Pet_UseElecbolt_MasterATKed: string = eventWarper({
        name:"라볼트 사용 - 주인 피격 노다운", main:"master_attacked", value0:"all", value1:"true",
        condition:[],
        sequence: [seqPt(seq_UseElecbolt)]
    })
    let Pet_ReadyElecBolt_ATK: string = eventWarper({
        name:"라볼트 준비 - 펫 공격 노다운", main:"attack", value0:"lightningbolt", value1:"false",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt0),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt1),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt2),seqPt(seq_wait_Middle),seqPt(seq_chase_Enemy_Run_Long),seqPt(seq_wait_Middle),]
    })
    let Pet_ReadyElecBolt_ATKDown: string = eventWarper({
        name:"라볼트 준비 - 펫 공격 다운", main:"attack", value0:"lightningbolt", value1:"true",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt0),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt1),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt2),seqPt(seq_wait_Middle),seqPt(seq_chase_Enemy_Run_Long),seqPt(seq_wait_Middle),]
    })
    let Pet_UseElecbolt_ATKed: string = eventWarper({
        name:"라볼트 준비 - 피격 노다운", main:"attacked", value0:"all", value1:"true",
        condition:[],
        sequence: [seqPt(seq_UseElecbolt)]
    })
    let Pet_ReadyElecBolt_ATKedDown: string = eventWarper({
        name:"라볼트 준비 - 피격 다운", main:"attacked", value0:"all", value1:"true",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt0),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt1),seqPt(seq_ReadyElecbolt),seqPt(seq_ReadyElecbolt2),seqPt(seq_wait_Middle),seqPt(seq_chase_Enemy_Run_Long),seqPt(seq_wait_Middle),]
    })
    let Pet_UseElecbolt_MasterAimed: string = eventWarper({
        name:"라볼트 사용 - 주인 조준", main:"master_aimed",
        condition:[],
        sequence: [seqPt(seq_UseElecbolt)]
    })
    let Pet_UseElecbolt_Aimed: string = eventWarper({
        name:"라볼트 사용 - 조준", main:"aimed",
        condition:[],
        sequence: [seqPt(seq_UseElecbolt)]
    })

    let Pet_Battery_AI: string[] = [
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Targeted_StWind,
        Pet_Master_Chase,
        Pet_ReadyElecBolt_MasterReady,
        Pet_ReadyElecBolt_MasterATK,
        Pet_UseElecbolt_MasterATKedDown,
        Pet_UseElecbolt_MasterATKed,
        Pet_ReadyElecBolt_ATK,
        Pet_ReadyElecBolt_ATKDown,
        Pet_UseElecbolt_ATKed,
        Pet_ReadyElecBolt_ATKedDown,
        Pet_UseElecbolt_MasterAimed,
        Pet_UseElecbolt_Aimed,
    ]
    /*
    =========================예비용 패턴====================================
    */
    //let seq_: string = SequenceType = {tabNum:4, case:"sequence", main: "", value0: "", value1: ""}
    //let Pet_: string = eventWarper({name:"",main:"",condition: [], sequence: []})

    let seq_Blaze_Stacking_Wait: SequenceType = {tabNum:4, case:"sequence", main: "wait", value0: "1000", value1: "2000"}
    let seq_Blaze_StackATK_Ice: SequenceType = {tabNum:4, case:"sequence", main: "stackmagic_attack", value0: "icebolt", value1: "1", value2: '0'}
    let seq_Blaze_Ready_IceReady: SequenceType = {tabNum:4, case:"sequence", main: "prepare_skill", value0: "icebolt", value1: "0", value2: '0'}
    let seq_Blaze_Ready_Ice: SequenceType = {tabNum:4, case:"sequence", main: "stack_skill", value0: "icebolt", value1: "2"}
    //let seq_: string = SequenceType = {tabNum:4, case:"sequence", main: "", value0: "", value1: ""}
    //let seq_: string = SequenceType = {tabNum:4, case:"sequence", main: "", value0: "", value1: ""}
    //let seq_: string = SequenceType = {tabNum:4, case:"sequence", main: "", value0: "", value1: ""}
    //let seq_: string = SequenceType = {tabNum:4, case:"sequence", main: "", value0: "", value1: ""}

    let Pet_Blaze_ATK: string = eventWarper({
        name:"블레이즈 시간 끌기", main:"master_attack", value0: "basic",
        condition:[],
        sequence: [seqPt(seq_Blaze_Stacking_Wait), seqPt(seq_Blaze_StackATK_Ice)]
    })
    let Pet_Blaze_ATK0: string = eventWarper({
        name:"블레이즈 시간 끌기 이어서", main:"attack", value0: "icebolt", value1: "false",
        condition:[],
        sequence: [seqPt(seq_Blaze_Stacking_Wait), seqPt(seq_Blaze_StackATK_Ice)]
    })

    let Pet_Blaze_Reload: string = eventWarper({
        name:"블레이즈 재장전", main:"master_attack", value0: "all",
        condition:[conPt(con_enemy_Hit_Blow), conPt(con_enemy_Hit_Shoved)],
        sequence: [refeat({refeatValue:[seq_Blaze_Ready_IceReady, seq_Blaze_Ready_Ice], refeatNum:2}), refeat({refeatValue:[seq_chase_Master_Run, seq_wait_Middle], refeatNum:3})]
    })

    let Pet_Blaze_Load: string = eventWarper({
        name:"블레이즈 장전", main:"master_skill_prepare", value0: "defence",
        condition:[],
        sequence: [refeat({refeatValue:[seq_Blaze_Ready_IceReady, seq_Blaze_Ready_Ice], refeatNum:2}), refeat({refeatValue:[seq_chase_Master_Run, seq_wait_Middle], refeatNum:3})]
    })


    let Pet_Blaze_AI: string[] = [
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Targeted_StWind,
        Pet_Master_Chase,
        Pet_MasterAttacked_Stand_Revenge,
        Pet_MasterAttacked_Down_Revenge,
        Pet_Blaze_ATK,
        Pet_Blaze_ATK0,
        Pet_Blaze_Reload,
        Pet_Blaze_Load
    ]

    return {
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Targeted_StWind,
        Pet_MasterTargeted_Missile,
        Pet_PetTargeted_Missile,
        Pet_Master_Chase,
        Pet_Main_Defence,
        Pet_Main_Defence1,
        Pet_MasterTargeted_Alert_Defence,
        Pet_MasterTargeted_AtK_Defence,
        Pet_MasterAttacked_Stand_Revenge,
        Pet_MasterAttacked_Down_Revenge,
        Pet_DefenceAttacked_Revenge,
        Pet_AttackedDown_Defence,
        Pet_AfterAtKStand_Defence,
        Pet_AfterAtKDown_Defence,
        Pet_MasterTargeted_Alert_DoNothing,
        Pet_MasterTargeted_AtK_DoNothing,
        Pet_AttackedDown_DoNothing, Pet_AttackedStand_DoNothing, 
        Pet_MasterAttacked_Stand_DoNothing, 
        Pet_MasterAttacked_Down_DoNothing, 
        Pet_MasterAttack_Down_DoNothing, 
        Pet_MasterReady_DoNothing, 
        Pet_Targeting_DoNothing, 
        Pet_Targeted_DoNothing,
        Pet_Attack_DoNothing,
        Pet_AttackDown_DoNothing,
        Pet_Chaser_AI_Package,
        Pet_Defender_AI_Package,
        Pet_Original_AI,
        Pet_RoadRoller_AI,
        Pet_BoltSupport_AI,
        Pet_Battery_AI,
        Pet_Blaze_AI
        
    }
}
/*

    return returnValue;
}
*/