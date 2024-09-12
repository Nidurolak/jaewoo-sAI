import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { AIMakingEventArrayAtom, CurrentAIPattern } from '../../store/atom';
import EventMaker from './EventMaker';
import ConditionMaker from './ConditionMaker';
import SequenceMaker from './SequenceMaker';

function AIMakerTool() {
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [eventSelectedValue, setEventSelectedValue] = useRecoilState(AIMakingEventArrayAtom);
    const [currentPartternValue, setCurrentPatternValue] = useRecoilState(CurrentAIPattern);

    //여기서 구분하는 값을 추가할 것
    const handleSelectChange = (value: string[]) => {
        //setSelectedValue(value);
        //console.log(eventSelectedValue + "이 바뀌기 전의 값, " + value + "가 넘어옴 배열값, " + value[1] + "의 값이 라디오값으로 넘어옴, " + value[0] + "이 소트오더로 넘어옴")
        if (value[1] != "master" && value[1] != "pet") {
            setEventSelectedValue(prevstate => {
                const newValue = [...prevstate];
                //소트오더 0 = 배열 0번값, 소트오더 1, 2 = 배열 1번값 소트오더 3, 4, 5 = 베열 2번값
                const x = parseInt(value[0])
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
            }
            else if ((value[1] == "pet")) {
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

    useEffect(() => {
    }, [eventSelectedValue])

    return (
        <EventDiv>
            <ColummBox>
                <h2>상황</h2>
                <EventMaker />
            </ColummBox>

            <ColummBox>
                <h2>조건</h2>
                <ConditionMaker />
            </ColummBox>

            <ColummBox>
                <h2>행동</h2>
                <SequenceMaker />
            </ColummBox>
        </EventDiv>)
}

export default AIMakerTool;


const Cover = styled.div`
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
display: flex;
flex-direction: column; 
justify-content: center;
align-items: center;
cursor: default;
background-color: rgba(0, 0, 0, 0.8);
`;


const ColummBox = styled.div`
align-items: flex-start; 
display: flex;
flex-direction: column;
justify-content: flex-start;
gap: 10px; 
width: 100%;
max-width: 800px;
`

const EventDiv = styled.div`
align-items: center;
display: flex;
flex-direction: column;
justify-content: flex-start;
width: 100%;
height: 95%;
padding: 10px;
position: relative;

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

  h1 {word-spacing: 1px;word-break:keep-all; font-weight: 100;margin-top: 10px;font-size: 45px;font-family: 'Mabinogi_Classic_TTF';}
  h2 {word-spacing: 1px;word-break:keep-all;  margin-top: 10px; font-size: inherit; font-family: 'Mabinogi_Classic_TTF'; font-weight:500;}
  h3 {word-spacing: 1px;word-break:keep-all;  text-align: justify; font-weight: 100; font-size: 13px; font-family: 'Mabinogi_Classic_TTF'; white-space: pre-wrap;}

`