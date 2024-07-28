import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom } from '../../store/atom';
import XIconBlue from '../../assets/XIconBlue.png'
import UpIconBlue from '../../assets/UpIconBlue.png'
import PlusIconBlue from '../../assets/PlusIconBlue.png'
import DownIconBlue from '../../assets/DownIconBlue.png'
import PatternButton from './PatternButton';


function PatternListMaker() {
  const [partternValue, setPatternValue] = useRecoilState(AIPatternArrayAtom);


  return (
    <ColummBox>
      <h2>패턴 목록</h2>
      <ListContainer>
        <ScrollBox>
          {partternValue.map((Option, index) => (<PatternButton key={Option.key + index} indexNum={index} optionValue={Option.key != "" ? Option.key : "-이름없는 패턴"}></PatternButton>))}
        </ScrollBox>
      </ListContainer>
    </ColummBox>)
}

export default PatternListMaker;

const ColummBox = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start; 
justify-content: flex-start;
gap: 10px; 
width: 100%;
max-width: 800px;
margin-top: 10px;

h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 45px;font-family: 'Mabinogi_Classic_TTF';}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: 'Mabinogi_Classic_TTF'; font-weight:500;}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 13px; font-family: 'Mabinogi_Classic_TTF'; white-space: pre-wrap;}

`

const ListContainer = styled.div`
    background-color: rgb(81, 165, 196);
    padding: 10px;
    border-radius: 7px;
    border: 2px solid rgb(25, 76, 138);
  width: 100%;
  max-width: 400px;
display: flex;
flex-direction: column;

`

const ScrollBox = styled.div`
display: flex;
flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 200px;
  max-height: 100%;
  overflow-y: scroll;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 11px;
  }

  &::-webkit-scrollbar-track {
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(25, 76, 138);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(111, 195, 226);
  }

`