import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import { AIMakingEventArrayAtom } from '../../store/atom';

interface SelectBoxProps {
    value: string[];
    sortOrder: number;
    onChange: (value: string[]) => void;
}


function SelectButton({ value, sortOrder, onChange }: SelectBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        var val: string[] = [];

        val[0] = e.target.value;
        onChange(val);
        console.log(e.target.value)
    };


    const mainOptions = [
        { id: 1, label: '주인이(의)', value: 'master' },
        { id: 2, label: '펫이(의)', value: 'pet' },
    ];
    const petOption1 = [
        { id: 1, label: '타겟을 찾음', value: 'seek_target' },
        { id: 2, label: '적을 타겟팅 중', value: 'now_targeting' },
        { id: 3, label: '공격함', value: 'attack' },
        { id: 4, label: '적이 원거리 사용', value: 'aimed' },
        { id: 5, label: '적이 근접기 사용', value: 'target_skill_prepare' },
        { id: 6, label: '적이 마법 사용', value: 'target_magic_prepare' },
        { id: 7, label: '디펜스로 방어함', value: 'defence' },
        { id: 8, label: '적에게 피격당함', value: 'attacked' }
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
    const totalOption2 = [
        { id: 1, label: '모든 공격', value: 'all' },
        { id: 3, label: '일반공격', value: 'mater_attack' },
        { id: 4, label: '', value: 'master_aimed' },
        { id: 5, label: '', value: 'master_target_skill_prepare' },
        { id: 6, label: '', value: 'master_target_magic_prepare' },
        { id: 7, label: '', value: 'master_defence' },
        { id: 8, label: '', value: 'master_attacked' },
        { id: 9, label: '', value: 'master_skill_prepare' }
    ]

    let options;
    let widthValue;
    switch (sortOrder) {
        case 0: options = mainOptions; widthValue = 100; break;
        case 1: options = petOption1; widthValue = 180; break;
        case 2: options = masterOption1; widthValue = 180; break;
        case 3: options = totalOption2; widthValue = 180; break;
        default: options = mainOptions; widthValue = 180; break;
    }
    return (
        <Select val={100} value={value[0]} onChange={handleChange}>
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
  width: ${(props) => props.val}px;
  padding: 5px;
  font-size: 16px;
  background-color: rgba(111, 195, 226);
  border: 2px solid rgb(25, 76, 138);
  border-radius: 10px;
  color: rgba(255,255,255,1)
`;
