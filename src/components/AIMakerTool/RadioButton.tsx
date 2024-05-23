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

        console.log(val + "값이 라디오버튼에서 넘어감")
        onChange(val);
        console.log(e.target.value)
        //console.log(customValue)
    };

    const mainOptions = [
        { id: 1, label: '주인이(의)', value: 'master' },
        { id: 2, label: '펫이(의)', value: 'pet' },
    ];
    const petOption1 = [
        { id: 1, label: '적에게', value: 'targeted' },
        { id: 2, label: '타겟을 찾음', value: 'seek_target' },
        { id: 3, label: '적을 타겟팅 중', value: 'now_targeting' },
        { id: 4, label: '공격함', value: 'attack' },
        { id: 5, label: '적이 원거리 사용', value: 'aimed' },
        { id: 6, label: '적이 근접기 사용', value: 'target_skill_prepare' },
        { id: 7, label: '적이 마법 사용', value: 'target_magic_prepare' },
        { id: 8, label: '디펜스로 방어함', value: 'defence' },
        { id: 9, label: '적에게 피격당함', value: 'attacked' }
    ];
    const masterOption1 = [
        { id: 1, label: '적에게', value: 'master_targeted' },
        { id: 3, label: '공격함', value: 'mater_attack' },
        { id: 4, label: '적이 원거리 사용', value: 'master_aimed' },
        { id: 5, label: '적이 근접기 사용', value: 'master_target_skill_prepare' },
        { id: 6, label: '적이 마법 사용', value: 'master_target_magic_prepare' },
        { id: 7, label: '디펜스로 방어함', value: 'master_defence' },
        { id: 8, label: '적에게 피격당함', value: 'master_attacked' },
        { id: 9, label: '스킬을 준비함', value: 'master_skill_prepare' }
    ];
    const totalOption1 = [
        { id: 1, label: '모든 공격', value: 'all' },
        { id: 3, label: '일반공격', value: 'basic' },
        { id: 4, label: '디펜스', value: 'defence' },
        { id: 5, label: '카운터어택', value: 'counter' },
        { id: 6, label: '윈드밀', value: 'windmill' },
        { id: 7, label: '라이트닝볼트', value: 'lightningbolt' },
        { id: 8, label: '파이어볼트', value: 'icegbolt' },
        { id: 9, label: '아이스볼트', value: 'firebolt' },
        { id: 10, label: '썬더', value: 'thunder' },
        { id: 11, label: '파이어볼', value: 'fireball' },
        { id: 12, label: '아이스 스피어', value: 'icespace' },
        { id: 12, label: '힐링', value: 'healing' },
        { id: 12, label: '레인지 어택', value: 'firebolt' },
        { id: 12, label: '매그넘샷', value: 'firebolt' },
    ]
    const totalOption2 = [
        { id: 1, label: '모든 공격', value: 'all' },
        { id: 3, label: '일반공격', value: 'basic' },
        { id: 4, label: '디펜스', value: 'defence' },
        { id: 5, label: '카운터어택', value: 'counter' },
        { id: 6, label: '윈드밀', value: 'windmill' },
    ]
    const totalOption3 = [
        { id: 1, label: '인식당함', value: 'alert' },
        { id: 3, label: '경계당함', value: 'attack' },
    ]

    let options;
    //소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션) | 소트오더5 = 경계인식
    switch (sortOrder) {
        case 0: options = mainOptions; break;
        case 1: options = petOption1; break;
        case 2: options = masterOption1; break;
        case 3: options = totalOption1; break;
        case 4: options = totalOption2; break;
        case 5: options = totalOption3; break;
        default: options = mainOptions; break;
    }
    let sortValue = 0;
    switch (sortOrder) {
        case 0: sortValue = 0; break;
        case 1: sortValue = 1; break;
        case 2: sortValue = 1; break;
        case 3: sortValue = 2; break;
        case 4: sortValue = 2; break;
        case 5: sortValue = 2; break;
    }
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
