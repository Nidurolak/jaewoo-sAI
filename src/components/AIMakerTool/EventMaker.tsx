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

    var firstRadio: string[];
    var secondRadio: string[];
    var thirdRadio: string[];

    useEffect(() => {
        console.log(eventSelectedValue)
        switch (eventSelectedValue[1]) {
            //[width, optionValue, sortOrder, h3 전열 , h3 후열] 순으로 배열 생성
            case 'master_targeted': firstRadio = ["0", "master_targeted", "2", "적에게"]; secondRadio = []; thirdRadio = []; break;
            case 'targeted': firstRadio = ["0", "targeted", "2", "적에게"]; secondRadio = []; thirdRadio = []; break;
            case 'master_attacked': firstRadio = ["0", "master_attacked", "2", "(으)로 적에게"]; secondRadio = ["0", "master_attacked", "3", "그리고"]; thirdRadio = []; break;
            case 'attacked': firstRadio = ["0", "attacked", "2", "적에게"]; secondRadio = ["0", "attacked", "3", "그리고"]; thirdRadio = []; break;
            case 'master_defence': firstRadio = ["0", "master_defence", "2"]; secondRadio = []; thirdRadio = []; break;
            case 'defence': firstRadio = ["0", "defence", "2"]; secondRadio = []; thirdRadio = []; break;
            case 'attack': firstRadio = ["0", "attack", "2", "", "을 사용해"]; secondRadio = ["0", "", ""]; thirdRadio = []; break;
            case 'master_attack': firstRadio = ["0", "", ""]; secondRadio = ["0", "", ""]; thirdRadio = ["0", "", ""]; break;
            case 'master_skill_prepare': firstRadio = ["0", "", ""]; secondRadio = ["0", "", ""]; thirdRadio = ["0", "", ""]; break;
            case 'master': firstRadio = ["0", "", ""]; secondRadio = ["0", "", ""]; thirdRadio = ["0", "", ""]; break;
            default: firstRadio = []; secondRadio = []; thirdRadio = []; break;
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
        <RowBox>
            {/*소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션)*/}
            {/*주인/펫 체크 버튼, 1순위 버튼*/}
            <SelectButton optionValue={''} width={100} sortOrder={0} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>

            {/*주인 인식관련 중간값 체크 목록, sortOrder 1번 여부에 따라 활성화*/}
            {getOptionBool(["master_targeted", eventSelectedValue[1]])
                ? <BoxTextWraper><h3>적에게</h3><SelectButton width={0} optionValue={'master_targeted'} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton></BoxTextWraper>
                : null}

            {/*펫 인식관련 중간값 체크 목록, sortOrder 1번 여부에 따라 활성화*/}
            {getOptionBool(["targeted", eventSelectedValue[1]])
                ? <BoxTextWraper><h3>적에게</h3><SelectButton width={0} optionValue={'targeted'} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton></BoxTextWraper>
                : null}

            {/*주인 피격 값 관련이 와야함, 3순위*/}
            {getOptionBool(["master_attacked", eventSelectedValue[1]])
                ? <BoxTextWraper><SelectButton width={0} optionValue={'master_attacked'} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton><h3>(으)로 적에게</h3></BoxTextWraper>
                : null}

            {/*펫 피격 값 관련이 와야함, 3순위*/}
            {getOptionBool(["attacked", eventSelectedValue[1]])
                ? <BoxTextWraper><h3>적에게</h3><SelectButton width={0} optionValue={'attacked'} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton><h3>(으)로</h3></BoxTextWraper>
                : null}

            {/*주인 디펜스 값 관련이 와야함, 3순위*/}
            {getOptionBool(["master_defence", eventSelectedValue[1]])
                ? <SelectButton width={0} optionValue={'master_defence'} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*펫 디펜스 값 관련이 와야함, 3순위*/}
            {getOptionBool(["defence", eventSelectedValue[1]])
                ? <SelectButton width={0} optionValue={'defence'} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}
            {/*펫 공격 값 관련이 와야함, 3순위*/}
            {getOptionBool(["attack", eventSelectedValue[1]])
                ? <BoxTextWraper><SelectButton width={0} optionValue={'attack'} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton><h3>(을)를 사용해</h3></BoxTextWraper>
                : null}

            {/*주인 공격 값 관련이 와야함, 3순위*/}
            {getOptionBool(["master_attack", eventSelectedValue[1]])
                ? <BoxTextWraper><SelectButton width={0} optionValue={'master_attack'} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton><h3>을 사용해</h3></BoxTextWraper>
                : null}

            {/*마스터 스킬 준비 값 관련이 와야함, 3순위*/}
            {getOptionBool(["master_skill_prepare", eventSelectedValue[1]])
                ? <SelectButton width={0} optionValue={'master_skill_prepare'} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*행동 체크 버튼, 2순위 버튼*/}
            {getOptionBool(["master", eventSelectedValue[0]])
                ? <SelectButton width={0} optionValue={'master'} sortOrder={1} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : <SelectButton width={0} optionValue={'pet'} sortOrder={1} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>}

            {/*펫 피격 값 관련이 와야함, 4순위*/}
            {getOptionBool(["attacked", eventSelectedValue[1]])
                ? <BoxTextWraper><h3>그리고</h3><SelectButton width={0} optionValue={'attacked'} sortOrder={3} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton></BoxTextWraper>
                : null}

            {/*주인 피격 값 관련이 와야함, 4순위*/}
            {getOptionBool(["master_attacked", eventSelectedValue[1]])
                ? <BoxTextWraper><h3>그리고</h3><SelectButton width={0} optionValue={'master_attacked'} sortOrder={3} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton></BoxTextWraper>
                : null}

            {/*펫 공격 값 다운 관련이 와야함, 4순위*/}
            {getOptionBool(["attack", eventSelectedValue[1]])
                ? <BoxTextWraper><h3>그리고</h3><SelectButton width={0} optionValue={'attack'} sortOrder={3} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton></BoxTextWraper>
                : null}

        </RowBox>)
}

export default EventMaker

const RowBox = styled.div`
align-items: flex-start;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 10px; 
width: 100%;
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