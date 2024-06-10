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

    /*const sequenceOption = [
        { id: 1, label: '까지 기다림', value: 'wait' },
        { id: 2, label: '도망침', value: 'move_against' },
        { id: 3, label: '근접 공격', value: 'melee_attack' },
        { id: 4, label: '이동함', value: 'move_around' },
        { id: 5, label: '차지 후 마법 공격', value: 'stackmagic_attack' },
        { id: 6, label: '을(를) 준비함', value: 'prepare_skill' },
        { id: 7, label: '마법을 차지함', value: 'stack_skill' },
        { id: 8, label: '스킬을 차지함', value: 'process_skill' },
        { id: 9, label: '사용 중인 스킬 취소', value: 'cancel_skill' },
        { id: 10, label: '준비한 스킬을 사용', value: 'skill_relax' },
        { id: 11, label: '추적함', value: 'chase' },
        { id: 12, label: '특성을 준비함', value: 'PetEQ_skill' },
        { id: 13, label: '핀즈비즈 스킬을 준비함', value: 'PetST_skill' },
    ];*/


    const getOptionBool = (value: string[]): boolean => {
        if (value[0] == value[1]) {
            return true;
        }
        return false;
    }

    useEffect(() => {
        console.log(eventSelectedValue)
    }, [eventSelectedValue])

    return (
        <RowBox>
            {/*소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션)*/}
            {/*주인/펫 체크 버튼, 1순위 버튼*/}

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
