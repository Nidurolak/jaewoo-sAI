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
        setEventSelectedValue(prevstate => {
            const newValue = [...prevstate];
            newValue[parseInt(value[0])] = value[1];
            return newValue;
        })
        console.log("메인")
        console.log(eventSelectedValue)
    };
    const getOptionBool = (value: string): boolean => {
        //펫인지 마스터인지 체크
        //인식|경계 당함, 디펜스 방어, 공격당함, 스킬준비, 공격함

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
                    <SelectButton optionValue={''} width={100} sortOrder={0} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>

                    {/*마지막값 체크 목록, sortOrder 1번 여부에 따라 활성화*/}
                    {getOptionBool(eventSelectedValue[0])
                        ? <SelectButton width={0} optionValue={''} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                        : null}

                    {/*중간값 체크 목록 */}
                    <SelectButton optionValue={''} width={0} sortOrder={1} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                    {/*마지막값 체크 목록, sortOrder 1번 여부에 따라 활성화*/}
                    {getOptionBool(eventSelectedValue[0])
                        ? <SelectButton width={0} optionValue={''} sortOrder={3} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
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
//background-color: darkgoldenrod;
padding: 10px;

  h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 45px;font-family: 'Mabinogi_Classic_TTF';}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: 'Mabinogi_Classic_TTF';}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 15px; font-family: 'Mabinogi_Classic_TTF'; white-space: pre-wrap;}

`