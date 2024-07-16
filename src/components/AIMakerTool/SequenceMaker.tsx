import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';
import { AIMakingSequenceArrayAtom } from '../../store/atom';
import ConSeqWraper from './ConSeqWraper';
import { BackGUI } from '../../utils/types';
import Mainbutton3 from '../../assets/MainButton3.png'


function SequenceMaker() {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [sequenceSelectedValue, setSequenceSelectedValue] = useRecoilState(AIMakingSequenceArrayAtom);


  //구분값은 하단의 wraper 클래스에서 담당할 것. 여기는 단순한 포장 컴포넌트가 될 것임
  //스위치 따라 값 바꿔야하는거 아냐?
  const handleSelectChange = (value: string[]) => {
    //setSelectedValue(value);
    var val = [...sequenceSelectedValue]

    console.log(sequenceSelectedValue[parseInt(value[3])] + "이 바뀌기 전의 값, " + value + "가 넘어옴 배열값, " + value[1] + "의 값이 라디오값으로 넘어옴, " + value[0] + "이 소트오더로 넘어옴")

    setSequenceSelectedValue((prevArray) => {
      var val = [...prevArray];
      val[parseInt(value[3])] = [...val[parseInt(value[3])]];
      val[parseInt(value[3])][parseInt(value[0])] = value[1]
      //컨디션 값이 바뀌었다면 초기화된 후열 값을 바꿔야한다.
      if (value[2] == 'sequence') {
        console.log(val[parseInt(value[3])])
        console.log(value)
        //val[parseInt(value[3])]이 배열값이야, 여기서 1, 2번 인덱스를 고쳐야해
        switch (value[1]) {
          case 'wait': val[parseInt(value[3])][1] = 'walk'; val[parseInt(value[3])].splice(2, 1); break;//
          case 'move_against': val[parseInt(value[3])][1] = '100'; val[parseInt(value[3])][2] = '100'; break;
          case 'chase': val[parseInt(value[3])][1] = 'basic'; val[parseInt(value[3])].splice(2, 1); break;
          case 'move_around': val[parseInt(value[3])][1] = 'PetSTDamageUp'; val[parseInt(value[3])].splice(2, 1); break;
          case 'melee_attack': val[parseInt(value[3])][1] = 'FloralShield'; val[parseInt(value[3])].splice(2, 1); break;
          case 'stackmagic_attack': val[parseInt(value[3])][1] = '20'; val[parseInt(value[3])].splice(2, 1); break;
          case 'prepare_skill': val[parseInt(value[3])][1] = '20'; val[parseInt(value[3])].splice(2, 1); break;
          case 'stack_skill': val[parseInt(value[3])][1] = '20'; val[parseInt(value[3])].splice(2, 1); break;
          case 'precess_skill': val[parseInt(value[3])][1] = '20'; val[parseInt(value[3])].splice(2, 1); break;
          case 'cancel_skill': val[parseInt(value[3])][1] = '20'; val[parseInt(value[3])].splice(2, 1); break;
          case 'skill_relax': val[parseInt(value[3])][1] = '20'; val[parseInt(value[3])].splice(2, 1); break;
          case 'PetST_skill': val[parseInt(value[3])][1] = '20'; val[parseInt(value[3])].splice(2, 1); break;
          case 'PetEQ_skill': val[parseInt(value[3])][1] = '20'; val[parseInt(value[3])].splice(2, 1); break;
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
    const AddVal = ["wait", "1000", "1000"]
    setSequenceSelectedValue((prevArray) => [...prevArray, AddVal]);
    console.log(sequenceSelectedValue)
  }
  const conListDelete = (indexToRemove: number) => {
    var DelVal = [...sequenceSelectedValue]
    DelVal.splice(sequenceSelectedValue.length - 1, 1)
    setSequenceSelectedValue([]);
    console.log(DelVal)
  }

  useEffect(() => {
    console.log(sequenceSelectedValue)
  }, [sequenceSelectedValue])

  return (<ConditionBox><ScrollBox>
    {/*소트오더0 = 펫/주인 기본옵션 | 소트오더1 = 펫 옵션1 | 소트오더2 = 주인옵션1  | 소트오더3 = 종합옵션3(모든공격~매그넘) | 소트오더4 = 종합옵션2(디펜스 방어 옵션)*/}
    {sequenceSelectedValue.map((option, index) => (
      <ConSeqWraper key={index + "seq"} width={0} optionValue={''} value={sequenceSelectedValue[index]} sortOrder={0} indexNum={index} isCondition={false} onChange={handleSelectChange} ></ConSeqWraper>))}
  </ScrollBox>
    <RowBox>
      <SequenceButton onClick={conListAdd}>추가</SequenceButton>
      <SequenceButton onClick={() => conListDelete(sequenceSelectedValue.length - 1)} disabled={sequenceSelectedValue.length < 1}>초기화</SequenceButton>
    </RowBox>
  </ConditionBox>)
}

export default SequenceMaker

const ConditionBox = styled.div`
    background-color: rgb(81, 165, 196);
    padding: 10px;
    border-radius: 7px;
    border: 2px solid rgb(25, 76, 138);
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

const SequenceButton = styled.button`
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
  overflow: auto;
  gap: 10px;

  &::-webkit-scrollbar {
    width: 11px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: rgb(25, 76, 138);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgb(111, 195, 226);
  }

`