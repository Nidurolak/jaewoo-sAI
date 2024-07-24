import React, { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import SelectButton from './RadioButton';
import { AIMakingConditionArrayAtom, AIMakingSequenceArrayAtom } from '../../store/atom';
import XIconBlue from '../../assets/XIconBlue.png'
import UpIconBlue from '../../assets/UpIconBlue.png'
import PlusIconBlue from '../../assets/PlusIconBlue.png'
import DownIconBlue from '../../assets/DownIconBlue.png'
import { BoxProps } from '../../utils/types';

//이벤트 메이커랑 아주 비슷하게 만들어야 할거야.
function ConSeqWraper({ width, optionValue, value, sortOrder, indexNum, isCondition, onChange }: BoxProps) {

    const [listValue, setListValue] = useRecoilState(isCondition ? AIMakingConditionArrayAtom : AIMakingSequenceArrayAtom)

    var indexNumThis = indexNum != undefined ? indexNum : 0
    //console.log(indexNumThis)

    const [radio, setRadio] = useState({
        first: isCondition ? listValue[indexNumThis][0] ? [listValue[indexNumThis][0]] : [] : listValue[indexNumThis][0] ? [listValue[indexNumThis][0]] : [],
        second: isCondition ? listValue[indexNumThis][1] ? [listValue[indexNumThis][1]] : [] : listValue[indexNumThis][1] ? [listValue[indexNumThis][1]] : [],
        third: isCondition ? listValue[indexNumThis][2] ? [listValue[indexNumThis][2]] : [] : listValue[indexNumThis][2] ? [listValue[indexNumThis][2]] : [],
        fourth: isCondition ? listValue[indexNumThis][2] ? [listValue[indexNumThis][3]] : [] : listValue[indexNumThis][3] ? [listValue[indexNumThis][3]] : []
    })

    const changeQueue = (index: number, isUp: boolean) => {
        console.log(index);
        console.log(listValue.length);
        var indexVal = listValue[index]
        //위로 올릴 때
        if (isUp == true && index > 0) {
            console.log("sss");
            setListValue((prevArray) => {
                var val = [...prevArray];
                val[index] = val[index - 1];
                val[index - 1] = indexVal;
                return val;
            })
        }
        //아래로 내릴 때
        else if (isUp == false && index + 1 < listValue.length) {
            console.log("ddd");
            setListValue((prevArray) => {
                var val = [...prevArray];
                val[index] = val[index + 1];
                val[index + 1] = indexVal;
                return val;
            })
        }
    }
    const DeleteDupleQueue = (index: number, isDel: boolean) => {
        var DelVal = [...listValue]

        isDel == true ? DelVal.splice(index, 1) : DelVal.splice(index, 0, DelVal[index]);
        setListValue(DelVal)
    }


    useEffect(() => {
        console.log("수정발동")
        console.log(listValue[indexNumThis])
        switch (listValue[indexNumThis][0]) {
            //[width, optionValue, sortOrder, h3 전열 , h3 후열] 순으로 배열 생성
            case 'target_state': setRadio({ first: ["0", "target_state", "1", "= ", "인 경우"], second: [], third: [], fourth: [] }); break;//
            case 'target_distance': setRadio({ first: ["0", "target_distance", "1", "= ", "이상"], second: ["0", "target_distance", "2", "", "이하"], third: [], fourth: [] }); break;
            case 'skill_preparable': setRadio({ first: ["0", "skill_preparable", "1", "= ", ""], second: [], third: [], fourth: [] }); break;
            case 'ST_preparable': setRadio({ first: ["0", "ST_preparable", "1", "= ", ""], second: [], third: [], fourth: [] }); break;
            case 'EQ_preparable': setRadio({ first: ["0", "EQ_preparable", "1", "= ", ""], second: [], third: [], fourth: [] }); break;
            case 'master_damaged_life_greater': setRadio({ first: ["0", "master_damaged_life_greater", "1", "=", "이상"], second: [], third: [], fourth: [] }); break;

            case 'wait': setRadio({ first: ["0", "wait", "1", "=", "이상"], second: ["0", "wait", "2", "", "미만"], third: [], fourth: [] }); break;
            case 'move_against': setRadio({ first: ["0", "move_against", "1", "=", "가 될 때 까지"], second: ["0", "move_against", "2", "", "로 도망"], third: ["0", "move_against", "3", "제한시간 :", ""], fourth: [] }); break;
            case 'chase': setRadio({ first: ["0", "chase", "1", "=", "을"], second: ["0", "chase", "2", "", "로 추적함,"], third: ["0", "chase", "3", "제한시간 :", ""], fourth: [] }); break;
            case 'move_around': setRadio({ first: ["0", "move_around", "1", "=", "방향으로"], second: ["0", "move_around", "2", "", ""], third: ["0", "move_around", "3", "", ""], fourth: ["0", "move_around", "4", "제한시간 :", ""] }); break;
            case 'melee_attack': setRadio({ first: ["0", "melee_attack", "1", "=", "이상"], second: [], third: [], fourth: [] }); break;
            case 'stackmagic_attack': setRadio({ first: ["0", "stackmagic_attack", "1", "=", "를"], second: ["0", "stackmagic_attack", "3", "", "차지 후 공격"], third: ["0", "stackmagic_attack", "2", "제한시간 :", ""], fourth: [] }); break;
            case 'prepare_skill': setRadio({ first: ["0", "prepare_skill", "1", "=", "을(를)"], second: ["0", "prepare_skill", "2", "", "까지 재시도"], third: ["0", "prepare_skill", "3", "제한시간 :", ""], fourth: [] }); break;
            case 'stack_skill': setRadio({ first: ["0", "stack_skill", "1", "=", "을(를)"], second: ["0", "stack_skill", "2", "", "차지"], third: [], fourth: [] });; break;
            case 'process_skill': setRadio({ first: ["0", "process_skill", "1", "=", ""], second: ["0", "process_skill", "2", "제한시간 :", ""], third: [], fourth: [] }); break;
            case 'cancel_skill': setRadio({ first: [], second: [], third: [], fourth: [] }); break;
            case 'skill_relax': setRadio({ first: ["0", "skill_relax", "1", "=", "한다"], second: [], third: [], fourth: [] }); break;
            case 'PetST_skill': setRadio({ first: ["0", "PetST_skill", "1", "=", "을(를) 준비"], second: ["0", "PetEQ_skill", "2", "제한시간 :", ""], third: [], fourth: [] }); break;
            case 'PetEQ_skill': setRadio({ first: ["0", "PetEQ_skill", "1", "=", "을(를) 준비"], second: ["0", "PetEQ_skill", "2", "제한시간 :", ""], third: [], fourth: [] }); break;
        }

    }, [listValue])

    //널 자리에 채워야해 시퀸스
    return (
        <TotalBox>
            <RowBox>
                {isCondition
                    ? <SelectButton optionValue={'condition'} width={0} sortOrder={0} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                    : <SelectButton optionValue={'sequence'} width={0} sortOrder={0} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>}

                {/*State 통합으로 컨디션인지 체크는 여기서 무의미*/
                    radio.first.length > 1
                        ? <BoxTextWraper>
                            {radio.first[3] != '' ? <h3>{radio.first[3]}</h3> : null}
                            <SelectButton width={parseInt(radio.first[0])} optionValue={radio.first[1]} sortOrder={parseInt(radio.first[2])} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                            {radio.first[4] != '' ? <h3>{radio.first[4]}</h3> : null}
                        </BoxTextWraper>
                        : null}


                {radio.second.length > 1
                    ? <BoxTextWraper>
                        {radio.second[3] != '' ? <h3>{radio.second[3]}</h3> : null}
                        <SelectButton width={parseInt(radio.second[0])} optionValue={radio.second[1]} sortOrder={parseInt(radio.second[2])} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                        {radio.second[4] != '' ? <h3>{radio.second[4]}</h3> : null}
                    </BoxTextWraper>
                    : null}

                {radio.third.length > 1
                    ? <BoxTextWraper>
                        {radio.third[3] != '' ? <h3>{radio.third[3]}</h3> : null}
                        <SelectButton width={parseInt(radio.third[0])} optionValue={radio.third[1]} sortOrder={parseInt(radio.third[2])} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                        {radio.third[4] != '' ? <h3>{radio.third[4]}</h3> : null}
                    </BoxTextWraper>
                    : null}


                {radio.fourth.length > 1
                    ? <BoxTextWraper>
                        {radio.fourth[3] != '' ? <h3>{radio.fourth[3]}</h3> : null}
                        <SelectButton width={parseInt(radio.fourth[0])} optionValue={radio.fourth[1]} sortOrder={parseInt(radio.fourth[2])} value={listValue[indexNumThis]} onChange={onChange} indexNum={indexNum}></SelectButton>
                        {radio.fourth[4] != '' ? <h3>{radio.fourth[4]}</h3> : null}
                    </BoxTextWraper>
                    : null}
                {indexNumThis < listValue.length - 1
                    ? <h3>그리고</h3>
                    : null}
            </RowBox>
            <ButtonBox >

                <ButtonDiv image={UpIconBlue} onClick={() => changeQueue(indexNumThis, true)}></ButtonDiv>
                <ButtonDiv image={DownIconBlue} onClick={() => changeQueue(indexNumThis, false)}></ButtonDiv>
                <ButtonDiv image={PlusIconBlue} onClick={() => DeleteDupleQueue(indexNumThis, false)}> </ButtonDiv>
                <ButtonDiv image={XIconBlue} onClick={() => DeleteDupleQueue(indexNumThis, true)}></ButtonDiv>
            </ButtonBox>
        </TotalBox>)
}
//인덱스 길이 체크해서 그리고 글자 넣기
export default ConSeqWraper;

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
const ButtonBox = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 4px;
`
const TotalBox = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: flex-start;
width: 98%;
`
const RowBox = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: flex-start;
gap: 5px; 
width: 90%;
flex-wrap: wrap;
text-align: center;
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