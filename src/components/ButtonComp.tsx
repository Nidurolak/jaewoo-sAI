import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';
import { BackGUI } from '../utils/types';
import Mainbutton20070 from '../assets/MainButton20070.png'
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
