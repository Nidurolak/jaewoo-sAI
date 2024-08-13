import React, { useState, ChangeEvent, useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { AIMakingConditionArrayAtom, AIMakingEventArrayAtom } from '../../store/atom';
import ConSeqWraper from './ConSeqWraper';
import { BackGUI } from '../../utils/types';
import Mainbutton3 from '../../assets/MainButton3.png'


function ConditionMaker() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [conditionSelectedValue, setConditionSelectedValue] = useRecoilState(AIMakingConditionArrayAtom);


  //구분값은 하단의 wraper 클래스에서 담당할 것. 여기는 단순한 포장 컴포넌트가 될 것임
  //스위치 따라 값 바꿔야하는거 아냐?
  const handleSelectChange = (value: string[]) => {
    //setSelectedValue(value);
    var val = [...conditionSelectedValue]

    console.log(conditionSelectedValue[parseInt(value[3])] + "이 바뀌기 전의 값, " + value + "가 넘어옴 배열값, " + value[1] + "의 값이 라디오값으로 넘어옴, " + value[0] + "이 소트오더로 넘어옴")

    setConditionSelectedValue((prevArray) => {
      var val = [...prevArray];
      val[parseInt(value[3])] = [...val[parseInt(value[3])]];
      val[parseInt(value[3])][parseInt(value[0])] = value[1]
      //컨디션 값이 바뀌었다면 초기화된 후열 값을 바꿔야한다.
      if (value[2] == 'condition') {
        console.log(val[parseInt(value[3])])
        console.log(value)
        //val[parseInt(value[3])]이 배열값이야, 여기서 1, 2번 인덱스를 고쳐야해
        switch (value[1]) {
          case 'target_state': val[parseInt(value[3])][1] = 'walk'; val[parseInt(value[3])].splice(2, 1); break;//
          case 'target_distance': val[parseInt(value[3])][1] = '100'; val[parseInt(value[3])][2] = '100'; break;
          case 'skill_preparable': val[parseInt(value[3])][1] = 'basic'; val[parseInt(value[3])].splice(2, 1); break;
          case 'ST_preparable': val[parseInt(value[3])][1] = 'PetSTDamageUp'; val[parseInt(value[3])].splice(2, 1); break;
          case 'EQ_preparable': val[parseInt(value[3])][1] = 'FloralShield'; val[parseInt(value[3])].splice(2, 1); break;
          case 'master_damaged_life_greater': val[parseInt(value[3])][1] = '20'; val[parseInt(value[3])].splice(2, 1); break;
        }
      }
      //val[parseInt(value[3])] = [...val[parseInt(value[0])]];
      //val[parseInt(value[3])][parseInt(value[0])] = value[1];
      console.log(val[parseInt(value[3])][parseInt(value[0])])
      return val
    })
    //인덱스넘 넘어옴, 이걸로 조립해야함
  };

  const conListAdd = () => {
    const AddVal = ["target_state", "walk"]
    setConditionSelectedValue((prevArray) => [...prevArray, AddVal]);
    console.log(conditionSelectedValue)
  }
  const conListDelete = (isCondition: boolean) => {
    if (isCondition == true) {
      var DelVal = [...conditionSelectedValue]
      DelVal.splice(conditionSelectedValue.length - 1, 1)
      setConditionSelectedValue([]);
      console.log(DelVal)
    }
  }

  useEffect(() => {
    console.log(conditionSelectedValue)
  }, [conditionSelectedValue])

  return (<ConditionBox>
    <ScrollBox>
      {/*소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션)*/}
      {conditionSelectedValue.map((option, index) => (
        <ConSeqWraper key={index + "con"} width={0} optionValue={''} value={conditionSelectedValue[index]} sortOrder={0} indexNum={index} isCondition={true} onChange={handleSelectChange} ></ConSeqWraper>))}
    </ScrollBox>
    <RowBox>
      <ConditionButton type='small' onClick={conListAdd}>추가</ConditionButton>
      <ConditionButton type='small' onClick={() => conListDelete(true)} disabled={conditionSelectedValue.length < 1}>초기화</ConditionButton>
    </RowBox>
  </ConditionBox>)
}

export default ConditionMaker

const ConditionBox = styled.div`
width: 800px;
    background-color: rgb(81, 165, 196);
    padding: 10px;
    border-radius: 7px;
    border: 2px solid rgb(25, 76, 138);
`
const TestBox = styled.div`
    width: 100px;
    height: 40px;
    margin-bottom: 10px;
`

const RowBox = styled.div`
align-items: center;
display: flex;
flex-direction: row;
justify-content: center;
width: 100%;
padding-top: 15px;
gap: 10px;

`

const ConditionButton = styled.button<BackGUI>`
background-color: rgba(255, 255, 255, 0);
background-image: url(${Mainbutton3});
background: url(${Mainbutton3});
background-size: 100% 100%;
background-position: center;
background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: 120px;
  height: 30px;
  border: none;
  font-size: 17px;
  font-family: 'Mabinogi_Classic_TTF';
  cursor: pointer;
  &:hover{
    filter: brightness(110%);
  }
  &:active {
    filter: brightness(120%); /* 클릭 시 밝기 감소 효과 */
  }
`
const ScrollBox = styled.div`
display: flex;
flex-direction: column;
  width: 800px;
  max-width: 100%;
  height: 200px;
  max-height: 100%;
  overflow-y: scroll;
  gap: 10px;

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

`