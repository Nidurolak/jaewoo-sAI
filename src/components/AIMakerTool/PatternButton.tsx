import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom, CurrentAIPattern } from '../../store/atom';
import XIconBlue from '../../assets/XIconBlue.png'
import UpIconBlue from '../../assets/UpIconBlue.png'
import PlusIconBlue from '../../assets/PlusIconBlue.png'
import DownIconBlue from '../../assets/DownIconBlue.png'
import { BoxProps } from '../../utils/types';


function PatternButton({ indexNum, optionValue }: Partial<BoxProps>) {
    const [partternValue, setPatternValue] = useRecoilState(AIPatternArrayAtom);
    const [currentPartternValue, setCurrentPatternValue] = useRecoilState(CurrentAIPattern);
    const [inputValue, setInputValue] = useState('');
    let indexNumThis = indexNum != undefined ? indexNum : 0

    console.log(currentPartternValue.currentIndex)

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    //아톰값 설정때문에 너무 힘들다;;;
    /**/const changeQueue = (index: number, isUp: boolean) => {
        console.log(index);
        console.log(partternValue.length);
        let indexVal = partternValue[index]
        //위로 올릴 때
        if (isUp == true && index > 0) {
            console.log("sss");
            setPatternValue((preletray) => {
                let val = [...preletray];
                val[index] = val[index - 1];
                val[index - 1] = indexVal;
                return val;
            })
        }
        //아래로 내릴 때
        else if (isUp == false && index + 1 < partternValue.length) {
            console.log("ddd");
            setPatternValue((preletray) => {
                let val = [...preletray];
                val[index] = val[index + 1];
                val[index + 1] = indexVal;
                return val;
            })
        }
    }

    const deleteDupleQueue = (index: number, isDel: boolean) => {
        let DelVal = [...partternValue]

        isDel == true ? DelVal.splice(index, 1) : DelVal.splice(index, 0, DelVal[index]);
        setPatternValue(DelVal)
    }

    const valueFocus = () => {
        console.log(partternValue[indexNumThis].key)
        setCurrentPatternValue({
            ...currentPartternValue,
            currentIndex: indexNumThis,
            name: optionValue!,
            event: [["updatedEvent"]],
            condition: [["updatedCondition"]],
            sequence: [["updatedSequence"]]
        });
    }

    return (
        <Container >
            <BoxTextWraper>
                {currentPartternValue.currentIndex == indexNumThis ? <Input></Input> : <h2 onClick={valueFocus}>{optionValue}</h2>}

            </BoxTextWraper>
            <ButtonBox>
                <ButtonDiv image={UpIconBlue} onClick={() => changeQueue(indexNumThis, true)}></ButtonDiv>
                <ButtonDiv image={DownIconBlue} onClick={() => changeQueue(indexNumThis, false)}></ButtonDiv>
                <ButtonDiv image={PlusIconBlue} onClick={() => deleteDupleQueue(indexNumThis, false)}> </ButtonDiv>
                <ButtonDiv image={XIconBlue} onClick={() => deleteDupleQueue(indexNumThis, true)}></ButtonDiv>
            </ButtonBox>
        </Container>)
}

export default PatternButton;
//<h2 onClick={valueFocus}>{optionValue}</h2>
const Input = styled.input`
width: 200px;
height: 30px;
border: 3px solid rgb(25, 76, 138);
background-color: white;
color: rgb(25, 76, 138);

font-size: 16px;
border-radius: 4px;
box-sizing: border-box;
`;

const ButtonBox = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: flex-start;
margin-right: 5px;
gap: 3px;
`

const ButtonDiv = styled.div<{ image: any }>`
  background-color: rgba(255, 255, 255, 0);
  background-image: ${({ image }) => `url(${image})`};
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 30px;
  height: 30px;
  border: none;
  border-radius:3px;
  cursor: pointer;
  &:hover{filter: brightness(110%);}
  &:active{filter:brightness(120%);}
  `
const Container = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: space-between;
`
const BoxTextWraper = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 3px;
h2 {
    width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
    user-select: none;
  &:hover {
    color: rgb(200, 200, 200);
  }
} 
`