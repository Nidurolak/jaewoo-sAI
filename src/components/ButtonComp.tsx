import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import clipboardCopy from 'clipboard-copy';
import { AIMaking, TestAIMaking, conPt, conWarper, eventWarper, seqPt, seqWarper, totalWarper } from '../hooks/AiMakerHook';
import { ConditionType, SequenceType, StringTest, AITemplet, BackGUI } from '../utils/types';
import { AI_TOOL } from './AITool';
import MainButton from '../assets/MainButton.svg'
import Mainbutton3 from '../assets/MainButton3.png'
import Mainbutton20070 from '../assets/MainButton20070.png'
import 로드롤러 from '../assets/Icon/로드롤러.jpg'
import 메디이익 from '../assets/Icon/메디이익.jpg'
import 볼트서포터 from '../assets/Icon/볼트서포터.jpg'
import 블레이즈서포터 from '../assets/Icon/블레이즈서포터.jpg'
import 오리지널Lite from '../assets/Icon/오리지널Lite.jpg'
import 재우오리지널 from '../assets/Icon/재우오리지널.jpg'
import 전봇대 from '../assets/Icon/전봇대.jpg'
import 펫디펜더 from '../assets/Icon/펫디펜더.jpg'
import 주인바라기 from '../assets/Icon/주인바라기.jpg'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import gen_button_confirm from '../assets/Sound/gen_button_confirm.wav'
import gen_hover from '../assets/Sound/gen_hover.wav'
import { CurrentAIName, DownloadModalBool, DownloadModalCopyBool, ExplainModalBool } from '../store/atom';
import { motion } from 'framer-motion';


function ButtonComp({ type}: BackGUI){

/*사용할려는 컴포넌트에서
Type '{ children: string; type: string; onClick: () => void; }' is not assignable to type 'IntrinsicAttributes & BackGUI'.
  Property 'children' does not exist on type 'IntrinsicAttributes & BackGUI'.ts(2322)
  에러를 띄운다. 해결법이 아주 복잡해보이는데, 막상 쓸일은 적어보인다. 타협하고 넘어간다. */
    return(<ButtonCompGUI type={type}></ButtonCompGUI>)
}
export default ButtonComp
const getWidthAndHeight = (type: BackGUI['type']) => {
    switch (type) {
      case 'small':
        return { width: '120px', height: '70px' };
      case 'AIDown':
        return { width: '140px', height: '80px' };
      case 'normal':
        return { width: '200px', height: '100px' };
      case 'xlarge':
        return { width: '400px', height: '150px' };
      default:
        return { width: 'auto', height: 'auto' };
    }
  };

const ButtonCompGUI = styled(motion.button)<BackGUI>`
  background-color: rgba(255, 255, 255, 0);
  background-image: url(${Mainbutton20070});
  background: url(${Mainbutton20070});
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  color: rgba(255, 255, 255, 1);
  width: ${(props) => getWidthAndHeight(props.type).width};
  height: ${(props) => getWidthAndHeight(props.type).height};
  border: none;
  font-size: 17px;
  font-family: 'Mabinogi_Classic_TTF';
  cursor: pointer;
  &:active {
    filter: brightness(120%); /* 클릭 시 밝기 감소 효과 */
  }
`;
