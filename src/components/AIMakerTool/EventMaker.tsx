import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import exp from 'constants';
import SelectButton from './RadioButton';

function EventMaker() {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);


    const handleSelectChange = (value: string) => {
        setSelectedValue(value);
    };

    return (
        <EventDiv>
            <RowBox>
                <h2>상황</h2>
                <h3>여기 아래에 이벤트 적을 거임</h3>
            </RowBox>
            <ColummBox>
                <h2>상황</h2>
                <SelectButton value={selectedValue} onChange={handleSelectChange}></SelectButton>
            </ColummBox>

        </EventDiv>)
}

export default EventMaker

const ColummBox = styled.div`
align-items: flex-start;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 100%;
`

const RowBox = styled.div`
align-items: flex-end;
display: flex;
flex-direction: row;
justify-content: flex-start;
width: 100%;
`

const EventDiv = styled.div`
align-items: center;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 90%;
height: 120px;
background-color: darkgoldenrod;
padding: 10px;

  h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 45px;font-family: 'Mabinogi_Classic_TTF';}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: 'Mabinogi_Classic_TTF';}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 15px; font-family: 'Mabinogi_Classic_TTF'; white-space: pre-wrap;}

`