import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import exp from 'constants';
import SelectButton from './RadioButton';
import { AIMakingEventArrayAtom } from '../../store/atom';

function EventMaker() {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [eventSelectedValue, setEventSelectedValue] = useRecoilState(AIMakingEventArrayAtom);

    //여기서 구분하는 값을 추가할 것
    const handleSelectChange = (value: string[]) => {
        //setSelectedValue(value);
        setEventSelectedValue(value)
    };
    const getOptionBool = (value: string): boolean => {
        //펫인지 마스터인지 체크
        switch (value) {
            case 'master': return true;
            case 'pet': return false;
            //case : break;
        }
        return false;
    }


    return (
        <EventDiv>
            <ColummBox>
                <h2>상황</h2>
                <RowBox>
                    <SelectButton sortOrder={0} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>

                    {/*중간값 체크 그시기*/}
                    {getOptionBool(eventSelectedValue[0])
                        ? <SelectButton sortOrder={1} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                        : null}
                </RowBox>
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
gap: 10px;
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