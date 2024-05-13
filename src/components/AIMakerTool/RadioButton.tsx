import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import exp from 'constants';

interface SelectBoxProps {
    value: string | null;
    onChange: (value: string) => void;
}


function SelectButton({ value, onChange }: SelectBoxProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
    };

    const options = [
        { id: 1, label: '옵션 2323323232232323', value: 'option1' },
        { id: 2, label: '옵션 2', value: 'option2' },
        { id: 3, label: '옵션 3', value: 'option3' },
        { id: 4, label: '옵션 4', value: 'option4' },
        { id: 5, label: '옵션 5', value: 'option5' }
    ];

    return (
        <Select value={value || ''} onChange={handleChange}>
            {options.map(option => (
                <option key={option.id} value={option.value}>
                    {option.label}
                </option>
            ))}
        </Select>
    );
}

export default SelectButton


const Select = styled.select`
  padding: 5px;
  font-size: 16px;
`;
