import React, { } from 'react';
import { styled } from 'styled-components';
import { BoxProps } from '../../../utils/types';



function SelectButton({ width, optionValue, value, sortOrder, indexNum, onChange }: BoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var val: string[] = [];

        //console.log("서브")
        val[0] = sortOrder.toString();
        val[1] = e.target.value;
        val[2] = optionValue;
        if (indexNum !== undefined) {
            val[3] = indexNum.toString();
        }

        //console.log(val + "값이 라디오버튼에서 넘어감")
        onChange(val);
        //console.log(customValue)
    };

    const mainOptions = [
        { id: 1, label: '주인이(의)', value: 'master' },
        { id: 2, label: '펫이(의)', value: 'pet' },
    ];
    const masterEventOption = [
        { id: 1, label: '인식당함', value: 'master_targeted' },
        { id: 2, label: '공격함', value: 'master_attack' },
        { id: 3, label: '적이 원거리 사용', value: 'master_aimed' },
        { id: 4, label: '적이 근접기 사용', value: 'master_target_skill_prepare' },
        { id: 5, label: '적이 마법 사용', value: 'master_target_magic_prepare' },
        { id: 6, label: '디펜스로 방어함', value: 'master_defence' },
        { id: 7, label: '공격당함', value: 'master_attacked' },
        { id: 8, label: '스킬을 준비함', value: 'master_skill_prepare' }
    ];
    const petEventOption = [
        { id: 1, label: '인식당함', value: 'targeted' },
        { id: 2, label: '타겟을 찾음', value: 'seek_target' },
        { id: 3, label: '적을 타겟팅 중', value: 'now_targeting' },
        { id: 4, label: '공격함', value: 'attack' },
        { id: 5, label: '적이 원거리 사용', value: 'aimed' },
        { id: 6, label: '적이 근접기 사용', value: 'target_skill_prepare' },
        { id: 7, label: '적이 마법 사용', value: 'target_magic_prepare' },
        { id: 8, label: '디펜스로 방어함', value: 'defence' },
        { id: 9, label: '공격당함', value: 'attacked' }
    ];
    const petOption2 = [
        { id: 1, label: '모든 공격', value: 'all' },
        { id: 2, label: '일반공격', value: 'basic' },
        { id: 3, label: '디펜스', value: 'defence' },
        { id: 4, label: '카운터어택', value: 'counter' },
        { id: 5, label: '윈드밀', value: 'windmill' },
        { id: 6, label: '라이트닝볼트', value: 'lightningbolt' },
        { id: 7, label: '파이어볼트', value: 'icegbolt' },
        { id: 8, label: '아이스볼트', value: 'firebolt' },
        { id: 9, label: '썬더', value: 'thunder' },
        { id: 10, label: '파이어볼', value: 'fireball' },
        { id: 11, label: '아이스 스피어', value: 'icespace' },
    ]
    const petMagicChargeOption = [
        { id: 1, label: '라이트닝볼트', value: 'lightningbolt' },
        { id: 2, label: '파이어볼트', value: 'icegbolt' },
        { id: 3, label: '아이스볼트', value: 'firebolt' },
        { id: 4, label: '썬더', value: 'thunder' },
    ]
    const petAttackOption = [
        { id: 1, label: '모든 공격', value: 'all' },
        { id: 2, label: '일반공격', value: 'basic' },
        { id: 4, label: '카운터어택', value: 'counter' },
        { id: 5, label: '윈드밀', value: 'windmill' },
        { id: 6, label: '라이트닝볼트', value: 'lightningbolt' },
        { id: 7, label: '파이어볼트', value: 'icegbolt' },
        { id: 8, label: '아이스볼트', value: 'firebolt' },
        { id: 9, label: '썬더', value: 'thunder' },
    ]
    const masterSkillOption = [
        { id: 1, label: '모든 공격', value: 'all' },
        { id: 2, label: '일반공격', value: 'basic' },
        { id: 3, label: '디펜스', value: 'defence' },
        { id: 4, label: '카운터어택', value: 'counter' },
        { id: 5, label: '윈드밀', value: 'windmill' },
        { id: 6, label: '라이트닝볼트', value: 'lightningbolt' },
        { id: 7, label: '파이어볼트', value: 'icegbolt' },
        { id: 8, label: '아이스볼트', value: 'firebolt' },
        { id: 9, label: '썬더', value: 'thunder' },
        { id: 10, label: '파이어볼', value: 'fireball' },
        { id: 11, label: '아이스 스피어', value: 'icespace' },
        { id: 12, label: '힐링', value: 'healing' },
        { id: 13, label: '레인지 어택', value: 'ranged_attack' },
        { id: 14, label: '매그넘샷', value: 'magnum_shot' },
        { id: 15, label: '서포트샷', value: 'support_shot' },
        { id: 16, label: '애로우 리볼버', value: 'arrow_revolver' },
        { id: 17, label: '미라지 미사일', value: 'mirage_missile' },
    ]
    const totalOption4 = [
        { id: 1, label: '모든 공격', value: 'all' },
        { id: 2, label: '일반공격', value: 'basic' },
        { id: 3, label: '디펜스', value: 'defence' },
        { id: 4, label: '카운터어택', value: 'counter' },
        { id: 5, label: '윈드밀', value: 'windmill' },
        { id: 6, label: '라이트닝볼트', value: 'lightningbolt' },
        { id: 7, label: '파이어볼트', value: 'icegbolt' },
        { id: 8, label: '아이스볼트', value: 'firebolt' },
        { id: 9, label: '썬더', value: 'thunder' },
        { id: 10, label: '파이어볼', value: 'fireball' },
        { id: 11, label: '아이스 스피어', value: 'icespace' },
        { id: 12, label: '레인지 어택', value: 'ranged_attack' },
        { id: 13, label: '매그넘샷', value: 'magnum_shot' },
    ]
    const attackedAttackOption = [
        { id: 1, label: '모든 공격', value: 'all' },
        { id: 2, label: '일반공격', value: 'basic' },
        { id: 3, label: '파이널 히트', value: 'finalhit' },
        { id: 4, label: '카운터어택', value: 'counter' },
        { id: 5, label: '윈드밀', value: 'windmill' },
        { id: 6, label: '라이트닝볼트', value: 'lightningbolt' },
        { id: 7, label: '파이어볼트', value: 'icegbolt' },
        { id: 8, label: '아이스볼트', value: 'firebolt' },
        { id: 9, label: '썬더', value: 'thunder' },
        { id: 10, label: '파이어볼', value: 'fireball' },
        { id: 11, label: '아이스 스피어', value: 'icespace' },
        { id: 12, label: '레인지 어택', value: 'ranged_attack' },
        { id: 13, label: '매그넘샷', value: 'magnum_shot' },
        { id: 14, label: '서포트샷', value: 'support_shot' },
        { id: 15, label: '애로우 리볼버', value: 'arrow_revolver' },
        { id: 16, label: '미라지 미사일', value: 'mirage_missile' },
    ]
    const defenseOption = [
        { id: 1, label: '모든 공격을', value: 'all' },
        { id: 2, label: '일반공격을', value: 'basic' },
        { id: 4, label: '윈드밀을', value: 'windmill' },
        { id: 5, label: '라이트닝볼트', value: 'lightningbolt' },
        { id: 6, label: '파이어볼트', value: 'icegbolt' },
        { id: 7, label: '아이스볼트', value: 'firebolt' },
        { id: 8, label: '레인지 어택', value: 'ranged_attack' },
        { id: 9, label: '매그넘샷', value: 'magnum_shot' },
        { id: 10, label: '서포트샷', value: 'support_shot' },
        { id: 11, label: '애로우 리볼버', value: 'arrow_revolver' },
        { id: 12, label: '미라지 미사일', value: 'mirage_missile' },
    ]
    const totalOption3 = [
        { id: 1, label: '직접', value: 'alert' },
        { id: 2, label: '경계', value: 'attack' },
    ]
    const downOption = [
        { id: 1, label: '다운당함', value: 'true' },
        { id: 2, label: '다운당하지 않음', value: 'false' },
    ]

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
        { id: 1, label: '상대의 상태', value: 'target_state' },
        { id: 2, label: '상대와의 거리', value: 'target_distance' },
        { id: 3, label: '스킬 사용 가능', value: 'skill_preparable' },
        { id: 4, label: '특기 사용 가능', value: 'ST_preparable' },
        { id: 5, label: '핀즈비즈 사용 가능', value: 'EQ_preparable' },
        { id: 6, label: '주인의 소모된 생명력', value: 'master_damaged_life_greater' },
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
    const targetState = [
        { id: 1, label: '걷는 중', value: 'walk' },
        { id: 2, label: '걷거나 뛰는 중', value: 'walk, run' },
        { id: 3, label: '멈춰있는', value: 'stop' },
        { id: 4, label: '걷거나 멈춰있는', value: 'stop, walk' },
        { id: 5, label: '뛰는 중', value: 'run' },
        { id: 6, label: '맞아서 날아가는 중', value: 'blowaway' },
        { id: 7, label: '맞아서 밀려나는 중', value: 'shoved' },
        { id: 8, label: '맞아서 경직 중', value: 'hit' },
    ]
    const targetdistance = [
        { id: 1, label: '1미터', value: '100' },
        { id: 2, label: '2미터', value: '200' },
        { id: 3, label: '3미터', value: '300' },
        { id: 4, label: '4미터', value: '400' },
        { id: 5, label: '5미터', value: '500' },
        { id: 6, label: '6미터', value: '600' },
        { id: 7, label: '7미터', value: '700' },
        { id: 8, label: '8미터', value: '800' },
        { id: 9, label: '9미터', value: '900' },
        { id: 10, label: '10미터', value: '1000' },
        { id: 11, label: '11미터', value: '1100' },
        { id: 12, label: '12미터', value: '1200' },
        { id: 13, label: '13미터', value: '1300' },
        { id: 14, label: '14미터', value: '1400' },
        { id: 15, label: '15미터', value: '1500' },
    ]

    const targetHP = [
        { id: 1, label: '20', value: '20' },
        { id: 2, label: '40', value: '40' },
        { id: 3, label: '60', value: '60' },
        { id: 4, label: '80', value: '80' },
        { id: 5, label: '100', value: '100' },
        { id: 6, label: '120', value: '120' },
        { id: 7, label: '140', value: '140' },
        { id: 8, label: '160', value: '160' },
        { id: 9, label: '180', value: '180' },
        { id: 10, label: '200', value: '200' },
    ]
    const seqList = [
        { id: 1, label: '기다림', value: 'wait' },
        { id: 2, label: '도망침', value: 'move_against' },
        { id: 3, label: '대상을 추적', value: 'chase' },
        { id: 4, label: '상대 주변을 회전', value: 'move_around' },
        { id: 5, label: '상대를 근접 공격', value: 'melee_attack' },
        { id: 6, label: '마법 차징 후 공격', value: 'stackmagic_attack' },
        { id: 7, label: '스킬을 준비', value: 'prepare_skill' },
        { id: 8, label: '마법 차징', value: 'stack_skill' },
        { id: 9, label: '준비한 스킬을 사용', value: 'process_skill' },
        { id: 10, label: '사용 중 스킬 취소', value: 'cancel_skill' },
        { id: 11, label: '휴식', value: 'skill_relax' },
        { id: 12, label: '특성 준비', value: 'PetST_skill' },
        { id: 13, label: '핀즈비즈 준비', value: 'PetEQ_skill' },
    ]

    const seqTime = [
        { id: 1, label: '1초', value: "1000" },
        { id: 2, label: '2초', value: "2000" },
        { id: 3, label: '3초', value: "3000" },
        { id: 4, label: '4초', value: "4000" },
        { id: 5, label: '5초', value: "5000" },
        { id: 6, label: '6초', value: "6000" },
        { id: 7, label: '7초', value: "7000" },
        { id: 8, label: '8초', value: "8000" },
        { id: 9, label: '9초', value: "9000" },
        { id: 10, label: '10초', value: "10000" },
    ]
    const seqLimitTime = [
        { id: 1, label: '5초', value: "5000" },
        { id: 2, label: '없음', value: "0" },
        { id: 3, label: '0.5초', value: "500" },
        { id: 4, label: '1초', value: "1000" },
        { id: 5, label: '2초', value: "2000" },
        { id: 6, label: '3초', value: "3000" },
        { id: 7, label: '4초', value: "4000" },
        { id: 8, label: '6초', value: "6000" },
        { id: 9, label: '7초', value: "7000" },
        { id: 10, label: '8초', value: "8000" },
        { id: 11, label: '9초', value: "9000" },
        { id: 12, label: '10초', value: "10000" },
    ]

    const seqTarget = [
        { id: 1, label: '공격상대', value: "enemy" },
        { id: 2, label: '주인', value: "master" },
    ]
    const seqRunWalk = [
        { id: 1, label: '뛰기', value: "run" },
        { id: 2, label: '걷기', value: "walk" },
    ]
    const seqRunclockwise = [
        { id: 1, label: '시계', value: "true" },
        { id: 2, label: '반시계', value: "false" },
    ]
    const seqRelax = [
        { id: 1, label: '시작', value: "true" },
        { id: 2, label: '중단', value: "false" },
    ]
    const seqCharge = [
        { id: 1, label: '1회', value: "1" },
        { id: 2, label: '2회', value: "2" },
        { id: 3, label: '3회', value: "3" },
        { id: 4, label: '4회', value: "4" },
        { id: 5, label: '5회', value: "5" },
    ]
    const seqTargetPosition = [
        { id: 1, label: '공격상대', value: "enemy" },
        { id: 2, label: '자신', value: "me" },
        { id: 3, label: '주인', value: "master" },
        { id: 4, label: '공격상대 근처', value: "pos_toward_target" },
        { id: 5, label: '공격상대 위치', value: "target_pos" },
        { id: 6, label: '내 위치', value: "my_pos" },
    ]

    const seqDistance = [
        { id: 1, label: '1미터', value: "100" },
        { id: 2, label: '2미터', value: "200" },
        { id: 3, label: '3미터', value: "300" },
        { id: 4, label: '4미터', value: "400" },
        { id: 5, label: '5미터', value: "500" },
        { id: 6, label: '6미터', value: "600" },
        { id: 7, label: '7미터', value: "700" },
        { id: 8, label: '8미터', value: "800" },
        { id: 9, label: '9미터', value: "900" },
        { id: 10, label: '10미터', value: "1000" },
        { id: 11, label: '11미터', value: "1100" },
        { id: 12, label: '12미터', value: "1200" },
        { id: 13, label: '13미터', value: "1300" },
        { id: 14, label: '14미터', value: "1400" },
        { id: 15, label: '15미터', value: "1500" },
    ]
    /*
    const seqWait = [
        {id: 1, label: '', value:""},
        {id: 2, label: '', value:""},
        {id: 3, label: '', value:""},
        {id: 4, label: '', value:""},
        {id: 5, label: '', value:""},
        {id: 6, label: '', value:""},
        {id: 7, label: '', value:""},
        {id: 8, label: '', value:""},
        {id: 9, label: '', value:""},
    ] */

    let options;
    let sortValue = sortOrder;

    //console.log(optionValue)

    switch (optionValue) {
        case 'master': options = masterEventOption; break;
        case 'pet': options = petEventOption; break;

        case 'master_targeted': options = totalOption3; break;
        case 'master_attack': options = attackedAttackOption; break;
        case 'master_defence': options = defenseOption; break;
        case 'master_attacked': options = (sortOrder == 2) ? attackedAttackOption : downOption; break;
        case 'master_skill_prepare': options = masterSkillOption; break;

        case 'targeted': options = totalOption3; break;
        case 'attack': options = (sortOrder == 2) ? petAttackOption : downOption; break;
        case 'defence': options = defenseOption; break;
        case 'attacked': options = (sortOrder == 2) ? attackedAttackOption : downOption; break;

        case 'condition': options = conditonOption; break;
        case 'target_state': options = targetState; break;
        case 'skill_preparable': options = conditonPreparableSkillOption; break;
        case 'ST_preparable': options = STOption; break;
        case 'EQ_preparable': options = EQOption; break;
        case 'target_distance': options = targetdistance; break;
        case 'master_damaged_life_greater': options = targetHP; break;

        case 'sequence': options = seqList; break;
        case 'wait': options = seqTime; break;
        case 'move_against': options = (sortOrder == 1) ? seqDistance : (sortOrder == 2) ? seqRunWalk : seqLimitTime; break;
        case 'chase': options = (sortOrder == 1) ? seqTarget : (sortOrder == 2) ? seqRunWalk : seqLimitTime; break;
        case 'move_around': options = (sortOrder == 1) ? seqRunclockwise : (sortOrder == 2) ? seqDistance : (sortOrder == 3) ? seqRunWalk : seqLimitTime; break;
        case 'melee_attack': options = seqLimitTime; break;
        case 'stackmagic_attack': options = (sortOrder == 1) ? petMagicChargeOption : (sortOrder == 2) ? seqCharge : seqLimitTime; break;
        case 'prepare_skill': options = (sortOrder == 1) ? conditonPreparableSkillOption : (sortOrder == 2) ? seqCharge : seqLimitTime; break;
        case 'stack_skill': options = (sortOrder == 1) ? petMagicChargeOption : seqCharge; break;
        case 'process_skill': options = (sortOrder == 1) ? seqTargetPosition : seqLimitTime; break;
        case 'cancel_skill': options = seqList; break;
        case 'skill_relax': options = seqRelax; break;
        case 'PetST_skill': options = (sortOrder == 1) ? STOption : seqLimitTime; break;
        case 'PetEQ_skill': options = (sortOrder == 1) ? EQOption : seqLimitTime; break;

        /*
                case 'all': options = ; break;
                case 'basic': options = ; break;
                case 'counter': options = ; break;
                case 'windmill': options = ; break;
                case 'lightningbolt': options = ; break;
                case 'icegbolt': options = ; break;
                case 'firebolt': options = ; break;
                case 'thunder': options = ; break;
                case 'fireball': options = ; break;
                case 'icespace': options = ; break;
                case 'healing': options = ; break;
        
                case 'alert': options = ; break;
                case 'attack': options = ; break;
        
                case 'true': options = ; break;
                case 'false': options = ; break;*/


        default: options = mainOptions; break;
    }

    return (
        <Select val={width} value={value[sortValue]} onChange={(e) => handleChange(e)}>
            {options.map((option,) => (
                <option key={option.id + option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
}

export default SelectButton


const Select = styled.select<{ val: number }>`
  width: ${(props) => props.val !== 0 ? `${props.val}px` : 'auto'};
  padding: 5px;
  font-size: 16px;
  background-color: rgba(111, 195, 226);
  border: 2px solid rgb(25, 76, 138);
  border-radius: 10px;
  color: rgba(255,255,255,1);
  outline:none;
  cursor: pointer;
  &:hover{filter: brightness(105%);}
`;
