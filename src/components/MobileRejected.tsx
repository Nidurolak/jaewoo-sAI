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
import 컴뱃파트너 from '../assets/Icon/컴뱃파트너.jpg'
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import gen_button_confirm from '../assets/Sound/gen_button_confirm.wav'
import gen_hover from '../assets/Sound/gen_hover.wav'
import { CurrentAIName, DownloadModalBool, DownloadModalCopyBool, ExplainModalBool } from '../store/atom';
import ButtonComp from './ButtonComp';

function MobileRejected (){
    return(<Container>
        <h2>모바일에선 접속하실 수 없습니다!</h2>
        <h3></h3>
    </Container>)
}

export default MobileRejected

const Container = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    background-color: rgba(111, 195, 226);

    h2 {
  color: white;
  font-weight: 250;
  font-size: 55px;
  font-family: inherit;
  }
 h3 {
  color: white;
  font-weight: 250;
  font-size: 25px;
  font-family: inherit;
  }
`