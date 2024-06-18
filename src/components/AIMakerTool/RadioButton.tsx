import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import { AIMakingEventArrayAtom } from '../../store/atom';
import { stringify } from 'querystring';

interface SelectBoxProps {
    value: string[];
    width: number;
    sortOrder: number;
    optionValue: string;
    indexNum?: number;
    onChange: (value: string[]) => void;
}


function SelectButton({ width, optionValue, value, sortOrder, indexNum, onChange }: SelectBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var val: string[] = [];

        console.log("서브")
        val[0] = sortOrder.toString();
        val[1] = e.target.value;
        val[2] = optionValue;
        if (indexNum !== undefined) {
            val[3] = indexNum.toString();
        }

        console.log(val + "값이 라디오버튼에서 넘어감")
        onChange(val);
        console.log(e.target.value)
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
        { id: 1, label: '상대의 상태가', value: 'target_state' },
        { id: 2, label: '상대와의 거리가', value: 'target_distance' },
        { id: 3, label: '스킬을 현재 사용할 수 있을 때', value: 'skill_preparable' },
        { id: 4, label: '특기를 현재 사용할 수 있을 때', value: 'ST_prepareable' },
        { id: 5, label: '핀즈비즈를 사용할 수 있을 때', value: 'EQ_prepareable' },
        { id: 6, label: '주인의 소모된 생명력이', value: 'master_damaged_life_greater' },
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


    let options;
    let sortValue = sortOrder;
    switch (optionValue) {
        case 'master': options = masterEventOption; break;
        case 'pet': options = petEventOption; break;

        case 'master_targeted': options = totalOption3; break;
        case 'master_attack': options = attackedAttackOption; break;
        //case 'master_aimed': options = masterEventOption; break;
        //case 'master_target_skill_prepare': options = masterEventOption; break;
        //case 'master_target_magic_prepare': options = masterEventOption; break;
        case 'master_defence': options = defenseOption; break;
        case 'master_attacked': options = (sortOrder == 2) ? attackedAttackOption : downOption; break;
        case 'master_skill_prepare': options = masterSkillOption; break;

        case 'targeted': options = totalOption3; break;
        //case 'seek_target': options = ; break;
        //case 'now_targeting': options = ; break;
        case 'attack': options = (sortOrder == 2) ? petAttackOption : downOption; break;
        //case 'aimed': options = ; break;
        //case 'target_skill_prepare': options = ; break;
        //case 'target_magic_prepare': options = ; break;
        case 'defence': options = defenseOption; break;
        case 'attacked': options = (sortOrder == 2) ? attackedAttackOption : downOption; break;

        case 'conditon': options = conditonOption; break;
        case 'skill_preparable': options = conditonPreparableSkillOption; break;
        case 'ST_preparable': options = STOption; break;
        case 'EQ_preparable': options = EQOption; break;


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
                <option key={option.id} value={option.value}>
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
  color: rgba(255,255,255,1)
`;
