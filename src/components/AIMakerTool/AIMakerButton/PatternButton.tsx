import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom, AIMakingSequenceArrayAtom, AIPatternArrayAtom, CurrentAIPattern } from '../../../store/atom';
import XIconBlue from '../../../assets/XIconBlue.png'
import UpIconBlue from '../../../assets/UpIconBlue.png'
import PlusIconBlue from '../../../assets/PlusIconBlue.png'
import DownIconBlue from '../../../assets/DownIconBlue.png'
import { BoxProps, PatternType } from '../../../utils/types';
import { CheckCurrentChange } from '../../../hooks/AiMakerHook';
import _ from 'lodash';

function PatternButton({ indexNum, optionValue }: Partial<BoxProps>) {
    const [partternValue, setPatternValue] = useRecoilState(AIPatternArrayAtom);
    const [currentPartternValue, setCurrentPatternValue] = useRecoilState(CurrentAIPattern);
    const [eventArray, setEventArray] = useRecoilState(AIMakingEventArrayAtom);
    const [conditionArray, setConditionArray] = useRecoilState(AIMakingConditionArrayAtom);
    const [sequenceArray, setSequenceArray] = useRecoilState(AIMakingSequenceArrayAtom);

    let indexNumThis = indexNum != undefined ? indexNum : 0;
    let checked = CheckCurrentChange()

    const [inputValue, setInputValue] = useState(partternValue[indexNumThis].key);

    /* 
    useEffect(() => {
        // Update inputValue whenever the partternValue[indexNumThis].key changes
        if (currentPartternValue.currentIndex !== indexNumThis) {
            console.log(partternValue[indexNumThis].key)
            console.log(inputValue)
            setInputValue(partternValue[indexNumThis].key);
        }
    }, [currentPartternValue.currentIndex]);*/

    const memoInputValue = useMemo(() => {
        if (currentPartternValue.currentIndex !== indexNumThis) {
            setInputValue(partternValue[indexNumThis].key);
        }
    }, [currentPartternValue.currentIndex]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setCurrentPatternValue({ currentIndex: indexNumThis, name: e.target.value });
    };

    const valueFocus = () => {
        let patternVal = [...partternValue];
        //console.log("밸류포커스 발동")
        patternVal[indexNumThis] = { ...patternVal[indexNumThis], key: inputValue };

        setPatternValue(patternVal);
        setEventArray(partternValue[indexNumThis].list.event);
        setConditionArray(partternValue[indexNumThis].list.condition);
        setSequenceArray(partternValue[indexNumThis].list.sequence);
        setCurrentPatternValue({ currentIndex: indexNumThis, name: optionValue! });
    };

    const changeQueue = (index: number, isUp: boolean) => {
        let indexVal = partternValue[index];
        if (isUp && index > 0) {
            setPatternValue((preArray) => {
                let val = [...preArray];
                val[index] = val[index - 1];
                val[index - 1] = indexVal;
                return val;
            });
        } else if (!isUp && index + 1 < partternValue.length) {
            setPatternValue((preArray) => {
                let val = [...preArray];
                val[index] = val[index + 1];
                val[index + 1] = indexVal;
                return val;
            });
        }
    };

    const deleteDupleQueue = (index: number, isDel: boolean) => {
        let DelVal = _.cloneDeep(partternValue);
        let target: PatternType = { key: DelVal[index].key + "_복사", list: { ...(DelVal[index].list) } }
        //수정 요망

        isDel ? DelVal.splice(index, 1) : DelVal.splice(index, 0, target);
        setPatternValue(DelVal);
    };

    const isButtonDisabled = currentPartternValue.currentIndex === indexNumThis;


    return (
        <Container>
            <BoxTextWraper>
                {currentPartternValue.currentIndex === indexNumThis ? (
                    <Input value={inputValue} onChange={handleInputChange} />
                ) : (
                    <h2 onClick={valueFocus}>{optionValue}</h2>
                )}
            </BoxTextWraper>
            <ButtonBox>
                <ButtonDiv image={UpIconBlue} onClick={() => changeQueue(indexNumThis, true)} disabled={isButtonDisabled} />
                <ButtonDiv image={DownIconBlue} onClick={() => changeQueue(indexNumThis, false)} disabled={isButtonDisabled} />
                <ButtonDiv image={PlusIconBlue} onClick={() => deleteDupleQueue(indexNumThis, false)} disabled={isButtonDisabled} />
                <ButtonDiv image={XIconBlue} onClick={() => deleteDupleQueue(indexNumThis, true)} disabled={isButtonDisabled} />
            </ButtonBox>
            {currentPartternValue.currentIndex !== indexNumThis && currentPartternValue.currentIndex > -1 && checked ? <Cover /> : null}
        </Container>
    );
}

export default PatternButton;

const Cover = styled.div`
width:343px;
height: 44px;
display: flex;
flex-direction: column; 
justify-content: center;
border-radius: 5px;
align-items: center;
position: absolute;
cursor: default;
background-color: rgba(0, 0, 0, 0.3);
`;

const Input = styled.input`
    width: 190px;
    height: 36px;
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
`;

const ButtonDiv = styled.div<{ image: any; disabled: boolean }>`
    background-color: rgba(255, 255, 255, 0);
    background-image: ${({ image }) => `url(${image})`};
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    color: rgba(255, 255, 255, 1);
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 3px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
    pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
    &:hover {
        filter: brightness(110%);
    }
    &:active {
        filter: brightness(120%);
    }
`;

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: relative;
`;

const BoxTextWraper = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 3px;
    h2 {
        width: 190px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        cursor: pointer;
        user-select: none;
        &:hover {
            color: rgb(200, 200, 200);
        }
    } 
`;