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
    onChange: (value: string[]) => void;
}


function SelectButton({ width, optionValue, value, sortOrder, onChange }: SelectBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var val: string[] = [];

        console.log("서브")
        val[0] = sortOrder.toString();
        val[1] = e.target.value;
        val[2] = optionValue;

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

    const conditonOption = [
        { id: 1, label: '상대의 상태가', value: 'target_state' },
        { id: 2, label: '상대와의 거리가', value: 'target_distance' },
        { id: 3, label: '스킬을 현재 사용할 수 있을 때', value: 'skill_preparable' },
        { id: 4, label: '특기를 현재 사용할 수 있을 때', value: 'ST_prepareable' },
        { id: 5, label: '핀즈비즈를 사용할 수 있을 때', value: 'EQ_prepareable' },
        { id: 6, label: '주인의 소모된 생명력이', value: 'master_damaged_life_greater' },
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





    /*//위쪽값 테스트 위해 잠깐 삭제
        switch (optionValue) {
            case "event": switch (sortOrder) {
                case 0: options = mainOptions; break;
                case 1: options = petEventOption; break;
                case 2: options = masterEventOption; break;
                case 3: options = masterSkillOption; break;
                case 4: options = defenseOption; break;
                case 5: options = totalOption3; break;
                case 6: options = totalOption4; break;
                case 7: options = petOption2; break;
                case 8: options = downOption; break;
                case 9: options = petAttackOption; break;
                default: options = mainOptions; break;
            }
                switch (sortOrder) {
                    case 0: sortValue = 0; break;
                    case 1: sortValue = 1; break;
                    case 2: sortValue = 1; break;
                    case 3: sortValue = 2; break;
                    case 4: sortValue = 2; break;
                    case 5: sortValue = 2; break;
                    case 6: sortValue = 2; break;
                    case 7: sortValue = 2; break;
                    case 8: sortValue = 3; break;
                    case 9: sortValue = 2; break;
                    case 10: sortValue = 3; break;
                }break;
            case "condition": switch (sortOrder) {
                case 0: options = conditonOption; break;
                case 1: options = petEventOption; break;
                case 2: options = masterEventOption; break;
                case 3: options = masterSkillOption; break;
                case 4: options = defenseOption; break;
                case 5: options = totalOption3; break;
                case 6: options = totalOption4; break;
                case 7: options = petOption2; break;
                case 8: options = downOption; break;
                case 9: options = petAttackOption; break;
                default: options = conditonOption; break;
            }
                switch (sortOrder) {
                    case 0: sortValue = 0; break;
                    case 1: sortValue = 1; break;
                    case 2: sortValue = 1; break;
                    case 3: sortValue = 2; break;
                    case 4: sortValue = 2; break;
                    case 5: sortValue = 2; break;
                    case 6: sortValue = 2; break;
                    case 7: sortValue = 2; break;
                    case 8: sortValue = 3; break;
                    case 9: sortValue = 2; break;
                    case 10: sortValue = 3; break;
                }break;
            case "sequence": break;
        } */
    //소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션) | 소트오더5 = 경계인식

    return (
        <Select val={width} value={value[sortValue]} onChange={(e) => handleChange(e)}>
            {options.map(option => (
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
