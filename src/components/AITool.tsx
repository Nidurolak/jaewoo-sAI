import React, { useState, ChangeEvent, useEffect } from 'react';
import { conPt, eventWarper, seqPt, } from '../hooks/AiMakerHook';
import { ConditionType, EventTypes, SequenceType, } from '../utils/types';

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
    let seq_chase_Target_ClockRun_Far_Long: SequenceType = { tabNum: 4, case: "sequence", main: "move_around", value0: "true", value1: "1000", value2: "true", value3: "10000" };
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

    let Pet_MasterActive_StWind_event: EventTypes = {
        name: "자동 신속 사용", main: "master_skill_prepare", value0: "all",
        condition: [conPt(con_pet_Ready_ST)],
        sequence: [seqPt(seq_cancel), seqPt(seq_Ready_StWind)]
    };
    let Pet_MasterActive_StWind: EventTypes = {
        name: "자동 신속 사용", main: "master_skill_prepare", value0: "all",
        condition: [conPt(con_pet_Ready_ST)],
        sequence: [seqPt(seq_cancel), seqPt(seq_Ready_StWind)]
    };
    let Pet_SeekTarget_StWind: EventTypes = {
        name: "자동 신속 사용0", main: "now_targeting",
        condition: [conPt(con_pet_Ready_ST)],
        sequence: [seqPt(seq_cancel), seqPt(seq_Ready_StWind)]
    };
    let Pet_Targeted_StWind: EventTypes = {
        name: "자동 신속 사용1", main: "now_targeting", value0: "alert",
        condition: [conPt(con_pet_Ready_ST)],
        sequence: [seqPt(seq_cancel), seqPt(seq_Ready_StWind)]
    };
    let Pet_MasterTargeted_Missile: EventTypes = {
        name: "자동 펫 미사일 - 주인", main: "master_aimed",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    };
    let Pet_PetTargeted_Missile: EventTypes = {
        name: "자동 펫 미사일 - 펫", main: "aimed",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    };
    let Pet_Master_Chase: EventTypes = {
        name: "주인 접근 트리거 - 윈드밀", main: "master_skill_prepare", value0: "windmill",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_chase_Master_Run), refeat({ refeatValue: [seq_wait_Long], refeatNum: 4 })]
    }
    let Pet_MasterAttacked_Stand_Revenge: EventTypes = {
        name: "주인 피격시 - 복수1", main: "master_attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    }
    let Pet_MasterAttacked_Down_Revenge: EventTypes = {
        name: "주인 피격시 - 복수2", main: "master_attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    }
    /*
    =========================펫 디펜더용 패턴====================================
    */
    let Pet_Main_Defence: EventTypes = {
        name: "메인 디펜스", main: "master_attack", value0: "all",
        condition: [conPt(con_enemy_Hit_Blow), conPt(con_enemy_Hit_Hit), conPt(con_enemy_Hit_Shoved)],
        sequence: [seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 5 }), seqPt(seq_cancel)]
    }
    let Pet_Main_Defence1: EventTypes = {
        name: "메인 디펜스1", main: "master_skill_prepare", value0: "all",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Run), seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 5 }), seqPt(seq_cancel)]
    }
    let Pet_DefenceAttacked_Revenge: EventTypes = {
        name: "디펜스 피격시 - 복수", main: "defence", value0: "all",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    }
    let Pet_AttackedDown_Defence: EventTypes = {
        name: "피격다운시 - 디펜스", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Run), seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    }
    let Pet_MasterTargeted_Alert_Defence: EventTypes = {
        name: "주인 가인식시 - 디펜스", main: "master_targeted", value0: "alert",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Walk), seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    }
    let Pet_MasterTargeted_AtK_Defence: EventTypes = {
        name: "주인 인식시 - 디펜스", main: "master_targeted", value0: "attack",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Walk), seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    }
    let Pet_AfterAtKStand_Defence: EventTypes = {
        name: "주인 지키기 - 평타 후 디펜스", main: "attack", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    }
    let Pet_AfterAtKDown_Defence: EventTypes = {
        name: "주인 지키기 - 평타 후 디펜스", main: "attack", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_defence_Ready), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 6 }), seqPt(seq_cancel)]
    }
    let Pet_Defender_AI_Package: string[] = [
        eventWarper(Pet_MasterActive_StWind_event),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Targeted_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_MasterTargeted_AtK_Defence),
        eventWarper(Pet_MasterTargeted_Alert_Defence),
        eventWarper(Pet_DefenceAttacked_Revenge),
        eventWarper(Pet_MasterAttacked_Stand_Revenge),
        eventWarper(Pet_MasterAttacked_Down_Revenge),
        eventWarper(Pet_AfterAtKDown_Defence),
        eventWarper(Pet_AfterAtKStand_Defence),
        eventWarper(Pet_Main_Defence),
        eventWarper(Pet_Main_Defence1),
        eventWarper(Pet_AttackedDown_Defence),
        eventWarper(Pet_PetTargeted_Missile),
        eventWarper(Pet_MasterTargeted_Missile),
    ]

    let Pet_Defender_AI_Package_Copy: EventTypes[] = [
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
    let Pet_MasterTargeted_Alert_DoNothing: EventTypes = {
        name: "주인 가인식시 - 주인추적", main: "master_targeted", value0: "alert",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_MasterTargeted_AtK_DoNothing: EventTypes = {
        name: "주인 인식시 - 주인추적", main: "master_targeted", value0: "attack",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_AttackedDown_DoNothing: EventTypes = {
        name: "피격다운시 - 주인추적", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_AttackedStand_DoNothing: EventTypes = {
        name: "피격노다운시 - 주인추적", main: "attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_MasterAttacked_Stand_DoNothing: EventTypes = {
        name: "주인 피격다운시 - 주인추적", main: "master_attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_MasterAttacked_Down_DoNothing: EventTypes = {
        name: "주인 피격노다운시 - 주인추적", main: "master_attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_MasterAttack_Down_DoNothing: EventTypes = {
        name: "주인 공격시 - 주인추적", main: "master_attack", value0: "all",
        condition: [conPt(con_enemy_Hit_Blow), conPt(con_enemy_Hit_Hit), conPt(con_enemy_Hit_Shoved)],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_MasterReady_DoNothing: EventTypes = {
        name: "주인 스킬 준비 - 주인추적", main: "master_skill_prepare", value0: "all",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_Targeting_DoNothing: EventTypes = {
        name: "펫 인식함 - 주인추적", main: "seek_target",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_Targeted_DoNothing: EventTypes = {
        name: "펫 인식중 - 주인추적", main: "now_targeting",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_Attack_DoNothing: EventTypes = {
        name: "펫 추가타넣지않기1 - 주인추적", main: "attack", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_AttackDown_DoNothing: EventTypes = {
        name: "펫 추가타넣지않기2 - 주인추적", main: "attack", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Walk, seq_wait_Short], refeatNum: 11 }),]
    }
    let Pet_Chaser_AI_Package: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_MasterTargeted_Alert_DoNothing),
        eventWarper(Pet_MasterTargeted_AtK_DoNothing),
        eventWarper(Pet_AttackedDown_DoNothing),
        eventWarper(Pet_AttackedStand_DoNothing),
        eventWarper(Pet_MasterAttacked_Down_DoNothing),
        eventWarper(Pet_MasterAttacked_Stand_DoNothing),
        eventWarper(Pet_MasterAttack_Down_DoNothing),
        eventWarper(Pet_MasterReady_DoNothing),
        eventWarper(Pet_Targeting_DoNothing),
        eventWarper(Pet_Targeted_DoNothing),
        eventWarper(Pet_Attack_DoNothing),
        eventWarper(Pet_AttackDown_DoNothing),]

    let Pet_Chaser_AI_Package_Copy: EventTypes[] = [
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
    let seq_chase_Enemy_Run_Infinity: SequenceType = { tabNum: 4, case: "sequence", main: "chase", value0: "enemy", value1: "0", value2: "true" };
    let seq_chase_Enemy_Run_Long: SequenceType = { tabNum: 4, case: "sequence", main: "chase", value0: "enemy", value1: "5000", value2: "true" };
    let seq_chase_Enemy_Circle: SequenceType = { tabNum: 4, case: "sequence", main: "move_around", value0: "true", value1: "100", value2: "false", value3: "4000" };
    let Pet_Magic_Protect_Master: EventTypes = {
        name: "주인-적 마법 준비 - 방해하기", main: "master_target_magic_prepare",
        condition: [conPt(con_enemy_State_Stop)],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]
    }
    let Pet_Magic_Protect: EventTypes = {
        name: "적 마법 준비 - 방해하기", main: "target_magic_prepare",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK)]

    }
    let Pet_AttackedStand_Revenge: EventTypes = {
        name: "피격노다운시 - 반격", main: "attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK),]
    }
    let Pet_AttackedDown_Revenge: EventTypes = {
        name: "피격다운시 - 반격", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK),]
    }
    let Pet_Attack_WithMaster: EventTypes = {
        name: "주인방어시 - 협공", main: "master_defence", value0: "all",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_meleeATK),]
    }
    let Pet_DonotTroll_MasterAttack: EventTypes = {
        name: "주인 공격시 방해 안하기", main: "master_attack", value0: "all",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_chase_Enemy_Run_Long), seqPt(seq_chase_Enemy_Circle)]
    }
    let Pet_DonotTroll_Attack: EventTypes = {
        name: "펫 공격시 방해 안하기", main: "attack", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_cancel), seqPt(seq_chase_Enemy_Run_Long), seqPt(seq_chase_Enemy_Circle)]
    }

    let Pet_Original_AI: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Targeted_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_MasterAttacked_Stand_Revenge),
        eventWarper(Pet_MasterAttacked_Down_Revenge),
        eventWarper(Pet_Magic_Protect_Master),
        eventWarper(Pet_MasterTargeted_Missile),
        eventWarper(Pet_PetTargeted_Missile),
        eventWarper(Pet_AttackedStand_Revenge),
        eventWarper(Pet_AttackedDown_Revenge),
        eventWarper(Pet_Attack_WithMaster),
        eventWarper(Pet_DonotTroll_MasterAttack),
        eventWarper(Pet_DonotTroll_Attack),
        eventWarper(Pet_Magic_Protect)
    ]

    let Pet_Original_AI_Copy: EventTypes[] = [
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
    let seq_ReadyWindMill: SequenceType = { tabNum: 4, case: "sequence", main: "prepare_skill", value0: "windmill", value1: "0", value2: "0" }
    let seq_SkillUse_ToEnemyGround: SequenceType = { tabNum: 4, case: "sequence", main: "process_skill", value0: "pos_toward_target", value1: "10000" }
    let seq_SkillUse_ToEnenmyDirectLong: SequenceType = { tabNum: 4, case: "sequence", main: "process_skill", value0: "enemy", value1: "10000" }
    let seq_SkillUse_ToEnenmyDirectMiddle: SequenceType = { tabNum: 4, case: "sequence", main: "process_skill", value0: "enemy", value1: "5000" }
    let seq_SkillUse_ToEnenmyDirectInfinite: SequenceType = { tabNum: 4, case: "sequence", main: "process_skill", value0: "enemy", value1: "0" }

    let Pet_ReadyToWindmill_MasterReady: EventTypes = {
        name: "윈드밀 준비 - 주인 스킬 준비", main: "master_skill_prepare", value0: "all",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Run), refeat({ refeatValue: [seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 5 })]
    }
    let Pet_ReadyToWindmill_MasterATK: EventTypes = {
        name: "윈드밀 준비 - 주인 모든 공격", main: "master_skill_prepare", value0: "all",
        condition: [],
        sequence: [seqPt(seq_chase_Master_Run), refeat({ refeatValue: [seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 5 })]
    }
    let Pet_UseWindmill_MasterATKed: EventTypes = {
        name: "윈드밀 사용 - 주인 피격 노다운", main: "master_attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_SkillUse_ToEnenmyDirectInfinite), seqPt(seq_cancel)]
    }
    let Pet_UseWindmill_MasterATKedDown: EventTypes = {
        name: "윈드밀 사용 - 주인 피격 다운", main: "master_attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_SkillUse_ToEnenmyDirectMiddle), refeat({ refeatValue: [seq_chase_Master_Run, seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 3 })]
    }
    let Pet_UseWindmill_EnemyReady: EventTypes = {
        name: "윈드밀 사용 - 적 준비", main: "target_skill_prepare",
        condition: [],
        sequence: [seqPt(seq_SkillUse_ToEnemyGround), seqPt(seq_SkillUse_ToEnenmyDirectLong)]
    }
    let Pet_UseWindmill_MasterEnemyReady: EventTypes = {
        name: "윈드밀 사용 - 주인 적 준비", main: "master_target_skill_prepare",
        condition: [],
        sequence: [seqPt(seq_SkillUse_ToEnemyGround), seqPt(seq_SkillUse_ToEnenmyDirectLong)]
    }
    let Pet_UseWindmill_ATKed: EventTypes = {
        name: "윈드밀 사용 - 피격 다운", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_SkillUse_ToEnenmyDirectLong)]
    }
    let Pet_UseWindmill_ATK: EventTypes = {
        name: "윈드밀 사용 - 공격 성공", main: "attack", value0: "all", value1: "true",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_chase_Master_Run, seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 4 })]
    }
    let Pet_ReadyToWindmill_Targeted: EventTypes = {
        name: "윈드밀 준비 - 펫 인식당함", main: "targeted", value0: "alert",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_chase_Master_Run, seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 4 })]
    }
    let Pet_ReadyToWindmill_MasterTargeted: EventTypes = {
        name: "윈드밀 준비 - 주인 인식당함", main: "master_targeted", value0: "alert",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_chase_Master_Run, seq_ReadyWindMill, seq_wait_Middle, seq_cancel], refeatNum: 4 })]
    }
    let Pet_UseWindmill_NowTargeting: EventTypes = {
        name: "윈드밀 사용 - 인식 중", main: "process_skill", value0: "pos_toward_target", value1: "5000",
        condition: [],
        sequence: [seqPt(seq_SkillUse_ToEnenmyDirectMiddle)]
    }

    //총 17개 패턴
    let Pet_RoadRoller_AI: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Targeted_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_ReadyToWindmill_MasterReady),
        eventWarper(Pet_ReadyToWindmill_MasterATK),
        eventWarper(Pet_UseWindmill_EnemyReady),
        eventWarper(Pet_UseWindmill_MasterATKed),
        eventWarper(Pet_UseWindmill_MasterATKedDown),
        eventWarper(Pet_UseWindmill_MasterEnemyReady),
        eventWarper(Pet_UseWindmill_ATKed),
        eventWarper(Pet_UseWindmill_ATK),
        eventWarper(Pet_ReadyToWindmill_Targeted),
        eventWarper(Pet_ReadyToWindmill_MasterTargeted),
    ]

    let Pet_RoadRoller_AI_Copy: EventTypes[] = [
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
    let seq_ReadyFirebolt: SequenceType = { tabNum: 4, case: "sequence", main: "stack_skill", value0: "firebolt", value1: "1" }
    let seq_SkillUse_Firebolt: SequenceType = { tabNum: 4, case: "sequence", main: "stackmagic_attack", value0: "firebolt", value1: "1", value2: "5000" }
    let seq_RunawayShort: SequenceType = { tabNum: 4, case: "sequence", main: "move_against", value0: "700", value1: "true", value2: "3000" }

    let Pet_ReadyFirebolt_MasterATK: EventTypes = {
        name: "파볼트 사용 - 주인 공격", main: "master_attack", value0: "all",
        condition: [],
        sequence: [seqPt(seq_ReadyFirebolt), seqPt(seq_SkillUse_Firebolt)]
    }
    let Pet_ReadyFirebolt_ATK: EventTypes = {
        name: "파볼트 사용 - 공격", main: "attack", value0: "all", value1: "true",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8 })]
    }
    let Pet_ReadyFirebolt_ATKed: EventTypes = {
        name: "파볼트 사용 - 피격", main: "attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_RunawayShort), refeat({ refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8 })]
    }

    let Pet_ReadyFirebolt_ATKedDown: EventTypes = {
        name: "파볼트 사용 - 피격 다운", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_RunawayShort), refeat({ refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8 })]
    }
    let Pet_ReadyFirebolt_MasterATKedDown: EventTypes = {
        name: "파볼트 사용 - 주인 피격 다운", main: "master_attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8 })]
    }
    let Pet_ReadyFirebolt_MasterATKed: EventTypes = {
        name: "파볼트 사용 - 주인 피격", main: "master_attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8 })]
    }
    let Pet_ReadyFirebolt_MasterReady: EventTypes = {
        name: "파볼트 준비- 주인 준비", main: "master_skill_prepare", value0: "all",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8 })]
    }

    let Pet_ReadyFirebolt_MasterAimed: EventTypes = {
        name: "파볼트 준비- 주인 조준", main: "master_aimed",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8 })]
    }
    let Pet_ReadyFirebolt_MastermagicAimed: EventTypes = {
        name: "파볼트 준비- 주인 마법 조준", main: "master_target_magic_prepare",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_ReadyFirebolt, seq_SkillUse_Firebolt,], refeatNum: 8 })]
    }

    let Pet_BoltSupport_AI: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Targeted_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_ReadyFirebolt_MasterATK),
        eventWarper(Pet_ReadyFirebolt_ATK),
        eventWarper(Pet_ReadyFirebolt_ATKed),
        eventWarper(Pet_ReadyFirebolt_ATKedDown),
        eventWarper(Pet_ReadyFirebolt_MasterATKedDown),
        eventWarper(Pet_ReadyFirebolt_MasterATKed),
        eventWarper(Pet_ReadyFirebolt_MasterReady),
        eventWarper(Pet_ReadyFirebolt_MasterAimed),
        eventWarper(Pet_ReadyFirebolt_MastermagicAimed),
    ]


    let Pet_BoltSupport_AI_Copy: EventTypes[] = [
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
    //let Pet_: EventTypes = {name:"",main:"",condition: [], sequence: []})
    let seq_ReadyElecbolt: SequenceType = { tabNum: 4, case: "sequence", main: "prepare_skill", value0: "lightningbolt", value1: "0", value2: "0" }
    let seq_ReadyElecbolt0: SequenceType = { tabNum: 4, case: "sequence", main: "stack_skill", value0: "lightningbolt", value1: "1" }
    let seq_ReadyElecbolt1: SequenceType = { tabNum: 4, case: "sequence", main: "stack_skill", value0: "lightningbolt", value1: "2" }
    let seq_ReadyElecbolt2: SequenceType = { tabNum: 4, case: "sequence", main: "stack_skill", value0: "lightningbolt", value1: "3" }
    let seq_UseElecbolt: SequenceType = { tabNum: 4, case: "sequence", main: "stackmagic_attack", value0: "lightningbolt", value1: "1", value2: "0" }

    let Pet_ReadyElecBolt_MasterReady: EventTypes = {
        name: "라볼트 준비 - 주인 준비", main: "master_skill_prepare", value0: "all",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt0), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt1), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt2), seqPt(seq_wait_Middle), seqPt(seq_chase_Enemy_Run_Long), seqPt(seq_wait_Middle),]
    }

    let Pet_ReadyElecBolt_MasterATK: EventTypes = {
        name: "라볼트 준비 - 주인 공격", main: "master_skill_prepare", value0: "all",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt0), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt1), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt2), seqPt(seq_wait_Middle), seqPt(seq_chase_Enemy_Run_Long), seqPt(seq_wait_Middle),]
    }

    let Pet_UseElecbolt_MasterATKedDown: EventTypes = {
        name: "라볼트 사용 - 주인 피격 다운", main: "master_attacked", value0: "all", value1: "false",
        condition: [],
        sequence: [seqPt(seq_UseElecbolt)]
    }
    let Pet_UseElecbolt_MasterATKed: EventTypes = {
        name: "라볼트 사용 - 주인 피격 노다운", main: "master_attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_UseElecbolt)]
    }
    let Pet_ReadyElecBolt_ATK: EventTypes = {
        name: "라볼트 준비 - 펫 공격 노다운", main: "attack", value0: "lightningbolt", value1: "false",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt0), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt1), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt2), seqPt(seq_wait_Middle), seqPt(seq_chase_Enemy_Run_Long), seqPt(seq_wait_Middle),]
    }
    let Pet_ReadyElecBolt_ATKDown: EventTypes = {
        name: "라볼트 준비 - 펫 공격 다운", main: "attack", value0: "lightningbolt", value1: "true",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt0), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt1), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt2), seqPt(seq_wait_Middle), seqPt(seq_chase_Enemy_Run_Long), seqPt(seq_wait_Middle),]
    }
    let Pet_UseElecbolt_ATKed: EventTypes = {
        name: "라볼트 준비 - 피격 노다운", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_UseElecbolt)]
    }
    let Pet_ReadyElecBolt_ATKedDown: EventTypes = {
        name: "라볼트 준비 - 피격 다운", main: "attacked", value0: "all", value1: "true",
        condition: [],
        sequence: [seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt0), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt1), seqPt(seq_ReadyElecbolt), seqPt(seq_ReadyElecbolt2), seqPt(seq_wait_Middle), seqPt(seq_chase_Enemy_Run_Long), seqPt(seq_wait_Middle),]
    }
    let Pet_UseElecbolt_MasterAimed: EventTypes = {
        name: "라볼트 사용 - 주인 조준", main: "master_aimed",
        condition: [],
        sequence: [seqPt(seq_UseElecbolt)]
    }
    let Pet_UseElecbolt_Aimed: EventTypes = {
        name: "라볼트 사용 - 조준", main: "aimed",
        condition: [],
        sequence: [seqPt(seq_UseElecbolt)]
    }

    let Pet_Battery_AI: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Targeted_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_ReadyElecBolt_MasterReady),
        eventWarper(Pet_ReadyElecBolt_MasterATK),
        eventWarper(Pet_UseElecbolt_MasterATKedDown),
        eventWarper(Pet_UseElecbolt_MasterATKed),
        eventWarper(Pet_ReadyElecBolt_ATK),
        eventWarper(Pet_ReadyElecBolt_ATKDown),
        eventWarper(Pet_UseElecbolt_ATKed),
        eventWarper(Pet_ReadyElecBolt_ATKedDown),
        eventWarper(Pet_UseElecbolt_MasterAimed),
        eventWarper(Pet_UseElecbolt_Aimed),
    ]

    let Pet_Battery_AI_Copy: EventTypes[] = [
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
    =========================블레이즈 서포터용 패턴====================================
    */
    let seq_Blaze_Stacking_Wait: SequenceType = { tabNum: 4, case: "sequence", main: "wait", value0: "1000", value1: "2000" }
    let seq_Blaze_StackATK_Ice: SequenceType = { tabNum: 4, case: "sequence", main: "stackmagic_attack", value0: "icebolt", value1: "1", value2: '0' }
    let seq_Blaze_Ready_IceReady: SequenceType = { tabNum: 4, case: "sequence", main: "prepare_skill", value0: "icebolt", value1: "0", value2: '0' }
    let seq_Blaze_Ready_Ice: SequenceType = { tabNum: 4, case: "sequence", main: "stack_skill", value0: "icebolt", value1: "2" }

    let Pet_Blaze_ATK: EventTypes = {
        name: "블레이즈 시간 끌기", main: "master_attack", value0: "basic",
        condition: [],
        sequence: [seqPt(seq_Blaze_Stacking_Wait), seqPt(seq_Blaze_StackATK_Ice)]
    }
    let Pet_Blaze_ATK0: EventTypes = {
        name: "블레이즈 시간 끌기 이어서", main: "attack", value0: "icebolt", value1: "false",
        condition: [],
        sequence: [seqPt(seq_Blaze_Stacking_Wait), seqPt(seq_Blaze_StackATK_Ice)]
    }

    let Pet_Blaze_Reload: EventTypes = {
        name: "블레이즈 재장전", main: "master_attack", value0: "all",
        condition: [conPt(con_enemy_Hit_Blow), conPt(con_enemy_Hit_Shoved)],
        sequence: [refeat({ refeatValue: [seq_Blaze_Ready_IceReady, seq_Blaze_Ready_Ice], refeatNum: 2 }), refeat({ refeatValue: [seq_chase_Master_Run, seq_wait_Middle], refeatNum: 3 })]
    }

    let Pet_Blaze_Load: EventTypes = {
        name: "블레이즈 장전", main: "master_skill_prepare", value0: "defence",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_Blaze_Ready_IceReady, seq_Blaze_Ready_Ice], refeatNum: 2 }), refeat({ refeatValue: [seq_chase_Master_Run, seq_wait_Middle], refeatNum: 3 })]
    }


    let Pet_Blaze_AI: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Targeted_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_MasterAttacked_Stand_Revenge),
        eventWarper(Pet_MasterAttacked_Down_Revenge),
        eventWarper(Pet_Blaze_ATK),
        eventWarper(Pet_Blaze_ATK0),
        eventWarper(Pet_Blaze_Reload),
        eventWarper(Pet_Blaze_Load)
    ]

    let Pet_Blaze_AI_Copy: EventTypes[] = [
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
    /*
    =========================메디이익용 패턴====================================
    */
    let seq_Healing_Ready: SequenceType = { tabNum: 4, case: "sequence", main: "prepare_skill", value0: "healing", value1: "0", value2: "0" }
    let seq_Process_To_Master: SequenceType = { tabNum: 4, case: "sequence", main: "process_skill", value0: "master", value1: "0" }
    let seq_FirstAid_Ready: SequenceType = { tabNum: 4, case: "sequence", main: "prepare_skill", value0: "firstaid", value1: "0", value2: "0" }
    let seq_Healing_Wait: SequenceType = { tabNum: 4, case: "sequence", main: "wait", value0: "660", value1: "660" }

    let con_Check_Heal: ConditionType = { tabNum: 3, case: "condition", main: "skill_preparable", value0: "healing" }
    let con_Check_Health: ConditionType = { tabNum: 3, case: "condition", main: "master_damaged_life_greater", value0: "100" }
    let con_Check_FirstAid: ConditionType = { tabNum: 3, case: "condition", main: "skill_preparable", value0: "firstaid" }

    let Pet_Heal_MasterATKedDown: EventTypes = {
        name: "힐링-주인피격-노다운", main: "master_attacked", value0: "all", value1: "true",
        condition: [conPt(con_Check_Heal), conPt(con_Check_Health)],
        sequence: [seqPt(seq_Healing_Ready), refeat({ refeatValue: [seq_Process_To_Master, seq_Healing_Wait], refeatNum: 5 })]
    }

    let Pet_Heal_MasterATKed: EventTypes = {
        name: "힐링-주인피격-다운", main: "master_attacked", value0: "all", value1: "false",
        condition: [conPt(con_Check_Heal), conPt(con_Check_Health)],
        sequence: [seqPt(seq_Healing_Ready), refeat({ refeatValue: [seq_Process_To_Master, seq_Healing_Wait], refeatNum: 5 })]
    }

    let Pet_Heal_MasterSkillReady: EventTypes = {
        name: "힐링-주인스킬준비", main: "master_skill_prepare", value0: "all",
        condition: [conPt(con_Check_Heal), conPt(con_Check_Health)],
        sequence: [seqPt(seq_Healing_Ready), refeat({ refeatValue: [seq_Process_To_Master, seq_Healing_Wait], refeatNum: 5 })]
    }
    let Pet_FirstAid_MasterSkillReady: EventTypes = {
        name: "응치-주인스킬준비", main: "master_skill_prepare", value0: "firstaid",
        condition: [conPt(con_Check_FirstAid)],
        sequence: [seqPt(seq_FirstAid_Ready), seqPt(seq_Process_To_Master)]
    }
    let Pet_Heal_MasterATK: EventTypes = {
        name: "힐링-주인공격", main: "master_attack", value0: "all",
        condition: [conPt(con_Check_Heal), conPt(con_Check_Health)],
        sequence: [seqPt(seq_Healing_Ready), refeat({ refeatValue: [seq_Process_To_Master, seq_Healing_Wait], refeatNum: 5 })]
    }
    let Pet_Heal_Seek: EventTypes = {
        name: "힐링-인식", main: "seek_target",
        condition: [conPt(con_Check_Heal), conPt(con_Check_Health)],
        sequence: [seqPt(seq_Healing_Ready), refeat({ refeatValue: [seq_Process_To_Master, seq_Healing_Wait], refeatNum: 5 })]
    }

    let Pet_Heal_Seeking: EventTypes = {
        name: "힐링-인식중", main: "now_targeting",
        condition: [conPt(con_Check_Heal), conPt(con_Check_Health)],
        sequence: [seqPt(seq_Healing_Ready), refeat({ refeatValue: [seq_Process_To_Master, seq_Healing_Wait], refeatNum: 5 })]
    }
    let Pet_Heal_ATKed: EventTypes = {
        name: "힐링-피격 노다운", main: "attacked", value0: "all", value1: "false",
        condition: [conPt(con_Check_Heal), conPt(con_Check_Health)],
        sequence: [seqPt(seq_Healing_Ready), refeat({ refeatValue: [seq_Process_To_Master, seq_Healing_Wait], refeatNum: 5 })]
    }
    let Pet_Heal_ATKedDown: EventTypes = {
        name: "힐링-피격 노다운", main: "attacked", value0: "all", value1: "true",
        condition: [conPt(con_Check_Heal), conPt(con_Check_Health)],
        sequence: [seqPt(seq_Healing_Ready), refeat({ refeatValue: [seq_Process_To_Master, seq_Healing_Wait], refeatNum: 5 })]
    }

    let Pet_Medic_AI: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Targeted_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_Attack_DoNothing),
        eventWarper(Pet_AttackDown_DoNothing),
        eventWarper(Pet_Heal_MasterATKedDown),
        eventWarper(Pet_Heal_MasterATKed),
        eventWarper(Pet_Heal_MasterSkillReady),
        eventWarper(Pet_Heal_MasterATK),
        eventWarper(Pet_FirstAid_MasterSkillReady),
        eventWarper(Pet_Heal_Seek),
        eventWarper(Pet_Heal_Seeking),
        eventWarper(Pet_Heal_ATKed),
        eventWarper(Pet_Heal_ATKedDown),
    ]

    let Pet_Medic_AI_Copy: EventTypes[] = [
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Targeted_StWind,
        Pet_Master_Chase,
        Pet_Attack_DoNothing,
        Pet_AttackDown_DoNothing,
        Pet_Heal_MasterATKedDown,
        Pet_Heal_MasterATKed,
        Pet_Heal_MasterSkillReady,
        Pet_Heal_MasterATK,
        Pet_FirstAid_MasterSkillReady,
        Pet_Heal_Seek,
        Pet_Heal_Seeking,
        Pet_Heal_ATKed,
        Pet_Heal_ATKedDown,
    ]
    /*
    =========================폭스 헌터 용 패턴====================================
    */
    let Pet_FoxHunter_ATKSeek: EventTypes = {
        name: "인식 적 공격", main: "seek_target",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_meleeATK], refeatNum: 10 })]
    }
    let Pet_FoxHunter_ATKTargetting: EventTypes = {
        name: "타겟팅 적 공격", main: "now_targeting",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_meleeATK], refeatNum: 10 })]
    }
    let Pet_FoxHunter_ATKSeeked: EventTypes = {
        name: "가인식당함 적 공격", main: "targeted", value0: "attack",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_meleeATK], refeatNum: 10 })]
    }
    let Pet_FoxHunter_ATKSeekedATK: EventTypes = {
        name: "인식당함 적 공격", main: "targeted", value0: "alert",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_meleeATK], refeatNum: 10 })]
    }
    let Pet_FoxHunter_Mater_ATKSeeked: EventTypes = {
        name: "주인가인식 적 공격", main: "master_targeted", value0: "alert",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_meleeATK], refeatNum: 10 })]
    }
    let Pet_FoxHunter_Master_ATKSeekedATK: EventTypes = {
        name: "주인인식 적 공격", main: "master_targeted", value0: "attack",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_meleeATK], refeatNum: 10 })]
    }

    let Pet_FoxHunter_AI: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Targeted_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_FoxHunter_ATKSeek),
        eventWarper(Pet_FoxHunter_ATKTargetting),
        eventWarper(Pet_FoxHunter_ATKSeeked),
        eventWarper(Pet_FoxHunter_ATKSeekedATK),
        eventWarper(Pet_FoxHunter_Mater_ATKSeeked),
        eventWarper(Pet_FoxHunter_Master_ATKSeekedATK),
    ]

    let Pet_FoxHunter_AI_Copy: EventTypes[] = [
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Targeted_StWind,
        Pet_Master_Chase,
        Pet_FoxHunter_ATKSeek,
        Pet_FoxHunter_ATKTargetting,
        Pet_FoxHunter_ATKSeeked,
        Pet_FoxHunter_ATKSeekedATK,
        Pet_FoxHunter_Mater_ATKSeeked,
        Pet_FoxHunter_Master_ATKSeekedATK,
    ]

    /*
    =========================예비용 패턴====================================
    */
    //let seq_: SequenceType = {tabNum:4, case:"sequence", main: "", value0: "", value1: ""}
    //let Pet_: EventTypes = {name:"",main:"",condition: [], sequence: []})

    /*
    =========================기르가쉬 헬퍼 패턴====================================
    */
    let seq_GirHelp_Seek_Chase: SequenceType = { tabNum: 4, case: "sequence", main: "", value0: "", value1: "" }
    //let Pet_: EventTypes = {name:"",main:"",condition: [], sequence: []})
    let Pet_GirHelp_Seek: EventTypes = {
        name: "적 인식 -주인 추적", main: "seek_target",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_chase_Master_Run, seq_wait_Middle], refeatNum: 10 })]
    }
    let Pet_GirHelp_Targeting: EventTypes = {
        name: "적 인식 -주인 추적", main: "now_targeting",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_chase_Master_Run, seq_wait_Middle], refeatNum: 10 })]
    }

    let Pet_GirHelp_Mater_ReadyCounter: EventTypes = {
        name: "주인카운터 준비 - 닥평타", main: "master_skill_prepare", value0: "counter",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_meleeATK], refeatNum: 10 })]
    }

    let Pet_GirHelp_Mater_ReadyFirebolt: EventTypes = {
        name: "주인파볼트 준비 - 닥윈밀 전환", main: "master_skill_prepare", value0: "firebolt",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_cancel, seq_chase_Enemy_Run_Infinity, seq_ReadyWindMill, seq_SkillUse_ToEnemyGround, seq_cancel], refeatNum: 20 }), refeat({ refeatValue: [seq_chase_Master_Run, seq_wait_Middle], refeatNum: 5 })]
    }

    let Pet_GirHelper_AI: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_GirHelp_Seek),
        eventWarper(Pet_GirHelp_Targeting),
        eventWarper(Pet_GirHelp_Mater_ReadyCounter),
        eventWarper(Pet_GirHelp_Mater_ReadyFirebolt),
    ]

    let Pet_GirHelper_AI_Copy: EventTypes[] = [
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Master_Chase,
        Pet_GirHelp_Seek,
        Pet_GirHelp_Targeting,
        Pet_GirHelp_Mater_ReadyCounter,
        Pet_GirHelp_Mater_ReadyFirebolt,
    ]

    /*
    =========================타겟 체이서 패턴====================================
    */

    let seq_TargetChaser_Seek_Chase: SequenceType = { tabNum: 4, case: "sequence", main: "", value0: "", value1: "" }
    //let Pet_: EventTypes = {name:"",main:"",condition: [], sequence: []})

    let Pet_TargetChaser_ReadyChase: EventTypes = {
        name: "주인디펜스 준비 - 주인 곁 대기", main: "master_skill_prepare", value0: "defence",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Run, seq_wait_Middle], refeatNum: 10 })]
    }

    let Pet_TargetChaser_ReadyIcebolt: EventTypes = {
        name: "주인아볼트 준비 - 추적 준비", main: "master_skill_prepare", value0: "firebolt",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Master_Run, seq_wait_Short], refeatNum: 13 })]
    }
    let Pet_TargetChaser_ChaseIcebolt_Round: EventTypes = {
        name: "주인아볼트 사격 - 타겟 시계방향 추적", main: "master_attack", value0: "icebolt",
        condition: [],
        sequence: [seqPt(seq_cancel), refeat({ refeatValue: [seq_chase_Target_ClockRun_Far_Long], refeatNum: 24 }), seqPt(seq_chase_Master_Walk), seqPt(seq_wait_Long)]
    }
    let Pet_TargetChaser_ATK0: EventTypes = {
        name: "펫 지속 공격 0", main: "attack", value0: "all", value1: "false",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_meleeATK], refeatNum: 10 })]
    }
    let Pet_TargetChaser_ATK1: EventTypes = {
        name: "펫 지속 공격 1", main: "attack", value0: "all", value1: "true",
        condition: [],
        sequence: [refeat({ refeatValue: [seq_meleeATK], refeatNum: 10 })]
    }

    let Pet_TargetChaser_AI: string[] = [
        eventWarper(Pet_MasterActive_StWind),
        eventWarper(Pet_SeekTarget_StWind),
        eventWarper(Pet_Master_Chase),
        eventWarper(Pet_TargetChaser_ReadyChase),
        eventWarper(Pet_TargetChaser_ReadyIcebolt),
        eventWarper(Pet_TargetChaser_ChaseIcebolt_Round),
        eventWarper(Pet_TargetChaser_ATK0),
        eventWarper(Pet_TargetChaser_ATK1),
    ]


    let Pet_TargetChaser_AI_Copy: EventTypes[] = [
        Pet_MasterActive_StWind,
        Pet_SeekTarget_StWind,
        Pet_Master_Chase,
        Pet_TargetChaser_ReadyChase,
        Pet_TargetChaser_ReadyIcebolt,
        Pet_TargetChaser_ChaseIcebolt_Round,
        Pet_TargetChaser_ATK0,
        Pet_TargetChaser_ATK1,
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
        Pet_Blaze_AI,
        Pet_Medic_AI,
        Pet_FoxHunter_AI,
        Pet_GirHelper_AI,
        Pet_TargetChaser_AI,
        Pet_Chaser_AI_Package_Copy,
        Pet_Defender_AI_Package_Copy,
        Pet_Original_AI_Copy,
        Pet_RoadRoller_AI_Copy,
        Pet_BoltSupport_AI_Copy,
        Pet_Battery_AI_Copy,
        Pet_Blaze_AI_Copy,
        Pet_Medic_AI_Copy,
        Pet_FoxHunter_AI_Copy,
        Pet_GirHelper_AI_Copy,
        Pet_TargetChaser_AI_Copy,
    }
}
/*

    return returnValue;
}
*/