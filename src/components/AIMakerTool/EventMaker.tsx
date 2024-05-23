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
        console.log(eventSelectedValue + "이 바뀌기 전의 값, " + value + "가 넘어옴 배열값, " + value[1] + "의 값이 라디오값으로 넘어옴, " + value[0] + "이 소트오더로 넘어옴")
        if (value[1] != "master" && value[1] != "pet") {
            setEventSelectedValue(prevstate => {
                const newValue = [...prevstate];
                //소트오더 0 = 배열 0번값, 소트오더 1, 2 = 배열 1번값 소트오더 3, 4, 5 = 베열 2번값
                const x = parseInt(value[0])
                console.log(x)
                switch (x) {
                    case 0: newValue[0] = value[1]; break;
                    case 1:
                    case 2: newValue[1] = value[1]; break;
                    case 3:
                    case 4:
                    case 5: newValue[2] = value[1]; break;
                }
                return newValue;
            })
        }
        else {
            if (value[1] == "master") {
                setEventSelectedValue(['master', 'master_targeted', 'alert'])
                console.log("마스터 거르기 작동")
            }
            else if ((value[1] == "pet")) {
                console.log("펫 거르기 작동")
                setEventSelectedValue(['pet', 'targeted', 'alert'])
            }
            return null;
        }

    };
    const getOptionBool = (value: string[]): boolean => {
        //펫인지 마스터인지 체크
        //인식|경계 당함, 디펜스 방어, 공격당함, 스킬준비, 공격함, 동물 상대 피격
        //2개 들어가야하는것 - 공격당함, 공격함, 동물 상대 피격

        //펫 마스터 구분때문에 스위치했는데 if로 빼도 될 것 같음
        //console.log(value)
        if (value[0] == "master") {
            switch (value[1]) {
                //case 'master_targeted':
                case 'master_defence':
                case 'master_attacked':
                case 'master_skill_prepare':
                case 'master_attack':
                case 'master_aiemd':
                case 'master': return true;
                case 'pet': return false;
                //case : break;
            }
        }
        else if (value[0] == "pet") {
            switch (value[1]) {
                case 'pet':
                //case 'targeted':
                case 'defence':
                case 'attacked':
                case 'skill_prepare':
                case 'attack': return true;
                case 'master': return false;
                //case : break;
            }
        }
        //인식 관련 truefalse 체크
        else if (value[0] == "master_targeted" || value[0] == "targeted") {
            if (value[0] == value[1]) {
                return true
            }
        }
        return false;
    }

    useEffect(() => {
        console.log(eventSelectedValue)
    }, [eventSelectedValue])

    return (
        <EventDiv>
            <ColummBox>
                <h2>상황</h2>
                <RowBox>
                    {/*소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션)*/}
                    {/*주인/펫 체크 버튼, 1순위 버튼*/}
                    <SelectButton optionValue={''} width={100} sortOrder={0} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>

                    {/*행동 체크 버튼, 2순위 버튼*/}
                    {getOptionBool(["master", eventSelectedValue[0]])
                        ? <SelectButton width={0} optionValue={''} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                        : <SelectButton width={200} optionValue={''} sortOrder={1} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>}

                    {/*주인 인식관련 중간값 체크 목록, sortOrder 1번 여부에 따라 활성화*/}
                    {getOptionBool(["master_targeted", eventSelectedValue[1]])
                        ? <SelectButton width={0} optionValue={''} sortOrder={5} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                        : null}

                    {/*펫 인식관련 중간값 체크 목록, sortOrder 1번 여부에 따라 활성화*/}
                    {getOptionBool(["pet_targeted", eventSelectedValue[1]])
                        ? <SelectButton width={0} optionValue={''} sortOrder={5} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
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