import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { AIMakingEventArrayAtom } from '../../store/atom';
function EventMaker() {
    const [eventSelectedValue, setEventSelectedValue] = useRecoilState(AIMakingEventArrayAtom);
    const [firstRadio, setFirstRadio] = useState<string[]>(["0", "master", "1", "", ""]);
    const [secondRadio, setSecondRadio] = useState<string[]>(["0", "master_targeted", "2", "적에게", ""]);
    const [thirdRadio, setThirdRadio] = useState<string[]>([]);

    useEffect(() => {
        //console.log(eventSelectedValue)
        //console.log(firstRadio)
        //console.log(secondRadio)
        //console.log(thirdRadio)
        switch (eventSelectedValue[0]) {
            case 'master': setFirstRadio(["0", "master", "1", "", ""]); break;
            case 'pet': setFirstRadio(["0", "pet", "1", "", ""]); break;
        }
        switch (eventSelectedValue[1]) {
            //[width, optionValue, sortOrder, h3 전열 , h3 후열] 순으로 배열 생성
            case 'master_targeted': setSecondRadio(["0", "master_targeted", "2", "적에게", ""]); setThirdRadio([]); break;
            case 'targeted': setSecondRadio(["0", "targeted", "2", "적에게", ""]); setThirdRadio([]); break;
            case 'master_attacked': setSecondRadio(["0", "master_attacked", "2", "", "(으)로 적에게"]); setThirdRadio(["0", "master_attacked", "3", "그리고", ""]); break;
            case 'attacked': setSecondRadio(["0", "attacked", "2", "적에게", ""]); setThirdRadio(["0", "attacked", "3", "그리고", ""]); break;
            case 'master_defence': setSecondRadio(["0", "master_defence", "2", "", ""]); setThirdRadio([]); break;
            case 'defence': setSecondRadio(["0", "defence", "2", "", ""]); setThirdRadio([]); break;
            case 'attack': setSecondRadio(["0", "attack", "2", "", "을 사용해"]); setThirdRadio(["0", "attack", "3", "그리고", ""]); break;
            case 'master_attack': setSecondRadio(["0", "master_attack", "2", "", "을 사용해"]); setThirdRadio([]); break;
            case 'master_skill_prepare': setSecondRadio(["0", "master_skill_prepare", "2", "", ""]); setThirdRadio([]); break;
            case 'master_target_magic_prepare': setSecondRadio([]); setThirdRadio([]); break;
            case 'target_magic_prepare': setSecondRadio([]); setThirdRadio([]); break;
            case 'master_target_skill_prepare': setSecondRadio([]); setThirdRadio([]); break;
            case 'target_skill_prepare': setSecondRadio([]); setThirdRadio([]); break;
            case 'aimed': setSecondRadio([]); setThirdRadio([]); break;
            case 'master_aimed': setSecondRadio([]); setThirdRadio([]); break;
            case 'seek_target': setSecondRadio([]); setThirdRadio([]); break;
            case 'now_targeting': setSecondRadio([]); setThirdRadio([]); break;
        }

    }, [eventSelectedValue])


    //여기서 구분하는 값을 추가할 것
    const handleSelectChange = (value: string[]) => {
        //setSelectedValue(value);
        console.log(eventSelectedValue + "이 바뀌기 전의 값, " + value + "가 넘어옴 배열값, " + value[1] + "의 값이 라디오값으로 넘어옴, " + value[0] + "이 소트오더로 넘어옴")
        if (value[1] != "master" && value[1] != "pet") {
            setEventSelectedValue(prevstate => {
                const newValue = [...prevstate];
                //소트오더 0 = 배열 0번값, 소트오더 1, 2 = 배열 1번값 소트오더 3, 4, 5 = 베열 2번값
                const x = parseInt(value[0])
                newValue[parseInt(value[0])] = value[1];
                console.log(x)
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
                case 'master_defence': return true;
                case 'master_attacked': return true;
                case 'master_skill_prepare': return true;
                case 'master_attack': return true;
                case 'master_aiemd': return true;
                case 'master': return true;
                case 'pet': return false;
                //case : break;
            }
        }
        else if (value[0] == "pet") {
            switch (value[1]) {
                case 'pet': return true;
                //case 'targeted':
                case 'defence': return true;
                case 'attacked': return true;
                case 'skill_prepare': return true;
                case 'attack': return true;
                case 'master': return false;
                //case : break;
            }
        }
        //인식 관련 truefalse 체크
        else if (value[0] == value[1]) {
            return true
        }
        return false;
    }

    return (
        <EventBox>
            <RowBox>
                {/*소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션)*/}
                {/*주인/펫 체크 버튼, 1순위 버튼*/}
                <SelectButton optionValue={''} width={100} sortOrder={0} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                {secondRadio.length > 0
                    ? <BoxTextWraper>
                        {secondRadio[3] != '' ? <h3>{secondRadio[3]}</h3> : null}
                        <SelectButton width={parseInt(secondRadio[0])} optionValue={secondRadio[1]} sortOrder={parseInt(secondRadio[2])} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                        {secondRadio[4] != '' ? <h3>{secondRadio[4]}</h3> : null}
                    </BoxTextWraper>
                    : null}
                {firstRadio.length > 0
                    ? <BoxTextWraper>
                        {firstRadio[3] != '' ? <h3>{firstRadio[3]}</h3> : null}
                        <SelectButton width={parseInt(firstRadio[0])} optionValue={firstRadio[1]} sortOrder={parseInt(firstRadio[2])} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                        {firstRadio[4] != '' ? <h3>{firstRadio[4]}</h3> : null}
                    </BoxTextWraper>
                    : null}
                {thirdRadio.length > 0
                    ? <BoxTextWraper>
                        {thirdRadio[3] != '' ? <h3>{thirdRadio[3]}</h3> : null}
                        <SelectButton width={parseInt(thirdRadio[0])} optionValue={thirdRadio[1]} sortOrder={parseInt(thirdRadio[2])} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                        {thirdRadio[4] != '' ? <h3>{thirdRadio[4]}</h3> : null}
                    </BoxTextWraper>
                    : null}

                {/*
            */}
            </RowBox>
        </EventBox>)
}
/** */

export default EventMaker

const RowBox = styled.div`
align-items: flex-start;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 10px; 
width: 700px;
max-width: 100%;
flex-wrap: wrap;
`

const BoxTextWraper = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 3px;
h3 {
    white-space: nowrap;
} 
`
const EventBox = styled.div`
    background-color: rgb(81, 165, 196);
    padding: 10px;
    border-radius: 7px;
    border: 2px solid rgb(25, 76, 138);
`