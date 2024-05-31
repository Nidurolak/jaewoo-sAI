import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import Mainbutton800400 from '../assets/MainButton800400.png'
import { useRecoilState } from 'recoil';
import exp from 'constants';
import SelectButton from './RadioButton';
import { AIMakingEventArrayAtom } from '../../store/atom';

function ConditionMaker() {
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
                    case 1: newValue[1] = value[1]; newValue[2] = ''; newValue[3] = ''; break;
                    case 2: newValue[1] = value[1]; newValue[2] = ''; newValue[3] = ''; break;
                    case 3: newValue[2] = value[1]; break;
                    case 4: newValue[2] = value[1]; break;
                    case 5: newValue[2] = value[1]; break;
                    case 6: newValue[2] = value[1]; break;
                    case 7: newValue[2] = value[1]; break;
                    case 8: newValue[3] = value[1]; break;
                    case 9: newValue[2] = value[1]; break;
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
        return false;
    }

    useEffect(() => {
        console.log(eventSelectedValue)
    }, [eventSelectedValue])

    return (
        <RowBox>
            {/*소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션)*/}
            {/*주인/펫 체크 버튼, 1순위 버튼*/}
            <SelectButton optionValue={''} width={100} sortOrder={0} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>

            {/*주인 디펜스 값 관련이 와야함, 3순위*/}
            {getOptionBool(["master_defence", eventSelectedValue[1]])
                ? <SelectButton width={0} optionValue={''} sortOrder={4} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*펫 디펜스 값 관련이 와야함, 3순위*/}
            {getOptionBool(["defence", eventSelectedValue[1]])
                ? <SelectButton width={200} optionValue={''} sortOrder={4} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}
            {/*펫 공격 값 관련이 와야함, 3순위*/}
            {getOptionBool(["attack", eventSelectedValue[1]])
                ? <SelectButton width={200} optionValue={''} sortOrder={9} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*주인 공격 값 관련이 와야함, 3순위*/}
            {getOptionBool(["master_attack", eventSelectedValue[1]])
                ? <SelectButton width={0} optionValue={''} sortOrder={6} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*마스터 스킬 준비 값 관련이 와야함, 3순위*/}
            {getOptionBool(["master_skill_prepare", eventSelectedValue[1]])
                ? <SelectButton width={0} optionValue={''} sortOrder={3} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*행동 체크 버튼, 2순위 버튼*/}
            {getOptionBool(["master", eventSelectedValue[0]])
                ? <SelectButton width={0} optionValue={''} sortOrder={2} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : <SelectButton width={200} optionValue={''} sortOrder={1} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>}

            {/*펫 피격 값 관련이 와야함, 3순위*/}
            {getOptionBool(["attacked", eventSelectedValue[1]])
                ? <SelectButton width={200} optionValue={''} sortOrder={8} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*주인 피격 값 관련이 와야함, 3순위*/}
            {getOptionBool(["master_attacked", eventSelectedValue[1]])
                ? <SelectButton width={0} optionValue={''} sortOrder={6} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*펫 피격 값 관련이 와야함, 4순위*/}
            {getOptionBool(["attacked", eventSelectedValue[1]])
                ? <SelectButton width={200} optionValue={''} sortOrder={6} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*주인 피격 값 관련이 와야함, 4순위*/}
            {getOptionBool(["master_attacked", eventSelectedValue[1]])
                ? <SelectButton width={0} optionValue={''} sortOrder={8} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*펫 공격 값 다운 관련이 와야함, 4순위*/}
            {getOptionBool(["attack", eventSelectedValue[1]])
                ? <SelectButton width={200} optionValue={''} sortOrder={8} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}


            {/*주인 인식관련 중간값 체크 목록, sortOrder 1번 여부에 따라 활성화*/}
            {getOptionBool(["master_targeted", eventSelectedValue[1]])
                ? <SelectButton width={0} optionValue={''} sortOrder={5} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

            {/*펫 인식관련 중간값 체크 목록, sortOrder 1번 여부에 따라 활성화*/}
            {getOptionBool(["targeted", eventSelectedValue[1]])
                ? <SelectButton width={200} optionValue={''} sortOrder={5} value={eventSelectedValue} onChange={handleSelectChange}></SelectButton>
                : null}

        </RowBox>)
}

export default ConditionMaker

const RowBox = styled.div`
align-items: flex-end;
display: flex;
flex-direction: row;
justify-content: flex-start;
width: 100%;
gap: 10px;
`
