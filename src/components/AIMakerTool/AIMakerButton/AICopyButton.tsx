import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom, CopyAIName, CurrentAIPattern } from '../../../store/atom';
import XIconBlue from '../../../assets/XIconBlue.png'
import UpIconBlue from '../../../assets/UpIconBlue.png'
import PlusIconBlue from '../../../assets/PlusIconBlue.png'
import DownIconBlue from '../../../assets/DownIconBlue.png'
import Mainbutton20070 from '../../../assets/MainButton20070.png'
import { BackGUI, BoxProps, PatternType, AITemplet } from '../../../utils/types';
import { ApplyPattern, CheckCurrentChange } from '../../../hooks/AiMakerHook';
import _ from 'lodash';

function AICopyButton(value: AITemplet) {
    //function AICopyButton({ indexNum, optionValue }: Partial<BoxProps>) {
    const [partternValue, setPatternValue] = useRecoilState(AIPatternArrayAtom);
    const [copyname, setCopyname] = useRecoilState(CopyAIName)

    let apply = ApplyPattern()

    const handleButton = () => {
        setCopyname(value.name as string)
        apply(value.name)
    }

    return (
        <Container>
            <BoxTextWraper>
                <h2>{value.name}</h2>
                <AIListButton onClick={handleButton}>패턴 복사하기</AIListButton>
            </BoxTextWraper>
        </Container>
    );
}

export default AICopyButton;

const Cover = styled.div`
width:343px;
height: 44px;
display: flex;
flex-direction: column; 
justify-content: center;
border-radius: 5px;
align-items: center;
position: absolute;
cursor: default;
background-color: rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
    width: 190px;
    height: 36px;
    border: 3px solid rgb(25, 76, 138);
    background-color: white;
    color: rgb(25, 76, 138);
    font-size: 16px;
    border-radius: 4px;
    box-sizing: border-box;
`;

const ButtonBox = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-right: 5px;
    gap: 3px;
`;

const ButtonDiv = styled.div<{ image: any; disabled: boolean }>`
    background-color: rgba(255, 255, 255, 0);
    background-image: ${({ image }) => `url(${image})`};
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    color: rgba(255, 255, 255, 1);
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 3px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    &:hover {
        filter: brightness(110%);
    }
    &:active {
        filter: brightness(120%);
    }
`;

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
`;

const BoxTextWraper = styled.div`
width: 300px;
padding: 10px;
background-color: rgba(111, 195, 226);
border: 2px solid rgb(25, 76, 138);
border-radius: 10px;
color: rgba(255,255,255,1);

align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
outline:none;
h2{
    margin: 0px;
        font-size: 23px;
        text-align: center;
} 
`;

const AIListButton = styled.button<BackGUI>`
background-color: rgba(255, 255, 255, 0);
background-image: url(${Mainbutton20070});
background: url(${Mainbutton20070});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 120px;
  height: 30px;
  border: none;
  font-size: 17px;
  font-family: 'Mabinogi_Classic_TTF';
  cursor: pointer;
  &:hover{
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(120%); /* 클릭 시 밝기 감소 효과 */
  }
`